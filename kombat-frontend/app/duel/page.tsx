"use client";

import GameLayout from "../../components/GameLayout"
import Button from "../../components/Button"
import { useRouter } from "next/navigation";

export default function DuelPage(){
    const router = useRouter();

    const moveToGameModePage = () => {
    router.push("/gamemode");
  };
    return(
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
                    <Button src="" alt="Create Room" overlayText="Create Room" font_size="20" height="300" width="400" color="grey" bottom="-50" left="-410"></Button>
                    <Button src="" alt="Join Room" overlayText="Join Room" font_size="20" height="300" width="400" color="grey" bottom="-50" left="200"></Button>
                    <Button src="" alt="Back" overlayText="Back" font_size="20" height="100" width="200" color="#6a0dad" bottom="-260" left="-500" onClick={moveToGameModePage}></Button>
            </GameLayout>
        </>
    )
}