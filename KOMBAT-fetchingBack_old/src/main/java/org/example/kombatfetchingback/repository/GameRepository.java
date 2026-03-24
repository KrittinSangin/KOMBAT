package org.example.kombatfetchingback.repository;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.GameDTO;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.MinionDTO;
import org.example.kombatfetchingback.kombat_backend.Games.Game;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.kombat_backend.Games.StartInfo;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GameRepository
{
	private Game game;
	private StartInfo.StartInfoBuilder builder;

	public void createNewStartInfoBuilder()
	{
		builder = StartInfo.builder();
	}

	public void setStartConfig(Config cfg)
	{
		builder.config(cfg);
	}

	public void setStartPlayer(PlayerInfo info)
	{
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
	public void setStartDeck(List<MinionDTO> deck,int team)
	{

	}

	public void startGame()
	{
		game = new Game(builder.build());
	}

	public GameDTO updateGame(PlayerIntent intent)
	{
		return game.update(intent);
	}

}
