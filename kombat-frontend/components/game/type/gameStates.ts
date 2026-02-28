import {Config, HexPos, PlayerInfo} from "../../../ttypes/type";
import {Vec2, Vec3} from "./Primitive";
import {GameStateEnum} from "../../../ttypes/enums";
import {Sprite, Transform2} from "./Rendering";


export type Game =
    {
        cfg: Config
        players: Player[];
        map:HexMap;
        minion: Minion[];
        gameState: GameStateEnum;
        turn: number;
        team: number;
    }

export type Hex =
    {
        hexPos: HexPos;
        minion: Minion|null;
        team: number|null;
    }

export type Player =
    {
        info: PlayerInfo;
        budget: number;
        interestRatePercentage: number;
        spawnCount: number;
        deck: Minion[];
    }

export type Minion =
    {
        sprite: Sprite;
        name: string;
        team: number;
        hp: number;
        def: number;
    }

export type HexMap =
    {
        map: Map<string, Hex>
        row: number
        colum: number
    }