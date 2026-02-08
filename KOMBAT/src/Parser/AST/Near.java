package Parser.AST;

import Games.ExecutionInstance;
import Games.HexDir;

public record Near(HexDir dir) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return instance.nearby(dir);
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("nearby ");
		sb.append(dir);
	}
}
