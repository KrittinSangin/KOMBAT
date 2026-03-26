"use client";

import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";

import {defaultConfig} from "../../components/game/utils/sample";

import {create} from "zustand"
import {demoGame, mockState} from "../../components/game/model/sampleState";
import GameView from "../../components/game/react/Game/GameView";
import UnitSelect from "../../components/game/react/UI/UnitSelect";
import RectView from "../../components/game/react/Renderer/RectView";
import UICanvas from "../../components/game/react/Renderer/UICanvas";
import GameCanvas from "../../components/game/react/Renderer/GameCanvas";
import {GameStateEnum} from "../../ttypes/enums";
import {useGameState} from "../../components/game/model/useGameState";
import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {GameDTO} from "../../ttypes/type";
import {emptyGame, updateGame} from "../../components/game/model/game";
import {useSocketStore} from "../gameInit/Store/SocketStore";
import {useIntent} from "../../components/game/model/useIntent";

export default function GameScene() {
    const router = useRouter();
    const {submitIntent} = useIntent();
    const {game,set,update} = useGameState();
    const {setClient} = useSocketStore();

    const client = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_LINK}/ws`),
        onConnect: () => {
            console.log("Connected");

            client.subscribe("/topic/update", message => {
                const dto: GameDTO = JSON.parse(message.body);
                update(dto);
            })

             client.subscribe("/topic/nogame", message => {
                console.log(message.body);
            })

            //sending empty intent to backend to get the current game
            submitIntent(client);

        }
    });

    useEffect(() => {
        client.activate();
        setClient(client);


    }, []);

    return <main>
        <GameCanvas game={game}/>
        <UICanvas game={game}/>
    </main>
}