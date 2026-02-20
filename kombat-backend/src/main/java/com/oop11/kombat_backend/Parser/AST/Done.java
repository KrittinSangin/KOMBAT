package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.ExecutionInstance;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;

public record Done() implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		instance.done();
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("done\n");
	}
}
