package Parser.AST;

import Games.ExecutionInstance;
import Parser.Exceptions.HaltExecutionException;

public record Done() implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		throw new HaltExecutionException("halted normally");
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("done\n");
	}
}
