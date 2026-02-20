package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;
import com.oop11.kombat_backend.Games.HexDir;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;
import com.oop11.kombat_backend.Parser.Exceptions.HaltReason;

public record Shoot(HexDir dir, Expr cost) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		int cost_v = cost.eval(instance);

		if (!instance.shoot(dir,cost_v))
			throw new HaltExecutionException(HaltReason.insufficientShootBudget);

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
