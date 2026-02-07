package Parser.AST;

import Games.ExecutionInstance;

public record Done() implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{

	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("done\n");
	}
}
