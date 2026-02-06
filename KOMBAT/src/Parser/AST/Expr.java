package Parser.AST;

import Games.ExecutionInstance;

import java.util.Map;

public interface Expr extends Node
{
	int eval(ExecutionInstance instance);
}
