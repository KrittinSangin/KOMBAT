package org.example.kombatfetchingback.kombat_backend.Console;

import org.example.kombatfetchingback.kombat_backend.Games.*;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;
import org.example.kombatfetchingback.kombat_backend.Games.Strategies.Strategy;
import org.example.kombatfetchingback.kombat_backend.MVC.Canvas;
import org.example.kombatfetchingback.kombat_backend.MVC.InputManager;
import org.example.kombatfetchingback.kombat_backend.Parser.LL1StrategyParser;
import org.example.kombatfetchingback.kombat_backend.Parser.StrategyTokenizer;

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
		Config cfg = Config.defaultConfig();
//		Config cfg = Config.builder()
//		.spawnCost(100)
//		.hexPurchaseCost(100)
//		.initBudget(1000)
//		.initHp(100)
//		.turnBudget(100)
//		.maxBudget(10000)
//		.interestPct(10)
//		.maxTurns(1)
//		.maxSpawns(1)
//		.mapWidth(8)
//		.mapHeight(8)
//		.startHexPosP1(
//			Set.of
//				(
//					new HexPos(1, 1),
//					new HexPos(1, 2),
//					new HexPos(1, 3),
//					new HexPos(2, 1),
//					new HexPos(2, 2)
//				))
//		.startHexPosP2(
//			Set.of
//				(
//					new HexPos(7, 7),
//					new HexPos(7, 8),
//					new HexPos(8, 6),
//					new HexPos(8, 7),
//					new HexPos(8, 8)
//				))
//		.build();


		Map<String, Strategy> strategyStorage = parseStrategy(List.of("simpleC","turret"));

		PlayerInfo p1info = new PlayerInfo("Rosmerry (Rosmia) Efiri", 0);
		PlayerInfo p2info = new PlayerInfo("Hadena (Hue) Iroai", 1);

		List<Minion> universalDeck = new ArrayList<>();
		universalDeck.add(new Minion("0", (int) cfg.initHp(), 10, strategyStorage.get("simpleC")));
		universalDeck.add(new Minion("1", (int) cfg.initHp(), 150, strategyStorage.get("turret")));
		StartInfo info = new StartInfo(
			cfg,
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
//		List<String> injection = new ArrayList<>();
//		injection.add("min 1 1 1");
//		injection.add("min 8 8 1");
//		injection.add("skip");
//		injection.add("hex 2 1");
//		injection.add("min 2 1 1");
//		injection.add(" ");
//		injection.add("hex 6 8");
//		injection.add("min 6 8 0");
//		injection.add(" ");
//
//		cv.draw();
//		for (var ij : injection)
//		{
//			IO.println(ij);
//			ipm.readInput(ij);
//			instance.update(ipm.getIntent());
//			cv.draw();
//		}

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
		IO.println("The Winner is %s".formatted(instance.getWinner().getInfo().name()));
	}

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