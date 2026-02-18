package Parser.AST;

import Games.ExecutionInstance;
import Parser.Exceptions.HaltExecutionException;

public record Var(String name) implements Expr
{
	@Override
	public int eval(ExecutionInstance instance)
	{
		switch (name)
		{
			case "row" ->
			{
				return instance.row();
			}
			case "col" ->
			{
				return instance.col();
			}
			case "Int" ->
			{
				return instance.Int();
			}
			case "Budget" ->
			{
				return instance.Budget();
			}
			case "MaxBudget" ->
			{
				return instance.MaxBudget();
			}
			case "SpawnsLeft" ->
			{
				return instance.SpawnsLeft();
			}
			case "random" ->
			{
				return instance.random();
			}
			default ->
			{

				if (instance.isLocal(name))
				{
					if (!instance.local().containsKey(name))
					{
						Stment temp = new Assign(name, new Num(0));
						temp.execute(instance);
					}
					return instance.local().get(name);
				}
				else if (instance.isGlobal(name))
				{
					if (!instance.global().containsKey(name))
					{
						Stment temp = new Assign(name, new Num(0));
						temp.execute(instance);
					}
					return instance.global().get(name);
				}
			}
		}

		throw new HaltExecutionException("Variable issue");
	}

	@Override
	public void prettyPrint(StringBuilder sb)
	{
		sb.append(name);
	}
}
