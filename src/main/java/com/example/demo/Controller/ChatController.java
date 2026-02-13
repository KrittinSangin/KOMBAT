package com.example.demo.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public String handleChat(String message) {
        System.out.println("Incoming: " + message);
        return message;
    }
}
