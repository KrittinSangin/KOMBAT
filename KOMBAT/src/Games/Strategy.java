package Games;

import Parser.AST.Stment;
import Parser.Exceptions.HaltExecutionException;

import java.util.List;

public record Strategy(List<Stment> stments)
{
	public static final String[] RESERVE_WORDS = new String[]{"ally", "done", "down", "downleft", "downright", "else", "if", "move", "nearby", "opponent", "shoot", "then", "up", "upleft", "upright", "while"};
	public static final String[] DIR_WORDS = new String[]{"up", "upleft", "upright", "down", "downleft", "downright"};
	public static final String[] SPECIAL_VARS = new String[]{"row", "col", "Budget", "MaxBudget", "Int", "SpawnsLeft", "random"};

	public void execute(ExecutionInstance instance) throws HaltExecutionException
	{
		for (var stment : stments)
		{
			stment.execute(instance);
		}
	}
}
