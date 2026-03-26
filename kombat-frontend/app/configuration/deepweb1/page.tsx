"use client";

import {useEffect, useRef} from "react";
import SockJS from "sockjs-client";
import {Client, StompSubscription} from "@stomp/stompjs";
import Button from "../../../components/Button";
import {useState} from "react";
import CreateRoomPage from "../page";
import {_useConfigStore} from "../../../components/DTOHandler";
import {useShallow} from "zustand/react/shallow";

import {checkState} from "../../page";
import type {_joinedHandler, ConfigValues} from "../../../ttypes/type";
import {useRouter} from "next/navigation";
import {METHODS} from "http";
import {useJoinedHandler} from "../Store/useJoinedHandler";
import {PermsConfig2ConfigAdapter, useConfigStore} from "../Store/useConfigStore";
import {useOriginStore} from "../../gamemode/Store/DuelOriginStore";
import {useRandomStateStore} from "../../gamemode/Store/UseRandomStateStore";
import {globalPlayerStore, useGlobalPlayerStore} from "../Store/GlobalPlayerStore";

type sendingConfigDTO = {
    config: ConfigValues,
    sender: 0|1
}

type PlayerNameDTO = {
    p1name: string,
    p2name: string
}

export default function Chat() {
    const router = useRouter();
    //Zustand
    const {checkOrigin,myTeam,setModeDuel} = useOriginStore();
    const {player1, player2} = useGlobalPlayerStore();
    const {code} = useRandomStateStore();

    const {config, setAll} = useConfigStore(
        useShallow((state) => ({
            config: state.config,
            setAll: state.setAll,
        }))
    );

    //useState
    const [isReady, setIsReady] = useState(false);
    const [clientReady, setClientReady] = useState(false);
    const [page, setPage] = useState("CreateRoomPage");

    //variables
    const isHost = checkOrigin() == "CREATE";

    const clientRef = useRef<Client | null>(null);
    const lastSentRef = useRef<string>("");
    const roomCode = (isHost) ? code : checkOrigin();

    const subsRef = useRef<StompSubscription[]>([]);

    //Websocket Connection Handle
    const connectAndSubscribe = () => {
        const client = new Client({
            webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_LINK}/ws`),
            onConnect: () => {

                console.log("Connected");

                //room code
                const subCode = client.subscribe(`/topic/room/${roomCode}`, message => {
                    console.log("Received:", message.body);
                });
                subsRef.current.push(subCode)

                //host&client ID
                const subID = client.subscribe(`/topic/user-number`, message => {
                    const data: _joinedHandler = JSON.parse(message.body)
                    useJoinedHandler.getState().setHostID(data?.hostID == null ? "null" : String(data.hostID))
                    useJoinedHandler.getState().setClientID(data?.clientID == null ? "null" : String(data.clientID))
                });
                subsRef.current.push(subID)

                //on config change
                const subConfig = client.subscribe(`/topic/config/`, message => {
                    const dto:sendingConfigDTO = JSON.parse(message.body)
                    const current = useConfigStore.getState().config;

                    if (JSON.stringify(current) !== JSON.stringify(dto) && dto.sender !== myTeam()) {
                        setAll(dto.config);
                    }
                })
                subsRef.current.push(subConfig)

                //on username change
                const subUser = client.subscribe("/topic/usernames", message => {
                    const playerNameDTO: PlayerNameDTO = JSON.parse(message.body)
                    const store = useGlobalPlayerStore.getState();

                    if (store.player1 !== playerNameDTO.p1name) {
                        store.setPlayer1Name(playerNameDTO.p1name);
                    }

                    if (store.player2 !== playerNameDTO.p2name) {
                        store.setPlayer2Name(playerNameDTO.p2name);
                    }
                })
                subsRef.current.push(subUser)


                //on player ready
                const subReady = client.subscribe("/topic/ready", message => {
                    const store = useGlobalPlayerStore.getState();

                    if (message.body == "true") setClientReady(true);
                    else if (message.body == "false") setClientReady(false);
                    else { //go to next page
                        //Send config data to backend with both players' name
                        const latestConfig = useConfigStore.getState().config;

                        fetch(`${process.env.NEXT_PUBLIC_LINK}/data/config`, {
                            method: "POST",
                            body: JSON.stringify(
                                {
                                    config: PermsConfig2ConfigAdapter(latestConfig),
                                    playerTeam: isHost ? 0 : 1,
                                    playerName: isHost ? store.player1 : store.player2,
                                }
                                //int playerTeam, String playerName
                            ),
                            headers: {
                                "content-type": "application/json"
                            }
                        })

                        router.push("/gameInit")
                    }

                    subsRef.current.push(subReady)

                })
            }
        });

        client.activate();
        clientRef.current = client;
    };

    //Connect to ws on mount
    useEffect(() => {
        connectAndSubscribe();
        setModeDuel();
        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
            subsRef.current.forEach(sub => sub.unsubscribe());
            subsRef.current = [];
        };
    }, []);

    //Config Handle via ws
    //allowing other user to see and update config at the same time
    //update itself whenever the config is change
    useEffect(() => {
        const timeout = setTimeout(() => {
            clientRef.current?.publish({
                destination: "/app/config",
                body: JSON.stringify(
                    {
                        config: config,
                        sender: myTeam()
                    }
                )
            });
        }, 200);

        return () => clearTimeout(timeout);
    }, [config]);

    //update online status of the player
    useEffect(() => {
        const client = clientRef.current;
        if (!client || !client.connected) return;

        const timeout = setTimeout(() => {
            const playerNames: PlayerNameDTO = {
                p1name: player1,
                p2name: player2
            };

            console.log(playerNames);

            if (JSON.stringify(playerNames) !== lastSentRef.current) {
                client.publish({
                    destination: "/app/config/userOnline",
                    body: JSON.stringify(playerNames)
                });

                lastSentRef.current = JSON.stringify(playerNames);
            }
        }, 200);

        return () => clearTimeout(timeout);
    }, [player1, player2]);


    //Upon ready on both side, submit config file and go to the next page
    const moveToGameInitPage = () => {
        clientRef.current?.publish({
            destination: "/topic/ready",
            body: JSON.stringify({
                message: "GO"
            })
        })
    };

    const Ready = () => {
        setIsReady(!isReady)
        clientRef.current?.publish({
            destination: "/app/ready",
            body: (!isReady).toString()
        })
    }
    const handleBackButton = () => {
        if (!clientRef.current || !clientRef.current.connected) {
            console.log("Not connected");
            return;
        }
        if (!isHost) clientRef.current.publish({
            destination: "/topic/ready",
            body: "false"
        })

        //unsubscribes
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
            {page === "CreateRoomPage" && <CreateRoomPage/>}
            {isHost && clientReady &&
                <Button src="/purple_btn.PNG" alt="Join Room" overlayText="Start" font_size="50" height="150"
                        width="250" color="grey" bottom="65" left="1100" onClick={(moveToGameInitPage)}></Button>}

            {isHost && !clientReady &&
                <Button src="/purple_opaque.PNG" alt="Join Room" overlayText="Start" font_size="50" height="150"
                        width="250" color="grey" bottom="65" left="1100" onClick={() => {
                }}></Button>}

            {isHost && clientReady &&
                <div className="text-2xl absolute bottom-[80px] left-[850px] text-green-900 bg-green-100/50">Opponent
                    ready!</div>}
            {isHost && !clientReady &&
                <div className="text-2xl absolute bottom-[80px] left-[850px] text-yellow-900 bg-yellow-100/50">waiting
                    for the opponent to be ready...</div>}

            {isReady && !isHost &&
                <Button src="/purple_btn.PNG" alt="Join Room" overlayText="Ready" font_size="50" height="150"
                        width="250" color="grey" bottom="65" left="1100" onClick={(Ready)}></Button>}

            {!isReady && !isHost &&
                <div className="text-2xl absolute bottom-[80px] left-[850px] text-yellow-900 bg-yellow-100/50">waiting
                    for you to be ready...</div>}
            {isReady && !isHost &&
                <div className="text-2xl absolute bottom-[80px] left-[850px] text-green-900 bg-green-100/50">you are
                    ready!</div>}

            {!isReady && !isHost &&
                <Button src="/purple_opaque.PNG" alt="Join Room" overlayText="Not Ready" font_size="50" height="150"
                        width="250" color="grey" bottom="65" left="1100" onClick={(Ready)}></Button>}

            {!isHost && !isReady &&
                <Button src="/purple_btn.PNG" alt="Back" overlayText="Back" onClick={handleBackButton} bottom="65"
                        left="800" color="#6a0dad" font_size="50" height="150" width="250"></Button>}

            {!isHost && isReady &&
                <Button src="/purple_opaque.PNG" alt="Back" overlayText="Back" onClick={() => {
                }} bottom="65" left="800" color="#6a0dad" font_size="50" height="150" width="250"></Button>}

            {isHost &&
                <Button src="/purple_btn.PNG" alt="Back" overlayText="Back" onClick={handleBackButton} bottom="65"
                        left="800" color="#6a0dad" font_size="50" height="150" width="250"></Button>}

        </div>
    );
}