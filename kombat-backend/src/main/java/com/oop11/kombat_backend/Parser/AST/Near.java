package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.Strategies.ExecutionInstance;
import com.oop11.kombat_backend.Games.Map.HexDir;

public record Near(HexDir dir) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return instance.nearby(dir);
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("nearby ");
		sb.append(dir);
	}
}
