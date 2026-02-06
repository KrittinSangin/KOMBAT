package Parser.AST;

import Games.ExecutionInstance;

import java.util.Map;

public record Var(String name) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return 0;
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{

	}
}
