package Parser.AST;

import Games.ExecutionInstance;
import Games.HexDir;

public record Move(HexDir dir) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{

	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("move ");
		sb.append(dir);
		sb.append("\n");
	}
}
