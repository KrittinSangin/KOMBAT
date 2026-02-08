package Parser.AST;

import Games.ExecutionInstance;

import java.util.Map;

public record Oppo() implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return instance.opponent();
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("opponent");
	}
}
