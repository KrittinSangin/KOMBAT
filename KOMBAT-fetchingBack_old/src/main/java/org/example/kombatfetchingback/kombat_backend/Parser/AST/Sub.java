package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;

public record Sub(Expr l, Expr r) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return l.eval(instance) - r.eval(instance);
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("( ");
		l.prettyPrint(sb);
		sb.append(" - ");
		r.prettyPrint(sb);
		sb.append(" )");
	}
}
