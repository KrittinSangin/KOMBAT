package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Console.ConsoleCanvas;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.kombat_backend.Games.DTO.GameDTO;
import org.example.kombatfetchingback.kombat_backend.Games.Minion.Minion;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.kombat_backend.Games.StartInfo;
import org.example.kombatfetchingback.kombat_backend.MVC.Canvas;
import org.example.kombatfetchingback.kombat_backend.Tuples.Pair;
import org.example.kombatfetchingback.model.MinionBlueprint;
import org.example.kombatfetchingback.model.PlayerReadyDTO;
import org.example.kombatfetchingback.model.GameStartDTO;
import org.example.kombatfetchingback.model.StartInfoDTO;
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
    public void markReadyAndSetDeck(@Payload PlayerReadyDTO dto) {

        List<MinionBlueprint> blueprints = dto.minions();

        if (dto.isP1Bot() && dto.isP2Bot()) {
            gameRepository.setStartDeck(createDeckFromBlueprints(blueprints), 0);
            gameRepository.setBlueprints(blueprints, 0);
            gameRepository.setP1Ready(true);

            gameRepository.setStartDeck(createDeckFromBlueprints(blueprints), 1);
            gameRepository.setBlueprints(blueprints, 1);
            gameRepository.setP2Ready(true);
        }
        else if (!dto.isP1Bot() && dto.isP2Bot()) {
            gameRepository.setStartDeck(createDeckFromBlueprints(blueprints), 0);
            gameRepository.setBlueprints(blueprints, 0);
            gameRepository.setP1Ready(dto.IsReady());

            gameRepository.setStartDeck(createDeckFromBlueprints(blueprints), 1);
            gameRepository.setBlueprints(blueprints, 1);
            gameRepository.setP2Ready(true);
        }
        else {
            int team = dto.playerTeam();
            gameRepository.setStartDeck(createDeckFromBlueprints(blueprints), team);
            gameRepository.setBlueprints(blueprints, team);

            if (team == 0) {
                gameRepository.setP1Ready(dto.IsReady());
            } else {
                gameRepository.setP2Ready(dto.IsReady());
            }
        }

        if (gameRepository.isBothReady()) {
            startGame();
        }
    }

    private List<Minion> createDeckFromBlueprints(List<MinionBlueprint> blueprints) {
        List<Minion> deck = new ArrayList<>();
        blueprints.forEach((bp) -> deck.add(
                new Minion(bp.name(),
                        (int) gameRepository.getStartInfo().config().initHp(),
                        bp.def(),
                        strategyRepository.get(bp.strategyFileName())
                )));
        return deck;
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
		Pair<List<Minion>, List<Minion>> decks = new Pair<>(deck1, deck2);

		List<MinionBlueprint> blueprints1 = gameRepository.getP1Bluepirnt();
		List<MinionBlueprint> blueprints2 = gameRepository.getP2Bluepirnt();
		Pair<List<MinionBlueprint>, List<MinionBlueprint>> blueprintses = new Pair<>(blueprints1, blueprints2);

		//generate random sequence
		int count = deck1.size();
		Random rand = new Random(System.currentTimeMillis());
		int[] rands = new int[count];

		for (int i = 0; i < count; i++)
		{
			rands[i] = rand.nextInt(0,2);
		}

		List<Minion> universalDeck = new ArrayList<>();
		List<MinionBlueprint> universalBlueprint = new ArrayList<>();

		for (int i = 0; i < rands.length; i++)
		{
			universalDeck.add(rands[i] % 2 == 0 ? decks.fst().get(i) : decks.snd().get(i));

			var blueprint = rands[i] % 2 == 0 ? blueprintses.fst().get(i) : blueprintses.snd().get(i);

			blueprint = MinionBlueprint.builder()
				.name(blueprint.name())
				.def(blueprint.def())
				.index(i)
				.strategyFileName(blueprint.strategyFileName())
				.isStrategyParsedOk(blueprint.isStrategyParsedOk())
				.spriteName(blueprint.spriteName())
				.build();

			universalBlueprint.add(blueprint);
		}

		StartInfo startInfo = new StartInfo(
			unprocessStartInfo.config(),
			unprocessStartInfo.info1(),
			unprocessStartInfo.info2(),
			universalDeck,
			universalDeck
		);

		//start game
		gameRepository.startGame(startInfo);

		GameStartDTO dto = new GameStartDTO(
			gameRepository.getP1Bluepirnt(),
			gameRepository.getP2Bluepirnt(),
			universalBlueprint,
			new StartInfoDTO(
				startInfo.config(),
				startInfo.info1(),
				startInfo.info2(),
				universalBlueprint
			),
			gameRepository.updateGame(PlayerIntent.EMPTY())
		);

		messagingTemplate.convertAndSend("/topic/startGame", dto);
	}

	@MessageMapping("/game/update")
	public void updateGame(@Payload PlayerIntent intent)
	{
		IO.println("Intent recieved");
		IO.println(intent);
		if (gameRepository.getGame() == null)
		{
			IO.println("there is no game");
			messagingTemplate.convertAndSend("/topic/nogame", "Game does not exist");
			return;
		}

		GameDTO dto = gameRepository.updateGame(intent);
		Canvas canvas = new ConsoleCanvas(gameRepository.getGame());
		canvas.draw();

		messagingTemplate.convertAndSend("/topic/update", dto);
	}




}
