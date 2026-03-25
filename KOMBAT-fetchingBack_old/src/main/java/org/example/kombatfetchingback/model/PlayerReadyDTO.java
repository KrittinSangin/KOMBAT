package org.example.kombatfetchingback.model;

import java.util.List;

public record PlayerReadyDTO(
    Boolean IsReady,
	String playerName,
	int playerTeam,
	List<MinionBlueprint> minions
)
{
}
