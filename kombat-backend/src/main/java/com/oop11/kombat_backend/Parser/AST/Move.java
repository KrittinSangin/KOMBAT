package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;
import com.oop11.kombat_backend.Games.HexDir;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;

public record Move(HexDir dir) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		if (instance.pay(1))
			instance.minion().move(dir);
		else
			throw new HaltExecutionException("insufficient budget");
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("move ");
		sb.append(dir);
		sb.append("\n");
	}
}
