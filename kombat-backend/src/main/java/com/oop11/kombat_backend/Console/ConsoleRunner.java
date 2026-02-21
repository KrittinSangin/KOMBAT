package com.oop11.kombat_backend.Console;

import com.oop11.kombat_backend.Games.*;
import com.oop11.kombat_backend.Games.Configs.Config;
import com.oop11.kombat_backend.Games.Map.HexPos;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.PlayerInfo;
import com.oop11.kombat_backend.Games.Strategies.Strategy;
import com.oop11.kombat_backend.MVC.Canvas;
import com.oop11.kombat_backend.MVC.InputManager;
import com.oop11.kombat_backend.Parser.LL1StrategyParser;
import com.oop11.kombat_backend.Parser.StrategyTokenizer;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class ConsoleRunner
{
	public void run()
	{
//		ReadFile();
		runGame();
	}


	private void runGame()
	{
		populateConfig();

		Map<String, Strategy> strategyStorage = parseStrategy(List.of("simpleC","turret"));

		PlayerInfo p1info = new PlayerInfo("Rosmerry (Rosmia) Efiri", 0);
		PlayerInfo p2info = new PlayerInfo("Hadena (Hue) Iroai", 1);

		List<Minion> universalDeck = new ArrayList<>();
		universalDeck.add(new Minion("0", (int) Config.INIT_HP, 10, strategyStorage.get("simpleC")));
		universalDeck.add(new Minion("1", (int) Config.INIT_HP, 150, strategyStorage.get("turret")));
		StartInfo info = new StartInfo(
			p1info,
			p2info,
			new ArrayList<>(universalDeck),
			new ArrayList<>(universalDeck)
		);

		Game instance = new Game(info);
		instance.start();

		Scanner sc = new Scanner(System.in);
		InputManager<String> ipm = new ConsoleInputManager();
		Canvas cv = new ConsoleCanvas(instance);

//		//inject value
		List<String> injection = new ArrayList<>();
		injection.add("min 1 1 1");
		injection.add("min 8 8 1");
		injection.add("skip");
		injection.add("hex 2 1");
		injection.add("min 2 1 1");
		injection.add(" ");
		injection.add("hex 6 8");
		injection.add("min 6 8 0");
		injection.add(" ");

		cv.draw();
		for (var ij : injection)
		{
			IO.println(ij);
			ipm.readInput(ij);
			instance.update(ipm.getIntent());
			cv.draw();
		}

//		Minion minion = instance.getMinions().get(4);
//		minion.move(HexDir.downRight); cv.draw();
//		minion.move(HexDir.downRight); cv.draw();
//		minion.move(HexDir.downRight); cv.draw();
//		minion.move(HexDir.downLeft); cv.draw();
//		minion.move(HexDir.down); cv.draw();
//		minion.move(HexDir.upLeft); cv.draw();

//		//play by hand
//		//input
		while (!instance.isOver())
		{
			if (ipm.readInput(sc.nextLine()))
			{
				instance.update(ipm.getIntent());
//				 instance.update(PlayerIntent.RESIGN);
			}
			cv.draw();
		}
	}

	private void populateConfig()
	{
		Config.SPAWN_COST = 100;
		Config.HEX_PURCHASE_COST = 200;
		Config.INIT_BUDGET = 1000;
		Config.INIT_HP = 100;
		Config.TURN_BUDGET = 100;
		Config.MAX_BUDGET = 10000;
		Config.INTEREST_PCT = 10;
		Config.MAX_TURNS = 10;
		Config.MAX_SPAWNS = 10;

		Config.MAP_WIDTH = 8;
		Config.MAP_HEIGHT = 8;

		Config.START_HEX_POS_P1 = new HexPos[]
			{
				new HexPos(1, 1),
				new HexPos(1, 2),
				new HexPos(1, 3),
				new HexPos(2, 1),
				new HexPos(2, 2),
			};

		Config.START_HEX_POS_P2 = new HexPos[]
			{
				new HexPos(7, 7),
				new HexPos(7, 8),
				new HexPos(8, 6),
				new HexPos(8, 7),
				new HexPos(8, 8),
			};	}

	private Map<String,Strategy> parseStrategy(List<String> filenames)
	{
		Map<String,Strategy> out = new HashMap<>();
		for (String name : filenames)
		{
			String path = "src/main/resources/strategy/%s.txt".formatted(name);

			try (BufferedReader br = new BufferedReader(new FileReader(path)))
			{
				Strategy strat = new LL1StrategyParser(new StrategyTokenizer(br.readAllAsString())).parse();
				out.put(name,strat);
				IO.println("Strategy %s parse successfully".formatted(name));

			} catch (IOException e)
			{
				System.err.format("%s%n", e);
			}
		}

		return out;
	}


	private static void ReadFile()
	{
		String filename = "sample strategy no comment";
		String path = "data/Strategy/%s.txt".formatted(filename);

		try (BufferedReader br = new BufferedReader(new FileReader(path)))
		{
			Strategy strat = new LL1StrategyParser(new StrategyTokenizer(br.readAllAsString())).parse();

			for (var stment : strat.stments)
			{
				StringBuilder sb = new StringBuilder();
				stment.prettyPrint(sb);
				IO.print(sb.toString());
			}
		} catch (IOException e)
		{
			System.err.format("%s%n", e);
		}
	}
}