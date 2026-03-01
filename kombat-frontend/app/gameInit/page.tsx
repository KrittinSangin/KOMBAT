"use client"

import { useRouter } from "next/navigation";
import Navbar,{TeamSide} from "../../components/Navbar";
import StrategyBox from "../../components/StrategyBox";
import Button from "../../components/Button";
import { useSearchParams } from "next/navigation";
import GameLayout from "../../components/GameLayout";
import MinionProfile from "../../components/MinionProfile";
import { useState } from "react";

export default function GameInitPage() {
    const searchParams = useSearchParams();
    const minion = searchParams.get("minion");

    const [selectedMinion, setSelectedMinion] = useState(0); 

    return(
        <>
            <GameLayout src="/Blue_bg.jpeg" alt="Background Image" >
            </GameLayout> 
                <Navbar title="Player1" minionCount={Number(minion)} team={TeamSide.Blue} selectedMinion={selectedMinion} onSelect={setSelectedMinion}/>
                <StrategyBox selectedMinion={selectedMinion}></StrategyBox>
                <MinionProfile minionIndex={selectedMinion}></MinionProfile>
        </>
    )
}