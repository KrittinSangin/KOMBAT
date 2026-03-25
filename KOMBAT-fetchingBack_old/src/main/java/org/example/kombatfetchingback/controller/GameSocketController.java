package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.GameDTO;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.model.PlayerReadyDTO;
import org.example.kombatfetchingback.model.StrategyFileDTO;
import org.example.kombatfetchingback.repository.GameRepository;
import org.example.kombatfetchingback.repository.StrategyRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class GameSocketController
{
	private final SimpMessagingTemplate messagingTemplate;
	private final GameRepository gameRepository;
	private final StrategyRepository strategyRepository;
    
	@MessageMapping("/game/config")
	public void setGameConfig(@Payload Config cfg)
	{
		gameRepository.setStartConfig(cfg);
	}

	@MessageMapping("/game/ready")
	public void markReadyAndSetDeck(@Payload PlayerReadyDTO dto)
	{
		//mark ready
		if (dto.playerTeam() == 0) {
            gameRepository.setP1Ready(dto.IsReady());
        } else {
            gameRepository.setP2Ready(dto.IsReady());
        }

		//set Deck
		List<Minion> deck = new ArrayList<>();
		var blueprints = dto.minions();

		blueprints.forEach((bp)->deck.add(
			new Minion(bp.name(),
				(int) gameRepository.getUnfinishStartInfo().config().initHp(),
				bp.def(),
				strategyRepository.get(bp.strategyFileName())
			)));

		gameRepository.setStartDeck(deck, dto.playerTeam());

		if (gameRepository.isBothReady()) {
            startGame();
            messagingTemplate.convertAndSend("/topic/startGame", "Both players ready");
            //Randomization goes here
            return ;
        }
            messagingTemplate.convertAndSend("/topic/startGame", "Both players not ready");
	}

//	@MessageMapping("/game/unready")
//	public void markUnready(@Payload PlayerReadyDTO dto)
//	{
//		//mark not ready
//		if (dto.playerTeam() == 1) {gameRepository.setP1Ready(true);} else {gameRepository.setP2Ready(true);}
//	}

	public void startGame()
	{
		gameRepository.startGame();
		//send something to front-end
	}

	@MessageMapping("/game/update")
	public void updateGame(@Payload PlayerIntent intent)
	{
		GameDTO dto = gameRepository.updateGame(intent);
		messagingTemplate.convertAndSend("/game/update", dto);
	}

}
