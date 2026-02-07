package Parser.AST;

import Games.ExecutionInstance;

public record Ally() implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return 0;
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("ally");
	}
}
