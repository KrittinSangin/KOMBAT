"use client";

import {use, useEffect, useState} from "react";
import CodeHost from "./components/CodeHost";
import ProfileConfig from "./components/ProfileConfig";
import Button from "../../components/Button";
import {useRouter} from "next/dist/client/components/navigation";
import {checkState} from "../page";
import {useSearchParams} from "next/navigation";
import getRandomCode from "../gamemode/page";
import Slider from "../../components/Slider";
import {create} from "zustand"
import {useConfigStore} from "./Store/useConfigStore";
import {useJoinedHandler} from "./Store/useJoinedHandler";
import GameLayout from "../gameInit/components/GameLayout";
import {useDuelOriginStore} from "../gamemode/Store/DuelOriginStore";
import {RandomStateStore} from "../gamemode/Store/RandomStateStore";


export default function CreateRoomPage() {

    const searchParams = useSearchParams();
    const mode = searchParams.get("mode")?.split("/")[0];

    const router = useRouter();
    const ac = useDuelOriginStore.getState().checkOrigin() == "CREATE" ? RandomStateStore.getState().code : useDuelOriginStore.getState().checkOrigin();

    const routerHandle = () => {
        if (mode === "Duel") {
            checkState.getState().setState("duel");
            router.push("/gamemode/duel");
        } else {
            checkState.getState().setState("gamemode");
            router.push("/gamemode");
        }
    };

    const hostID = useJoinedHandler(state => state.hostID)
    const clientID = useJoinedHandler(state => state.clientID)

    // WebSocket needs to be implemented here
    const sliderRange = {
        initHp: {min: 1, max: 100},
        minionCount: {min: 1, max: 5},
        maxTurn: {min: 1, max: 100},
        initBudget: {min: 1, max: 100},
        maxBudget: {min: 1, max: 100},
        interestPct: {min: 1, max: 100},
        hexPurchaseCost: {min: 1, max: 100},
        spawnCost: {min: 1, max: 100},
        maxSpawn: {min: 1, max: 100},
    }
    const left: number = -100;
    const borderColor: string = "grey";
    const sliderColor: string = "white";

    const {
        config,
        setHp,
        setMinions,
        setTurnMax,
        setStartingBudget,
        setMaximumBudget,
        setInterest,
        setHexCost,
        setSpawningCost,
        setMaximumSpawn,
        setTurnBudget,
        setAll,
        reset
    } = useConfigStore()

    return (
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="Create Room">
                <p className="text-color-[#000] w-[800px] text-[70px] font-jersey25 tracking-[5px] absolute top-[-380px] text-center">Mode {mode}</p>
                <div className="box-content fixed left-0 top-0 w-[50%] h-full" style={{backgroundColor: "#B8B8B8"}}>
                    <h1 className="text-color-[#000] text-[70px] font-jersey25 tracking-[2px] absolute top-5 left-44">
                        Configuration
                        <div className="box-content fixed left-10 top-35 w-[44.5%] h-[70%]"
                             style={{backgroundColor: "#D9D9D9"}}>

                            <Slider min={sliderRange.initHp.min} max={sliderRange.initHp.max} bottom={500} left={left}
                                    overlayText="Init HP" borderColor={borderColor} sliderColor={sliderColor}
                                    value={config._Hp}
                                    setState={setHp}></Slider>
                            <Slider min={sliderRange.maxTurn.min} max={sliderRange.maxTurn.max} bottom={450} left={left}
                                    overlayText="Max turn" borderColor={borderColor} sliderColor={sliderColor}
                                    value={config._turnMax}
                                    setState={setTurnMax}></Slider>
                            <Slider min={sliderRange.initBudget.min} max={sliderRange.initBudget.max} bottom={400}
                                    left={left} overlayText="Init Budget" borderColor={borderColor}
                                    sliderColor={sliderColor}
                                    value={config._startingBudget}
                                    setState={setStartingBudget}></Slider>
                            <Slider min={sliderRange.maxBudget.min} max={sliderRange.maxBudget.max} bottom={350}
                                    left={left} overlayText="Max Budget" borderColor={borderColor}
                                    sliderColor={sliderColor}
                                    value={config._maximumBudget}
                                    setState={setMaximumBudget}></Slider>
                            <Slider min={sliderRange.interestPct.min} max={sliderRange.interestPct.max} bottom={300}
                                    left={left} overlayText="Interest Pct" borderColor={borderColor}
                                    sliderColor={sliderColor}
                                    value={config._interest}
                                    setState={setInterest}></Slider>
                            <Slider min={sliderRange.hexPurchaseCost.min} max={sliderRange.hexPurchaseCost.max}
                                    bottom={250} left={left} overlayText="Hex Purchase Cost" borderColor={borderColor}
                                    sliderColor={sliderColor}
                                    value={config._hexCost}
                                    setState={setHexCost}></Slider>
                            <Slider min={sliderRange.spawnCost.min} max={sliderRange.spawnCost.max} bottom={200}
                                    left={left} overlayText="Spawn Cost" borderColor={borderColor}
                                    sliderColor={sliderColor}
                                    value={config._spawningCost}
                                    setState={setSpawningCost}></Slider>
                            <Slider min={sliderRange.maxSpawn.min} max={sliderRange.maxSpawn.max} bottom={150}
                                    left={left} overlayText="Max Spawn" borderColor={borderColor}
                                    sliderColor={sliderColor}
                                    value={config._maximumSpawn}
                                    setState={setMaximumSpawn}></Slider>
                            <Slider min={sliderRange.minionCount.min} max={sliderRange.minionCount.max} bottom={100}
                                    left={left} overlayText="Each Minions Per Team" borderColor={borderColor}
                                    sliderColor={sliderColor}
                                    value={config._minions}
                                    setState={setMinions}></Slider>
                            <div className="absolute w-[200px] h-[40px] bottom-[30px] left-[35%]"
                                 style={{backgroundColor: "#a8a8a8"}}>
                                <p className="text-white text-[25px] text-center" onClick={reset}>Set to
                                    default</p>
                            </div>

                        </div>
                    </h1>
                </div>
                <CodeHost number_={ac}></CodeHost>
                <ProfileConfig online1={hostID != "null"} online2={clientID != "null"} team={1} left={900}
                               top={310}></ProfileConfig>
                {/* <ProfileConfig online={false} team={2} left={900} top={425}></ProfileConfig> */}
                {/* <Button src="/purple_btn.PNG" alt="Back"  overlayText="Back" bottom="-320" left="75" color="#6a0dad" onClick={moveToSelectPage} font_size="50" height="150" width="250"/> */}
                {/* <Button src="/purple_opaque.PNG" alt="Play"  overlayText="Play" bottom="-320" left="375" color="#6a0dad30" onClick={()=>{}} font_size="70" height="150" width="250" /> */}

            </GameLayout>
        </>
    )
}