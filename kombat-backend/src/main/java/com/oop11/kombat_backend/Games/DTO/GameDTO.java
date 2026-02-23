package com.oop11.kombat_backend.Games.DTO;

import com.oop11.kombat_backend.Games.GameStateEnum;
import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLog;
import com.oop11.kombat_backend.Games.Player.PlayerIntent;
import lombok.Builder;

import java.util.List;

@Builder
public record GameDTO(
	PlayerDTO player0,
	PlayerDTO player1,
	HexMapDTO map,
	int turn,
	int round,
	GameStateEnum state,
	GameStateEnum lastState,
	int winner,
	PlayerIntent inputIntent,
	boolean isStateChange,
	boolean isValidIntent,
	boolean isGameStart,
	boolean isGameOver,
	boolean isGameResign,
	boolean isGameDraw,
	List<ExecutionInstanceLogDTO> executionInstanceLog
)
{
}
