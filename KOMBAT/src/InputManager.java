import Games.Hex;
import Games.Minion;
import Games.PlayerIntent;

public interface InputManager<T>
{
	/**
	 * translate input of type T to player intent store inside. <br>
	 * effect : change internal intent object to current translated input intent
	 * @param input not null
	 * @return is valid input
	 */
	boolean readInput(T input);

	/**
	 * is intent null?
	 * @return intent isn't null
	 */
	boolean isValidIntent();

	PlayerIntent getIntent();
}