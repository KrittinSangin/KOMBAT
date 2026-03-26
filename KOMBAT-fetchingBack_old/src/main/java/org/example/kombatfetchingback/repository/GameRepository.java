package org.example.kombatfetchingback.repository;

import lombok.Getter;
import lombok.Setter;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.GameDTO;
import org.example.kombatfetchingback.kombat_backend.Games.Game;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.kombat_backend.Games.StartInfo;
import org.example.kombatfetchingback.model.MinionBlueprint;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GameRepository
{
	@Getter @Setter
	private Game game;
	private StartInfo.StartInfoBuilder builder;
	@Getter
	private List<MinionBlueprint> p1Bluepirnt;
	@Getter
	private List<MinionBlueprint> p2Bluepirnt;
	@Getter @Setter
	private boolean p1Ready = false;
	@Getter @Setter
	private boolean p2Ready = false;

	public void createNewStartInfoBuilder()
	{
		IO.println("builder created");
		builder = StartInfo.builder();
	}

	public void setStartConfig(Config cfg)
	{
		IO.println("set config");
		IO.println(cfg);
		builder.config(cfg);
	}

	public void setStartPlayer(PlayerInfo info)
	{
		IO.println("set startPlayer");
		if (info.team() == 0)
		{
			builder.info1(info);
		}
		else if (info.team() == 1)
		{
			builder.info2(info);
		}
		else
		{
			throw new IllegalStateException("\""+info.team()+"\" is not valid team number");
		}
	}

	public void setStartDeck(List<Minion> deck, int team)
	{
		IO.println("set deck");
		if (team == 0)
		{
			builder.deck1(deck);
		}
		else if (team == 1)
		{
			builder.deck2(deck);
		}
		else
		{
			throw new IllegalStateException("\""+team+"\" is not valid team number");
		}
	}

	public void setBlueprints(List<MinionBlueprint> blueprints, int team)
	{
		IO.println("set blueprint");
		if (team == 0)
		{
			p1Bluepirnt = blueprints;
		}
		else if (team == 1)
		{
			p2Bluepirnt = blueprints;
		}
		else
		{
			throw new IllegalStateException("\""+team+"\" is not valid team number");
		}
	}

	public void startGame(StartInfo info)
	{
		IO.println("Start the game");

		game = new Game(info);
		game.start();
	}

	public GameDTO updateGame(PlayerIntent intent)
	{
		IO.println("update the game");
		return game.update(intent);
	}


	public StartInfo getStartInfo()
	{
		return builder.build();
	}

	public boolean isBothReady()
	{
		return p1Ready && p2Ready;
	}
}
