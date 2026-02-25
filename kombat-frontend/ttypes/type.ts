interface HexPos
{
    "row": number
    "col": number
}
interface Config
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
interface PlayerIntent

{
  "intent": PlayerIntentEnum,
  "hex": HexPos,
  "minion": number
}
interface PlayerInfo
{
  "name": string,
  "team": number
}
interface MinionDTO
{
  "name": string
  "index": number
  "order": number
  "team": number
  "hp": number
  "def": number
}
interface HexDTO
{
  "hexPos": HexPos,
  "minion": MinionDTO,
  "haveTeam": boolean,
  "team": number
}
interface HexMapDTO
{
  "hexMap": [HexDTO]
}
interface ExecutionInstanceLogDTO
{
  "minion": MinionDTO,
  "entries": [ExecutionInstanceLogEntry],
  "reason": HaltReason
}
interface ExecutionInstanceLogEntry
{
  "typeof": ExecutionInstanceLogFunctionTypeOf,
  "function": ExecutionInstanceLogFunction,
  "dir": HexDir
}

interface PlayerDTO
{
  "name": string,
  "team": number,
  "budget": number,
  "interestRatePercentage": number,
  "spawnCount": number,
  "minionCount": number
}



interface GameDTO {
  "player0": PlayerDTO,
  "player1": PlayerDTO,
  "map": HexMapDTO,
  "turn": number,
  "round": number,
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


