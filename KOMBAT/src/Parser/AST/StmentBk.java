package Parser.AST;

import Games.ExecutionInstance;

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
		sb.append("{\n");
		for (var stment : stments)
			stment.prettyPrint(sb);
		sb.append("}\n");
	}
}
