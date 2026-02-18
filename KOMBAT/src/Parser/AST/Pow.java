package Parser.AST;

import Games.ExecutionInstance;
import Parser.Exceptions.HaltExecutionException;

import java.util.Map;

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
