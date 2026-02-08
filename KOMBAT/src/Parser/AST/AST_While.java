package Parser.AST;

import Games.ExecutionInstance;

public record AST_While(Expr cond, Stment body) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		for (int i = 0; i < 10000; i++)
		{
			if (cond.eval(instance) > 0)
			{
				body.execute(instance);
			}
			else
			{
				break;
			}
		}
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("\nwhile ");
		cond.prettyPrint(sb);
		sb.append("\n");
		body.prettyPrint(sb);

	}
}
