package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;

public record Num(int val) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return val;
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append(val);
	}
}
