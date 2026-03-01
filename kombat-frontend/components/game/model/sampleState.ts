import {Game, Hex, Minion} from "../type/gameStates";
import {Config, HexPos} from "../../../ttypes/type";
import {GameStateEnum} from "../../../ttypes/enums";
import {Texture} from "../type/Rendering";
import {createHexMap, hexKey} from "./hexMap";
import {knight_T, madoka_T, medicine_T, ryuu_T, scarlet_T} from "../resources/textureResource";
import {c_hexPos} from "../utils/utility";

export const defaultCfg: Config = {
    spawnCost: 100,
    hexPurchaseCost: 100,
    initBudget: 1000,
    initHp: 100,
    turnBudget: 100,
    maxBudget: 10000,
    interestPct: 10,
    maxTurns: 10,
    maxSpawns: 10,

    mapWidth: 8,
    mapHeight: 8,

    startHexPosP1: [
        {row: 1, col: 1},
        {row: 1, col: 2},
        {row: 1, col: 3},
        {row: 2, col: 1},
        {row: 2, col: 2},
    ],
    startHexPosP2: [
        {row: 7, col: 7},
        {row: 7, col: 8},
        {row: 8, col: 6},
        {row: 8, col: 7},
        {row: 8, col: 8},
    ],
}

const createMinion : (texture:Texture,name:string,def:number) => Minion = (texture:Texture,name:string,def:number) => (
    {
        sprite:
            {
                texture:texture,
                transform:
                    {
                        pos:{x:0,y:0},
                        scale:{x:0.3,y:0.3}
                    },
                color: "transparent",
            },
        name: name,
        team: -1,
        hp: -1,
        def: def,
    })



const demoDeck: Minion[] = Array.of(
    createMinion(madoka_T, "Madoka",10),
    createMinion(medicine_T, "Medicine",10),
    createMinion(knight_T, "Knight",10),
    createMinion(scarlet_T, "Scarlet",10),
    createMinion(ryuu_T, "Ryuu",10),
)


export const demoGame: Game = {
    cfg: defaultCfg,
    players: [
        {
            info:
                {
                    name: "Rosmia Ifiri",
                    team: 0
                },
            budget: defaultCfg.initBudget,
            interestRatePercentage: defaultCfg.interestPct,
            spawnCount: 0,
            deck: demoDeck,
        },
        {
            info:
                {
                    name: "Paladin",
                    team: 1
                },
            budget: defaultCfg.initBudget,
            interestRatePercentage: defaultCfg.interestPct,
            spawnCount: 0,
            deck: demoDeck,
        },
    ],
    map: createHexMap(defaultCfg.mapWidth,defaultCfg.mapHeight),
    minion: [],
    gameState: GameStateEnum.empty,
    turn: 0,
    team: 0,
}

export const mockState = () =>
{
    const game = demoGame;
    addMinion(game,{row:1,col:1},demoGame.players[0].deck[0]);
    addMinion(game,{row:2,col:1},demoGame.players[0].deck[0]);
    addMinion(game,{row:1,col:3},demoGame.players[0].deck[0]);
    addMinion(game,{row:8,col:5},demoGame.players[1].deck[1]);
    addMinion(game,{row:2,col:6},demoGame.players[1].deck[1]);
    addMinion(game,{row:8,col:7},demoGame.players[1].deck[1]);

    const map = game.map;
    const p1hex = game.cfg.startHexPosP1;
    const p2hex= game.cfg.startHexPosP2;

    p1hex.forEach((pos) => {
        const hex = map.map.get(hexKey(pos));
        if (hex) hex.team = 0;
    })


    p2hex.forEach((pos) => {
        const hex = map.map.get(hexKey(pos));
        if (hex) hex.team = 1;
    })

    console.log(p1hex,p2hex)


    return game;
}

const addMinion = (game:Game,pos:HexPos,minion:Minion) =>
{
    const hex = game.map.map.get(hexKey(pos));

    if (hex) hex.minion = minion;
}