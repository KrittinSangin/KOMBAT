package com.oop11.kombat_backend.Games.Strategies;

import com.oop11.kombat_backend.Games.Configs.Config;
import com.oop11.kombat_backend.Games.DTO.ExecutionInstanceLogDTO;
import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLog;
import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLogger;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;
import com.oop11.kombat_backend.Parser.Exceptions.HaltReason;
import lombok.Getter;

import java.util.*;

public class StrategyExecutor
{
	private final Map<Minion,ExecutionInstance> instanceStore = new HashMap<>();
	private final Config cfg;
	private Queue<Minion> executionQueue;
	@Getter
	private final List<ExecutionInstanceLog> instanceLogs = new ArrayList<>();

	public StrategyExecutor(Config cfg)
	{
		this.cfg = cfg;
	}

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
			instanceStore.put(minion,
				new ExecutionInstance(
					cfg,
					minion,
					new HashMap<>()
				)
			);
		}

		//execute the minion's strategy
		ExecutionInstance instance = instanceStore.get(minion);
		try
		{
			minion.getStrategy().execute(instance);
			instance.logger().setHaltReason(HaltReason.endOfStrategy);
		}
		catch (ArithmeticException e)
		{
			instance.logger().setHaltReason(HaltReason.arithmeticError);
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


	public List<ExecutionInstanceLog> consumeLogAll()
	{
		var out = new ArrayList<>(instanceLogs);
		instanceLogs.clear();
		return out;
	}
}
