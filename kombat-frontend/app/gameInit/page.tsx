"use client"

import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import StrategyBox from "../../components/Strategybar/StrategyBox";
import Button from "../../components/Button";
import { useSearchParams } from "next/navigation";
import GameLayout from "../../components/GameLayout";

export default function GameInitPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const MinionCount = Number(searchParams.get("Minions")) || 1;

    const moveToBeforeInitPage = () => {
    router.push("/beforeinit");
    }

    return(
        <>
    <GameLayout src="/Blue_bg.jpeg" alt="Background TeamBlue">
        <Navbar title="Player1"></Navbar>
  <h1 className="mt-10 text-red-500 text-4xl w-200 absolute top-[100px] left-[-100px]">
    Minion Count: {MinionCount}
  </h1>
  <StrategyBox></StrategyBox>
    </GameLayout>
        </>
    )
}