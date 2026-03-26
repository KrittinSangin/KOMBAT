import Image from "next/image";
import {useEffect, useState} from "react";
import Slider from "./Slider";

import {minionPreview} from "../app/gameInit/page";

const MinionArr = minionPreview.getState().exportedDeck


interface MinionpreviewProps {
    minionIndex: number;
}

const sliderRange = {
    defFactor: {min: 1, max: 100},
};

const left: number = 215;
const borderColor: string = "grey";
const sliderColor: string = "white";

export default function Minionpreview({minionIndex}: MinionpreviewProps) {
    const [minionName, setMinionName] = useState(`Minion${minionIndex + 1}`);

    useEffect(() => {
        setMinionName(`Minion${minionIndex + 1}`);
    }, [minionIndex]);

    const MinionAtIndex = MinionArr.at(minionIndex);
    return (
        <>
            <div className=" absolute top-[190px] left-1/2 -translate-x-1/2">
                <div className="bg-white px-1">
                    {MinionAtIndex?.strategyFileName}
                </div>
                <img
                    src="/forest.jpg"
                    alt="minion_bg w-full h-full"
                    className="w-60 h-80"
                />
                <img
                    src={`/minions/${MinionAtIndex?.spriteName == "" ? "Knight" : MinionAtIndex?.spriteName}.png`}
                    className="absolute left-1/8 size-[70%] bottom-[30px]"
                />
            </div>
            <div className="absolute top-[550px] left-1/2 -translate-x-1/2 w-50 h-15 ">
                <Image
                    src="/nameMinion_btn.PNG"
                    alt="name box"
                    width={200}
                    height={60}
                ></Image>
                <h1 className="absolute top-[10px]  w-full h-full text-[30px] text-center font-jersey25">
                    {MinionAtIndex?.name}
                </h1>
                <Image
                    src="/DefenseFactor.png"
                    alt="1"
                    className="absolute top-[-50] right-60"
                    width={150}
                    height={150}
                >

                </Image>
                <div className="absolute right-75 top-[52] ">
                    <p className="text-2xl text-white"> {MinionAtIndex?.def == undefined ? 0 : MinionAtIndex.def}</p>
                </div>
                <div className="absolute left-60 top-[10] rounded-lg px-2 py-2 bg-stone-600 shadow-lg shadow-black">
                    <p className="text-2xl text-white"> {`${MinionAtIndex?.spriteName}`}</p>
                </div>
            </div>
            <div className="bg-white absolute flex">


            </div>
        </>
    );
}
