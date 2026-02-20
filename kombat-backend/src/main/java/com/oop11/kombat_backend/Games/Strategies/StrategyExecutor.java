package com.oop11.kombat_backend.Games.Strategies;

import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLog;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;
import com.oop11.kombat_backend.Parser.Exceptions.HaltReason;
import lombok.Getter;

import java.util.*;

public class StrategyExecutor
{
	private final Map<Minion,ExecutionInstance> instanceStore = new HashMap<>();
	private Queue<Minion> executionQueue;
	@Getter
	private List<ExecutionInstanceLog> instanceLogs;

	public void queueExecution(List<Minion> minions)
	{
		executionQueue = new LinkedList<>(minions);
	}

	public ExecutionInstanceLog executeOne()
	{
		if (executionQueue.isEmpty()) return null;

		Minion minion = executionQueue.poll();

		//executing first time
		if (!instanceStore.containsKey(minion))
		{
			//create new instance
			instanceStore.put(minion, new ExecutionInstance(minion,new HashMap<>()));
		}

		//execute the minion's strategy
		ExecutionInstance instance = instanceStore.get(minion);
		try
		{
			minion.getStrategy().execute(instance);
			instance.logger().setHaltReason(HaltReason.endOfStrategy);
		}
		catch (HaltExecutionException e)
		{
			instance.logger().setHaltReason(e.reason);
		}

		//return halt
		return instance.logger().getLogAndClean();
	}

	public void executeAll()
	{
		while (!executionQueue.isEmpty())
		{
			instanceLogs.add(executeOne());
		}
	}

	public void clearLog() {instanceLogs.clear();}
}
