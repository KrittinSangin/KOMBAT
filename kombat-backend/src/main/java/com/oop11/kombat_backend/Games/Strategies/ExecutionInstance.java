package com.oop11.kombat_backend.Games.Strategies;

import com.oop11.kombat_backend.Games.Configs.Config;
import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLogFunction;
import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLogFunctionTypeOf;
import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLogger;
import com.oop11.kombat_backend.Games.Map.Hex;
import com.oop11.kombat_backend.Games.Map.HexDir;
import com.oop11.kombat_backend.Games.Map.HexMap;
import com.oop11.kombat_backend.Games.Map.HexPos;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.Player;
import com.oop11.kombat_backend.Parser.Exceptions.HaltExecutionException;
import com.oop11.kombat_backend.Parser.Exceptions.HaltReason;

import java.time.LocalTime;
import java.util.*;

public record ExecutionInstance(Minion minion, Map<String,Integer> local, ExecutionInstanceLogger logger)
{
	private static final Random RAND = new Random(LocalTime.now().toNanoOfDay());
	private static final Map<Player,Map<String,Integer>> GLOBAL_VARS_STORE = new HashMap<>();

	public ExecutionInstance(Minion minion, Map<String,Integer> local, ExecutionInstanceLogger logger)
	{
		this.minion = minion;
		this.local = local;
		this.logger = logger;


		if (!GLOBAL_VARS_STORE.containsKey(minion.getOwner()))
		{
			GLOBAL_VARS_STORE.put(minion.getOwner(),new HashMap<>());
		}
	}

	public ExecutionInstance(Minion minion, Map<String,Integer> local)
	{
		this(minion,local,new ExecutionInstanceLogger(minion));
	}

	public Map<String,Integer> global()
	{
		return GLOBAL_VARS_STORE.get(minion.getOwner());
	}

	public int row()
	{
		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.variable,
			ExecutionInstanceLogFunction.row,
			null);
		return minion.getHex().Pos.row();
	}

	public int col()
	{
		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.variable,
			ExecutionInstanceLogFunction.col,
			null);
		return minion.getHex().Pos.col();
	}

	public int Int()
	{
		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.variable,
			ExecutionInstanceLogFunction.Int,
			null);
		return (int)minion.getOwner().getBudget().getInterestRatePercentage();
	}

	public int Budget()
	{

		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.variable,
			ExecutionInstanceLogFunction.Budget,
			null);
		return (int)minion.getOwner().getBudget().getBudget();
	}

	public int MaxBudget()
	{

		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.variable,
			ExecutionInstanceLogFunction.MaxBudget,
			null);
		return (int) Config.MAX_BUDGET;
	}

	public int SpawnsLeft()
	{

		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.variable,
			ExecutionInstanceLogFunction.SpawnsLeft,
			null);
		return (int)Config.MAX_SPAWNS - minion.getOwner().getSpawnCount();
	}

	public int random()
	{
		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.variable,
			ExecutionInstanceLogFunction.random,
			null);
		return RAND.nextInt(0,1000);
	}

	public int opponent()
	{
		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.info,
			ExecutionInstanceLogFunction.opponent,
			null);
		return closetMinionInSight(false);
	}

	public int ally()
	{
		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.info,
			ExecutionInstanceLogFunction.ally,
			null);
		return closetMinionInSight(true);
	}

	private int closetMinionInSight(boolean targetAlly)
	{
		HexMap map = minion.getHex().Map;
		HexPos stratPos = minion.getHex().Pos;
		HexPos it = new HexPos(stratPos.row(),stratPos.col());

		List<Integer> found = new ArrayList<>();

		for (int dir = 1; dir <= 6; dir++)
		{
			it = stratPos;
			int dist = 1;
			while (map.get(it.nextInDir(HexDir.toHexDir(dir))) != null) //iterate to not null
			{
				it = map.get(it.nextInDir(HexDir.toHexDir(dir))).Pos; // assign iterator
				if (map.isOccupy(it)) //check ownership
				{
					//minion same owner
					boolean same = isSameOwner(minion,map.get(it).getMinion());

					//add to list
					if (targetAlly == same)
					{
						found.add(dist * 10 + dir);
						break;
					}
				}
				dist++;
			}
		}

		//find min from list
		int min = found.stream().min(Integer::compareTo).isPresent() ? found.stream().min(Integer::compareTo).get() : 0;
		return min;
	}

	public int nearby(HexDir dir)
	{
		logger.appendLog(
			ExecutionInstanceLogFunctionTypeOf.info,
			ExecutionInstanceLogFunction.nearby,
			null);
		HexMap map = minion.getHex().Map;
		HexPos it = minion.getHex().Pos;

		int dist = 1;
		while (map.get(it.nextInDir(dir)) != null)
		{
			//reassign iterator
			it = it.nextInDir(dir);

			Hex check  = map.get(it);
			Minion found = check.getMinion();
			if (found != null)
			{
				int x,y,z;
				x = numberOfDigits(found.getHp());
				y = numberOfDigits(found.getDef());
				z = dist;

				int out = 100*x + 10*y + 1*z;
				out = isSameOwner(minion,found)? -out : out;
				return out;
			}

			dist++;
		}
		return 0;
	}

	public boolean pay(int price)
	{
		return minion.getOwner().getBudget().pay(price);
	}

	public boolean move(HexDir dir)
	{
		if (pay(1))
		{
			logger.appendLog(
				ExecutionInstanceLogFunctionTypeOf.action,
				ExecutionInstanceLogFunction.move,
				null);
			minion.move(dir);
			return true;
		}
		return false;
	}

	public boolean shoot(HexDir dir, int cost)
	{
		if (pay(cost + 1))
		{
			logger.appendLog(
				ExecutionInstanceLogFunctionTypeOf.action,
				ExecutionInstanceLogFunction.shoot,
				null);

			minion.shoot(dir,cost);
			return true;
		}
		return false;
	}

	public void done() throws HaltExecutionException
	{
		throw new HaltExecutionException(HaltReason.doneStatement);
	}

	private int numberOfDigits(int n)
	{
		return n == 0 ? 1 : (int)Math.floor(Math.log10(Math.abs(n))) + 1;
	}

	private boolean isSameOwner(Minion l, Minion r)
	{
		return l.getOwner().equals(r.getOwner());
	}

	public boolean isGlobal(String name)
	{
		return Character.isUpperCase(name.toCharArray()[0]);
	}

	public boolean isLocal(String name)
	{
		return Character.isLowerCase(name.toCharArray()[0]);
	}

	public boolean isSpecial(String name)
	{
		return Arrays.asList(Strategy.SPECIAL_VARS).contains(name);
	}
}
