package org.example.kombatfetchingback.kombat_backend.Games.DTO;

import org.example.kombatfetchingback.kombat_backend.Games.GameStateEnum;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import lombok.Builder;

import java.util.List;

@Builder
public record GameDTO(
	List<PlayerDTO> players,
	int team,
	int turn,
	GameStateEnum state,
	GameStateEnum lastState,
	int winner,
	PlayerIntent inputIntent,
	boolean isStateChanged,
	boolean isValidIntent,
	boolean isGameStart,
	boolean isGameOver,
	boolean isGameResign,
	boolean isGameDraw,
	List<ExecutionInstanceLogDTO> executionInstanceLog
)
{
}
