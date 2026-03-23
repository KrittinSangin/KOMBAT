package org.example.kombatfetchingback.kombat_backend.Games.Player;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import lombok.Builder;

@Builder
public record PlayerIntent(PlayerIntentEnum intent, HexPos hex, Integer minion)
{
	//constant empty intent object
	public static PlayerIntent EMPTY() {return new PlayerIntent(PlayerIntentEnum.empty, null, null);}

	//constant skip intent object
	public static PlayerIntent SKIP() {return new PlayerIntent(PlayerIntentEnum.skip, null, null);}

	//constant resign intent object
	public static PlayerIntent RESIGN() {return new PlayerIntent(PlayerIntentEnum.resign, null, null);}
}
