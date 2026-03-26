package org.kombat_backend.botTest;

import kombat_backend.TestingUtility;
import org.example.kombatfetchingback.controller.GameSocketController;
import org.example.kombatfetchingback.kombat_backend.Console.ConsoleCanvas;
import org.example.kombatfetchingback.kombat_backend.Games.Game;
import org.example.kombatfetchingback.kombat_backend.Games.Player.PlayerIntent;
import org.example.kombatfetchingback.kombat_backend.MVC.Canvas;
import org.example.kombatfetchingback.repository.GameRepository;
import org.junit.jupiter.api.Test;

public class BotTest {
    @Test
    public void BotTest(){
        Game game = TestingUtility.instantiateGameDefault();
        GameRepository gR = new GameRepository();
        game.start();
        gR.setGame(game);
        GameSocketController GameSocketController = new GameSocketController(null,null,null);

        for(int i = 0; i < 15; i++){
        PlayerIntent botIntent = GameSocketController.botMove(game);
        gR.updateGame(botIntent);
        game = gR.getGame();
        IO.println(botIntent);
        Canvas canvas = new ConsoleCanvas(game);
        canvas.draw();
        }

    }

}
