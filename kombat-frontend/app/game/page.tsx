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

export default function GameScene() {
    const router = useRouter();
    const {game,set} = useGameState();

    useEffect(() => {
        set(mockState());
    }, []);

    return <main>
        <GameCanvas game={game}/>
        <UICanvas game={game}/>
    </main>
}