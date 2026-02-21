package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.Strategies.ExecutionInstance;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;
import com.oop11.kombat_backend.Parser.Exceptions.HaltReason;

public record Div(Expr l, Expr r) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		return (int)Math.floor((double) l.eval(instance) / r.eval(instance));
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("( ");
		l.prettyPrint(sb);
		sb.append(" / ");
		r.prettyPrint(sb);
		sb.append(" ) ");
	}
}
