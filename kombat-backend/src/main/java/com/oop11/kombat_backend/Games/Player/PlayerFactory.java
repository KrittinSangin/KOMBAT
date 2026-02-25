package com.oop11.kombat_backend.Games.Player;

import com.oop11.kombat_backend.Games.Configs.Config;
import com.oop11.kombat_backend.Games.Map.HexMap;
import com.oop11.kombat_backend.Games.Merchant;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Minion.MinionStorage;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
public class PlayerFactory
{
	private final MinionStorage storage;
	private final Merchant merchant;
	private final HexMap map;

	public Player createPlayer(PlayerInfo info, List<Minion> deck, Config cfg)
	{

		return new Player(
			info,
			deck,
			new Budget(cfg.initBudget(), cfg.turnBudget(), cfg.maxBudget(), cfg.interestPct()),
			storage,
			merchant,
			map,
			(int) cfg.maxSpawns()
		);
	}
}
