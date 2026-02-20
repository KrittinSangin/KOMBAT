package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.Strategies.ExecutionInstance;
import com.oop11.kombat_backend.Games.Map.HexDir;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;
import com.oop11.kombat_backend.Parser.Exceptions.HaltReason;

public record Move(HexDir dir) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		if (!instance.move(dir))
			throw new HaltExecutionException(HaltReason.insufficientMoveBudget);
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("move ");
		sb.append(dir);
		sb.append("\n");
	}
}
