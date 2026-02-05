package Games;

public record PlayerIntent(Intent intent, HexPos hex, Integer minion)
{
	public enum Intent
	{
		buyHex,
		buyMinion,
		resign,
	}
}
