package Games;

import java.time.LocalTime;
import java.util.*;

public record ExecutionInstance(Minion minion, Map<String,Integer> local)
{
	private static final Random RAND = new Random(LocalTime.now().toNanoOfDay());
	private static final Map<Player,Map<String,Integer>> GLOBAL_VARS_STORE = new HashMap<>();

	public ExecutionInstance(Minion minion, Map<String,Integer> local)
	{
		this.minion = minion;
		this.local = local;

		if (!GLOBAL_VARS_STORE.containsKey(minion.getOwner()))
		{
			GLOBAL_VARS_STORE.put(minion.getOwner(),new HashMap<>());
		}
	}

	public Map<String,Integer> global()
	{
		return GLOBAL_VARS_STORE.get(minion.getOwner());
	}

	public int row()
	{
		return minion.getHex().Pos.row();
	}

	public int col()
	{

		return minion.getHex().Pos.col();
	}

	public int Int()
	{
		return (int)minion.getOwner().getBudget().getInterestRatePercentage();
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
		return closetMinionInSight(false);
	}

	public int ally()
	{
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
		return Character.isUpperCase(name.toCharArray()[0]);
	}

	public boolean isSpecial(String name)
	{
		return Arrays.asList(Strategy.SPECIAL_VARS).contains(name);
	}
}
