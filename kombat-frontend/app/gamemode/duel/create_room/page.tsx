"use client";

import { useEffect, useState } from "react";
import GameLayout from "../../../../components/GameLayout";
import Button from "../../../../components/Button";
import { useRouter } from "next/navigation";
import Slider from "../../../../components/Slider";
import { checkState } from "../../../page";
export default function CreateRoomPage(){
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        
        if (checkState.getState().state !== "duel_create_room") {
            router.push("/forbidden");
        } else {
            setIsAuthorized(true);
        }
    }, [router]);
    if (!isAuthorized) {
        return (
            <GameLayout src="/homepage_bg.jpeg" alt="Create Room" />
        );
    }

    let left:number = 40;
    let borderColor:string = "grey";
    let sliderColor:string = "white";

    return(
        <>
         <GameLayout src="/homepage_bg.jpeg" alt="Create Room">
            <div className="box-content fixed left-0 top-0 w-[50%] h-full" style={{ backgroundColor: "#B8B8B8" }}>
                <h1 className="text-color-[#000] text-[70px] font-jersey25 tracking-[2px] absolute top-5 left-44">
                    Configuration
                    <div className="box-content fixed left-10 top-35 w-[44.5%] h-[70%]" style={{ backgroundColor: "#D9D9D9" }}>
                        
                            <Slider min={1} max={100} bottom={500} left={left} overlayText="Init HP" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                            <Slider min={1} max={100} bottom={450} left={left} overlayText="Max turn" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                            <Slider min={1} max={100} bottom={400} left={left} overlayText="Init Budget" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                            <Slider min={1} max={100} bottom={350} left={left} overlayText="Max Budget" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                            <Slider min={1} max={100} bottom={300} left={left} overlayText="Interest Pct" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                            <Slider min={1} max={100} bottom={250} left={left} overlayText="Hex Purchase Cost" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                            <Slider min={1} max={100} bottom={200} left={left} overlayText="Spawn Cost" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                            <Slider min={1} max={100} bottom={150} left={left} overlayText="Max Spawn" borderColor={borderColor} sliderColor={sliderColor}></Slider>
                            <Slider min={1} max={5} bottom={100} left={left} overlayText="Each Minions Per Team" borderColor={borderColor} sliderColor={sliderColor} setState={5}></Slider>
                            <Button src="" alt="Set To Default" overlayText="Set To Default" bottom="30" left="230" color="grey" font_size="25" height="40" width="200"></Button>
                        
                    </div>
                </h1>
            </div>
         </GameLayout>
        </>
    )
}