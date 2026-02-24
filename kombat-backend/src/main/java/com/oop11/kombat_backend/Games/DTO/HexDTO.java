package com.oop11.kombat_backend.Games.DTO;

import com.oop11.kombat_backend.Games.Map.HexPos;
import lombok.Builder;

@Builder
public record HexDTO(
	HexPos hexPos,
	boolean isOwn,
	int ownerTeam
)
{
}
