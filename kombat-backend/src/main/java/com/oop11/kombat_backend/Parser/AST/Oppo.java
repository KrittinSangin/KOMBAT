package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;

public record Oppo() implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return instance.opponent();
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("opponent");
	}
}
