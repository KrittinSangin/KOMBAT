"use client";

import {useEffect, useState} from "react";
import Button from "../../../components/Button"
import {useRouter} from "next/navigation";
import {checkState} from "../../page";
import {create} from "zustand";
import {MessageHolder} from "../../../ttypes/type";
import GameLayout from "../../gameInit/components/GameLayout";
import {useDuelOriginStore} from "../Store/DuelOriginStore";
import {RandomStateStore} from "../Store/RandomStateStore";



export default function DuelPage() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (checkState.getState().state !== "duel") {
            router.push("/forbidden");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);


    const moveToGameModePage = () => {
        checkState.getState().setState("gamemode");
        router.push("/gamemode");
        useDuelOriginStore.getState().setOrigin("")
    };

    const moveToConfigPage = async (mode: string) => {
        useDuelOriginStore.getState().setOrigin("CREATE");
        checkState.getState().setState("duel_create_room");
        RandomStateStore.getState().randomize();

        try {
            const test2: MessageHolder = await fetch(`${process.env.NEXT_PUBLIC_LINK}/data/send/${RandomStateStore.getState().code}`, {
                method: 'POST'
            }).then(response => response.json());

            const request = await fetch(`${process.env.NEXT_PUBLIC_LINK}/game/builder`, {
                method: 'POST'
            }).then(_ => {
            });
            // console.log(test2)
        } catch (error) {
            if (error == "TypeError: Failed to fetch") {
                alert("Server might be down. Please try again later.");
                return;
            }
            alert("Failed to send code to the back-end: %" + error + "% \nPlease try again.");
            return;
        }
        alert("Successfully created a room");
        router.push(`/configuration/deepweb1?mode=${mode}`);
    };


    const moveToJoinRoomPage = () => {
        useDuelOriginStore.getState().setOrigin("JOIN");
        router.push("/gamemode/duel/join_room");
    };

    if (!isAuthorized) {
        return (
            <GameLayout src="/homepage_bg.jpeg" alt="Duel"/>
        );
    }

    return (
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="Duel">
                <h1 className="relative
    bottom-70 left-0
    font-jersey25 
    text-[#000] 
    text-[100px]  
    tracking-[5px] ">
                    Duel
                </h1>
                <Button src="/grey_btn.PNG" alt="Create Room" overlayText="Create Room" font_size="50" height="300"
                        width="500" color="grey" bottom="-50" left="-400"
                        onClick={() => moveToConfigPage("Duel")}></Button>
                <Button src="/grey_btn.PNG" alt="Join Room" overlayText="Join Room" font_size="50" height="300"
                        width="500" color="grey" bottom="-50" left="100" onClick={moveToJoinRoomPage}></Button>
                <Button src="/purple_btn.PNG" alt="Back" overlayText="Back" font_size="70" height="150" width="250"
                        color="#6a0dad" bottom="-269" left="-550" onClick={moveToGameModePage}></Button>
            </GameLayout>
        </>
    )
}