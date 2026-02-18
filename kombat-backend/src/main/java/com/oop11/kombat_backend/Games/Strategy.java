package com.oop11.kombat_backend.Games;

import com.oop11.kombat_backend.Parser.AST.Stment;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;

import java.util.ArrayList;
import java.util.List;

public class Strategy
{
	public static final String[] RESERVE_WORDS = new String[]{"ally", "done", "down", "downleft", "downright", "else", "if", "move", "nearby", "opponent", "shoot", "then", "up", "upleft", "upright", "while"};
	public static final String[] DIR_WORDS = new String[]{"up", "upleft", "upright", "down", "downleft", "downright"};
	public static final String[] SPECIAL_VARS = new String[]{"row", "col", "Budget", "MaxBudget", "Int", "SpawnsLeft", "random"};

	public final String name;
	private final String rawStratString;

	public final List<Stment> stments;

	private final int hash;

	public Strategy()
	{
		this("", "", new ArrayList<>());
	}

	public Strategy(String rawStratString ,List<Stment> stments)
	{
		this("",rawStratString,stments);
	}

	public Strategy(String name, String rawStratString ,List<Stment> stments)
	{
		this.name = name;
		this.rawStratString = rawStratString;
		this.stments = stments;

		hash = rawStratString.hashCode();
	}

	public void execute(ExecutionInstance instance) throws HaltExecutionException
	{
		for (var stment : stments)
		{
			stment.execute(instance);
		}
	}

	@Override
	public int hashCode()
	{
		return hash;
	}

	@Override
	public boolean equals(Object o)
	{
		if (this == o) return true;
		if (!(o instanceof Strategy other)) return false;

		return rawStratString.equals(other.rawStratString);
	}

}
