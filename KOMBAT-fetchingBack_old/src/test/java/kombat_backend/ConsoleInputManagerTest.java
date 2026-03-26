package kombat_backend;


import org.example.kombatfetchingback.kombat_backend.Console.ConsoleInputManager;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntentEnum;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class ConsoleInputManagerTest
{

	@Test
	void testReadValidInput()
	{
		ConsoleInputManager ipm = new ConsoleInputManager();

		String emptyInput = "";
		String resignInput1 = "resign";
		String resignInput2 = "quit";
		String hexInput = "hex 2 6";
		String minionInput = "min 2 6 1";

		Assertions.assertTrue(ipm.readInput(emptyInput));
		Assertions.assertTrue(ipm.readInput(resignInput1));
		Assertions.assertTrue(ipm.readInput(resignInput2));
		Assertions.assertTrue(ipm.readInput(hexInput));
		Assertions.assertTrue(ipm.readInput(minionInput));
		Assertions.assertFalse(ipm.readInput("oh%$%2_=- . 7q3_="));
	}

	@Test
	void testProduceIntent()
	{
		ConsoleInputManager ipm = new ConsoleInputManager();

		String emptyInput = "";
		ipm.readInput(emptyInput);
		Assertions.assertEquals(PlayerIntentEnum.empty, ipm.getIntent().intent());

		String resignInput1 = "resign";
		ipm.readInput(resignInput1);
		Assertions.assertEquals(PlayerIntentEnum.resign, ipm.getIntent().intent());

		String resignInput2 = "quit";
		ipm.readInput(resignInput2);
		Assertions.assertEquals(PlayerIntentEnum.resign, ipm.getIntent().intent());

		String hexInput = "hex 2 6";
		ipm.readInput(hexInput);
		Assertions.assertEquals(PlayerIntentEnum.buyHex, ipm.getIntent().intent());

		String minionInput = "min 2 6 1";
		ipm.readInput(minionInput);
		Assertions.assertEquals(PlayerIntentEnum.buyMinion, ipm.getIntent().intent());

	}
}