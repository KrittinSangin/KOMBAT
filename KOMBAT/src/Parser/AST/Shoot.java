package Parser.AST;

import Games.ExecutionInstance;
import Games.HexDir;

public record Shoot(HexDir dir, Expr cost) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{

	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("shoot ");
		sb.append(dir);
		sb.append(" ");
		cost.prettyPrint(sb);
	}
}
