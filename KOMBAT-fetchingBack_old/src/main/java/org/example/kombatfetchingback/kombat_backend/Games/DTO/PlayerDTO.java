package org.example.kombatfetchingback.kombat_backend.Games.DTO;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

import java.util.List;
import java.util.Set;

@Builder
public record PlayerDTO(
	PlayerInfo info,
	double budget,
	double interestRatePercentage,
	int spawnCount,
	Set<HexPos> territories,
	List<MinionDTO> minions
)
{
}
