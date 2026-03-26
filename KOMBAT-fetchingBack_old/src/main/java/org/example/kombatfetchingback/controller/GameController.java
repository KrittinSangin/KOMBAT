package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.repository.GameRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class GameController {

	private final GameRepository gameRepository;

	@PostMapping("/game/builder")
	public void initializeGameStartInfo()
	{
		gameRepository.createNewStartInfoBuilderIfNull();
	}
}