"use client";

import {useEffect, useRef} from "react";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";
import {rand} from "../../gamemode/duel/join_room/page";
import Button from "../../../components/Button";
import {useState} from "react";
import CreateRoomPage from "../page";
import {_useConfigStore} from "../../../components/DTOHandler";
import {duelWhereDidYouComeFrom} from "../../gamemode/duel/page";
import {useShallow} from "zustand/react/shallow";
import {Global2Players} from "../components/ProfileConfig";

import {checkState} from "../../page";
import type {_joinedHandler, NameOf2Players} from "../../../ttypes/type";
import {useRouter} from "next/navigation";
import {METHODS} from "http";
import {useJoinedHandler} from "../Store/useJoinedHandler";
import {PermsConfig2ConfigAdapter, useConfigStore} from "../Store/useConfigStore";

export default function Chat() {
    const [isReady, setIsReady] = useState(false);
    const {config, setAll} = useConfigStore(
        useShallow((state) => ({
            config: state.config,
            setAll: state.setAll,
        }))
    );

    const [page, setPage] = useState("CreateRoomPage");
    const clientRef = useRef<Client | null>(null);
    const roomCode = (duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE") ? rand.getState().code : duelWhereDidYouComeFrom.getState().checkOrigin()
    const [clientReady, setClientReady] = useState(false);

    //Websocket Connection Handle
    const connectAndSubscribe = () => {
        const client = new Client({
            webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_LINK}/ws`),
            onConnect: () => {

                console.log("Connected");


                client.subscribe(`/topic/room/${roomCode}`, message => {
                    console.log("Received:", message.body);
                });

                client.subscribe(`/topic/user-number`, message => {
                    const data: _joinedHandler = JSON.parse(message.body)
                    useJoinedHandler.getState().setHostID(data?.hostID == null ? "null" : String(data.hostID))
                    useJoinedHandler.getState().setClientID(data?.clientID == null ? "null" : String(data.clientID))
                });

                client.subscribe(`/topic/config/`, message => {
                    const IntelligentMessage = JSON.parse(message.body)
                    setAll(IntelligentMessage)
                })
                client.subscribe("/topic/usernames", message => {
                    const IntelligentMessage: NameOf2Players = JSON.parse(message.body)
                    Global2Players.getState().setPlayer1Name(IntelligentMessage.player1)
                    Global2Players.getState().setPlayer2Name(IntelligentMessage.player2)
                })
                client.subscribe("/topic/ready", message => {
                    if (message.body == "true") setClientReady(true);
                    else if (message.body == "false") setClientReady(false);
                    else {
                        fetch(`${process.env.NEXT_PUBLIC_LINK}/data/config`, {
                            method: "POST",
                            body: JSON.stringify(
                                {
                                    MainConfig: useConfigStore.getState(),
                                    Player1Name: player1,
                                    Player2Name: player2
                                }
                            )
                        })
                        router.push("/gameInit")
                    }
                })
            }
        });

        client.activate();
        clientRef.current = client;
    };


    //Connect to ws on mount
    useEffect(() => {

        connectAndSubscribe();
        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
        };
    }, []);

    //Config Handle via ws
    //allowing other user to see and update config at the same time
    //update itself whenever the config is change
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

    //update online status of the player
    useEffect(() => {
        const client = clientRef.current;
        if (client && client.connected) {
            const timeout = setTimeout(() => {
                client.publish({
                    destination: "/app/config/userOnline",
                    body: JSON.stringify(Global2Players.getState())
                });
            }, 200);
        }
    }, [player1, player2]);


    //Upon ready on both side, submit config file and go to the next page
    const moveToGameInitPage = () => {
        const backendConfig = PermsConfig2ConfigAdapter(config);
        console.log(backendConfig)

        clientRef.current?.publish({
            destination: "/app/game/config",
            body: JSON.stringify(backendConfig)
        })

        clientRef.current?.publish({
            destination: "/topic/ready",
            body: JSON.stringify({
                message: "GO"
            })
        })

    };

    const isThisDudeAHost = duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE";
    const Ready = () => {
        setIsReady(!isReady)
        clientRef.current?.publish({
            destination: "/app/ready",
            body: (!isReady).toString()
        })
    }
    const router = useRouter();
    const handleBackButton = () => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.log("Not connected");
            return;
        }
        if (!isThisDudeAHost) clientRef.current.publish({
            destination: "/topic/ready",
            body: "false"
        })
        clientRef.current.unsubscribe(`/topic/room/${roomCode}`);
        clientRef.current.unsubscribe(`/topic/user-number`)
        clientRef.current.unsubscribe(`/topic/config/`)
        clientRef.current.unsubscribe("/topic/usernames")
        clientRef.current.unsubscribe("/topic/ready")
        checkState.getState().setState("duel");

        router.push("/gamemode/duel");

    }
    return (
        <div>
            <div className="absolute top-50 left-100 w-100 h-100 z-50 bg-blue-500" onClick={() => {
                clientRef.current?.publish({
                    destination: "/app/game/starter",
                })
            }}></div>
            {page === "CreateRoomPage" && <CreateRoomPage/>}
            {isThisDudeAHost && clientReady &&
                <Button src="/purple_btn.PNG" alt="Join Room" overlayText="Start" font_size="50" height="150"
                        width="250" color="grey" bottom="65" left="1100" onClick={(moveToGameInitPage)}></Button>}

            {isThisDudeAHost && !clientReady &&
                <Button src="/purple_opaque.PNG" alt="Join Room" overlayText="Start" font_size="50" height="150"
                        width="250" color="grey" bottom="65" left="1100" onClick={() => {
                }}></Button>}

            {isThisDudeAHost && clientReady &&
                <div className="text-2xl absolute bottom-[80px] left-[850px] text-green-900 bg-green-100/50">Opponent
                    ready!</div>}
            {isThisDudeAHost && !clientReady &&
                <div className="text-2xl absolute bottom-[80px] left-[850px] text-yellow-900 bg-yellow-100/50">waiting
                    for the opponent to be ready...</div>}

            {isReady && !isThisDudeAHost &&
                <Button src="/purple_btn.PNG" alt="Join Room" overlayText="Ready" font_size="50" height="150"
                        width="250" color="grey" bottom="65" left="1100" onClick={(Ready)}></Button>}

            {!isReady && !isThisDudeAHost &&
                <div className="text-2xl absolute bottom-[80px] left-[850px] text-yellow-900 bg-yellow-100/50">waiting
                    for you to be ready...</div>}
            {isReady && !isThisDudeAHost &&
                <div className="text-2xl absolute bottom-[80px] left-[850px] text-green-900 bg-green-100/50">you are
                    ready!</div>}

            {!isReady && !isThisDudeAHost &&
                <Button src="/purple_opaque.PNG" alt="Join Room" overlayText="Not Ready" font_size="50" height="150"
                        width="250" color="grey" bottom="65" left="1100" onClick={(Ready)}></Button>}

            {!isThisDudeAHost && !isReady &&
                <Button src="/purple_btn.PNG" alt="Back" overlayText="Back" onClick={handleBackButton} bottom="65"
                        left="800" color="#6a0dad" font_size="50" height="150" width="250"></Button>}

            {!isThisDudeAHost && isReady &&
                <Button src="/purple_opaque.PNG" alt="Back" overlayText="Back" onClick={() => {
                }} bottom="65" left="800" color="#6a0dad" font_size="50" height="150" width="250"></Button>}

            {isThisDudeAHost &&
                <Button src="/purple_btn.PNG" alt="Back" overlayText="Back" onClick={handleBackButton} bottom="65"
                        left="800" color="#6a0dad" font_size="50" height="150" width="250"></Button>}

        </div>
    );
}