package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.Strategies.ExecutionInstance;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;

public record Pow(Expr base, Expr pow) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		int pow_v = pow.eval(instance);
		int base_v = base.eval(instance);
		try
		{
			return (int)Math.pow(base_v, pow_v);
		}
		catch (ArithmeticException e)
		{
			throw new HaltExecutionException(e.getMessage());
		}
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
