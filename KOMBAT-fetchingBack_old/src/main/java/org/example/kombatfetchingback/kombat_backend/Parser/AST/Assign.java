package org.example.kombatfetchingback.kombat_backend.Parser.AST;

import org.example.kombatfetchingback.kombat_backend.Games.Strategies.ExecutionInstance;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.HaltExecutionException;
import org.example.kombatfetchingback.kombat_backend.Parser.Exceptions.HaltReason;

public record Assign(String name, Expr val) implements Stment
{

	@Override
	public void execute(ExecutionInstance instance)
	{
		if (instance.isSpecial(name)) return;
		else if (instance.isLocal(name)) instance.local().put(name, val.eval(instance));
		else if (instance.isGlobal(name)) instance.global().put(name, val.eval(instance));
		else throw new HaltExecutionException(HaltReason.variableError);
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append("\n");
		sb.append(name);
		sb.append(" = ");
		val.prettyPrint(sb);
	}

}
