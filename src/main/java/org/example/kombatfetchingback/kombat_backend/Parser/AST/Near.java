package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexDir;
import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;

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
