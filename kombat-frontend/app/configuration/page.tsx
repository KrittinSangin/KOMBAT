"use client";

import GameLayout from "../../components/GameLayout"
import Button from "../../components/Button"
import { useRouter } from "next/navigation";

export default function ConfigPage(){
    const router = useRouter();

    const moveToGameMode = () => {
    router.push("/gamemode");
  };

    return(
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="Configuration">
                <h1 className="relative 
    bottom-75 left-2
    font-jersey25 
    text-[#000] 
    text-[100px]  
    tracking-[5px] ">
                    Configuration
                </h1>
                <Button src="" alt="Game mode" overlayText="Game mode" bottom="-300" left="-350" color="#6a0dad" font_size="50" onClick={moveToGameMode} height="100" width="300"></Button>
                <Button src="" alt="Strategy" overlayText="Strategy" bottom="-300" left="650" color="#6a0dad" font_size="50" height="100" width="300"></Button>
            </GameLayout>
        </>
    )
}