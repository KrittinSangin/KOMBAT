package com.oop11.kombat_backend.Games.DTO;

import com.oop11.kombat_backend.Games.Configs.Config;
import com.oop11.kombat_backend.Games.Game;
import com.oop11.kombat_backend.Games.Map.Hex;
import com.oop11.kombat_backend.Games.Map.HexMap;
import com.oop11.kombat_backend.Games.Merchant;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Minion.MinionStorage;
import com.oop11.kombat_backend.Games.Player.Budget;
import com.oop11.kombat_backend.Games.Player.Player;
import com.oop11.kombat_backend.Games.Player.PlayerInfo;
import com.oop11.kombat_backend.Games.Strategies.Strategy;
import kombat_backend.TestingUtility;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DTOFactoryTest
{

	@Test
	void createGameDTO()
	{

	}

	@Test
	void createHexDTO()
	{

	}

	@Test
	void createHexMapDTO()
	{

	}

	@Test
	void createMinionDTO()
	{
		Minion minion1 = new Minion("Platiea",100,20,new Strategy());
		Minion minion2 = new Minion("SHA",1020,20,new Strategy());
		Minion minion3 = new Minion("A",100,2,new Strategy());
		Player owner = new Player(new PlayerInfo("syl",0),new Budget(Config.useDefaultConfig(),200), List.of(minion1,minion2,minion3),Config.useDefaultConfig());

		owner.initialize(
			new MinionStorage(),
			new Merchant(200,200),
			new HexMap(8,8)
		);

		owner.getStorage().add(minion1);
		owner.getStorage().add(new Minion("Syn",666,66,new Strategy()));
		owner.getStorage().add(new Minion("Syn",666,66,new Strategy()));
		owner.getStorage().add(minion2);
		owner.getStorage().add(new Minion("Syn",666,66,new Strategy()));
		owner.getStorage().add(new Minion("Syn",666,66,new Strategy()));
		owner.getStorage().add(new Minion("Syn",666,66,new Strategy()));
		owner.getStorage().add(new Minion("Syn",666,66,new Strategy()));
		owner.getStorage().add(new Minion("Syn",666,66,new Strategy()));
		owner.getStorage().add(new Minion("Syn",666,66,new Strategy()));
		owner.getStorage().add(minion3);

		minion1.setOwner(owner);
		minion2.setOwner(owner);
		minion3.setOwner(owner);

		MinionDTO expected1 = new MinionDTO
		(
			"Platiea",
			0,
			0,
			0,
			100,
			20
		);

		MinionDTO expected2 = new MinionDTO
		(
			"SHA",
			1,
			3,
			0,
			1020,
			20
		);

		MinionDTO expected3 = new MinionDTO
		(
			"A",
			2,
			10,
			0,
			100,
			2
		);

		assertEquals(expected1,DTOFactory.createMinionDTO(minion1));
		assertEquals(expected2,DTOFactory.createMinionDTO(minion2));
		assertEquals(expected3,DTOFactory.createMinionDTO(minion3));


	}

	@Test
	void createPlayerDTO()
	{

	}

	@Test
	void createExecutionInstanceLogDTO()
	{

	}
}