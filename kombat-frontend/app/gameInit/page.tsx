"use client"

import { useRouter } from "next/navigation";
import Navbar,{TeamSide} from "../../components/Navbar";
import StrategyBox from "../../components/StrategyBox";
import Button from "../../components/Button";
import { useSearchParams } from "next/navigation";
import GameLayout from "../../components/GameLayout";
import MinionProfile from "../../components/MinionProfile";

export default function GameInitPage() {
    const searchParams = useSearchParams();
    const minion = searchParams.get("minion");

    return(
        <>
            <GameLayout src="/Blue_bg.jpeg" alt="Background Image" >
            </GameLayout> 
                <Navbar title="Player1" minionCount={Number(minion)} team={TeamSide.Blue}/>
                <StrategyBox></StrategyBox>
                <MinionProfile></MinionProfile>
        </>
    )
}