import {
    ExecutionInstanceLogFunction,
    ExecutionInstanceLogFunctionTypeOf,
    GameStateEnum,
    HaltReason,
    HexDir,
    PlayerIntentEnum
} from "./enums";
import {MinionBlueprint} from "../app/gameInit/Store/MinionBlueprint";

export type ConfigValues = {
    _Hp: number
    _minions: number
    _turnMax: number
    _startingBudget: number
    _maximumBudget: number
    _interest: number
    _hexCost: number
    _spawningCost: number
    _maximumSpawn: number
    _turnBudget: number
}

export type joinedHandler = {
    hostID: string
    clientID: string
    setHostID: (value: string) => void
    setClientID: (value: string) => void
}
export type _joinedHandler = {
    hostID: string
    clientID: string
}

export type ConfigureState = ConfigValues & {
    setHp: (value: number) => void
    setMinions: (value: number) => void
    setTurnMax: (value: number) => void
    setStartingBudget: (value: number) => void
    setMaximumBudget: (value: number) => void
    setInterest: (value: number) => void
    setHexCost: (value: number) => void
    setSpawningCost: (value: number) => void
    setMaximumSpawn: (value: number) => void
    setTurnBudget: (value: number) => void

    setAll: (config: Partial<ConfigValues>) => void
}
export type ProfileConfigProps = {
    team: number;
    left: number;
    top: number;
    online1: boolean;
    online2: boolean;
    // true=online, false=offline
}

export type MessageHolder =
    {
        isSuccess: boolean,
        Message: string
    }

export interface HexPos {
    "row": number
    "col": number
}

export interface Config {
    "spawnCost": number,
    "hexPurchaseCost": number,
    "initBudget": number,
    "initHp": number,
    "turnBudget": number,
    "maxBudget": number,
    "interestPct": number,
    "maxTurns": number,
    "maxSpawns": number,

    "mapWidth": number,
    "mapHeight": number,

    "startHexPosP1": HexPos[],
    "startHexPosP2": HexPos[]
}

export interface PlayerIntent {
    intent: PlayerIntentEnum,
    hex?: HexPos,
    minion?: number
}

export interface PlayerInfo {
    "name": string,
    "team": number
}

export interface MinionDTO {
    "name": string,
    "pos": HexPos,
    "deckIndex": number,
    "team": number,
    "hp": number,
    "def": number,
}

export interface ExecutionInstanceLogDTO {
    "minion": MinionDTO,
    "entries": ExecutionInstanceLogEntry[],
    "reason": HaltReason
}

export interface ExecutionInstanceLogEntry {
    "typeof": ExecutionInstanceLogFunctionTypeOf,
    "function": ExecutionInstanceLogFunction,
    "dir": HexDir
}

export interface PlayerDTO {
    "info": PlayerInfo,
    "budget": number,
    "interestRatePercentage": number,
    "spawnCount": number,
    "territories": HexPos[],
    "minions": MinionDTO[]
}


export interface GameDTO {
    "players": PlayerDTO[]
    "team": number,
    "turn": number,
    "state": GameStateEnum,
    "lastState": GameStateEnum,
    "winner": number,
    "inputIntent": PlayerIntent,
    "isStateChange": boolean,
    "isValidIntent": boolean,
    "isGameStart": boolean,
    "isGameOver": boolean,
    "isGameResign": boolean,
    "isGameDraw": boolean,
    "executionInstanceLog": ExecutionInstanceLogDTO[]
}

export interface PlayerInfo {
    name: string,
    team: number
}

export interface StartInfoDTO {
    config: Config,
    info1:PlayerInfo,
    info2:PlayerInfo,
    deck:MinionBlueprint[],

}