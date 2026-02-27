"use client";

import { useEffect, useState } from "react";
import GameLayout from "../../components/GameLayout";
import ConfigBox from "./components/ConfigBox";
import CodeHost from "./components/CodeHost";
import ProfileConfig from "./components/ProfileConfig";
import Button from "../../components/Button";
import { useRouter } from "next/dist/client/components/navigation";
import { checkState } from "../page";
import { useSearchParams } from "next/navigation";
import getRandomCode from "../gamemode/page";
import { rand } from "../gamemode/duel/join_room/page";
 export default function CreateRoomPage(){
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");

    const router = useRouter();
    const ac = rand.getState().code;
    const moveToDuelSelectPage = () => {
        checkState.getState().setState("duel");
        router.push("/gamemode/duel");
    };
    let InitHp_min:number = 1
    let InitHp_max:number = 100
    let MaxTurn_min:number = 1
    let MaxTurn_max:number = 100
    let InitBudget_min:number = 1
    let InitBudget_max:number = 100
    let MaxBudget_min:number = 1
    let MaxBudget_max:number = 100
    let InterestPct_min:number = 1
    let InterestPct_max:number = 100
    let HexPurchaseCost_min:number = 1
    let HexPurchaseCost_max:number = 100
    let SpawnCost_min:number = 1
    let SpawnCost_max:number= 100
    let MaxSpawn_min:number = 1
    let MaxSpawn_max:number = 100

    return(
        <>
         <GameLayout src="/homepage_bg.jpeg" alt="Create Room">
         <p className="text-color-[#000] w-[1000px] text-[70px] font-jersey25 tracking-[5px] absolute top-[-380px] left-[210px]">Mode {mode}</p>
            <ConfigBox InitHp_min={InitHp_min} InitHp_max={InitHp_max} MaxTurn_min={MaxTurn_min} MaxTurn_max={MaxTurn_max} InitBudget_min={InitBudget_min} InitBudget_max={InitBudget_max} MaxBudget_min={MaxBudget_min} MaxBudget_max={MaxBudget_max} InterestPct_min={InterestPct_min} InterestPct_max={InterestPct_max} HexPurchaseCost_min={HexPurchaseCost_min} HexPurchaseCost_max={HexPurchaseCost_max} SpawnCost_min={SpawnCost_min} SpawnCost_max={SpawnCost_max} MaxSpawn_min={MaxSpawn_min} MaxSpawn_max={MaxSpawn_max}></ConfigBox>
            <CodeHost number_={ac}></CodeHost>
            <ProfileConfig online={true} team={1} left={900} top={310}></ProfileConfig>
            <ProfileConfig online={false} team={2} left={900} top={425}></ProfileConfig>
            <Button src="" alt="Back"  overlayText="Back" bottom="-320" left="270" color="#6a0dad" onClick={moveToDuelSelectPage} font_size="70" height="90" width="200"/>
            
         </GameLayout>
        </>
    )
}