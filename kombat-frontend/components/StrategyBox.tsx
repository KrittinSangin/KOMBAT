"use client"

import Dropdown from "./Dropdown";

export default function StrategyBox(){
    const months = ["jan", "feb"];
    return(
        <>
            <div className="z-10 absolute w-[50%] h-[100%] bg-[#F1F1F1] top-[0px] left-[0px] ">
                <div className="z-10 absolute w-[100%] h-[5%] bg-[#D9D9D9] top-[80px] left-[0px]">
                    <p  className="text-3xl text-center" style={{color:"#696969"}}>Strategy</p>
                </div>
            <div>
                <Dropdown></Dropdown>
            </div>
            </div>
        </>
    )
}