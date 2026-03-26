package org.example.kombatfetchingback.model;

import lombok.Getter;
import lombok.Setter;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;

public record ConfigPageDTO(Config config, int playerTeam, String playerName)
{
}
