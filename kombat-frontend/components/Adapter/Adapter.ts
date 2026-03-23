import {Config, ConfigValues} from "../../ttypes/type";

export function PermsConfig2ConfigAdapter(pcfg: ConfigValues)
{
    const cfg:Config = {
        spawnCost       : pcfg._spawningCost,
        hexPurchaseCost : pcfg._hexCost,
        initBudget      : pcfg._startingBudget,
        initHp          : pcfg._Hp,
        turnBudget      : pcfg._turnBudget,
        maxBudget       : pcfg._maximumBudget,
        interestPct     : pcfg._interest,
        maxTurns        : pcfg._turnMax,
        maxSpawns       : pcfg._maximumSpawn,
        mapWidth        : 8,
        mapHeight       : 8,
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
    return cfg;
}