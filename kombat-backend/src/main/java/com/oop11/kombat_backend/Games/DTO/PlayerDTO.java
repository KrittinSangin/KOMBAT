package com.oop11.kombat_backend.Games.DTO;

import com.oop11.kombat_backend.Games.Map.HexPos;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.PlayerInfo;
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
