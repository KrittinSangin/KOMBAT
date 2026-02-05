package Game;

import java.util.*;

public class Player
{
	private final PlayerInfo info;
	private final Budget budget;
	private MinionStorage storage;
	private Merchant merchant;
	private HexMap map;

	private final List<Minion> deck;
	private final List<Minion> spawns;
	private final List<Hex> territories;

	private int spawnCount = 0;

	Player(PlayerInfo info, Budget budget, List<Minion> deck)
	{
		this.info = info;
		this.budget = budget;
		this.deck = deck;

		spawns = new ArrayList<>();
		territories = new ArrayList<>();
	}

	public void initialize(MinionStorage mst, Merchant mch, HexMap map)
	{
		storage = mst;
		merchant = mch;
		this.map = map;
	}

	public Budget getBudget()
	{
		return budget;
	}

	public int getSpawnCount()
	{
		return spawnCount;
	}

	public List<Minion> getDeck()
	{
		return deck;
	}

	public Minion getDeckMinion(int idx)
	{
		return deck.get(idx);
	}

	public void onTurnStart(int turn)
	{
		budget.income(turn);
	}

	public void buyHex(Hex h)
	{
		Hex hex = merchant.buyHex(this, h);
		if (hex == null) return;

		territories.add(hex);
		hex.setOwner(this);
	}

	public boolean spawnMinion(Hex hex, Minion m)
	{
		//owner guard
		if (!hex.isOwner(this)) return false;

		//budget guard
		Minion minion = merchant.buyMinion(this, m);
		if (minion == null) return false;

		return spawnMinionFree(hex, m);
	}

	public boolean spawnMinionFree(Hex hex, Minion m)
	{
		//spawn count guard
		if (spawnCount == Config.MAX_SPAWNS) return false;

		//owner guard
		if (!hex.isOwner(this)) return false;

		Minion clone = m.prototypeClone();

		storage.add(clone);
		spawns.add(clone);
		map.put(hex.Pos, m);

		m.setHex(hex);

		//m.addListener(onMinionDead);

		spawnCount++;
		return true;
	}

	private void onMinionDead(Minion m)
	{
		spawns.remove(m);
	}
}
