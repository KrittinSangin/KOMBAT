"use client";

import { use, useEffect, useState } from "react";
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
import { create } from "zustand"
import { ConfigureState } from "../../ttypes/type";
import { duelWhereDidYouComeFrom } from "../gamemode/duel/page";
  export const  useConfigStore = create<ConfigureState>((set) => ({
    _Hp : 1,
    _minions: 5,
    _turnMax: 1,
    _startingBudget: 1,
    _maximumBudget : 1,
    _interest: 1,
    _hexCost : 1,
    _spawningCost : 1,
    _maximumSpawn : 1,

    setHp: (value) => set({_Hp: value}),
    setMinions       : ( value )  => set({_minions: value}),
    setTurnMax       : ( value )  => set({_turnMax: value}),
    setStartingBudget: ( value )  => set({_startingBudget: value}),
    setMaximumBudget : ( value )  => set({_maximumBudget: value}),
    setInterest      : ( value )  => set({_interest: value}),
    setHexCost       : ( value )  => set({_hexCost: value}),
    setSpawningCost  : ( value )  => set({_spawningCost: value}),
    setMaximumSpawn  : ( value )  => set({_maximumSpawn: value}),
    
    setAll: (config) =>
    set((state) => ({
      ...state,
      ...config
    })),
  }))



 export default function CreateRoomPage(){
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode")?.split("/")[0];

    const router = useRouter();
    const ac = duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE" ? rand.getState().code : duelWhereDidYouComeFrom.getState().checkOrigin();
    const moveToSelectPage = () => {
        if(mode === "Duel"){
            checkState.getState().setState("duel");
            router.push("/gamemode/duel");
        }else{
            checkState.getState().setState("gamemode");
            router.push("/gamemode");
        }
    };
    // WebSocket needs to be implemented here
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

const resetConfig = () => {
    // set your default values here
  const state = useConfigStore.getState();
  state.setHexCost(1);
  state.setHp(1);
  state.setInterest(1);
  state.setMaximumBudget(1);
  state.setMaximumSpawn(1);
  state.setSpawningCost(1);
  state.setStartingBudget(1);
  state.setTurnMax(1);
  state.setMinions(5);
};

  const minionCount = useConfigStore(s => s._minions);
  const setMinionCount = useConfigStore(s => s.setMinions);

//     const handleMinionCountChange = (value: number) => {
//   setConfig(prev => ({
//     ...prev,
//     minionCount: value,
//   }))
// }
  

    const hp = useConfigStore(s => s._Hp);
    const setHp = useConfigStore(s => s.setHp);




    const budget = useConfigStore(s => s._startingBudget);
    const setBudget = useConfigStore(s => s.setStartingBudget);

//     const handleinitBudgetChange = (value: number) => {
//   setConfig(prev => ({
//     ...prev,
//     initBudget: value
//   }))
// }


  const pct = useConfigStore(s => s._interest);
  const setPct = useConfigStore(s => s.setInterest);

//     const handleinterestPctChange = (value: number) => {
//   setConfig(prev => ({
//     ...prev,
//     interestPct: value
//   }))
// }



const budgetChange = useConfigStore(s => s._maximumBudget);
const setBudgetChange = useConfigStore(s => s.setMaximumBudget);

//         const handlemaxBudgetChange = (value: number) => {
//   setConfig(prev => ({
//     ...prev,
//     maxBudget: value
//   }))
// }


const hexPurchaseCost = useConfigStore(s => s._hexCost);
const setHexPurchaseCost = useConfigStore(s => s.setHexCost);

//         const handlehexPerchaseCostChange = (value: number) => {
//   setConfig(prev => ({
//     ...prev,
//     hexPurchaseCost: value
//   }))
// }


const turnChange = useConfigStore(s => s._turnMax);
const setTurnChange = useConfigStore(s => s.setTurnMax);



//     const handlemaxTurnChange = (value: number) => {
//   setConfig(prev => ({
//     ...prev,
//     maxTurn: value
//   }))
// }


const maxSpawn = useConfigStore(s => s._maximumSpawn);
const setMaxSpawn = useConfigStore(s => s.setMaximumSpawn);

//         const handlemaxSpawnChange = (value: number) => {
//   setConfig(prev => ({
//     ...prev,
//     maxSpawn: value
//   }))
// }

const spawnCost = useConfigStore(s => s._spawningCost);
const setSpawnCost = useConfigStore(s => s.setSpawningCost);

//         const handlespawnCostChange = (value: number) => {
//   setConfig(prev => ({
//     ...prev,
//     spawnCost: value
//   }))
// }

    return(
        <>
         <GameLayout src="/homepage_bg.jpeg" alt="Create Room">
         <p className="text-color-[#000] w-[800px] text-[70px] font-jersey25 tracking-[5px] absolute top-[-380px] text-center">Mode {mode}</p>
             <div className="box-content fixed left-0 top-0 w-[50%] h-full" style={{ backgroundColor: "#B8B8B8" }}>
                                       <h1 className="text-color-[#000] text-[70px] font-jersey25 tracking-[2px] absolute top-5 left-44">
                                           Configuration
                                           <div className="box-content fixed left-10 top-35 w-[44.5%] h-[70%]" style={{ backgroundColor: "#D9D9D9" }}>
                                               
                                                   <Slider min={sliderRange.initHp.min} max={sliderRange.initHp.max} bottom={500} left={left} overlayText="Init HP" borderColor={borderColor} sliderColor={sliderColor} value={hp} setState={setHp}></Slider>
                                                   <Slider min={sliderRange.maxTurn.min} max={sliderRange.maxTurn.max} bottom={450} left={left} overlayText="Max turn" borderColor={borderColor} sliderColor={sliderColor} value={turnChange} setState={setTurnChange}></Slider>
                                                   <Slider min={sliderRange.initBudget.min} max={sliderRange.initBudget.max} bottom={400} left={left} overlayText="Init Budget" borderColor={borderColor} sliderColor={sliderColor} value={budget} setState={setBudget}></Slider>
                                                   <Slider min={sliderRange.maxBudget.min} max={sliderRange.maxBudget.max} bottom={350} left={left} overlayText="Max Budget" borderColor={borderColor} sliderColor={sliderColor} value={budgetChange} setState={setBudgetChange}></Slider>
                                                   <Slider min={sliderRange.interestPct.min} max={sliderRange.interestPct.max} bottom={300} left={left} overlayText="Interest Pct" borderColor={borderColor} sliderColor={sliderColor} value={pct} setState={setPct}></Slider>
                                                   <Slider min={sliderRange.hexPurchaseCost.min} max={sliderRange.hexPurchaseCost.max} bottom={250} left={left} overlayText="Hex Purchase Cost" borderColor={borderColor} sliderColor={sliderColor} value={hexPurchaseCost} setState={setHexPurchaseCost}></Slider>
                                                   <Slider min={sliderRange.spawnCost.min} max={sliderRange.spawnCost.max} bottom={200} left={left} overlayText="Spawn Cost" borderColor={borderColor} sliderColor={sliderColor} value={spawnCost} setState={setSpawnCost}></Slider>
                                                   <Slider min={sliderRange.maxSpawn.min} max={sliderRange.maxSpawn.max} bottom={150} left={left} overlayText="Max Spawn" borderColor={borderColor} sliderColor={sliderColor} value={maxSpawn} setState={setMaxSpawn}></Slider>
                                                   <Slider min={sliderRange.minionCount.min} max={sliderRange.minionCount.max} bottom={100} left={left} overlayText="Each Minions Per Team" borderColor={borderColor} sliderColor={sliderColor} value={minionCount} setState={setMinionCount} ></Slider>
                                                   <div className="absolute w-[200px] h-[40px] bottom-[30px] left-[35%]" style={{backgroundColor:"#a8a8a8"}}>
                                                   <p className="text-white text-[25px] text-center" onClick={resetConfig}>Set to default</p>
                                                   </div>
                                               
                                           </div>
                                       </h1>
                                   </div>
            <CodeHost number_={ac}></CodeHost>
            <ProfileConfig online1={duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE"} online2={duelWhereDidYouComeFrom.getState().checkOrigin() !== "CREATE"} team={1} left={900} top={310}></ProfileConfig>
            {/* <ProfileConfig online={false} team={2} left={900} top={425}></ProfileConfig> */}
            <Button src="/purple_btn.PNG" alt="Back"  overlayText="Back" bottom="-320" left="75" color="#6a0dad" onClick={moveToSelectPage} font_size="70" height="150" width="250"/>
            {/* <Button src="/purple_opaque.PNG" alt="Play"  overlayText="Play" bottom="-320" left="375" color="#6a0dad30" onClick={()=>{}} font_size="70" height="150" width="250" /> */}
            
         </GameLayout>
        </>
    )
}