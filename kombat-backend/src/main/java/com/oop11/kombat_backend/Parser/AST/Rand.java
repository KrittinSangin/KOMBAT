package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;

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
