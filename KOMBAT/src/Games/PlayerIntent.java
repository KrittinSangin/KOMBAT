package Games;

public record PlayerIntent(Intent intent, Hex hex, Minion minion)
{
	public enum Intent
	{
		buyHex,
		buyMinion,
		resign,
	}
}
