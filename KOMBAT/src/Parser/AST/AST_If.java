package Parser.AST;

import Games.ExecutionInstance;

public record AST_If(Expr cond_, Stment then_, Stment else_) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		if (cond_.eval(instance) > 0)
		{
			then_.execute(instance);
		}
		else
		{
			else_.execute(instance);
		}
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("\nif ");
		cond_.prettyPrint(sb);
		sb.append("\nthen ");
		then_.prettyPrint(sb);
		sb.append("\nelse ");
		else_.prettyPrint(sb);
	}
}
