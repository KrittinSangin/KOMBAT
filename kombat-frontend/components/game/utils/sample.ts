import {Config, GameDTO} from "../../../ttypes/type";
import {
    ExecutionInstanceLogFunction,
    ExecutionInstanceLogFunctionTypeOf,
    GameStateEnum, HaltReason, HexDir,
    PlayerIntentEnum
} from "../../../ttypes/enums";

const mockGameDTO: GameDTO = {
    players: [
        {
            info: {
                name: "Alice",
                team: 1
            },
            budget: 15,
            interestRatePercentage: 5,
            spawnCount: 2,
            territories: [
                { row: 1, col: 1 },
                { row: 1, col: 2 },
                { row: 2, col: 1 }
            ],
            minions: [
                {
                    name: "Knight",
                    deckIndex: 0,
                    team: 1,
                    hp: 12,
                    def: 3
                },
                {
                    name: "Archer",
                    deckIndex: 1,
                    team: 1,
                    hp: 8,
                    def: 1
                }
            ]
        },
        {
            info: {
                name: "Bob",
                team: 2
            },
            budget: 12,
            interestRatePercentage: 5,
            spawnCount: 1,
            territories: [
                { row: 4, col: 4 },
                { row: 4, col: 3 }
            ],
            minions: [
                {
                    name: "Guardian",
                    deckIndex: 0,
                    team: 2,
                    hp: 14,
                    def: 4
                }
            ]
        }
    ],

    team: 1,
    turn: 3,

    state: GameStateEnum.execute,
    lastState: GameStateEnum.buyMinion,

    winner: 0,

    inputIntent: {
        intent: PlayerIntentEnum.buyMinion,
        hex: { row: 1, col: 1 },
        minion: 1
    },

    isStateChange: true,
    isValidIntent: true,
    isGameStart: false,
    isGameOver: false,
    isGameResign: false,
    isGameDraw: false,

    executionInstanceLog: [
        {
            minion: {
                name: "Knight",
                deckIndex: 0,
                team: 1,
                hp: 12,
                def: 3
            },
            entries: [
                {
                    typeof: ExecutionInstanceLogFunctionTypeOf.action,
                    function: ExecutionInstanceLogFunction.move,
                    dir: HexDir.upRight
                },
                {
                    typeof: ExecutionInstanceLogFunctionTypeOf.action,
                    function: ExecutionInstanceLogFunction.shoot,
                    dir: HexDir.upRight
                }
            ],
            reason: HaltReason.insufficientShootBudget
        },
        {
            minion: {
                name: "Guardian",
                deckIndex: 0,
                team: 2,
                hp: 14,
                def: 4
            },
            entries: [
                {
                    typeof: ExecutionInstanceLogFunctionTypeOf.action,
                    function: ExecutionInstanceLogFunction.move,
                    dir: HexDir.downLeft
                }
            ],
            reason: HaltReason.endOfStrategy
        }
    ]
};

const defaultConfig: Config = {
    spawnCost: 100,
    hexPurchaseCost: 100,
    initBudget: 1000,
    initHp: 100,
    turnBudget: 100,
    maxBudget: 10000,
    interestPct: 10,
    maxTurns: 10,
    maxSpawns: 20,

    mapWidth: 8,
    mapHeight: 8,

    startHexPosP1: [
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 },
        { row: 2, col: 1 },
        { row: 2, col: 2 }
    ],

    startHexPosP2: [
        { row: 7, col: 7 },
        { row: 7, col: 8 },
        { row: 8, col: 6 },
        { row: 8, col: 7 },
        { row: 8, col: 8 }
    ]
};

export {defaultConfig, mockGameDTO};