//enums
export enum PlayerIntentEnum {
    empty, buyHex, buyMinion, skip, resign,
}

export enum GameStateEnum {
    empty, start, buyHex, buyMinion, execute, end
}

export enum HaltReason {
    insufficientMoveBudget,
    insufficientShootBudget,
    endOfStrategy,
    doneStatement,
    arithmeticError,
    variableError,
}

export enum ExecutionInstanceLogFunction {
    row, col, Int, Budget, MaxBudget, SpawnsLeft, random, //Variables
    opponent, ally, nearby, //Information
    move, shoot, done //Action
}

export enum ExecutionInstanceLogFunctionTypeOf {
    variable,
    info,
    action
}

export enum HexDir {
    up,
    upRight,
    downRight,
    down,
    downLeft,
    upLeft
}