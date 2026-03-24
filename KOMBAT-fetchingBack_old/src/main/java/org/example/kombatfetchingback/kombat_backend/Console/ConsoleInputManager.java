package org.example.kombatfetchingback.kombat_backend.Console;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntentEnum;
import org.example.kombatfetchingback.kombat_backend.MVC.InputManager;

public class ConsoleInputManager implements InputManager<String>
{
	private PlayerIntent intent;

	/**
	 * translate String input to player intent store inside. <br>
	 * effect : change internal intent object to current translated input intent
	 *
	 * @param input not null
	 * @return is valid input
	 */
	@Override
	public boolean readInput(String input)
	{
		PlayerIntent newIntent = null;
		if (input.isBlank())
		{
			newIntent = PlayerIntent.EMPTY();
		} else if (input.matches("resign|quit"))
		{
			newIntent = PlayerIntent.RESIGN();
		} else if (input.matches("continue|skip"))
		{
			newIntent = PlayerIntent.SKIP();
		} else if (input.matches("hex \\d+ \\d+"))
		{
			String[] split = input.split(" ");
			int row, col;
			row = Integer.parseInt(split[1]);
			col = Integer.parseInt(split[2]);

			newIntent = new PlayerIntent(PlayerIntentEnum.buyHex, new HexPos(row, col), null);
		} else if (input.matches("min \\d+ \\d+ \\d+"))
		{
			String[] split = input.split(" ");
			int row, col, idx;
			row = Integer.parseInt(split[1]);
			col = Integer.parseInt(split[2]);
			idx = Integer.parseInt(split[3]);

			newIntent = new PlayerIntent(PlayerIntentEnum.buyMinion, new HexPos(row, col), idx);
		}

		intent = newIntent;
		return isValidIntent();
	}

	/**
	 * is intent null?
	 *
	 * @return intent isn't null
	 */
	@Override
	public boolean isValidIntent()
	{
		return intent != null;
	}

	@Override
	public PlayerIntent getIntent()
	{
		return intent;
	}
}
