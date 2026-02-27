"use client";

import {useRouter} from "next/navigation";
import {GameDTO} from "../../ttypes/type";
import {marker} from "./Components/gizmos";
import {useEffect, useRef} from "react";
import {Game} from "../../components/game/model/Game";
import GameView from "../../components/game/react/GameView";


function gameCanvas()
{
    const space_x = 75;
    const space_y = 75;
    const draw = () =>
    {
        return GameView();
            // Array.from({ length: 8}, (_,y) =>
            //     Array.from({length:8}, (_,x) =>
            //         ({x,y}))).flat().map((pair) => {
            //                 marker(pair.x * space_x, pair.y * space_y, "red")
            //             }))

    }

    return<div
        style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            border: "2px solid black"
        }}
    >
        {draw()}

    </div>
}

export default function GameScene()
{
    const router = useRouter();
    const gameRef = useRef<Game|null>(null)

    useEffect(() =>{
        const game = new Game();
        gameRef.current = game;

        //start the game

       return () => {};

    }, []);

    return gameCanvas()
}