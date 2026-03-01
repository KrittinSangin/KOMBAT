"use client";

import {useRouter} from "next/navigation";
import {GameDTO, HexPos, PlayerInfo} from "../../ttypes/type";
import {useEffect, useRef, useState} from "react";

import {defaultConfig} from "../../components/game/utils/sample";

import {create} from "zustand"
import {useStore} from "zustand/react";
import {Game} from "../../components/game/type/gameStates";
import {demoGame, mockState} from "../../components/game/model/sampleState";
import GameView from "../../components/game/react/Game/GameView";
import UnitSelect from "../../components/game/react/UI/UnitSelect";
import RectView from "../../components/game/react/Renderer/RectView";


function GameCanvas(game: Game) {
    const draw = () => {
        return GameView(game);
    }

    return <div
        style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
        }}
    >
        {draw()}

    </div>
}

export default function GameScene() {
    const router = useRouter();
    const game = mockState()

    return <main>

        {GameCanvas(game)}
        <nav className="w-full h-full"
             style={{
                 position: "absolute",
                 left: 0,
                 top: 0,
             }}>
            <UnitSelect deck={game.players[0].deck}></UnitSelect>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 ">
                <div
                    className="bg-white w-32 h-32 drop-shadow-2xl
                    flex flex-col items-center"
                >
                    <span className="font-bold text-3xl">Turn</span>
                    <span className="font-bold text-3xl">xx/xx</span>
                </div>
            </div>

            <div className="absolute top-36 left-1/2 -translate-x-1/2 ">
                <div
                    className="bg-yellow-100 w-128 h-16 flex flex-col justify-center items-center drop-shadow-2xl
                    text-2xl"
                >
                    text here. This is a pop up. so u know?
                </div>
            </div>
        </nav>

    </main>
}