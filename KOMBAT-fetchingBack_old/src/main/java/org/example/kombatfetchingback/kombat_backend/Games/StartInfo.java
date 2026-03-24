package org.example.kombatfetchingback.kombat_backend.Games;

import lombok.Builder;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;

import java.util.List;

@Builder
public record StartInfo(
	Config config,
	PlayerInfo info1,
	PlayerInfo info2,
	List<Minion> deck1,
	List<Minion> deck2)
{
}
