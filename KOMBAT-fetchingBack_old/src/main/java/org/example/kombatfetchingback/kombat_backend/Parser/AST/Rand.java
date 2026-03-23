package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;

public record Rand() implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return instance.random();
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("random");
	}
}
