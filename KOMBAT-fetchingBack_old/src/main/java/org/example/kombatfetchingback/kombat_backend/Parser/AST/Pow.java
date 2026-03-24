package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;

public record Pow(Expr base, Expr pow) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		int pow_v = pow.eval(instance);
		int base_v = base.eval(instance);
		return (int)Math.pow(base_v, pow_v);
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("( ");
		base.prettyPrint(sb);
		sb.append(" ^ ");
		pow.prettyPrint(sb);
		sb.append(" )");
	}
}
