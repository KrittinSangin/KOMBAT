package com.oop11.kombat_backend.Games.Player;

import com.oop11.kombat_backend.Games.Map.HexPos;

public record PlayerIntent(Intent intent, HexPos hex, Integer minion)
{
	//constant empty intent object
	public static PlayerIntent EMPTY() {return new PlayerIntent(Intent.empty, null, null);}

	//constant skip intent object
	public static PlayerIntent SKIP() {return new PlayerIntent(Intent.skip, null, null);}

	//constant resign intent object
	public static PlayerIntent RESIGN() {return new PlayerIntent(Intent.resign, null, null);}

	public enum Intent
	{
		empty, buyHex, buyMinion, skip, resign,
	}

}
