package org.example.kombatfetchingback.kombat_backend.Games.DTO;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import lombok.Builder;

@Builder
public record MinionDTO(
	String name,
	HexPos pos,
	int deckIndex,
	int team,
	int hp,
	int def
)
{
}
