package com.oop11.kombat_backend.Parser.AST;

import com.oop11.kombat_backend.Games.Strategies.ExecutionInstance;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;

public record Assign(String name, Expr val) implements Stment
{

	@Override
	public void execute(ExecutionInstance instance)
	{
		if (instance.isSpecial(name)) return;
		else if (instance.isLocal(name)) instance.local().put(name, val.eval(instance));
		else if (instance.isGlobal(name)) instance.global().put(name, val.eval(instance));
		else throw new HaltExecutionException("invalid assignment");
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
