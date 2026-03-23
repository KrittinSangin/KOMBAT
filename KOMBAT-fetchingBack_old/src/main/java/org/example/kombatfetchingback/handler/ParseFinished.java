package org.example.kombatfetchingback.handler;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
public class ParseFinished {
    private boolean[] handleBothPlayers = new boolean[2];
    private boolean parseToBool(String message) {
        return !message.equals("false");
    }
    public void handleIncomingMessage(String message)
    {
    boolean temp = parseToBool(message);


    }
}
