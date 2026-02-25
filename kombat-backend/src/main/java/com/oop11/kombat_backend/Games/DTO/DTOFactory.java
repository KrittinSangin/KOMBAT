package com.oop11.kombat_backend.Games.DTO;

import com.oop11.kombat_backend.Games.Game;
import com.oop11.kombat_backend.Games.GameStateEnum;
import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLog;
import com.oop11.kombat_backend.Games.Map.HexPos;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.Player;
import com.oop11.kombat_backend.Games.Player.PlayerIntent;

import java.util.Set;

public class DTOFactory
{
	public GameDTO createGameDTO(
		Game game,
		PlayerIntent intent,
		GameStateEnum beforeComputeState,
		boolean validateResult
	)
	{
		return GameDTO.builder()
			.players(game.getPlayers().stream().map(this::createPlayerDTO).toList())
			.team(game.getTeam())
			.turn(game.getTurn())
			.state(game.getGameState().getState())
			.lastState(beforeComputeState)
			.winner(game.getWinner() == null? -1 : game.getWinner().getInfo().team())
			.inputIntent(intent)
			.isStateChanged(beforeComputeState != game.getGameState().getState())
			.isValidIntent(validateResult)
			.isGameStart(game.isGameStart())
			.isGameOver(game.isGameOver())
			.isGameResign(game.isGameResign())
			.isGameDraw(game.isGameDraw())
			.executionInstanceLog(game.getExecutor().consumeLogAll().stream().map(this::createExecutionInstanceLogDTO).toList())
			.build();
	}

	public MinionDTO createMinionDTO(Minion m)
	{
		return MinionDTO.builder()
			.name(m.getName())
			.team(m.getOwner().getInfo().team())
			.hp(m.getHp())
			.def(m.getDef())
			.build();
	}

	public PlayerDTO createPlayerDTO(Player p)
	{
		return PlayerDTO.builder()
			.info(p.getInfo())
			.budget(p.getBudget().getBudget())
			.interestRatePercentage(p.getBudget().getInterestRatePercentage())
			.spawnCount(p.getSpawnCount())
			.territories(Set.copyOf(p.getTerritories().stream().map((x)->x.Pos).toList()))
			.minions(p.getSpawns().stream().map(this::createMinionDTO).toList())
			.build();
	}

	public ExecutionInstanceLogDTO createExecutionInstanceLogDTO(ExecutionInstanceLog log)
	{
		return ExecutionInstanceLogDTO.builder()
			.minion(createMinionDTO(log.minion()))
			.entries(log.entries())
			.reason(log.reason())
			.build();
	}
}
