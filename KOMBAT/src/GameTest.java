import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import Games.*;

import java.util.ArrayList;
import java.util.List;

class GameTest
{
	private Game instantiateGameDefult()
	{
		Config.useDefaultConfig();

		PlayerInfo p1info = new PlayerInfo("A", 0);
		PlayerInfo p2info = new PlayerInfo("B", 1);

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

		return instance;
	}
	
	
	@Test
	void expectedGameStateNormal()
	{
		GameValueInjector injector = new GameValueInjector(instantiateGameDefult(),new ConsoleInputManager());
		injector.addValue("min 1 1 1");
		injector.addValue("min 8 8 0");
		injector.addValue("hex 1 4");
		injector.addValue("min 1 2 2");
		injector.addValue(" ");
		injector.addValue("hex 7 6");
		injector.addValue("min 7 6 3");
		injector.addValue(" ");
		injector.addValue("skip");
		injector.addValue("skip");
		injector.addValue(" ");
		injector.addValue("hex 7 5");
		injector.addValue("min 8 7 4");
		injector.addValue(" ");
		injector.addValue("resign");

		assertEquals(Game.State.START_STATE,injector.step().getStateString()); //Start
		assertEquals(Game.State.START_STATE,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_HEX,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_MINION,injector.step().getStateString());
		assertEquals(Game.State.EXECUTION_STATE,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_HEX,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_MINION,injector.step().getStateString());
		assertEquals(Game.State.EXECUTION_STATE,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_HEX,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_MINION,injector.step().getStateString());
		assertEquals(Game.State.EXECUTION_STATE,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_HEX,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_MINION,injector.step().getStateString());
		assertEquals(Game.State.EXECUTION_STATE,injector.step().getStateString());
		assertEquals(Game.State.BUY_STATE_HEX,injector.step().getStateString());
		assertEquals(Game.State.END_STATE,injector.step().getStateString());

	}

	@Test
	void expectedGameStateAbnormal()
	{
		//nah...
	}
}