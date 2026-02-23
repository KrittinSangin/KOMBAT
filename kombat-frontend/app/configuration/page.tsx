"use client";

import GameLayout from "../../components/GameLayout"
import Button from "../../components/Button"
import { useRouter } from "next/navigation";
import Slider from "../../components/Slider";

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
                <Button src="" alt="Set to default" overlayText="Set to default" bottom="-250" left="180" color="#625e65" font_size="40" height="60" width="250"></Button>
                
                <Slider min={0} max={100} bottom={230} left={20} overlayText="Init Hp" sliderColor="#808080" borderColor="#000000"></Slider>
                <Slider min={0} max={100} bottom={130} left={20} overlayText="Max turn" sliderColor="#808080" borderColor="#000000"></Slider>
                {/* <Slider min={0} max={100} bottom={230} left={20} overlayText="Init Budget" sliderColor="#808080" borderColor="#000000"></Slider> 
                <Slider min={0} max={100} bottom={230} left={20} overlayText="Interest pct" sliderColor="#808080" borderColor="#000000"></Slider>
                <Slider min={0} max={100} bottom={230} left={20} overlayText="Hex purchase cost" sliderColor="#808080" borderColor="#000000"></Slider>
                <Slider min={0} max={100} bottom={230} left={20} overlayText="Spawn cost" sliderColor="#808080" borderColor="#000000"></Slider>
                <Slider min={0} max={100} bottom={230} left={20} overlayText="Max spawn" sliderColor="#808080" borderColor="#000000"></Slider> */}

            </GameLayout>
        </>
    )
}