package com.oop11.kombat_backend.Games.Player;

import com.oop11.kombat_backend.Games.Map.Hex;
import com.oop11.kombat_backend.Games.Map.HexMap;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Merchant;
import com.oop11.kombat_backend.Games.Minion.MinionStorage;
import lombok.Getter;

import java.util.*;

@Getter
public class Player
{
	private final PlayerInfo info;

	private final Budget budget;
	private final MinionStorage storage;
	private final Merchant merchant;
	private final HexMap map;

	private final List<Minion> deck;
	private final List<Minion> spawns;
	private final List<Hex> territories;

	private final int maxSpawns;
	private int spawnCount = 0;

	public Player(PlayerInfo info,
				  List<Minion> deck,
				  Budget budget,
				  MinionStorage storage,
				  Merchant merchant,
				  HexMap map,
				  int maxSpawns)
	{
		this.info = info;
		this.deck = deck;

		this.budget = budget;
		this.storage = storage;
		this.merchant = merchant;
		this.map = map;

		spawns = new ArrayList<>();
		territories = new ArrayList<>();

		this.maxSpawns = maxSpawns;
	}

	/**
	 * Get minion from the deck at index idx
	 *
	 * @param idx index < deck.Size()
	 */
	public Minion getDeckMinionAtIndex(int idx)
	{
		return deck.get(idx);
	}

	/**
	 * Player action on team start, that is the income increase.
	 *
	 * @param turn
	 */
	public void onTurnStart(int turn)
	{
		budget.income(turn);
	}

	/**
	 * Try to buy hex h
	 *
	 * @param h hex to buy
	 * @return true if successfully buy hex
	 */
	public boolean buyHex(Hex h)
	{
		return buyHex(h, false);
	}

	/**
	 * Try to buy hex h
	 *
	 * @param h      hex to buy
	 * @param bypass if true, bypass all guards
	 * @return true if successfully buy hex
	 */
	public boolean buyHex(Hex h, boolean bypass)
	{
		if (!bypass)
		{
			//owner guard
			if (h.haveOwner()) return false;

			//adjacency guard
			if (!h.isAdjacentToTerritory(this)) return false;
		}

		//pay guard
		Hex hex = bypass ? h : merchant.buyHex(this, h);
		if (hex == null) return false;

		territories.add(hex);
		hex.setOwner(this);
		return true;
	}

	/**
	 * spawn minion m on hex h.
	 *
	 * @param hex hex to spawn minion
	 * @param m   minion to spawn
	 * @return true if player able to buy a minion m on hex h
	 */
	public boolean spawnMinion(Hex hex, Minion m)
	{
		return spawnMinion(hex, m, false);
	}

	/**
	 * spawn minion m on hex h.
	 *
	 * @param hex    hex to spawn minion
	 * @param m      minion to spawn
	 * @param bypass if true, bypass all guards
	 * @return true if player able to buy a minion m on hex h
	 */
	public boolean spawnMinion(Hex hex, Minion m, boolean bypass)
	{
		if (bypass)
		{
			//spawn count guard
			if (spawnCount == maxSpawns) return false;

			//owner guard
			if (!hex.isOwner(this)) return false;

		}

		//budget guard
		Minion minion = bypass ? m : merchant.buyMinion(this, m);
		if (minion == null) return false;

		//clone from prototype (deck)
		Minion clone = minion.prototypeClone();

		//handle minion
		clone.setHex(hex);
		clone.setOwner(this);

		//handle instances
		storage.add(clone);
		spawns.add(clone);
		map.put(hex.Pos, clone);

		//attach listener
		clone.OnDead.subscribe(this::onMinionDead);

		//update count
		spawnCount++;

		return true;
	}


	private void onMinionDead(Minion m)
	{
		spawns.remove(m);
	}

	/**
	 * get spawn minion list's size
	 *
	 * @return
	 */
	public int getMinionCount() {return spawns.size();}

}
