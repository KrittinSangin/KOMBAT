"use client"
import GameLayout from "../../gameInit/components/GameLayout"
import {PermsConfig2ConfigAdapter, useConfigStore} from "../Store/useConfigStore"
import Slider from "../../../components/Slider"
import CodeHost from "../components/CodeHost"
import ProfileConfig from "../components/ProfileConfig"
import Button from "../../../components/Button"
import {useOriginStore} from "../../gamemode/Store/DuelOriginStore"
import {useRouter} from "next/navigation"
import {useGlobalPlayerStore} from "../Store/GlobalPlayerStore";
import {Config} from "../../../ttypes/type";

export type InitWithBotDTO = {
    config: Config,
    name1: string,
    name2: string
}

export default function SolitairePage() {
    const router = useRouter();

    const {player1, player2} = useGlobalPlayerStore();
    const {setOrigin,setModeSolitaire} = useOriginStore()

    const sliderRange = {
        initHp: {min: 1, max: 1000},
        minionCount: {min: 1, max: 5},
        maxTurn: {min: 1, max: 100},
        initBudget: {min: 1, max: 100000},
        maxBudget: {min: 1, max: 1000000},
        interestPct: {min: 1, max: 100},
        hexPurchaseCost: {min: 1, max: 10000},
        spawnCost: {min: 1, max: 10000},
        maxSpawn: {min: 1, max: 1000},
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
        reset,
        fetchDefaultConfig
    } = useConfigStore()

    const SendDirectlyToBack = async () => {
        setOrigin("CREATE")
        setModeSolitaire()

        try {
            const send: InitWithBotDTO = {
                config: PermsConfig2ConfigAdapter(config),
                name1: player1,
                name2: player2
            };
            const res = await fetch(`${process.env.NEXT_PUBLIC_LINK}/data/initWithBot`, {
                method: "POST",
                body: JSON.stringify(send),
                headers: {
                    "content-type": "application/json"
                }
            });

            if (res.ok) {
                router.push("/gameInit");
            } else {
                console.error("Backend rejected the configuration.");
            }
        } catch (error) {
            console.error("Network error occurred:", error);
        }
    }

    return (
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="Create Room">
                <p className="text-color-[#000] w-[800px] text-[70px] font-jersey25 tracking-[5px] absolute top-[-380px] text-center">Mode
                    Solitaire</p>
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
                                <p className="text-white text-[25px] text-center" onClick={fetchDefaultConfig}>Set to
                                    default</p>
                            </div>

                        </div>
                    </h1>
                </div>
                <CodeHost number_={"><:>"}></CodeHost>
                <ProfileConfig online1={true} online2={true} team={2} left={900}
                               top={310}></ProfileConfig>
                <Button src="/purple_btn.PNG" alt="Back" overlayText="Start" onClick={SendDirectlyToBack} bottom="-350"
                        left="300" color="#6a0dad" font_size="50" height="150" width="250"></Button>
            </GameLayout>
        </>
    )
}