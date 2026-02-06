package Games;

import java.time.LocalTime;
import java.util.*;

public record ExecutionInstance(Minion minion, Map<String,Integer> localVar)
{
	private static final Random RAND = new Random(LocalTime.now().toNanoOfDay());
	private static final Map<Player,Map<String,Integer>> GLOBAL_VARS_STORE = new HashMap<>();

	public ExecutionInstance(Minion minion, Map<String,Integer> localVar)
	{
		this.minion = minion;
		this.localVar = localVar;

		if (!GLOBAL_VARS_STORE.containsKey(minion.getOwner()))
		{
			GLOBAL_VARS_STORE.put(minion.getOwner(),new HashMap<>());
		}
	}

	public int row()
	{
		return minion.getHex().Pos.row();
	}

	public int col()
	{

		return minion.getHex().Pos.col();
	}

	public int Budget()
	{

		return (int)minion.getOwner().getBudget().getBudget();
	}

	public int MaxBudget()
	{

		return (int)Config.MAX_BUDGET;
	}

	public int SpawnsLeft()
	{

		return (int)Config.MAX_SPAWNS - minion.getOwner().getSpawnCount();
	}

	public int random()
	{
		return RAND.nextInt(0,1000);
	}

	public int opponent()
	{
		HexMap map = minion.getHex().Map;
		HexPos stratPos = minion.getHex().Pos;
		HexPos it = new HexPos(stratPos.row(),stratPos.col());

		List<Integer> found = new ArrayList<>();

		for (int dir = 1; dir <= 6; dir++)
		{
			int dist = 1;
			while (map.get(it.nextInDir(HexDir.toHexDir(dir))) != null) //iterate to not null
			{
				it = map.get(it.nextInDir(HexDir.toHexDir(dir))).Pos; // assign iterator
				if (map.isOccupy(it)) //check ownership
				{
					//minion difference owner
					boolean isOpponent = !minion.getOwner().equals(map.get(it).getMinion().getOwner());

					//add to list
					if (isOpponent)
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

	public int ally()
	{
		HexMap map = minion.getHex().Map;
		HexPos stratPos = minion.getHex().Pos;
		HexPos it = new HexPos(stratPos.row(),stratPos.col());

		List<Integer> found = new ArrayList<>();

		for (int dir = 1; dir <= 6; dir++)
		{
			int dist = 1;
			while (map.get(it.nextInDir(HexDir.toHexDir(dir))) != null) //iterate to not null
			{
				it = map.get(it.nextInDir(HexDir.toHexDir(dir))).Pos; // assign iterator
				if (map.isOccupy(it)) //check ownership
				{
					//minion same owner
					boolean isAlly = minion.getOwner().equals(map.get(it).getMinion().getOwner());

					//add to list
					if (isAlly)
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

				return 100*x + 10*y + 1*z;
			}

			dist++;
		}
		return 0;
	}

	private int numberOfDigits(int n)
	{
		return n == 0 ? 1 : (int)Math.floor(Math.log10(Math.abs(n))) + 1;
	}
}
