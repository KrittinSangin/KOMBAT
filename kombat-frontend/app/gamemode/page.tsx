"use client";

import GameLayout from "../../components/GameLayout"
import Button from "../../components/Button"
import { useRouter } from "next/navigation";

export default function gamemodePage(){
    const router = useRouter();

    const moveToHomePage = () => {
    router.push("/");
  };

    const moveToDuelPage = () => {
    router.push("/duel");
  };

    return(
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="Gamemode">
                <h1 className="relative 
    bottom-75 left-2
    font-jersey25 
    text-[#000] 
    text-[100px]  
    tracking-[5px] ">
                    Select Game Mode
                </h1>
                <Button src="" alt="Duel"  overlayText="Duel" bottom="160" left="265" color="orange" onClick={moveToDuelPage} font_size="70" height="100" width="300">
                </Button>
                <Button src="" alt="Solitaire"  overlayText="Solitaire" bottom="40" left="265" color="brown" font_size="70" height="100" width="300">
                </Button>
                <Button src="" alt="Auto"  overlayText="Auto" bottom="-80" left="265" color="green" font_size="70" height="100" width="300">
                </Button>
                {/* send gamemode to back-end */}
                <Button src="" alt="Back"  overlayText="Back" bottom="-190" left="320" color="#6a0dad" onClick={moveToHomePage} font_size="70" height="90" width="200">
                </Button>
            </GameLayout>
        </>
    )
}