import RightSide from "./RightSide"
import LeftSide from "./LeftSide"
import { useState } from "react"
import Slider from "./Slider"

export default function MinionProfile(){
    const [minionName,setMinionName] = useState("Minion1")

    const minionNameChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
     setMinionName(e.target.value);
  };

    return(
        <>
            <div className="z-50 absolute top-[190px] left-[990px]">
                <img src="/forest.jpg" alt="minion_bg w-full h-full" className="w-60 h-80"/>
            </div>
            <RightSide></RightSide>
            <LeftSide></LeftSide>
            <div className="absolute top-[550px] left-[1010px] w-50 h-15 " style={{backgroundColor:"#fbffb5"}}>
                <input type="text" value={minionName} onChange={minionNameChange} className="absolute top-[0px] left-[0px] w-full h-full text-[30px] text-center font-jersey25" />
            </div>
            <Slider min={0} max={100} bottom={100} left={660} value={0} overlayText={"Defense Factor"} borderColor={"#00000"} sliderColor={"#919191"} ></Slider>
        </>
    )
}