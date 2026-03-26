package org.example.kombatfetchingback.model;

import java.util.List;

public record PlayerReadyDTO(
        boolean IsReady,
        String playerName,
        int playerTeam,
        List<MinionBlueprint> minions,
		String gamemode
)
{
}