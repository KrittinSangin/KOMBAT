package com.oop11.kombat_backend.Games.DTO;

import lombok.Builder;

@Builder
public record MinionDTO(
	String name,
	int index,
	int order,
	boolean haveTeam,
	int team,
	int hp,
	int def
)
{
}
