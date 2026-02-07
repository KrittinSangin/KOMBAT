package Parser.AST;

import Games.ExecutionInstance;

public record AST_If(Expr cond_, Stment then_, Stment else_) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{

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
