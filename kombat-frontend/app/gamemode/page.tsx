"use client";

import GameLayout from "../../components/GameLayout"
import Button from "../../components/Button"
import { useRouter } from "next/navigation";

export default function gamemodePage(){
    const router = useRouter();

    const moveToHomePage = () => {
    router.push("/");
  };

    return(
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="gamemode background">
                <h1 className="relative 
    bottom-60 left-2
    font-jersey25 
    text-[#000] 
    text-[100px]  
    tracking-[5px] ">
                    Select Game Mode
                </h1>
                <Button src="" alt=""  overlayText="Duel" bottom="140" left="265" color="orange">
                </Button>
                <Button src="" alt=""  overlayText="Solitaire" bottom="30" left="265" color="brown">
                </Button>
                <Button src="" alt=""  overlayText="Auto" bottom="-80" left="265" color="green">
                </Button>
                {/* send gamemode to back-end */}
                <Button src="" alt=""  overlayText="Back" bottom="-190" left="265" color="#6a0dad" onClick={moveToHomePage}>
                </Button>
            </GameLayout>
        </>
    )
}