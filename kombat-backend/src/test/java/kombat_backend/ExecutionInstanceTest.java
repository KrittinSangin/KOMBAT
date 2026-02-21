package kombat_backend;

import com.oop11.kombat_backend.Console.ConsoleCanvas;
import com.oop11.kombat_backend.Games.*;
import com.oop11.kombat_backend.Games.Map.HexDir;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Strategies.ExecutionInstance;
import com.oop11.kombat_backend.MVC.Canvas;


import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.HashMap;

class ExecutionInstanceTest
{

	@Test
	public void minionInSightEmpty()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);

		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(0, instance.opponent());
	}

	@Test
	public void minionInSightOpponentInSight1()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game,3,6, 1);

		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(22, instance.opponent());
	}

	@Test
	public void minionInSightOpponentInSight2()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game,8,4,1);
		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(44, instance.opponent());
	}

	@Test void minionInSightManyOpponentInSight1()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game,2,7,1);
		TestingUtility.forcePlaceMinion(game,5,2,1);
		TestingUtility.forcePlaceMinion(game,1,4,1);

		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(25, instance.opponent());
	}

	@Test void minionInSightManyOpponentInSight2()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game,3,3,1);
		TestingUtility.forcePlaceMinion(game,3,2,1);
		TestingUtility.forcePlaceMinion(game,2,4,1);
		TestingUtility.forcePlaceMinion(game,5,7,1);

		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(16, instance.opponent());
	}

	@Test void minionInSightManyOpponentInSightSurrounded()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game,3,4,1);
		TestingUtility.forcePlaceMinion(game,3,5,1);
		TestingUtility.forcePlaceMinion(game,4,5,1);
		TestingUtility.forcePlaceMinion(game,5,4,1);
		TestingUtility.forcePlaceMinion(game,4,3,1);
		TestingUtility.forcePlaceMinion(game,3,3,1);

		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(11, instance.opponent());
	}

	@Test void minionInSightManyAllyInSightSurrounded()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game,3,4,0);
		TestingUtility.forcePlaceMinion(game,3,5,0);
		TestingUtility.forcePlaceMinion(game,4,5,0);
		TestingUtility.forcePlaceMinion(game,5,4,0);
		TestingUtility.forcePlaceMinion(game,4,3,0);
		TestingUtility.forcePlaceMinion(game,3,3,0);

		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(0, instance.opponent());
	}

	@Test void minionInSightManyAllyInSightBlockOpponent()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game,3,4,0);
		TestingUtility.forcePlaceMinion(game,3,5,0);
		TestingUtility.forcePlaceMinion(game,4,5,0);
		TestingUtility.forcePlaceMinion(game,5,4,0);
		TestingUtility.forcePlaceMinion(game,4,3,0);
		TestingUtility.forcePlaceMinion(game,3,3,0);
		TestingUtility.forcePlaceMinion(game,3,6,1);

		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(22, instance.opponent());
	}

	@Test void minionInSightNoLineOfSight()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game,2,5,0);
		TestingUtility.forcePlaceMinion(game,4,6,0);
		TestingUtility.forcePlaceMinion(game,5,5,0);
		TestingUtility.forcePlaceMinion(game,5,3,0);
		TestingUtility.forcePlaceMinion(game,4,2,0);
		TestingUtility.forcePlaceMinion(game,2,3,0);

		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(0, instance.opponent());
	}


	@Test
	public void nearbyEmpty()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(0, instance.nearby(HexDir.up));
	}

	@Test
	public void nearbyOppoLOS()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game, 5,7,1);
		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(323, instance.nearby(HexDir.downRight));
	}

	@Test
	public void nearbyAllyLOS()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion m = TestingUtility.forcePlaceControllableMinion(game,4,4);
		TestingUtility.forcePlaceMinion(game, 5,7,0);
		Canvas canvas = new ConsoleCanvas(game);
		canvas.draw();

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),m,null);
		assertEquals(-323, instance.nearby(HexDir.downRight));
	}

	@Test
	void isGlobal()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion dummy = TestingUtility.forcePlaceControllableMinion(game);

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),dummy,new HashMap<>());

		assertTrue(instance.isGlobal("A"));
		assertFalse(instance.isGlobal("a"));
		assertTrue(instance.isGlobal("Aa"));
		assertFalse(instance.isGlobal("aA"));
	}

	@Test
	void isLocal()
	{
		Game game = TestingUtility.instantiateGameDefault();

		Minion dummy = TestingUtility.forcePlaceControllableMinion(game);

		ExecutionInstance instance = new ExecutionInstance(game.getCfg(),dummy,new HashMap<>());

		assertFalse(instance.isLocal("A"));
		assertTrue(instance.isLocal("a"));
		assertFalse(instance.isLocal("Aa"));
		assertTrue(instance.isLocal("aA"));
	}
}