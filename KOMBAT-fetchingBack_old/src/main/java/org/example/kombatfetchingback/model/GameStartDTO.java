package org.example.kombatfetchingback.model;

import org.example.kombatfetchingback.kombat_backend.Games.DTO.GameDTO;

import java.util.List;

public record GameStartDTO(
	List<MinionBlueprint> p1Blueprint,
	List<MinionBlueprint> p2Blueprint,
	List<MinionBlueprint> universalDeck,
	GameDTO initGameDTO
)
{
}
