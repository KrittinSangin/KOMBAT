package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.repository.GameRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class GameController {
	private final GameRepository gameRepository;
    private final SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/game/starter")
	public void initializeGameStartInfo()
	{
		gameRepository.createNewStartInfoBuilder();
	}

	@MessageMapping("/game/config")
	public void setGameConfig(@Payload Config cfg)
	{
		gameRepository.setStartConfig(cfg);
	}

    @MessageMapping("/game/start")
    public void startGame(@Payload String message) {
//        IO.println("startGame: " + message);
        messagingTemplate.convertAndSend("/game/state", message);
    }
}