package org.example.kombatfetchingback.model;

import java.util.List;

public record PlayerReadyDTO(
        boolean IsReady,
        String playerName,
        int playerTeam,
        List<MinionBlueprint> minions,
        boolean isP1Bot,
        boolean isP2Bot
)
{
}