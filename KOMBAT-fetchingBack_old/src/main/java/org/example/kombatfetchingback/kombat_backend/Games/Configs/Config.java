package org.example.kombatfetchingback.kombat_backend.Games.Configs;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import lombok.Builder;

import java.util.Arrays;
import java.util.Set;

@Builder
public record Config(
	double spawnCost,
	double hexPurchaseCost,
	double initBudget,
	double initHp,
	double turnBudget,
	double maxBudget,
	double interestPct,
	double maxTurns,
	double maxSpawns,

	//additional config
	int mapWidth,
	int mapHeight,
	Set<HexPos> startHexPosP1,
	Set<HexPos> startHexPosP2
)
{
	/**
	 * Set all Config field to preset default value
	 */
	public static Config defaultConfig()
	{
		return Config.builder()
			.spawnCost(100)
			.hexPurchaseCost(100)
			.initBudget(1000)
			.initHp(100)
			.turnBudget(100)
			.maxBudget(10000)
			.interestPct(10)
			.maxTurns(10)
			.maxSpawns(10)
			.mapWidth(8)
			.mapHeight(8)
			.startHexPosP1(
				Set.of
					(
						new HexPos(1, 1),
						new HexPos(1, 2),
						new HexPos(1, 3),
						new HexPos(2, 1),
						new HexPos(2, 2)
					))
			.startHexPosP2(
				Set.of
					(
						new HexPos(7, 7),
						new HexPos(7, 8),
						new HexPos(8, 6),
						new HexPos(8, 7),
						new HexPos(8, 8)
					))
			.build();
	}
}
