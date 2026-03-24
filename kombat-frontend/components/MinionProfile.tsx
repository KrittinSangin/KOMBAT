import RightSide from "./RightSide"
import LeftSide from "./LeftSide"
import { useState } from "react"
import Slider from "./Slider"
import { useEffect } from "react"
import Image from "next/image"
import Button from "./Button"
import { create } from "zustand";
interface minionProfileProps{
    minionIndex:number
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
  setMinionNameZus: (val) => set({ minionName: val }),
  setDefFactor: (val) =>set({defFactor: val})
}));

export default function MinionProfile({minionIndex, onReturn}:minionProfileProps ){
    const [minionName, setMinionName] = useState(`Minion${minionIndex + 1}`);

    useEffect(() => {
    setMinionName(`Minion${minionIndex + 1}`);
  }, [minionIndex]);

    const minionNameChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
     setMinionName(e.target.value);
  };

  const sliderRange = {
       defFactor: { min: 1, max: 100 }
  }
  const [config, setConfig] = useState({defFactor: sliderRange.defFactor.max})
  
  const handleDefFactorChange = (value: number) => {
    setConfig(prev => ({
      ...prev,
      defFactor: value
    }))
    useMinionStore.getState().setDefFactor(config.defFactor)
  }
  

    let left:number=590;
    let borderColor:string = "grey";
    let sliderColor:string = "white";


  const [incrementer, setIncrement] = useState(0)
  const incrementUp = () => {
  const next = (incrementer + 1) % 5;
  setIncrement(next);
  useMinionStore.getState().setMinionNameZus(images[next]); 
}

const incrementDown = () => {
  const next = (incrementer + 4) % 5;
  setIncrement(next);
  useMinionStore.getState().setMinionNameZus(images[next]);
}

  const images = ["Knight","Madoka","Medicine","Ryuu-chan","Scarlet"];
useEffect(() => {
  onReturn(images[minionIndex]);
}, [minionIndex]);

useEffect(() => {
  useMinionStore.getState().setDefFactor(config.defFactor)
}, [config.defFactor]);

    return(
        <>
            <div className=" absolute top-[190px] left-[990px]">
                <img src="/forest.jpg" alt="minion_bg w-full h-full" className="w-60 h-80"/>
                <img className="absolute left-[30px] bottom-[40px] w-[180px] h-[200px]" src={"/minions/" + images[incrementer] +".png"} alt="slide" width={100} height={100} />

            </div>
      <Button onClick= {incrementUp} src="/right_btn.PNG" alt="Right Side Button" overlayText="" bottom="453" left="1228" color="purple" font_size="0" height="60" width="100"></Button>
      <Button onClick= {incrementDown} src="/left_btn.PNG" alt="Left Side Button" overlayText="" bottom="460" left="890" color="purple" font_size="0" height="60" width="100"></Button>
            <div className="absolute top-[550px] left-[1010px] w-50 h-15 ">
                <Image src="/nameMinion_btn.PNG" alt="name box"   width={200} height={60}></Image>
                <h1 onChange={minionNameChange} className="absolute top-[10px] left-[0px] w-full h-full text-[30px] text-center font-jersey25" >{minionName}</h1>
            </div>
            <div className = "bg-white absolute">
               <Slider min={sliderRange.defFactor.min} max={sliderRange.defFactor.max} bottom={120} left={left} overlayText="Defense Factor" borderColor={borderColor} sliderColor={sliderColor} value={config.defFactor} setState={handleDefFactorChange}></Slider>
            </div>
        </>
    )
}