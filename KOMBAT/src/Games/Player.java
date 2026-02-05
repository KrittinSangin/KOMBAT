package Games;

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

	public PlayerInfo getPlayerInfo() {return info;}

	public Minion getDeckMinion(int idx)
	{
		return deck.get(idx);
	}

	public void onTurnStart(int turn)
	{
		budget.income(turn);
	}

	public boolean buyHex(Hex h)
	{
		return buyHex(h, false);
	}

	public boolean buyHex(Hex h, boolean bypass)
	{
		//owner guard
		if (h.haveOwner()) return false;

		//pay guard
		Hex hex = bypass ? h : merchant.buyHex(this, h);
		if (hex == null) return false;

		territories.add(hex);
		hex.setOwner(this);
		return true;
	}

	public boolean spawnMinion(Hex hex, Minion m)
	{
		return spawnMinion(hex, m, false);
	}

	public boolean spawnMinion(Hex hex, Minion m, boolean bypass)
	{
		//spawn count guard
		if (spawnCount == Config.MAX_SPAWNS) return false;

		//owner guard
		if (!hex.isOwner(this)) return false;

		//budget guard
		Minion minion = bypass ? m : merchant.buyMinion(this, m);
		if (minion == null) return false;

		//clone from prototype (deck)
		Minion clone = minion.prototypeClone();

		//handle instances
		storage.add(clone);
		spawns.add(clone);
		map.put(hex.Pos, m);

		//handle minion
		m.setHex(hex);

		//m.addListener(onMinionDead);

		//update count
		spawnCount++;

		return true;
	}


	private void onMinionDead(Minion m)
	{
		spawns.remove(m);
	}

	public int getMinionCount() {return spawns.size();}
}
