package Parser.AST;

import Games.ExecutionInstance;

import java.util.Map;

public record Pow(Expr base, Expr pow) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return 0;
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		base.prettyPrint(sb);
		sb.append(" ^ ( ");
		pow.prettyPrint(sb);
		sb.append(" )");
	}
}
