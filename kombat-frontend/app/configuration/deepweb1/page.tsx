"use client";

import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { rand } from "../../gamemode/duel/join_room/page";
import Button from "../../../components/Button";
import { useState } from "react";
import CreateRoomPage from "../page";
import { _useConfigStore } from "../../../components/DTOHandler";
import { useConfigStore } from "../page";
import { duelWhereDidYouComeFrom } from "../../gamemode/duel/page";
import { useShallow } from "zustand/react/shallow";
import { Global2Players } from "../components/ProfileConfig";


export default function Chat() {

  


  const [page, setPage] = useState("CreateRoomPage");
  const clientRef = useRef<Client | null>(null);
  const roomCode = (duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE") ? rand.getState().code : duelWhereDidYouComeFrom.getState().checkOrigin()


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

         client.subscribe(`/topic/config/`,message  => {
          const IntelligentMessage = JSON.parse(message.body)
          console.log("config: ", IntelligentMessage)
          useConfigStore.getState().setAll(IntelligentMessage)
           

         })
        
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
const config = useConfigStore(
  useShallow((s) => ({
    _Hp: s._Hp,
    _minions: s._minions,
    _turnMax: s._turnMax,
    _startingBudget: s._startingBudget,
    _maximumBudget: s._maximumBudget,
    _interest: s._interest,
    _hexCost: s._hexCost,
    _spawningCost: s._spawningCost,
    _maximumSpawn: s._maximumSpawn
  }))
);
useEffect(() => {
  const timeout = setTimeout(() => {
   clientRef.current?.publish({
      destination: "/app/config",
      body: JSON.stringify(config)
    });
  }, 200);

  return () => clearTimeout(timeout);
}, [config]);


  const sendMessage = () => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.log("Not connected");
      return;
    }
    console.log("Doing this");
    Global2Players.getState().setPlayer1Name("KUY");
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