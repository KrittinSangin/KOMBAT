package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.GameDTO;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.repository.GameRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class GameSocketController
{
	private final GameRepository gameRepository;
	private final SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/game/config")
	public void setGameConfig(@Payload Config cfg)
	{
		gameRepository.setStartConfig(cfg);
	}

	@MessageMapping("/game/start")
	public void startGame(@Payload String message) {
		messagingTemplate.convertAndSend("/game/ready", message);
	}

	@MessageMapping("/game/update")
	public void startGame(@Payload PlayerIntent intent) {
		GameDTO dto = gameRepository.updateGame(intent);
		messagingTemplate.convertAndSend("/game/update", dto);
	}
}
