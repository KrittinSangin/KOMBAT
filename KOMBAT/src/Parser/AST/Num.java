package Parser.AST;

import Games.ExecutionInstance;

import java.util.Map;

public record Num(int val) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return val;
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append(val);
	}
}
