package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class GameController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/game/start")
    public void startGame(@Payload String message) {
        IO.println("startGame: " + message);
        messagingTemplate.convertAndSend("/game/state", message);
    }
}