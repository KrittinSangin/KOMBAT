import Image from "next/image"
import { useEffect,useState } from "react"
import Slider from "./Slider";

interface MinionpreviewProps{
    minionIndex:number;
}
  const sliderRange = {
       defFactor: { min: 1, max: 100 }
  }

    let left:number=215;
    let borderColor:string = "grey";
    let sliderColor:string = "white";

export default function Minionpreview({minionIndex}:MinionpreviewProps){
        const [minionName, setMinionName] = useState(`Minion${minionIndex + 1}`);
    
        useEffect(() => {
        setMinionName(`Minion${minionIndex + 1}`);
      }, [minionIndex]);
    return(<>
    <div className=" absolute top-[190px] left-1/2 -translate-x-1/2">
        <img src="/forest.jpg" alt="minion_bg w-full h-full" className="w-60 h-80"/>
    </div>
    <div className="absolute top-[550px] left-1/2 -translate-x-1/2 w-50 h-15 ">
                    <Image src="/nameMinion_btn.PNG" alt="name box"   width={200} height={60}></Image>
                    <h1 className="absolute top-[10px]  w-full h-full text-[30px] text-center font-jersey25" >{minionName}</h1>
                </div>
                <div className = "bg-white absolute flex">
                   <Slider min={sliderRange.defFactor.min} max={sliderRange.defFactor.max} bottom={120} left={left} overlayText="Defense Factor" borderColor={borderColor} sliderColor={sliderColor} value={75} setState={()=>{}}></Slider>
                </div>
    </>)
}