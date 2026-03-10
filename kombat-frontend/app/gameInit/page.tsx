"use client"

import { useRouter } from "next/navigation";
import Navbar,{TeamSide} from "../../components/Navbar";
import StrategyBox from "../../components/StrategyBox";
import Button from "../../components/Button";
import GameLayout from "../../components/GameLayout";
import MinionProfile from "../../components/MinionProfile";
import { useState } from "react"; 
import { useConfigStore } from "../configuration/page";
import { duelWhereDidYouComeFrom } from "../gamemode/duel/page";
import { Global2Players } from "../configuration/components/ProfileConfig";
export default function GameInitPage() {
    const playerName = duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE" ? Global2Players.getState().player1 : Global2Players.getState().player2;
    const minion = useConfigStore.getState()._minions;

    const [selectedMinion, setSelectedMinion] = useState(0); 

    return(
        <>
            <GameLayout src="/Blue_bg.jpeg" alt="Background Image" >
            </GameLayout> 
                <Navbar title={playerName} minionCount={minion} team={duelWhereDidYouComeFrom.getState().checkOrigin() == "CREATE" ? TeamSide.Blue : TeamSide.Red} selectedMinion={selectedMinion} onSelect={setSelectedMinion}/>
                <StrategyBox selectedMinion={selectedMinion}></StrategyBox>
                <MinionProfile minionIndex={selectedMinion}></MinionProfile>
        </>
    )
}