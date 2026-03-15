import RightSide from "./RightSide"
import LeftSide from "./LeftSide"
import { useState } from "react"
import Slider from "./Slider"
import { useEffect } from "react"
import Image from "next/image"

interface minionProfileProps{
    minionIndex:number
}

export default function MinionProfile({minionIndex}:minionProfileProps){
    const [minionName, setMinionName] = useState(`Minion${minionIndex + 1}`);

    useEffect(() => {
    setMinionName(`Minion${minionIndex + 1}`);
  }, [minionIndex]);

    const minionNameChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
     setMinionName(e.target.value);
  };

  const sliderRange = {
       defFactor: { min: 1, max: 5 }
  }
  
  const handleDefFactorChange = (value: number) => {
    setConfig(prev => ({
      ...prev,
      defFactor: value
    }))
  }
  
  const [config, setConfig] = useState({defFactor: sliderRange.defFactor.max})

    let left:number=590;
    let borderColor:string = "grey";
    let sliderColor:string = "white";

    return(
        <>
            <div className=" absolute top-[190px] left-[990px]">
                <img src="/forest.jpg" alt="minion_bg w-full h-full" className="w-60 h-80"/>
            </div>
            <RightSide></RightSide>
            <LeftSide></LeftSide>
            <div className="absolute top-[550px] left-[1010px] w-50 h-15 ">
                <Image src="/nameMinion_btn.PNG" alt="name box"   width={200} height={60}></Image>
                <input type="text" value={minionName} onChange={minionNameChange} className="absolute top-[0px] left-[0px] w-full h-full text-[30px] text-center font-jersey25" />
            </div>
               <Slider min={sliderRange.defFactor.min} max={sliderRange.defFactor.max} bottom={140} left={left} overlayText="Init HP" borderColor={borderColor} sliderColor={sliderColor} value={config.defFactor} setState={handleDefFactorChange}></Slider>
        </>
    )
}