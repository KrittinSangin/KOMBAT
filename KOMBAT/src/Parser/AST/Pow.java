package Parser.AST;

import Games.ExecutionInstance;

import java.util.Map;

public record Pow(Expr base, Expr pow) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		int pow_v = pow.eval(instance);
		int base_v = base.eval(instance);
		return Math.powExact(base_v, pow_v);
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
