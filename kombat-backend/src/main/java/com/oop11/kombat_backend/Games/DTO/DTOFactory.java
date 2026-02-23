package com.oop11.kombat_backend.Games.DTO;

import com.oop11.kombat_backend.Games.Game;
import com.oop11.kombat_backend.Games.GameStateEnum;
import com.oop11.kombat_backend.Games.Logs.ExecutionInstanceLog;
import com.oop11.kombat_backend.Games.Map.Hex;
import com.oop11.kombat_backend.Games.Map.HexMap;
import com.oop11.kombat_backend.Games.Minion.Minion;
import com.oop11.kombat_backend.Games.Player.Player;
import com.oop11.kombat_backend.Games.Player.PlayerIntent;

import java.util.List;
import java.util.Map;

public class DTOFactory
{
	public static GameDTO createGameDTO(
		Game game,
		PlayerIntent intent,
		GameStateEnum beforeComputeState,
		boolean validateResult
	)
	{
		return GameDTO.builder()
			.player0(createPlayerDTO(game.getPlayers().get(0)))
			.player1(createPlayerDTO(game.getPlayers().get(1)))
			.map(createHexMapDTO(game.getMap()))
			.turn(game.getTurn())
			.round(game.getRound())
			.state(game.getGameState().getState())
			.lastState(beforeComputeState)
			.winner(game.getWinner() == null? -1 : game.getWinner().getPlayerInfo().team())
			.inputIntent(intent)
			.isStateChange(beforeComputeState != game.getGameState().getState())
			.isValidIntent(validateResult)
			.isGameStart(game.isGameStart())
			.isGameOver(game.isGameOver())
			.isGameResign(game.isGameResign())
			.isGameDraw(game.isGameDraw())
			.executionInstanceLog(game.getExecutor().consumeLogAll().stream().map(DTOFactory::createExecutionInstanceLogDTO).toList())
			.build();
	}

	public static HexDTO createHexDTO(Hex hex)
	{
		return HexDTO.builder()
			.hexPos(hex.Pos)
			.minion(hex.getMinion() == null? null : createMinionDTO(hex.getMinion()))
			.haveTeam(hex.haveOwner())
			.team(hex.haveOwner()? hex.getOwner().getPlayerInfo().team() : -1)
			.build();
	}

	public static HexMapDTO createHexMapDTO(HexMap map)
	{
		return HexMapDTO.builder()
			.hexMap(map.getMap().values().stream().map(DTOFactory::createHexDTO).toList())
			.build();
	}

	public static MinionDTO createMinionDTO(Minion m)
	{
		return MinionDTO.builder()
			.name(m.getName())
			.index(m.getOwner().getDeck().indexOf(m))
			.order(m.getOrder())
			.team(m.getOwner().getPlayerInfo().team())
			.hp(m.getHp())
			.def(m.getDef())
			.build();
	}

	public static PlayerDTO createPlayerDTO(Player p)
	{
		return PlayerDTO.builder()
			.name(p.getPlayerInfo().name())
			.team(p.getPlayerInfo().team())
			.budget(p.getBudget().getBudget())
			.interestRatePercentage(p.getBudget().getInterestRatePercentage())
			.spawnCount(p.getSpawnCount())
			.minionCount(p.getMinionCount())
			.build();
	}

	public static ExecutionInstanceLogDTO createExecutionInstanceLogDTO(ExecutionInstanceLog log)
	{
		return ExecutionInstanceLogDTO.builder()
			.minion(createMinionDTO(log.minion()))
			.entries(log.entries())
			.reason(log.reason())
			.build();
	}
}
