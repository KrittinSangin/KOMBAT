"use client";

import {useRouter} from "next/navigation";
import {GameDTO, HexPos, PlayerInfo} from "../../ttypes/type";
import {useEffect, useRef, useState} from "react";
import GameView from "../../components/game/react/GameView";

import {defaultConfig} from "../../components/game/utils/sample";

import {create} from "zustand"
import {useStore} from "zustand/react";
import {Game} from "../../components/game/type/gameStates";
import {demoGame, mockState} from "../../components/game/model/sampleState";


function GameCanvas(game:Game)
{
    const draw = () =>
    {
        return GameView(game);
    }

    return<div
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

export default function GameScene()
{
    const router = useRouter();
    const game = mockState()

    return GameCanvas(game)
}