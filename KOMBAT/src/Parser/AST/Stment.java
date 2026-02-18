package Parser.AST;

import Games.ExecutionInstance;

public interface Stment extends Node
{
	void execute(ExecutionInstance instance);
}
