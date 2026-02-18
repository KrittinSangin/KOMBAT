package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;
import com.oop11.kombat_backend.Games.HexDir;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;

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
