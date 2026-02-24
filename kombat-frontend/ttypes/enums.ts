//enums
 enum PlayerIntentEnum
{
	empty, buyHex, buyMinion, skip, resign,
}

 enum GameStateEnum
{
	empty, start, buyHex, buyMinion, execute, end
}

 enum HaltReason
{
	insufficientMoveBudget,
	insufficientShootBudget,
	endOfStrategy,
	doneStatement,
	arithmeticError,
	variableError
}

 enum ExecutionInstanceLogFunction
{
	row,col,Int,Budget,MaxBudget,SpawnsLeft,random,
	opponent,ally,nearby,
	move,shoot,done
}

 enum ExecutionInstanceLogFunctionTypeOf
{
	variable,
	info,
	action
}

enum HexDir
{
	up,
	upRight,
	downRight,
	down,
	downLeft,
	upLeft
}

