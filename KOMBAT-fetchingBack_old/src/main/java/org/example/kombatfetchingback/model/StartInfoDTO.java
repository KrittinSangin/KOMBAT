package org.example.kombatfetchingback.model;

import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;

import java.util.List;

public record StartInfoDTO(
	Config config,
	PlayerInfo info1,
	PlayerInfo info2,
	List<MinionBlueprint> deck
)
{

}
