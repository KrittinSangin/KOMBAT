package Parser.AST;

import Games.ExecutionInstance;
import Games.HexDir;
import Parser.Exceptions.HaltExecutionException;

public record Move(HexDir dir) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		if (instance.pay(1))
			instance.minion().move(dir);
		else
			throw new HaltExecutionException("insufficient budget");
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("move ");
		sb.append(dir);
		sb.append("\n");
	}
}
