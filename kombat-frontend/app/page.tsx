"use client";

import Image from "next/image";
import PlayButton from "../components/Button";
import {useRouter} from "next/navigation";
import {create} from "zustand";
import GameLayout from "./gameInit/components/GameLayout";

type CheckStateStore = {
    state: string;
    setState: (value: string) => void;
    checker: () => string;
};

export const checkState = create<CheckStateStore>((set, get) => ({
    state: "/",
    setState: (value) => set({state: value}),
    checker: () => get().state,
}));

export default function Homepage() {
    const router = useRouter();

    const moveToGameMode = () => {
        checkState.getState().setState("gamemode");
        router.push("/gamemode");
    };

    const testGameInit = () => {
        checkState.getState().setState("BeforeInit");
        router.push("/beforeinit");
    }

    const toGameScene = () => {
        checkState.getState().setState("game");
        router.push("/game");
    }

    const toRandomPage = () => {
        checkState.getState().setState("random");
        router.push("/randomPage");
    }

    return (

        <GameLayout src="/homepage_bg.jpeg" alt="Homepage">
            <h1 className="
    relative 
    bottom-30 left-3
    font-jersey25 
    text-[#000] 
    [text-shadow:_7px_7px_0_#fff,_-7px_-7px_0_#fff,_7px_-7px_0_#fff,_-7px_7px_0_#fff]
    text-[170px] 
    font-[400] 
    leading-[152%] 
    tracking-[10.24px] 
    drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
  ">
                KOMBAT
            </h1>
            <PlayButton src="/green_btn.PNG" alt="play" overlayText="Play" onClick={moveToGameMode} bottom="20" left="170"
                        color="#6a0dad" font_size="70" height="175" width="220"></PlayButton>
            {/* /// */}
            {/* <button onClick={testGameInit}
                    className="border-2 border-black bg-white text-black px-4 py-2 rounded-md">Init
            </button> */}
            {/* This one is for going to game scene */}
            <button onClick={toGameScene}
                    className="border-2 border-black bg-white text-black px-4 py-2 rounded-md">Game
            </button>
            <button onClick={toRandomPage}
                    className="border-2 border-black bg-white text-black px-4 py-2 rounded-md">Random
            </button>
        </GameLayout>

    );
}