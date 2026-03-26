package org.kombat_backend.Games.DTO;

import com.jayway.jsonpath.internal.function.numeric.Min;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.DTOFactory;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.MinionDTO;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.PlayerDTO;
import org.example.kombatfetchingback.kombat_backend.Games.Game;
import org.example.kombatfetchingback.kombat_backend.Games.Map.Hex;
import org.example.kombatfetchingback.kombat_backend.Games.Map.HexMap;
import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import org.example.kombatfetchingback.kombat_backend.Games.Merchant;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.MinionStorage;
import org.example.kombatfetchingback.kombat_backend.Games.Player.Budget;
import org.example.kombatfetchingback.kombat_backend.Games.Player.Player;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;
import org.example.kombatfetchingback.kombat_backend.Games.Strategies.Strategy;
import org.example.kombatfetchingback.kombat_backend.Parser.LL1StrategyParser;
import org.example.kombatfetchingback.kombat_backend.Parser.StrategyTokenizer;
import kombat_backend.TestingUtility;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class DTOFactoryTest
{
	@Test
	void createMinionDTO()
	{
		Game game = TestingUtility.instantiateGameDefault();
		Player p0 = TestingUtility.extractPlayersOfTeam(game,0);
		Player p1 = TestingUtility.extractPlayersOfTeam(game,1);
		HexMap map = TestingUtility.extractHexMap(game);

		DTOFactory fac = new DTOFactory();

		p0.spawnMinion(map.get(new HexPos(1,1)),p0.getDeckMinionAtIndex(0));

		assertEquals(new MinionDTO(
			"0",
			new HexPos(1,1),
			0,
			0,
			100,
			10
		),fac.createMinionDTO(map.get(new HexPos(1,1)).getMinion()));

		String code = "shoot up 85";

		Minion atk = new Minion("siz",777,777,new LL1StrategyParser(new StrategyTokenizer(code)).parse());
		atk.setOwner(TestingUtility.extractPlayersOfTeam(game,1));
		TestingUtility.injectMinion(game,atk,2,1);
		TestingUtility.forceExecuteOne(game,atk);

		assertEquals(new MinionDTO(
			"0",
			new HexPos(1,1),
			0,
			0,
			25,
			10
		),fac.createMinionDTO(map.get(new HexPos(1,1)).getMinion()));

		p1.spawnMinion(map.get(new HexPos(8,8)),p0.getDeckMinionAtIndex(2));

		assertEquals(new MinionDTO(
			"2",
			new HexPos(8,8),
			0,
			1,
			100,
			10
		),fac.createMinionDTO(map.get(new HexPos(8,8)).getMinion()));
	}

	@Test
	void createPlayerDTO()
	{
		Game game = TestingUtility.instantiateGameDefault();
		Player p0 = TestingUtility.extractPlayersOfTeam(game,0);

		DTOFactory fac = new DTOFactory();

		assertEquals(
			new PlayerDTO(
				new PlayerInfo("A",0),
				1000,
				0,
				0,
				Set.of(
					new HexPos(1,1),
					new HexPos(1,2),
					new HexPos(1,3),
					new HexPos(2,1),
					new HexPos(2,2)
				),
				new ArrayList<>()
			)
			,fac.createPlayerDTO(p0));


		HexMap map = TestingUtility.extractHexMap(game);
		p0.spawnMinion(map.get(new HexPos(3,3)),p0.getDeckMinionAtIndex(0),true);
		p0.spawnMinion(map.get(new HexPos(1,1)),p0.getDeckMinionAtIndex(0),true);
		p0.spawnMinion(map.get(new HexPos(2,2)),p0.getDeckMinionAtIndex(0),true);

		assertEquals(3,fac.createPlayerDTO(p0).spawnCount());
		assertEquals(1000,fac.createPlayerDTO(p0).budget());
		assertEquals(3,fac.createPlayerDTO(p0).minions().size());

		p0.spawnMinion(map.get(new HexPos(1,2)),p0.getDeckMinionAtIndex(0));

		assertEquals(4,fac.createPlayerDTO(p0).spawnCount());
		assertEquals(900,fac.createPlayerDTO(p0).budget());
		assertEquals(4,fac.createPlayerDTO(p0).minions().size());

		p0.spawnMinion(map.get(new HexPos(1,2)),p0.getDeckMinionAtIndex(0));

		assertEquals(4,fac.createPlayerDTO(p0).spawnCount());
		assertEquals(900,fac.createPlayerDTO(p0).budget());
		assertEquals(4,fac.createPlayerDTO(p0).minions().size());
	}

}