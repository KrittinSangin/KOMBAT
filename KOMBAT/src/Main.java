import Console.ConsoleCanvas;
import Console.ConsoleInputManager;
import Games.*;
import MVC.Canvas;
import MVC.InputManager;
import Parser.LL1StrategyParser;
import Parser.StrategyTokenizer;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;

public class Main
{
	void main()
	{
		ReadFile();
//		runGame();
	}


	private void runGame()
	{
		populateConfig();

		PlayerInfo p1info = new PlayerInfo("Rosmia Eifri", 0);
		PlayerInfo p2info = new PlayerInfo("Hadena (Hue) Iroai", 1);

		List<Minion> universalDeck = new ArrayList<>();
		universalDeck.add(new Minion("0", (int) Config.INIT_HP, 10, new Strategy(null)));
		universalDeck.add(new Minion("1", (int) Config.INIT_HP, 10, new Strategy(null)));
		universalDeck.add(new Minion("2", (int) Config.INIT_HP, 10, new Strategy(null)));
		universalDeck.add(new Minion("3", (int) Config.INIT_HP, 10, new Strategy(null)));
		universalDeck.add(new Minion("4", (int) Config.INIT_HP, 10, new Strategy(null)));
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

		//inject value
		List<String> injection = new ArrayList<>();
		injection.add("min 1 1 1");
		injection.add("min 8 8 1");
		injection.add("hex 1 4");
		injection.add("min 1 2 1");
		injection.add(" ");
		injection.add("hex 6 8");
		injection.add("min 6 8 1");
		injection.add(" ");
		injection.add("min 6 8 1");
		injection.add("skip");
		injection.add("min 2 2 4");
		injection.add(" ");
		injection.add("skip");
		injection.add("skip");
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

		//play by hand
//		//input
//		while (!instance.isOver())
//		{
//			if (ipm.readInput(sc.nextLine()))
//			{
//				instance.update(ipm.getIntent());
////				 instance.update(PlayerIntent.RESIGN);
//			}
//			cv.draw();
//		}
	}

	private void populateConfig()
	{
		Config.useDefaultConfig();
	}


	private static void ReadFile()
	{
		String filename = "sample strategy no comment";
		String path = "data/%s.txt".formatted(filename);

		try (BufferedReader br = new BufferedReader(new FileReader(path)))
		{
			Strategy strat = new LL1StrategyParser(new StrategyTokenizer(br.readAllAsString())).parse();

			for (var stment : strat.stments())
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