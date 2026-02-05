import Games.HexPos;
import Games.PlayerIntent;

public class ConsoleInputManager implements InputManager
{
	private PlayerIntent intent;

	@Override
	public boolean readInput(String input)
	{
		PlayerIntent newIntent = null;
		if (input.isBlank())
		{
			newIntent = PlayerIntent.EMPTY();
		}
		else if (input.matches("resign|quit"))
		{
			newIntent = PlayerIntent.RESIGN();
		}
		else if (input.matches("continue|skip"))
		{
			newIntent = PlayerIntent.SKIP();
		}
		else if (input.matches("hex \\d+ \\d+"))
		{
			String[] split = input.split(" ");
			int row, col;
			row = Integer.parseInt(split[1]);
			col = Integer.parseInt(split[2]);

			newIntent = new PlayerIntent(PlayerIntent.Intent.buyHex,new HexPos(row,col),null);
		}
		else if (input.matches("min \\d+ \\d+ [12345]"))
		{
			String[] split = input.split(" ");
			int row, col, idx;
			row = Integer.parseInt(split[1]);
			col = Integer.parseInt(split[2]);
			idx = Integer.parseInt(split[3]);

			newIntent = new PlayerIntent(PlayerIntent.Intent.buyMinion,new HexPos(row,col),idx);
		}

		intent = newIntent;
		return isValidIntent();
	}

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
