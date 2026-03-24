"use client"

import Navbar from "../../components/Navbar"
import GameLayout from "../../components/GameLayout"
import { useRouter } from "next/navigation";
import { useConfigStore } from "../configuration/page"
import { useEffect, useState } from "react"; 
import PreviewNavbar from "../../components/PreviewNavbar"
import Minionpreview from "../../components/Minionpreview";
import Button from "../../components/Button";

const MinionCount = useConfigStore.getState()._minions

interface PreviewProps{
    MinionCount:number
}

export default function Preview({MinionCount}:PreviewProps){
    const [selectedMinion, setSelectedMinion] = useState(0); 
    const router = useRouter();

    const moveToGame = () => {
        router.push("/game");
    };

    return(
        <>
            <GameLayout src="/flower.jpg" alt="preview minion"></GameLayout>
            <PreviewNavbar MinionCount={5} onSelect={setSelectedMinion} selectedMinion={selectedMinion}></PreviewNavbar>
            <Minionpreview minionIndex={selectedMinion}></Minionpreview>
             <Button onClick={moveToGame} src="/green_btn.PNG" alt="Next" overlayText="Next" bottom="-20" left="1250" color="purple" font_size="40" height="150" width="190"></Button>
        </>
    )
}