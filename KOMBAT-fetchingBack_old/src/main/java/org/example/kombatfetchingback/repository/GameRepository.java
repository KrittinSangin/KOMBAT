package org.example.kombatfetchingback.repository;

import lombok.Getter;
import lombok.Setter;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.GameDTO;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.MinionDTO;
import org.example.kombatfetchingback.kombat_backend.Games.Game;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.kombat_backend.Games.StartInfo;
import org.example.kombatfetchingback.kombat_backend.Tuples.Pair;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GameRepository
{
	private Game game;
	private StartInfo.StartInfoBuilder builder;
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

	public void startGame()
	{
		IO.println("Start the game");
		game = new Game(builder.build());
	}

	public GameDTO updateGame(PlayerIntent intent)
	{
		IO.println("update the game");
		return game.update(intent);
	}

	public StartInfo getUnfinishStartInfo()
	{
		return builder.build();
	}

	public boolean isBothReady()
	{
		return p1Ready && p2Ready;
	}
}
