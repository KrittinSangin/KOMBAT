package org.example.kombatfetchingback.config;


import lombok.AllArgsConstructor;
import org.example.kombatfetchingback.repository.MyUserRepository;
import org.example.kombatfetchingback.repository.UserJoinedHandler;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

import java.security.Principal;

@Component
@AllArgsConstructor
public class WebsocketEventListener {
    private final MyUserRepository myUserRepository;
    private final UserJoinedHandler userJoinedHandler;
    private final SimpMessageSendingOperations messagingTemplate;
//    @EventListener
//    public void onConnect(SessionConnectedEvent event) {
//
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = accessor.getSessionId();
//        IO.println(sessionId);
//        userJoinedHandler.setUserJoined(sessionId);
//        messagingTemplate.convertAndSend("/topic/user-number",userJoinedHandler.fetcher());
//    }
    @EventListener
    public void adad(SessionSubscribeEvent event) {
        String destination = SimpMessageHeaderAccessor.wrap(event.getMessage()).getDestination();
        String sessionId = SimpMessageHeaderAccessor.wrap(event.getMessage()).getSessionId();
//        String user = (event.getUser() != null) ? event.getUser().getName() : "anonymous";

        userJoinedHandler.setUserJoined(sessionId);
        messagingTemplate.convertAndSend("/topic/user-number",userJoinedHandler.fetcher());

    }
    @EventListener
    public void adad(SessionUnsubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        userJoinedHandler.setUserLeft(sessionId);
        messagingTemplate.convertAndSend("/topic/user-number",userJoinedHandler.fetcher());
    }
    @EventListener
    public void onDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        userJoinedHandler.setUserLeft(sessionId);
        messagingTemplate.convertAndSend("/topic/user-number",userJoinedHandler.fetcher());
    }
}
