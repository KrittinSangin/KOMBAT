package org.example.kombatfetchingback.repository;

import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
public class UserJoinedHandler {

    private String hostID;
    private String clientID;

    public synchronized void setUserJoined(String id) {
        if (id == null) return;

        if (hostID == null) {
            hostID = id;
            return;
        }

        if (hostID.equals(id)) {
            return;
        }

        if (clientID == null) {
            clientID = id;
        }
    }

    public synchronized void setUserLeft(String id) {
        if (id == null) return;

        if (id.equals(hostID)) {
            hostID = null;
            return;
        }

        if (id.equals(clientID)) {
            clientID = null;
            return;
        }

        System.out.println("session does not exist");
    }
    public UserJoinedHandler fetcher(){
        return this;
    }

}