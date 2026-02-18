package com.oop11.kombat_backend.Games;

import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;

import java.util.*;

public class StrategyExecutor
{
	private final Map<Minion,ExecutionInstance> instanceStore = new HashMap<>();
	private Queue<Minion> executionQueue;

	public void queueExecution(List<Minion> minions)
	{
		executionQueue = new LinkedList<>(minions);
	}

	public void executeOne()
	{
		if (executionQueue.isEmpty()) return;

		Minion minion = executionQueue.poll();

		//executing first time
		if (!instanceStore.containsKey(minion))
		{
			//create new instance
			instanceStore.put(minion, new ExecutionInstance(minion,new HashMap<>()));
		}

		try
		{
			minion.getStrategy().execute(instanceStore.get(minion));

		}
		catch (HaltExecutionException e)
		{
			System.err.println(e.getMessage());
			e.printStackTrace();
		}
	}

	public void executeAll()
	{
		while (!executionQueue.isEmpty())
		{
			executeOne();
		}
	}
}
