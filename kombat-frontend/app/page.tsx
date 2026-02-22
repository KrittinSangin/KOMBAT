"use client";

import Image from "next/image";
import PlayButton from "../components/Button";
import GameLayout from "../components/GameLayout";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();

  const moveToGameMode = () => {
    router.push("/gamemode");
  };

  return (
    
    <GameLayout src="/homepage_bg.jpeg" alt="homepage">
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
  <PlayButton src="" alt="play" overlayText="Play" onClick={moveToGameMode} bottom="10" left="170" color="#6a0dad"></PlayButton>
    </GameLayout>  
      
  );
}