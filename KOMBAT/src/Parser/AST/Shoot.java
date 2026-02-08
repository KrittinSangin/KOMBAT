package Parser.AST;

import Games.ExecutionInstance;
import Games.HexDir;
import Parser.Exceptions.HaltExecutionException;

public record Shoot(HexDir dir, Expr cost) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		int cost_v = cost.eval(instance);

		if (instance.minion().getOwner().getBudget().pay(cost_v + 1))
			instance.minion().shoot(dir, cost_v);
		else
			throw new HaltExecutionException("insufficient shoot budget");

	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("shoot ");
		sb.append(dir);
		sb.append(" ");
		cost.prettyPrint(sb);
	}
}
