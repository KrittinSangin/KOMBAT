package Parser.AST;

import Games.ExecutionInstance;

import java.util.Map;

public record Sub(Expr l, Expr r) implements Expr
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
