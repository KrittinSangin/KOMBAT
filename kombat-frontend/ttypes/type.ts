export interface HexPos
{
    "row": number
    "col": number
}

export interface Config
{
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

  "startHexPosP1": [HexPos],
  "startHexPosP2": [HexPos]
}

export interface PlayerIntent
{
  "intent": PlayerIntentEnum,
  "hex": HexPos,
  "minion": number
}

export interface PlayerInfo
{
  "name": string,
  "team": number
}
export interface MinionDTO
{
  "name": string
  "deckIndex": number
  "team": number
  "hp": number
  "def": number
}

export interface ExecutionInstanceLogDTO
{
  "minion": MinionDTO,
  "entries": [ExecutionInstanceLogEntry],
  "reason": HaltReason
}
export interface ExecutionInstanceLogEntry
{
  "typeof": ExecutionInstanceLogFunctionTypeOf,
  "function": ExecutionInstanceLogFunction,
  "dir": HexDir
}

export interface PlayerDTO
{
  "info" : PlayerInfo,
  "budget": number,
  "interestRatePercentage": number,
  "spawnCount": number,
  "territories": [HexPos],
  "minions" : [MinionDTO]
}



export interface GameDTO {
  "players" : [PlayerDTO]
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
  "executionInstanceLog": [ExecutionInstanceLogDTO]
}


