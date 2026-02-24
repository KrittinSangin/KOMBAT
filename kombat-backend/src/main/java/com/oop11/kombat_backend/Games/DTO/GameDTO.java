package com.oop11.kombat_backend.Games.DTO;

import com.oop11.kombat_backend.Games.GameStateEnum;
import com.oop11.kombat_backend.Games.Player.PlayerIntent;
import lombok.Builder;

import java.util.List;

@Builder
public record GameDTO(
	List<PlayerDTO> players,
	int turn,
	int round,
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
