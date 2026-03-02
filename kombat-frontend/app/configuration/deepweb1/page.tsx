"use client";

import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { rand } from "../../gamemode/duel/join_room/page";
import Button from "../../../components/Button";
import { useState } from "react";
import CreateRoomPage from "../page";
export default function Chat() {
  const connectAndSubscribe = () => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        console.log("Connected");


        client.subscribe(`/topic/room/${roomCode}`, message => {
          console.log("Received:", message.body);
        });
        
        client.subscribe(`/topic/user-number`, message => {
          console.log("User number update:", message.body);
         });


      }
    });

    client.activate();
    clientRef.current = client;
  };
 useEffect(() => {
  connectAndSubscribe();

  return () => {
    if (clientRef.current) {
      clientRef.current.deactivate();
      clientRef.current = null;
    }
  };
}, []);

  const [page, setPage] = useState("CreateRoomPage");
  const clientRef = useRef<Client | null>(null);
  const roomCode = rand.getState().code;
  const sendMessage = () => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.log("Not connected");
      return;
    }
    // console.log("Doing this");
    clientRef.current.publish({
      destination: "/app/room.send",
      body: JSON.stringify({
         roomId: roomCode,
        content: "Hello from button"
      })
    });
  };

  
  return (
    <div>
    {page === "CreateRoomPage" && <CreateRoomPage /> }
    <Button src="/purple_opaque.PNG" alt="Join Room" overlayText="Debug room" font_size="50" height="150" width="250" color="grey" bottom="65" left="1100" onClick={(sendMessage)} ></Button>
    </div>
  );
}