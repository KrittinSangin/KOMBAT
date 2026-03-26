"use client"

import {useRouter} from "next/navigation";
import Button from "../../components/Button";
import {useEffect, useState} from "react";
import {Client} from "@stomp/stompjs";
import {create} from "zustand"
import SockJS from "sockjs-client";
import {useConfigStore} from "../configuration/Store/useConfigStore";
import {useSocketStore} from "./Store/SocketStore";
import MinionProfile from "./components/MinionProfile";
import Navbar, {TeamSide} from "./components/Navbar";
import GameLayout from "./components/GameLayout";
import StrategyBox from "./components/StrategyBox";
import {useOriginStore} from "../gamemode/Store/DuelOriginStore";
import {MinionBlueprint, useMinionBlueprintsStore} from "./Store/MinionBlueprint";
import {GameDTO, StartInfoDTO} from "../../ttypes/type";
import {useGameStateStore} from "../../components/game/model/useGameStateStore";
import {Game} from "../../components/game/type/GameTypes";
import {startGame} from "../../components/game/model/game";
import {useMinionPreviewStore} from "./Store/MinionPreviewStore";

import {useGlobalPlayerStore} from "../configuration/Store/GlobalPlayerStore";

export type joinedHandler = {
    hostID: string
    ready: boolean
}

type GameStartDTO = {
    p1Blueprint: MinionBlueprint,
    p2Blueprint: MinionBlueprint,
    universalDeck: MinionBlueprint[],
    startInfoDTO: StartInfoDTO,
    initGameDTO: GameDTO,
}

export default function GameInitPage() {
    const router = useRouter();

    //zustand
    const {checkOrigin} = useOriginStore();
    const {player1, player2} = useGlobalPlayerStore();
    const {config} = useConfigStore();
    const {minionBlueprints, initializeBlueprintCount} = useMinionBlueprintsStore();

    //useState
    const [ready, setReady] = useState(false);

    const [minionSpriteName, setMinionSpriteName] = useState("");
    const [selectedMinion, setSelectedMinion] = useState(0);

    //consts
    const playerName = checkOrigin() == "CREATE" ? player1 : player2;
    const checkOrg = checkOrigin() == "CREATE";
    const minionCount = config._minions;


    const {game, start} = useGameStateStore()

    //Web Socket Handle
    const client = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_LINK}/ws`),
        onConnect: () => {
            client.subscribe("/topic/startGame", message => {
                const intelligentMessage: GameStartDTO = JSON.parse(message.body)
                console.log(intelligentMessage.universalDeck);
                useMinionPreviewStore.getState().setExportedDeck(intelligentMessage.universalDeck)

                //start game
                console.log(intelligentMessage.startInfoDTO)
                start(intelligentMessage.startInfoDTO)
                console.log("Game Started!");
                console.log(game);

                router.push("/RandomPage")
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
        const hasBrokenStrategy = minionBlueprints.some((bp) => !bp.isStrategyParsedOk);
 
        const nextReadyState = ready ? false : !hasBrokenStrategy;
        setReady(nextReadyState);

        const origin = checkOrigin();
        const isP1Bot = origin === "BOT_VS_BOT"; 
        const isP2Bot = origin === "BOT_MODE" || origin === "BOT_VS_BOT";

        useSocketStore.getState().client?.publish({
            destination: "/app/game/ready",
            body: JSON.stringify({
                IsReady: nextReadyState, 
                playerName: playerName,
                playerTeam: checkOrg ? 0 : 1,
                minions: minionBlueprints,
                isP1Bot: isP1Bot,
                isP2Bot: isP2Bot
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