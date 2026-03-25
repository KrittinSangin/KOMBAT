package org.example.kombatfetchingback.repository;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Games.Strategies.Strategy;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class StrategyRepository
{
	private final Map<String, Strategy> strategyStore = new HashMap<>();

	public void put(String filename,Strategy strategy)
	{
		IO.println("Put file %s into storage".formatted(filename));
		strategyStore.put(filename,strategy);
	}

	public Strategy get(String filename)
	{
		return  strategyStore.get(filename);
	}

	public void clear()
	{
		strategyStore.clear();
	}
}
