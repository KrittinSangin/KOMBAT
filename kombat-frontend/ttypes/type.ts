

type ConfigValues = {
  _Hp: number
  _minions: number
  _turnMax: number
  _startingBudget: number
  _maximumBudget: number
  _interest: number
  _hexCost: number
  _spawningCost: number
  _maximumSpawn: number
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

  setAll: (config: Partial<ConfigValues>) => void
}

interface MessageHolder
{
  isSuccess: boolean,
  Message: string
}

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
  "numbererestPct": number,
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
  "name": String,
  "team": number
}
interface MinionDTO
{
  "name": String
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
  "name": String,
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


