"use client"

import {useRouter} from "next/navigation";
import Button from "../../components/Button";
import {useEffect, useState} from "react";
import {Global2Players} from "../configuration/components/ProfileConfig";
import {Client} from "@stomp/stompjs";
import {create} from "zustand"
import SockJS from "sockjs-client";
import {useConfigStore} from "../configuration/Store/useConfigStore";
import {useStrategyFilesStore} from "./Store/StrategyFileStore";
import {useSocketStore} from "./Store/SocketStore";
import MinionProfile from "./components/MinionProfile";
import Navbar, {TeamSide} from "./components/Navbar";
import GameLayout from "./components/GameLayout";
import StrategyBox from "./components/StrategyBox";
import {useDuelOriginStore} from "../gamemode/Store/DuelOriginStore";
import {MinionBlueprint, useMinionBlueprintsStore} from "./Store/MinionBlueprint";
import {GameDTO} from "../../ttypes/type";

export type joinedHandler = {
    hostID: string
    ready: boolean
}

type GameStartDTO = {
    p1Blueprint:MinionBlueprint,
    p2Blueprint:MinionBlueprint,
    universalBlueprint:MinionBlueprint,
    initGameDTO: GameDTO,
}


export default function GameInitPage() {
    const router = useRouter();

    const [ready, setReady] = useState(false);

    const [minionSpriteName, setMinionSpriteName] = useState("");
    const [selectedMinion, setSelectedMinion] = useState(0);

    const playerName = useDuelOriginStore.getState().checkOrigin() == "CREATE" ? Global2Players.getState().player1 : Global2Players.getState().player2;
    const checkOrg = useDuelOriginStore.getState().checkOrigin() == "CREATE"
    const minionCount = useConfigStore.getState().config._minions;

    const {minionBlueprints,initializeBlueprintCount} = useMinionBlueprintsStore();

    //Web Socket Handle
    const client = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_LINK}/ws`),
        onConnect: () => {
            client.subscribe("/topic/startGame", message => {
                if(message.body == "Both players ready"){
                    router.push("/RandomPage")
                    
                }else{
                    const intelligentMessage : GameStartDTO = JSON.parse(message.body)
                    console.log(intelligentMessage.universalBlueprint);
                }
            });
        }
    });

    //upon mount
    useEffect(() => {
        client.activate();
        useSocketStore.getState().setClient(client);
        initializeBlueprintCount(minionCount);
    }, [])

    const readyUp = async () => {
        console.log(minionBlueprints);
        useSocketStore.getState().client?.publish({
            destination: "/app/game/ready",
            body: JSON.stringify({
                IsReady: !ready,
                playerName: playerName,
                playerTeam: checkOrg ? 0 : 1,
                minions: minionBlueprints
            })
        });
        setReady(!ready);

    }

    return (
        <>
            <GameLayout src={checkOrg ? "/Blue_bg.jpeg" : "/Red_bg.jpg"} alt="Background Image"></GameLayout>

            <Navbar title={playerName} minionCount={minionCount} team={checkOrg ? TeamSide.Blue : TeamSide.Red}
                    selectedMinion={selectedMinion} onSelect={setSelectedMinion}/>

            <StrategyBox selectedMinion={selectedMinion} selectingMinionSprite={minionSpriteName}></StrategyBox>

            <MinionProfile onReturn={(name) => setMinionSpriteName(name)} minionIndex={selectedMinion}></MinionProfile>

            <div className={ready ? "opacity-100" : "opacity-50"}>
                <Button onClick={readyUp} src="/green_btn.PNG" alt="Ready" overlayText="Ready" bottom="-20" left="1300"
                        color="purple" font_size="40" height="150" width="190"></Button>
            </div>
        </>
    )
}