package org.example.kombatfetchingback.kombat_backend.Games.DTO;

import org.example.kombatfetchingback.kombat_backend.Games.Map.HexPos;
import lombok.Builder;

@Builder
@Deprecated
public record HexDTO(
	HexPos hexPos,
	boolean isOwn,
	int ownerTeam
)
{
}
