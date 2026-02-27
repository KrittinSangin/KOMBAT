"use client";

import {useRouter} from "next/navigation";
import {GameDTO, HexPos, PlayerInfo} from "../../ttypes/type";
import {useEffect, useRef, useState} from "react";
import {Game} from "../../components/game/model/Game";
import GameView from "../../components/game/react/GameView";

import {defaultConfig} from "../../components/game/utils/sample";
import {Minion} from "../../components/game/type/Minion";
import {Sprite} from "../../components/game/type/Sprite";
import {Transform2} from "../../components/game/type/Transform";


function GameCanvas(game:Game)
{
    const space_x = 75;
    const space_y = 75;
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
            border: "2px solid black"
        }}
    >
        {draw()}

    </div>
}

const mockGame = () =>
{
    const p1:PlayerInfo =
        {
            name: "Platiea Pleatui",
            team: 0
        };

    const p2:PlayerInfo =
        {
            name: "Azure Luminea",
            team: 1
        }

    const universalDeck: Minion[] = [
        new Minion("Madoka",
            new Sprite("/game/texture/minion/Madoka.png",
                new Transform2(
                    {x:0,y:0},
                    {x:190,y:320},
                    {x:0.32,y:0.32}
                ),
                "transparent"
            ),
            100,
            10
        ),
        new Minion("Medicine",
            new Sprite("/game/texture/minion/Medicine.png",
                new Transform2(
                    {x:0,y:0},
                    {x:240,y:320},
                    {x:0.3,y:0.3}
                ),
                "transparent"
            ),
            100,
            10
        )
    ]

    const g = new Game(defaultConfig,p1,p2,universalDeck,universalDeck);

    const rc1 : HexPos = {row:4,col:4};
    const rc2 : HexPos = {row:1,col:1};
    const rc3 : HexPos = {row:2,col:5};
    const rc4 : HexPos = {row:7,col:7};

    g.map.getHex(rc1)?.setMinion(universalDeck[0])
    g.map.getHex(rc2)?.setMinion(universalDeck[1])
    g.map.getHex(rc3)?.setMinion(universalDeck[1])
    g.map.getHex(rc4)?.setMinion(universalDeck[0])

    return g;
}

export default function GameScene()
{
    const router = useRouter();
    const [game, setGame] = useState<Game | null>(mockGame());


    if (!game) return <></>
    return GameCanvas(game)
}