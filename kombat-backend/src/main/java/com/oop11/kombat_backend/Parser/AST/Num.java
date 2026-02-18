package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;

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
