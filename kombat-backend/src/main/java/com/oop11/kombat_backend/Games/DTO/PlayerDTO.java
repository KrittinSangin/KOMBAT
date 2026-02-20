package com.oop11.kombat_backend.Games.DTO;

import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Builder
public record PlayerDTO(
	String name,
	int team,
	int budget,
	int interestRatePercentage,
	int spawnCount,
	int minionCount)
{
}
