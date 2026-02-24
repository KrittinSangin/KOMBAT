"use client";

import GameLayout from "../../../../components/GameLayout";
import ConfigBox from "../../../../components/ConfigBox";
import CodeHost from "../../../../components/CodeHost";

export default function CreateRoomPage(){
    let InitHp_min:number = 1
    let InitHp_max:number = 100
    let MaxTurn_min:number = 1
    let MaxTurn_max:number = 100
    let InitBudget_min:number = 1
    let letInitBudget_max:number = 100
    let MaxBudget_min:number = 1
    let MaxBudget_max:number = 100
    let InterestPct_min:number = 1
    let InterestPct_max:number = 100
    let HexPurchaseCost_min:number = 1
    let letHexPurchaseCost_max:number = 100
    let SpawnCost_min:number = 1
    let SpawnCost_max:number= 100
    let MaxSpawn_min:number = 1
    let MaxSpawn_max:number = 100

    return(
        <>
         <GameLayout src="/homepage_bg.jpeg" alt="Create Room">
            <ConfigBox InitHp_min={InitHp_min} InitHp_max={InitHp_max} MaxTurn_min={MaxTurn_min} MaxTurn_max={MaxTurn_max} InitBudget_min={InitBudget_min} InitBudget_max={letInitBudget_max} MaxBudget_min={MaxBudget_min} MaxBudget_max={MaxBudget_max} InterestPct_min={InterestPct_min} InterestPct_max={InterestPct_max} HexPurchaseCost_min={HexPurchaseCost_min} HexPurchaseCost_max={letHexPurchaseCost_max} SpawnCost_min={SpawnCost_min} SpawnCost_max={SpawnCost_max} MaxSpawn_min={MaxSpawn_min} MaxSpawn_max={MaxSpawn_max}></ConfigBox>
            <CodeHost></CodeHost>
         </GameLayout>
        </>
    )
}