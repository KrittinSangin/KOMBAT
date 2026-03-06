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
import { onlineChecker } from "../page";
import type { _joinedHandler, NameOf2Players } from "../../../ttypes/type";
export default function Chat() {
const [isReady, setIsReady] = useState(false);
  


  const [page, setPage] = useState("CreateRoomPage");
  const clientRef = useRef<Client | null>(null);
  const roomCode = (duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE") ? rand.getState().code : duelWhereDidYouComeFrom.getState().checkOrigin()
  const [clientReady, setClientReady] = useState(false);
  

  const connectAndSubscribe = () => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        
        console.log("Connected");


        client.subscribe(`/topic/room/${roomCode}`, message => {
          console.log("Received:", message.body);
        });

        client.subscribe(`/topic/user-number`, message => {
          const data: _joinedHandler = JSON.parse(message.body)
          console.log(data)
          onlineChecker.getState().setHostID(data.hostID.toString())
          onlineChecker.getState().setClientID(data.clientID.toString())
         });

         client.subscribe(`/topic/config/`,message  => {
          const IntelligentMessage = JSON.parse(message.body)
          // console.log("config: ", IntelligentMessage)
          useConfigStore.getState().setAll(IntelligentMessage)
          
         })
         client.subscribe("/topic/usernames", message => {
          const IntelligentMessage : NameOf2Players  = JSON.parse(message.body)
           Global2Players.getState().setPlayer1Name(IntelligentMessage.player1)
           Global2Players.getState().setPlayer2Name(IntelligentMessage.player2)
         })
         client.subscribe("/topic/ready", message => {
          setClientReady(message.body == "true")
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
const player1 = Global2Players((state) => state.player1);
const player2 = Global2Players((state) => state.player2);

useEffect(() => {
  const client = clientRef.current;
  if (client && client.connected) {
    const timeout = setTimeout(() => {
    client.publish({
      destination: "/app/config/userOnline",
      body: JSON.stringify(Global2Players.getState())
    });
  },200);
  }
}, [player1, player2]);
  const sendMessage = () => {
    if (!clientRef.current || !clientRef.current.connected) {
      // console.log("Not connected");
      return;
    }
    // console.log("Doing this");
    Global2Players.getState().setPlayer1Name("KUY");
    clientRef.current.publish({
      destination: "/app/room.send",
      body: JSON.stringify({
         roomId: roomCode,
        content: "Hello from button"
      })
    });
  };
 
  const Ready = () => {
     setIsReady(!isReady)
    clientRef.current?.publish({
      destination:"/app/ready",
      body: (!isReady).toString()
    })
  }
  const isThisDudeAHost = duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE";
  return (
    <div>
    {page === "CreateRoomPage" && <CreateRoomPage /> }
    {isThisDudeAHost && clientReady && <Button src="/purple_btn.PNG" alt="Join Room" overlayText="Start" font_size="50" height="150" width="250" color="grey" bottom="65" left="1100" onClick={(sendMessage)} ></Button>}
    {isThisDudeAHost && !clientReady && <Button src="/purple_opaque.PNG" alt="Join Room" overlayText="Start" font_size="50" height="150" width="250" color="grey" bottom="65" left="1100" onClick={()=>{}} ></Button>}
    {isThisDudeAHost && clientReady && <div className="text-2xl absolute bottom-[80px] left-[850px] text-green-900 bg-green-100/50">Opponent ready!</div>}
    {isThisDudeAHost && !clientReady && <div className="text-2xl absolute bottom-[80px] left-[850px] text-yellow-900 bg-yellow-100/50">waiting for the opponent to be ready...</div>}
    {isReady && !isThisDudeAHost && <Button src="/purple_btn.PNG" alt="Join Room" overlayText="Ready" font_size="50" height="150" width="250" color="grey" bottom="65" left="1100" onClick={(Ready)} ></Button>}
    {!isReady && !isThisDudeAHost && <div className="text-2xl absolute bottom-[80px] left-[850px] text-yellow-900 bg-yellow-100/50">waiting for you to be ready...</div>}
    {isReady && !isThisDudeAHost && <div className="text-2xl absolute bottom-[80px] left-[850px] text-green-900 bg-green-100/50">you are ready!</div>}
    {!isReady && !isThisDudeAHost && <Button src="/purple_opaque.PNG" alt="Join Room" overlayText="Not Ready" font_size="50" height="150" width="250" color="grey" bottom="65" left="1100" onClick={(Ready)} ></Button>}
   
    </div>
  );
}