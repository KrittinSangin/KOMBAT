package Games;

public record PlayerIntent(Intent intent, HexPos hex, Integer minion)
{
	public static PlayerIntent RESIGN = new PlayerIntent(Intent.resign,null,null);
	public enum Intent
	{
		empty,
		buyHex,
		buyMinion,
		resign,
	}
}
