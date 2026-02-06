import Games.*;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main
{
	void main()
	{
		populateConfig();

		PlayerInfo p1info = new PlayerInfo("Rosmia Eifri", 0);
		PlayerInfo p2info = new PlayerInfo("Hadena (Hue) Iroai", 1);

		List<Minion> universalDeck = new ArrayList<>();
		universalDeck.add(new Minion("0", (int) Config.INIT_HP, 10, new Strategy()));
		universalDeck.add(new Minion("1", (int) Config.INIT_HP, 10, new Strategy()));
		universalDeck.add(new Minion("2", (int) Config.INIT_HP, 10, new Strategy()));
		universalDeck.add(new Minion("3", (int) Config.INIT_HP, 10, new Strategy()));
		universalDeck.add(new Minion("4", (int) Config.INIT_HP, 10, new Strategy()));
		StartInfo info = new StartInfo(
			p1info,
			p2info,
			new ArrayList<>(universalDeck),
			new ArrayList<>(universalDeck)
		);

		Game instance = new Game(info);
		instance.start();

		Scanner sc = new Scanner(System.in);
		InputManager ipm = new ConsoleInputManager();
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

		Minion minion = instance.getMinions().get(4);
		minion.move(HexDir.downRight); cv.draw();
		minion.move(HexDir.downRight); cv.draw();
		minion.move(HexDir.downRight); cv.draw();
		minion.move(HexDir.downLeft); cv.draw();
		minion.move(HexDir.down); cv.draw();
		minion.move(HexDir.upLeft); cv.draw();


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
		Config.SPAWN_COST = 100;
		Config.HEX_PURCHASE_COST = 100;
		Config.INIT_BUDGET = 1000;
		Config.INIT_HP = 100;
		Config.TURN_BUDGET = 100;
		Config.MAX_BUDGET = 10000;
		Config.INTEREST_PCT = 10;
		Config.MAX_TURNS = 10;
		Config.MAX_SPAWNS = 20;

		//additional config
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
			};
	}
}