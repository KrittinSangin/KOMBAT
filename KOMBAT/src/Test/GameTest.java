package Test;

import Console.ConsoleInputManager;
import Console.GameValueInjector;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import Games.*;

import java.util.ArrayList;
import java.util.List;

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
	void _1minionStrategyOutOfBound()
	{
        GameValueInjector injector = new GameValueInjector(TestingUtility.instantiateGameDefault(),new ConsoleInputManager());
        injector.addValue("min 1 1 5");
        injector.step();
		assertDoesNotThrow(injector::step);


	}
    @Disabled
    //Enable and fix this if you have time
    @Test
    void _2OverloadedHexInput()
    {
        GameValueInjector injector = new GameValueInjector(TestingUtility.instantiateGameDefault(),new ConsoleInputManager());
        injector.addValue("hex 777777777777777 7");
        injector.step();
        assertDoesNotThrow(injector::step);
    }


    // #3 in the bug doc has to be solved internally without JUnit



    @Test
    void _4hexOutOfBound()
    {
        GameValueInjector injector = new GameValueInjector(TestingUtility.instantiateGameDefault(),new ConsoleInputManager());
        injector.addValue("min 1 1 1");
        injector.addValue("min 8 8 1");
        injector.addValue("hex 9 1");
        injector.step();
        injector.step();
        injector.step();

        assertDoesNotThrow(injector::step);
    }


}
