"use client"

import Dropdown from "./Dropdown";

interface StrategyBoxprops{
    selectedMinion:number
    passedString : string
}

export default function StrategyBox({selectedMinion,passedString}:StrategyBoxprops){
    return(
        <>
            <div className="z-10 absolute w-[50%] h-[100%] top-[0px] left-[0px] " style={{backgroundColor:"#D9D9D9"}}>
                <div className="z-20 absolute w-[100%] h-[5%] top-[80px] left-[0px]">
                    <p  className="text-3xl text-center" style={{color:"#696969"}}>Strategy</p>
                </div>
                <Dropdown selectedMinion={String(selectedMinion+1)} selectedSprite={passedString} ></Dropdown>
            </div>
        </>
    )
}