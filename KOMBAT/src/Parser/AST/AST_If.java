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
		sb.append("if ");
		cond_.prettyPrint(sb);
		sb.append("\nthen\n");
		then_.prettyPrint(sb);
		sb.append("\nelse\n");
		else_.prettyPrint(sb);
	}
}
