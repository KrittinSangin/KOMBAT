package org.example.kombatfetchingback.controller;


import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.handler.MessageHolder;
import org.example.kombatfetchingback.handler.MyDataHandler;
import org.example.kombatfetchingback.handler.MyMessageHolder;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerInfo;
import org.example.kombatfetchingback.model.ConfigPageDTO;
import org.example.kombatfetchingback.repository.GameRepository;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataController
{
	private final MyDataHandler dataHandler;
	private final GameRepository gameRepository;

	@PostMapping("/send/{id}")
	public MessageHolder init(@PathVariable String id)
	{
		return dataHandler.initializeWebSocket(id);
	}

	@PostMapping("/join")
	public MessageHolder joinTestData(@RequestBody String id)
	{
		return dataHandler.handleJoinRequest(id);
	}

	@PostMapping("/config")
	public void acceptDataFromConfigPage(@RequestBody ConfigPageDTO dto)
	{
		IO.println(dto);
		gameRepository.createNewStartInfoBuilder();
		gameRepository.setStartConfig(dto.config());
		gameRepository.setStartPlayer(new PlayerInfo(dto.Player1Name(), 0));
		gameRepository.setStartPlayer(new PlayerInfo(dto.Player2Name(), 1));
		IO.println(gameRepository.seeCurrentStartInfo());
	}

}
