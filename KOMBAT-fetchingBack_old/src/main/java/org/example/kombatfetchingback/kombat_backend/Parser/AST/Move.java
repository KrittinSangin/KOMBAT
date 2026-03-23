package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexDir;
import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.HaltExecutionException;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.HaltReason;

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
