package kombat_backend;


import lombok.Getter;

import org.example.kombatfetchingback.kombat_backend.Console.ConsoleCanvas;
import org.example.kombatfetchingback.kombat_backend.Games.Game;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Strategies.Strategy;
import org.example.kombatfetchingback.kombat_backend.MVC.Canvas;
import org.example.kombatfetchingback.kombat_backend.Parser.LL1StrategyParser;
import org.example.kombatfetchingback.kombat_backend.Parser.StrategyTokenizer;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.function.Consumer;

public class MinionExecutionTest
{
	private boolean isDraw = false;

	private class MinionExecutionTestInstance
	{
		private final Game testInstance;
		private final Game expectInstance;

		public MinionExecutionTestInstance(Game test, Game expect)
		{
			this.testInstance = test;
			this.expectInstance = expect;
		}

		public void runTest(Consumer<Game> test)
		{
			Canvas test_cv = new ConsoleCanvas(this.testInstance);
			Canvas expect_cv = new ConsoleCanvas(expectInstance);

			if (isDraw)
			{
				IO.println("Initial");
				test_cv.draw();

				IO.println("Expect");
				expect_cv.draw();
			}

			test.accept(testInstance);

			if (isDraw)
			{
				IO.println("Result");
				test_cv.draw();

				assertEquals(testInstance.getMap(), expectInstance.getMap());
			}
		}
	}

	private MinionExecutionTestInstance createDefaultMinionExecutionTestInstance()
	{
		return new MinionExecutionTestInstance(TestingUtility.instantiateGameDefault(),TestingUtility.instantiateGameDefault());
	}

	@Test
	void simpleWalk()
	{
		MinionExecutionTestInstance instance = 	createDefaultMinionExecutionTestInstance();
		Game test = instance.testInstance;
		Game expect = instance.expectInstance;

		String src = "m = 10 while (m) { move up m = m - 1 }";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Minion dummy = new Minion("X",100,10,parser.parse());
		dummy.setOwner(TestingUtility.extractPlayersOfTeam(test,0));

		TestingUtility.injectMinion(test,dummy,8,1);
		TestingUtility.injectMinion(expect,dummy,1,1);

		instance.runTest(TestingUtility::forceExecuteAll);
	}

	@Test
	void failedWalk()
	{
		MinionExecutionTestInstance instance = 	createDefaultMinionExecutionTestInstance();
		Game test = instance.testInstance;
		Game expect = instance.expectInstance;

		String src = "m = 10 while (m) { move up m = m - 1 }";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Minion dummy = new Minion("X",100,10,parser.parse());
		dummy.setOwner(TestingUtility.extractPlayersOfTeam(test,0));

		TestingUtility.injectMinion(test,dummy,8,1);
		TestingUtility.injectMinion(expect,dummy,4,1);

		instance.runTest(TestingUtility::forceExecuteAll);
	}

	@Test
	void simpleAttack()
	{
		MinionExecutionTestInstance instance = 	createDefaultMinionExecutionTestInstance();
		Game test = instance.testInstance;
		Game expect = instance.expectInstance;

		String src = "shoot upright 200";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Strategy strat = parser.parse();

		Minion attacker = new Minion("X",100,10,strat);
		attacker.setOwner(TestingUtility.extractPlayersOfTeam(test,0));
		Minion receiver = new Minion("Y",2000,0,strat);
		attacker.setOwner(TestingUtility.extractPlayersOfTeam(test,1));

		Minion receiverExpect = new Minion("Y",1800,0,strat);
		receiverExpect.setOwner(TestingUtility.extractPlayersOfTeam(test,1));

		TestingUtility.injectMinion(test,attacker,4,4);
		TestingUtility.injectMinion(test,receiver,3,5);

		TestingUtility.injectMinion(expect,attacker,4,4);
		TestingUtility.injectMinion(expect,receiverExpect,3,5);

		instance.runTest((game)->
		{
			TestingUtility.forceExecuteOne(game,attacker);
		});
	}

	@Test
	void simpleKill()
	{
		MinionExecutionTestInstance instance = createDefaultMinionExecutionTestInstance();
		Game test = instance.testInstance;
		Game expect = instance.expectInstance;

		String src = "shoot upright 200";

		LL1StrategyParser parser = new LL1StrategyParser(new StrategyTokenizer(src));

		Strategy strat = parser.parse();

		Minion attacker = new Minion("X",100,10,strat);
		attacker.setOwner(TestingUtility.extractPlayersOfTeam(test,0));
		Minion receiver = new Minion("Y",20,0,strat);
		receiver.setOwner(TestingUtility.extractPlayersOfTeam(test,1));

		TestingUtility.injectMinion(test,attacker,4,4);
		TestingUtility.injectMinion(test,receiver,3,5);

		TestingUtility.injectMinion(expect,attacker,4,4);

		instance.runTest((game)->{
			TestingUtility.forceExecuteOne(game,attacker);
		});
	}
}
