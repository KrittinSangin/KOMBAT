package com.oop11.kombat_backend.Games.Player;

import com.oop11.kombat_backend.Games.Configs.Config;
import com.oop11.kombat_backend.Games.DTO.PlayerDTO;
import com.oop11.kombat_backend.Games.Map.Hex;
import com.oop11.kombat_backend.Games.Map.HexMap;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Merchant;
import com.oop11.kombat_backend.Games.Minion.MinionStorage;
import lombok.Getter;

import java.util.*;

public class Player
{
	private final PlayerInfo info;

	@Getter
	private final Budget budget;
	@Getter
	private MinionStorage storage;
	private Merchant merchant;
	private HexMap map;

	@Getter
	private final List<Minion> deck;
	@Getter
	private final List<Minion> spawns;
	@Getter
	private final List<Hex> territories;

	@Getter
	private int spawnCount = 0;
	private final int maxSpawns;

	public Player(PlayerInfo info, Budget budget, List<Minion> deck, Config cfg)
	{
		this.info = info;
		this.budget = budget;
		this.deck = deck;

		spawns = new ArrayList<>();
		territories = new ArrayList<>();

		maxSpawns = (int)cfg.maxSpawns();
	}

	/**
	 * Initialize some of the player's field by Game
	 */
	public void initialize(MinionStorage mst, Merchant mch, HexMap map)
	{
		storage = mst;
		merchant = mch;
		this.map = map;
	}

	public PlayerInfo getPlayerInfo() {return info;}

	/**
	 * Get minion from the deck at index idx
	 *
	 * @param idx index < deck.Size()
	 */
	public Minion getDeckMinion(int idx)
	{
		return deck.get(idx);
	}

	/**
	 * Player action on turn start, that is the income increase.
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
