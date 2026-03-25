package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.GameDTO;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.kombat_backend.Games.StartInfo;
import org.example.kombatfetchingback.kombat_backend.Tuples.Pair;
import org.example.kombatfetchingback.model.MinionBlueprint;
import org.example.kombatfetchingback.model.PlayerReadyDTO;
import org.example.kombatfetchingback.model.GameStartDTO;
import org.example.kombatfetchingback.repository.GameRepository;
import org.example.kombatfetchingback.repository.StrategyRepository;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
				(int) gameRepository.getStartInfo().config().initHp(),
				bp.def(),
				strategyRepository.get(bp.strategyFileName())
			)));

		//set blueprints
		gameRepository.setStartDeck(deck, dto.playerTeam());
		gameRepository.setBlueprints(dto.minions(),dto.playerTeam());

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

	//start the game
	public void startGame()
	{
		var unprocessStartInfo = gameRepository.getStartInfo();

		//unpack data
		List<Minion> deck1 = unprocessStartInfo.deck1();
		List<Minion> deck2 = unprocessStartInfo.deck2();
		Pair<List<Minion>,List<Minion>> decks = new Pair<>(deck1,deck2);

		List<MinionBlueprint> blueprints1 = gameRepository.getP1Bluepirnt();
		List<MinionBlueprint> blueprints2 = gameRepository.getP2Bluepirnt();
		Pair<List<MinionBlueprint>,List<MinionBlueprint>> blueprintses = new Pair<>(blueprints1,blueprints2);

		//generate random sequence
		int count = deck1.size();
		Random rand = new Random(System.currentTimeMillis());
		int[] rands = new int[count];

		for (int i = 0; i < count; i++)
		{
			rands[i] = rand.nextInt(2);
		}

		//make the select value become universal
		List<Minion> universalDeck = new ArrayList<>();
		List<MinionBlueprint> universalBlueprint = new ArrayList<>();

		for (int i:rands)
		{
			universalDeck.add(rand.nextInt() % 2 == 0? decks.fst().get(i) : decks.snd().get(i));
			universalBlueprint.add(rand.nextInt() % 2 == 0? blueprintses.fst().get(i) : blueprintses.snd().get(i));
		}

		StartInfo startInfo = new StartInfo(
			unprocessStartInfo.config(),
			unprocessStartInfo.info1(),
			unprocessStartInfo.info2(),
			universalDeck,
			universalDeck
		);

		gameRepository.startGame(startInfo);

		GameStartDTO dto = new GameStartDTO(
			gameRepository.getP1Bluepirnt(),
			gameRepository.getP2Bluepirnt(),
			universalBlueprint,
			gameRepository.updateGame(PlayerIntent.EMPTY())
		);

		messagingTemplate.convertAndSend("/topic/startGame", dto);
	}

	@MessageMapping("/game/update")
	public void updateGame(@Payload PlayerIntent intent)
	{
		GameDTO dto = gameRepository.updateGame(intent);
		messagingTemplate.convertAndSend("/game/update", dto);
	}

}
