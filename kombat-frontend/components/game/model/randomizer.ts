import {GameDTO, HexPos, MinionDTO, PlayerDTO} from "../../../ttypes/type";
import {GameStateEnum, PlayerIntentEnum} from "../../../ttypes/enums";

const rand = (max: number) => Math.floor(Math.random() * max)

const genInt = (max: number) => () => rand(max)

const genBool = () => () => Math.random() < 0.5

const genEnum = <T>(e: any) => () => {
    const values = Object.values(e).filter(v => typeof v === "number")
    return values[rand(values.length)] as T
}

function genObject<T>(schema: { [K in keyof T]: () => T[K] }): () => T {
    return () => {
        const result: any = {}

        for (const key in schema) {
            result[key] = schema[key]()
        }

        return result as T
    }
}

const genHexPos = genObject<HexPos>({
    row: genInt(9),
    col: genInt(9)
})

const genMinion = genObject<MinionDTO>({
    name: () => ["Rutiea","Falcon","Sprite","Knight"][rand(4)],
    pos: genHexPos,
    deckIndex: genInt(5),
    team: genInt(2),
    hp: genInt(30),
    def: genInt(10)
})

function genArray<T>(gen: () => T, max = 5) {
    return () => Array.from({ length: rand(max) + 1 }, gen)
}

const genPlayer = genObject<PlayerDTO>({
    info: () => ({
        name: ["Alice","Bob","Cecilia"][rand(3)],
        team: rand(2)
    }),
    budget: genInt(10000),
    interestRatePercentage: genInt(20),
    spawnCount: genInt(5),
    territories: genArray(genHexPos, 6),
    minions: genArray(genMinion, 4)
})

export const genGameDTO = genObject<GameDTO>({
    players: () => [genPlayer(),genPlayer()],
    team: genInt(2),
    turn: genInt(10),

    state: genEnum<GameStateEnum>(GameStateEnum),
    lastState: genEnum<GameStateEnum>(GameStateEnum),

    winner: genInt(3),

    inputIntent: () => ({
        intent: genEnum<PlayerIntentEnum>(PlayerIntentEnum)(),
        hex: genHexPos(),
        minion: genInt(5)()
    }),

    isStateChange: genBool(),
    isValidIntent: genBool(),
    isGameStart: genBool(),
    isGameOver: genBool(),
    isGameResign: genBool(),
    isGameDraw: genBool(),

    executionInstanceLog: () => []
})