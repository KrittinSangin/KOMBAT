package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.Strategies.ExecutionInstance;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;

public record Mod(Expr l, Expr r) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		try
		{
			return l.eval(instance) % r.eval(instance);
		} catch (ArithmeticException e)
		{
			throw new HaltExecutionException(e.getMessage());
		}
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("( ");
		l.prettyPrint(sb);
		sb.append(" % ");
		r.prettyPrint(sb);
		sb.append(" )");
	}
}
