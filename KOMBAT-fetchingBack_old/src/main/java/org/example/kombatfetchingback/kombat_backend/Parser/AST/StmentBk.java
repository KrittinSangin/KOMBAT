package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;

import java.util.List;

public record StmentBk(List<Stment> stments) implements Stment
{
	@Override
	public void execute(ExecutionInstance instance)
	{
		for (var stment : stments)
			stment.execute(instance);
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("{");
		for (var stment : stments)
			stment.prettyPrint(sb);
		sb.append("\n}");
	}
}
