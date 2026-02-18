package kombat_backend;

import com.oop11.kombat_backend.Console.ConsoleInputManager;
import com.oop11.kombat_backend.Console.GameValueInjector;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import com.oop11.kombat_backend.Games.*;

class GameTest
{
	@Test
	void expectedGameStateNormal()
	{
		GameValueInjector injector = new GameValueInjector(TestingUtility.instantiateGameDefault(),new ConsoleInputManager());
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