import Games.PlayerIntent;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ConsoleInputManagerTest
{

	@Test
	void testReadValidInput()
	{
		InputManager ipm = new ConsoleInputManager();

		String emptyInput = "";
		String resignInput1 = "resign";
		String resignInput2 = "quit";
		String hexInput = "hex 2 6";
		String minionInput = "min 2 6 1";

		assertTrue(ipm.readInput(emptyInput));
		assertTrue(ipm.readInput(resignInput1));
		assertTrue(ipm.readInput(resignInput2));
		assertTrue(ipm.readInput(hexInput));
		assertTrue(ipm.readInput(minionInput));
		assertFalse(ipm.readInput("oh%$%2_=- . 7q3_="));
	}

	@Test
	void testProduceIntent()
	{
		InputManager ipm = new ConsoleInputManager();

		String emptyInput = "";
		ipm.readInput(emptyInput);
		assertEquals(PlayerIntent.Intent.empty, ipm.getIntent().intent());

		String resignInput1 = "resign";
		ipm.readInput(resignInput1);
		assertEquals(PlayerIntent.Intent.resign, ipm.getIntent().intent());

		String resignInput2 = "quit";
		ipm.readInput(resignInput2);
		assertEquals(PlayerIntent.Intent.resign, ipm.getIntent().intent());

		String hexInput = "hex 2 6";
		ipm.readInput(hexInput);
		assertEquals(PlayerIntent.Intent.buyHex, ipm.getIntent().intent());

		String minionInput = "min 2 6 1";
		ipm.readInput(minionInput);
		assertEquals(PlayerIntent.Intent.buyMinion, ipm.getIntent().intent());



	}
}