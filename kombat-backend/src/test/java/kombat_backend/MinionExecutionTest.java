package kombat_backend;

import com.oop11.kombat_backend.Console.ConsoleCanvas;
import com.oop11.kombat_backend.Games.*;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.Budget;
import com.oop11.kombat_backend.Games.Player.Player;
import com.oop11.kombat_backend.Games.Player.PlayerInfo;
import com.oop11.kombat_backend.Games.Strategies.Strategy;
import com.oop11.kombat_backend.MVC.Canvas;
import com.oop11.kombat_backend.Parser.LL1StrategyParser;
import com.oop11.kombat_backend.Parser.StrategyTokenizer;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

public class MinionExecutionTest
{
	@Test
	void simpleWalk()
	{
		Game test = TestingUtility.instantiateGameDefault();
		Game expect = TestingUtility.instantiateGameDefault();

		String src = "m = 10 while (m) { move up m = m - 1 }";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Minion dummy = new Minion("X",100,10,parser.parse());
		dummy.setOwner(new Player(new PlayerInfo("X",0),new Budget(10), new ArrayList<>()));

		TestingUtility.injectMinion(test,dummy,8,1);
		TestingUtility.injectMinion(expect,dummy,1,1);

		Canvas test_cv = new ConsoleCanvas(test);
		Canvas expect_cv = new ConsoleCanvas(expect);

		IO.println("Initial");
		test_cv.draw();

		IO.println("Expect");
		expect_cv.draw();

		TestingUtility.forceExecuteAll(test);

		IO.println("Result");
		test_cv.draw();
		assertEquals(test.getMap(),expect.getMap());
	}

	@Test
	void failedWalk()
	{
		Game test = TestingUtility.instantiateGameDefault();
		Game expect = TestingUtility.instantiateGameDefault();

		String src = "m = 10 while (m) { move up m = m - 1 }";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Minion dummy = new Minion("X",100,10,parser.parse());
		dummy.setOwner(new Player(new PlayerInfo("X",0),new Budget(4), new ArrayList<>()));

		TestingUtility.injectMinion(test,dummy,8,1);
		TestingUtility.injectMinion(expect,dummy,4,1);

		Canvas test_cv = new ConsoleCanvas(test);
		Canvas expect_cv = new ConsoleCanvas(expect);

		IO.println("Initial");
		test_cv.draw();

		IO.println("Expect");
		expect_cv.draw();

		TestingUtility.forceExecuteAll(test);

		IO.println("Result");
		test_cv.draw();
		assertEquals(test.getMap(),expect.getMap());
	}

	@Test
	void simpleAttack()
	{
		Game test = TestingUtility.instantiateGameDefault();
		Game expect = TestingUtility.instantiateGameDefault();

		String src = "shoot upright 200";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Strategy strat = parser.parse();

		Minion attacker = new Minion("X",100,10,strat);
		attacker.setOwner(new Player(new PlayerInfo("X",0),new Budget(201), new ArrayList<>()));
		Minion receiver = new Minion("Y",2000,0,strat);
		receiver.setOwner(new Player(new PlayerInfo("Y",1),new Budget(), new ArrayList<>()));

		Minion receiverExpect = new Minion("Y",1800,0,strat);
		receiverExpect.setOwner(new Player(new PlayerInfo("Y",1),new Budget(), new ArrayList<>()));

		TestingUtility.injectMinion(test,attacker,4,4);
		TestingUtility.injectMinion(test,receiver,3,5);

		TestingUtility.injectMinion(expect,attacker,4,4);
		TestingUtility.injectMinion(expect,receiverExpect,3,5);

		Canvas test_cv = new ConsoleCanvas(test);
		Canvas expect_cv = new ConsoleCanvas(expect);

		IO.println("Initial");
		test_cv.draw();

		IO.println("Expect");
		expect_cv.draw();

		TestingUtility.forceExecuteOne(test,attacker);

		IO.println("Result");
		test_cv.draw();
		assertEquals(test.getMap(),expect.getMap());
	}

	@Test
	void simpleKill()
	{
		Game test = TestingUtility.instantiateGameDefault();
		Game expect = TestingUtility.instantiateGameDefault();

		String src = "shoot upright 200";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Strategy strat = parser.parse();

		Minion attacker = new Minion("X",100,10,strat);
		attacker.setOwner(new Player(new PlayerInfo("X",0),new Budget(201), new ArrayList<>()));
		Minion receiver = new Minion("Y",20,0,strat);
		receiver.setOwner(new Player(new PlayerInfo("Y",1),new Budget(), new ArrayList<>()));

		TestingUtility.injectMinion(test,attacker,4,4);
		TestingUtility.injectMinion(test,receiver,3,5);

		TestingUtility.injectMinion(expect,attacker,4,4);

		Canvas test_cv = new ConsoleCanvas(test);
		Canvas expect_cv = new ConsoleCanvas(expect);

		IO.println("Initial");
		test_cv.draw();

		IO.println("Expect");
		expect_cv.draw();

		TestingUtility.forceExecuteOne(test,attacker);

		IO.println("Result");
		test_cv.draw();
		assertEquals(test.getMap(),expect.getMap());
	}

	@Test
	@Disabled
	void prototype()
	{
		Game test = TestingUtility.instantiateGameDefault();
		Game expect = TestingUtility.instantiateGameDefault();

		String src = "CODE HERE";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Strategy strat = parser.parse();

		Minion minion1 = new Minion("X",100,10,strat);
		minion1.setOwner(new Player(new PlayerInfo("X",0),new Budget(201), new ArrayList<>()));
		Minion minion2 = new Minion("Y",20,0,strat);
		minion2.setOwner(new Player(new PlayerInfo("Y",1),new Budget(), new ArrayList<>()));

//		TestingUtility.injectMinion(test,attacker,4,4);

		Canvas test_cv = new ConsoleCanvas(test);
		Canvas expect_cv = new ConsoleCanvas(expect);

		IO.println("Initial");
		test_cv.draw();

		IO.println("Expect");
		expect_cv.draw();

		//force execute

		IO.println("Result");
		test_cv.draw();
		assertEquals(test.getMap(),expect.getMap());
	}

}
