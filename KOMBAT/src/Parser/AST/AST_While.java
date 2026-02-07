package Parser.AST;

import Games.ExecutionInstance;

public record AST_While(Expr cond, Stment body) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{

	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("while ");
		cond.prettyPrint(sb);
		sb.append("\n");
		body.prettyPrint(sb);

	}
}
