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
import UICanvas from "../../components/game/react/Renderer/UICanvas";
import GameCanvas from "../../components/game/react/Renderer/GameCanvas";




export default function GameScene() {
    const router = useRouter();
    const game = mockState()

    return <main>
        <GameCanvas game={game}/>
        <UICanvas game={game}/>
    </main>
}