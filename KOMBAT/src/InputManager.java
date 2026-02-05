import Games.Hex;
import Games.Minion;
import Games.PlayerIntent;

public interface InputManager
{
	boolean readInput(String input);
	boolean isValidIntent();
	PlayerIntent getIntent();
}