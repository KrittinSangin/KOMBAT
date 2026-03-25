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

    const {minionBlueprints,initializeBlueprintCount} = useMinionBlueprintsStore();
    const {checkOrigin} = useDuelOriginStore();
    const {player1,player2} = Global2Players();
    const {config} = useConfigStore();

    const [ready, setReady] = useState(true);

    const [minionSpriteName, setMinionSpriteName] = useState("");
    const [selectedMinion, setSelectedMinion] = useState(0);

    const playerName = checkOrigin() == "CREATE" ? player1 : player2;
    const checkOrg = checkOrigin() == "CREATE"
    const minionCount = config._minions;


    //Web Socket Handle
    const client = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_LINK}/ws`),
        onConnect: () => {
            client.subscribe("/topic/startGame", message =>
            {
                const gameStartDTO:GameStartDTO = JSON.parse(message.body)
                //continue stuff here I guess?

                router.push("/game");

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

        //if player is ready or there exist a minion that have no strategy/parse error strategy
        if (ready || minionBlueprints.some((blueprint)=> !blueprint.isStrategyParsedOk))
        {
            //set ready to false
            setReady(false)
            return;
        }

        //otherwise, set to true and send data to backend
        setReady(true);
        console.log(minionBlueprints);
        useSocketStore.getState().client?.publish({
            destination: "/app/game/ready",
            body: JSON.stringify({
                playerName: playerName,
                playerTeam: checkOrg ? 0 : 1,
                minions: minionBlueprints
            })
        });
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