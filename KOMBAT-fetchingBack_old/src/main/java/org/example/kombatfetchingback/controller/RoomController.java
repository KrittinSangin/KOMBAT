package org.example.kombatfetchingback.controller;

import lombok.RequiredArgsConstructor;
import org.example.kombatfetchingback.kombat_backend.Games.Configs.Config;
import org.example.kombatfetchingback.model.PlayerNameDTO;
import org.example.kombatfetchingback.model.RoomMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class RoomController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/room.send")
    public void sendToRoom(@Payload RoomMessage message) {
        messagingTemplate.convertAndSend(
                "/topic/room/" + message.getRoomId(),
                message
        );
    }

    @MessageMapping("/config")
    public void sendToConfig(@Payload String message) {
//        IO.println(message);
        messagingTemplate.convertAndSend(
                "/topic/config/",
                message
        );
    }

    @MessageMapping("/config/userOnline")
    public void sendOnline(@Payload PlayerNameDTO message) {
//        IO.println(message);
        messagingTemplate.convertAndSend(
                "/topic/usernames",
                message
        );
    }

    @MessageMapping("/ready")
    public void sendReady(@Payload String message) {
        messagingTemplate.convertAndSend(
                "/topic/ready",
                message
        );
    }


}