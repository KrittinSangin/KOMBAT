"use client";

import { useEffect, useState } from "react";
import GameLayout from "../../components/GameLayout";
import CodeHost from "./components/CodeHost";
import ProfileConfig from "./components/ProfileConfig";
import Button from "../../components/Button";
import { useRouter } from "next/dist/client/components/navigation";
import { checkState } from "../page";
import { useSearchParams } from "next/navigation";
import getRandomCode from "../gamemode/page";
import { rand } from "../gamemode/duel/join_room/page";
import Slider from "../../components/Slider";

 export default function CreateRoomPage(){
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");

    const router = useRouter();
    const ac = rand.getState().code;
    const moveToSelectPage = () => {
        checkState.getState().setState("gamemode");
        router.push("/gamemode");
    };

    const sliderRange = {
     initHp: { min: 1, max: 100 },
     minionCount: { min: 1, max: 5 },
     maxTurn:{min:1 ,max: 100},
     initBudget:{min:1 ,max: 100},
     maxBudget:{min:1 ,max: 100},
     interestPct:{min:1 ,max: 100},
     hexPurchaseCost:{min:1 ,max: 100},
     spawnCost:{min:1 ,max: 100},
     maxSpawn:{min:1 ,max: 100},
    }
    let left:number=-100;
    let borderColor:string = "grey";
    let sliderColor:string = "white";

    const [config, setConfig] = useState({
  minionCount: sliderRange.minionCount.max,
  initHp: sliderRange.initHp.min,
  maxTurn: sliderRange.maxTurn.min,
  initBudget: sliderRange.initBudget.min,
  maxBudget: sliderRange.maxBudget.min,
  interestPct: sliderRange.interestPct.min,
  hexPurchaseCost: sliderRange.hexPurchaseCost.min,
  spawnCost: sliderRange.spawnCost.min,
  maxSpawn: sliderRange.maxSpawn.min
})

    const handleMinionCountChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    minionCount: value
  }))
}

    const handleInitHpChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    initHp: value
  }))
}

    const handleinitBudgetChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    initBudget: value
  }))
}

    const handleinterestPctChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    interestPct: value
  }))
}

        const handlemaxBudgetChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    maxBudget: value
  }))
}

        const handlehexPerchaseCostChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    hexPurchaseCost: value
  }))
}

    const handlemaxTurnChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    maxTurn: value
  }))
}

        const handlemaxSpawnChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    maxSpawn: value
  }))
}

        const handlespawnCostChange = (value: number) => {
  setConfig(prev => ({
    ...prev,
    spawnCost: value
  }))
}

    return(
        <>
         <GameLayout src="/homepage_bg.jpeg" alt="Create Room">
         <p className="text-color-[#000] w-[800px] text-[70px] font-jersey25 tracking-[5px] absolute top-[-380px] text-center">Mode {mode}</p>
             <div className="box-content fixed left-0 top-0 w-[50%] h-full" style={{ backgroundColor: "#B8B8B8" }}>
                                       <h1 className="text-color-[#000] text-[70px] font-jersey25 tracking-[2px] absolute top-5 left-44">
                                           Configuration
                                           <div className="box-content fixed left-10 top-35 w-[44.5%] h-[70%]" style={{ backgroundColor: "#D9D9D9" }}>
                                               
                                                   <Slider min={sliderRange.initHp.min} max={sliderRange.initHp.max} bottom={500} left={left} overlayText="Init HP" borderColor={borderColor} sliderColor={sliderColor} value={config.initHp} setState={handleInitHpChange}></Slider>
                                                   <Slider min={sliderRange.maxTurn.min} max={sliderRange.maxTurn.max} bottom={450} left={left} overlayText="Max turn" borderColor={borderColor} sliderColor={sliderColor} value={config.maxTurn} setState={handlemaxTurnChange}></Slider>
                                                   <Slider min={sliderRange.initBudget.min} max={sliderRange.initBudget.max} bottom={400} left={left} overlayText="Init Budget" borderColor={borderColor} sliderColor={sliderColor} value={config.initBudget} setState={handleinitBudgetChange}></Slider>
                                                   <Slider min={sliderRange.maxBudget.min} max={sliderRange.maxBudget.max} bottom={350} left={left} overlayText="Max Budget" borderColor={borderColor} sliderColor={sliderColor} value={config.maxBudget} setState={handlemaxBudgetChange}></Slider>
                                                   <Slider min={sliderRange.interestPct.min} max={sliderRange.interestPct.max} bottom={300} left={left} overlayText="Interest Pct" borderColor={borderColor} sliderColor={sliderColor} value={config.interestPct} setState={handleinterestPctChange}></Slider>
                                                   <Slider min={sliderRange.hexPurchaseCost.min} max={sliderRange.hexPurchaseCost.max} bottom={250} left={left} overlayText="Hex Purchase Cost" borderColor={borderColor} sliderColor={sliderColor} value={config.hexPurchaseCost} setState={handlehexPerchaseCostChange}></Slider>
                                                   <Slider min={sliderRange.spawnCost.min} max={sliderRange.spawnCost.max} bottom={200} left={left} overlayText="Spawn Cost" borderColor={borderColor} sliderColor={sliderColor} value={config.spawnCost} setState={handlespawnCostChange}></Slider>
                                                   <Slider min={sliderRange.maxSpawn.min} max={sliderRange.maxSpawn.max} bottom={150} left={left} overlayText="Max Spawn" borderColor={borderColor} sliderColor={sliderColor} value={config.maxSpawn} setState={handlemaxSpawnChange}></Slider>
                                                   <Slider min={sliderRange.minionCount.min} max={sliderRange.minionCount.max} bottom={100} left={left} overlayText="Each Minions Per Team" borderColor={borderColor} sliderColor={sliderColor} value={config.minionCount} setState={handleMinionCountChange} ></Slider>
                                                   <div className="absolute w-[200px] h-[40px] bottom-[30px] left-[35%]" style={{backgroundColor:"#a8a8a8"}}>
                                                    <p className="text-white text-[25px] text-center">Set to default</p>
                                                   </div>
                                               
                                           </div>
                                       </h1>
                                   </div>
            <CodeHost number_={ac}></CodeHost>
            <ProfileConfig online={true} team={1} left={900} top={310}></ProfileConfig>
            <ProfileConfig online={false} team={2} left={900} top={425}></ProfileConfig>
            <Button src="/purple_btn.PNG" alt="Back"  overlayText="Back" bottom="-320" left="250" color="#6a0dad" onClick={moveToDuelSelectPage} font_size="70" height="150" width="250"/>
            
         </GameLayout>
        </>
    )
}