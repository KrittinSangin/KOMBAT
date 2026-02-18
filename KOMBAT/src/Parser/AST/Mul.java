package Parser.AST;

import Games.ExecutionInstance;

import java.util.Map;

public record Mul(Expr l, Expr r) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return l.eval(instance) * r.eval(instance);
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("( ");
		l.prettyPrint(sb);
		sb.append(" * ");
		r.prettyPrint(sb);
		sb.append(" )");
	}
}
