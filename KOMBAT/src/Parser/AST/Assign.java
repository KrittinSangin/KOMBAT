package Parser.AST;

import Games.ExecutionInstance;

public record Assign(String name, Expr val) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{

	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("\n");
		sb.append(name);
		sb.append(" = ");
		val.prettyPrint(sb);
	}
}
