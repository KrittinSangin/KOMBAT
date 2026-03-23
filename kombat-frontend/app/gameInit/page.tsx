"use client"

import {useRouter} from "next/navigation";
import Navbar, {TeamSide} from "../../components/Navbar";
import StrategyBox from "../../components/StrategyBox";
import Button from "../../components/Button";
import { useSearchParams } from "next/navigation";
import GameLayout from "../../components/GameLayout";
import MinionProfile from "../../components/MinionProfile";
<<<<<<< HEAD
import { useState } from "react";

export default function GameInitPage() {
    const searchParams = useSearchParams();
    const minion = searchParams.get("minion");
=======
import {useState} from "react";
import {useConfigStore} from "../configuration/page";
import {duelWhereDidYouComeFrom} from "../gamemode/duel/page";
import {Global2Players} from "../configuration/components/ProfileConfig";
import {Client} from "@stomp/stompjs";
import {create} from "zustand"
import SockJS from "sockjs-client";

export type joinedHandler = {
    hostID: string
    ready: boolean
}

interface SocketStore {
    client: Client | null;
    setClient: (client: Client) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
    client: null,
    setClient: (client) => set({client}),
}));

export default function GameInitPage() {
    const router = useRouter();
    const playerName = duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE" ? Global2Players.getState().player1 : Global2Players.getState().player2;
    const checkOrg = duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE"
    const minion = useConfigStore.getState()._minions;
>>>>>>> cee997f63637d5ef18ad0fb675b8ea4364c24a29

    const [Ready, setReady] = useState(false);


    const [received, setReceived] = useState("");
    const [selectedMinion, setSelectedMinion] = useState(0);

    const client = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_LINK}/ws`),
        onConnect: () => {
            client.subscribe("/game/state", message => {
                console.log(message.body);
                if (message.body == "true") setReady(true);
                else if (message.body == "false") setReady(false);
                // else router.push("/game");
            });

            client.publish({
                destination: "/app/game/start",
                body: JSON.stringify("KUY")
            });
        }
    });

    const readyUp = async () => {
        client.activate(); // activate triggers onConnect when ready
        setReady(!Ready);
        useSocketStore.getState().setClient(client);
    }

    return (
        <>
<<<<<<< HEAD
            <GameLayout src="/Blue_bg.jpeg" alt="Background Image" >
            </GameLayout> 
                <Navbar title="Player1" minionCount={Number(minion)} team={TeamSide.Blue} selectedMinion={selectedMinion} onSelect={setSelectedMinion}/>
                <StrategyBox selectedMinion={selectedMinion}></StrategyBox>
                <MinionProfile minionIndex={selectedMinion}></MinionProfile>
=======
            <GameLayout src={checkOrg ? "/Blue_bg.jpeg" : "/Red_bg.jpg"} alt="Background Image">
            </GameLayout>
            <Navbar title={playerName} minionCount={minion} team={checkOrg ? TeamSide.Blue : TeamSide.Red}
                    selectedMinion={selectedMinion} onSelect={setSelectedMinion}/>
            <StrategyBox selectedMinion={selectedMinion} passedString={received}></StrategyBox>
            <MinionProfile onReturn={(val) => setReceived(val)} minionIndex={selectedMinion}></MinionProfile>
            <div className={Ready ? "opacity-50" : "opacity-100"}>
                <Button onClick={readyUp} src="/green_btn.PNG" alt="Ready" overlayText="Ready" bottom="-20" left="1300"
                        color="purple" font_size="40" height="150" width="190"></Button>
            </div>
>>>>>>> cee997f63637d5ef18ad0fb675b8ea4364c24a29
        </>
    )
}