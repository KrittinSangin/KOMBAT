package Games;

public record PlayerIntent(Intent intent, HexPos hex, Integer minion)
{
	public static PlayerIntent EMPTY() {return new PlayerIntent(Intent.empty, null, null);}
	public static PlayerIntent SKIP() {return new PlayerIntent(Intent.skip, null, null);}
	public static PlayerIntent RESIGN() {return new PlayerIntent(Intent.resign, null, null);}

	public enum Intent
	{
		empty, buyHex, buyMinion, skip, resign,
	}

}
