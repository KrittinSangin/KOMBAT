import Image from "next/image"
import { useEffect,useState } from "react"

interface MinionpreviewProps{
    minionIndex:number;
}
  const sliderRange = {
       defFactor: { min: 1, max: 100 }
  }

    let left:number=590;
    let borderColor:string = "grey";
    let sliderColor:string = "white";

export default function Minionpreview({minionIndex}:MinionpreviewProps){
        const [minionName, setMinionName] = useState(`Minion${minionIndex + 1}`);
    
        useEffect(() => {
        setMinionName(`Minion${minionIndex + 1}`);
      }, [minionIndex]);
    return(<>
    <div className=" absolute top-[190px] left-[600px]">
        <img src="/forest.jpg" alt="minion_bg w-full h-full" className="w-60 h-80"/>
    </div>
    <div className="absolute top-[550px] left-[1010px] w-50 h-15 ">
                    <Image src="/nameMinion_btn.PNG" alt="name box"   width={200} height={60}></Image>
                    <h1 className="absolute top-[10px] left-[0px] w-full h-full text-[30px] text-center font-jersey25" >{minionName}</h1>
                </div>
                <div className = "bg-white absolute">
                   <Slider min={sliderRange.defFactor.min} max={sliderRange.defFactor.max} bottom={120} left={left} overlayText="Defense Factor" borderColor={borderColor} sliderColor={sliderColor} value={เอามา} setState={()=>{}}></Slider>
                </div>
    </>)
}