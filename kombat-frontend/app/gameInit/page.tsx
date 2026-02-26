"use client"

import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import StrategyBox from "../../components/StrategyBox";
import Button from "../../components/Button";
import { useSearchParams } from "next/navigation";
import GameLayout from "../../components/GameLayout";

export default function GameInitPage() {
    return(
        <>
            <GameLayout src="/Blue_bg.jpeg" alt="Background Image" >
                <StrategyBox></StrategyBox>
                <Navbar title="Player1" />
            </GameLayout> 
        </>
    )
}