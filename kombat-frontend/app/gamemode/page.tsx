"use client";

import {useEffect, useState} from "react";
import Button from "../../components/Button"
import {useRouter} from "next/navigation";
import {checkState} from "../page";
import GameLayout from "../gameInit/components/GameLayout";

export default function gamemodePage() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (checkState.getState().state !== "gamemode") {
            router.push("/forbidden");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    const moveToHomePage = () => {
        checkState.getState().setState("/");
        router.push("/");
    };

    const moveToDuelPage = () => {
        checkState.getState().setState("duel");
        router.push("/gamemode/duel");
    };

    const moveToConfigPage = (mode: string) => {
        checkState.getState().setState("duel_create_room");
        router.push(`/configuration/Solitaire?mode=${mode}`);
    };

    if (!isAuthorized) {
        return (
            <GameLayout src="/homepage_bg.jpeg" alt="Gamemode"/>
        );
    }

    return (
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="Gamemode">
                <h1 className="relative 
    bottom-75 left-2
    font-jersey25 
    text-[#000] 
    text-7xl  
    tracking-[5px] ">
                    Select Game Mode
                </h1>
                <Button src="/orange_btn.PNG" alt="Duel" overlayText="Duel" bottom="85" left="170" color="orange"
                        onClick={moveToDuelPage} font_size="70" height="150" width="300">
                </Button>
                <Button src="/brown_btn.PNG" alt="Solitaire" overlayText="Solitaire" bottom="-25" left="265"
                        color="brown" font_size="70" height="150" width="300"
                        onClick={() => router.push(`/configuration/Solitaire?mode=Solitaire`)}>
                </Button>
                <Button src="/green_btn.PNG" alt="Auto" overlayText="Auto" bottom="-145" left="265" color="green"
                        font_size="70" height="150" width="300"
                        onClick={() => router.push(`/configuration/Auto?mode=Auto`)}>

                </Button>
                {/* send gamemode to back-end */}
                <Button src="/purple_btn.PNG" alt="Back" overlayText="Back" onClick={moveToHomePage} bottom="-285"
                        left="170" color="#6a0dad" font_size="50" height="150" width="300">
                </Button>
            </GameLayout>
        </>
    )
}