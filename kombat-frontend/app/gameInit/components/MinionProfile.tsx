import {useState} from "react"
import {useEffect} from "react"
import Image from "next/image"
import {create} from "zustand";
import Button from "../../../components/Button";
import Slider from "../../../components/Slider";
import {useMinionBlueprintsStore} from "../Store/MinionBlueprint";

interface minionProfileProps {
    minionIndex: number
    onReturn: (val: string) => void;
}


interface MinionStore {
    minionName: string;
    defFactor: number;
    setMinionNameZus: (val: string) => void;
    setDefFactor: (val: number) => void;
}

export const useMinionStore = create<MinionStore>((set) => ({
    minionName: "Knight",
    defFactor: 0,
    setMinionNameZus: (val) => set({minionName: val}),
    setDefFactor: (val) => set({defFactor: val})
}));

export default function MinionProfile({minionIndex, onReturn}: minionProfileProps) {
    const {minionBlueprints,isInitialized,setBlueprint} = useMinionBlueprintsStore();

    const sliderRange = {
        defFactor: {min: 1, max: 999}
    }
    const [config, setConfig] = useState({defFactor: sliderRange.defFactor.max})
    const [minionSpriteIndex, setMinionSpriteIndex] = useState(0)

    const images = ["Knight", "Madoka", "Medicine", "Ryuu-chan", "Scarlet"];

    useEffect(() => {
        onReturn(images[minionIndex]);
        if (isInitialized)
        setMinionSpriteIndex(images.indexOf(minionBlueprints[minionIndex].spriteName == "" ? "Knight" : minionBlueprints[minionIndex].spriteName ));
    }, [minionIndex]);

    if (!isInitialized) return <></>

    const changeMinionName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlueprint(minionIndex,{...minionBlueprints[minionIndex],name:e.target.value});
    };


    const handleDefFactorChange = (value: number) => {
        setBlueprint(minionIndex,{...minionBlueprints[minionIndex],def:value});
    }

    const left: number = 590;
    const borderColor: string = "grey";
    const sliderColor: string = "white";


    const incrementUp = () => {
        const next = (minionSpriteIndex + 1) % 5;
        setMinionSpriteIndex(next);
        setBlueprint(minionIndex,{...minionBlueprints[minionIndex],spriteName:images[next]})
    }

    const incrementDown = () => {
        const next = (minionSpriteIndex + 4) % 5;
        setMinionSpriteIndex(next);
        setBlueprint(minionIndex,{...minionBlueprints[minionIndex],spriteName:images[next]})
    }

    return (
        <>
            {/*Minion Images*/}
            <div className=" absolute top-[190px] left-[990px]">
                <img src="/forest.jpg" alt="minion_bg w-full h-full" className="w-60 h-80"/>
                <img className="absolute left-[60px] bottom-[80px]" src={"/minions/" + images[minionSpriteIndex] + ".png"}
                     alt="slide" width={100} height={100}/>
            </div>

            {/*Change Images*/}
            <Button onClick={incrementUp} src="/right_btn.PNG" alt="Right Side Button" overlayText="" bottom="453"
                    left="1228" color="purple" font_size="0" height="60" width="100"></Button>
            <Button onClick={incrementDown} src="/left_btn.PNG" alt="Left Side Button" overlayText="" bottom="460"
                    left="890" color="purple" font_size="0" height="60" width="100"></Button>
            <div className="absolute top-[550px] left-[1010px] w-50 h-15 ">
                <Image src="/nameMinion_btn.PNG" alt="name box" width={200} height={60}></Image>
                <input type="text" value={minionBlueprints[minionIndex].name} onChange={changeMinionName}
                       className="absolute top-[0px] left-[0px] w-full h-full text-[30px] text-center font-jersey25"/>
            </div>
            <div className="bg-white absolute">
                <Slider min={sliderRange.defFactor.min} max={sliderRange.defFactor.max} bottom={120} left={left}
                        overlayText="Defense Factor" borderColor={borderColor} sliderColor={sliderColor}
                        value={minionBlueprints[minionIndex].def} setState={handleDefFactorChange}></Slider>
            </div>
        </>
    )
}