package com.oop11.kombat_backend.Games;

import lombok.Getter;

import java.util.List;

public record GameData
	(
		Player player1,
		Player player2,
		Player winner,
		List<Minion> minions,
		HexMap map,
		int turn,
		int round,
//		List<keyAction> executeAction,
		GameState state,
		GameState lastState,
		boolean isStateChange,
		boolean isValidIntent,
		boolean isGameStart,
		boolean isGameOver,
		boolean isGameResign,
		boolean isGameDraw
	)
{

}
