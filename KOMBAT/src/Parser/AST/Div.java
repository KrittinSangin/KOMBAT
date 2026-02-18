package Parser.AST;

import Games.ExecutionInstance;
import Parser.Exceptions.HaltExecutionException;

import java.util.Map;

public record Div(Expr l, Expr r) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		try
		{
			return (int)Math.floor((double) l.eval(instance) / r.eval(instance));
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
		sb.append(" / ");
		r.prettyPrint(sb);
		sb.append(" ) ");
	}
}
