"use client";
import { useState } from "react";

interface Sliderprops {
    min:number
    max:number
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
    bottom:number
    left:number
    overlayText:string
    borderColor:string
    sliderColor:string
}


export default function Slider({min, max, onChange,bottom,left,overlayText, borderColor, sliderColor}:Sliderprops){
  const [value, setValue] = useState(min);
  const percentage = ((value - min) / (max - min)) * 100;

  return(
    <div className="flex w-120 gap-5 absolute" style={{bottom:`${bottom}px`, left:`${left}px`}}>
      <p className="text-3xl w-40 text-center">{overlayText}</p>
      <input type="range" 
      
style={{accentColor:borderColor,background: `linear-gradient(to right,
    ${sliderColor} ${percentage}%,
    ${borderColor} ${percentage}%)`,
    "--thumb-color": sliderColor} as React.CSSProperties}

      className="static appearance-none w-full
      h-8 rounded-full border border-6 border-[#b1b1ab]
      

    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-5
    [&::-webkit-slider-thumb]:w-5
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-[var(--thumb-color)]
    [&::-webkit-slider-thumb]:border-3
    [&::-webkit-slider-thumb]:border-[var(--thumb-color)]" 

      min={min}
      max={max}
      value={value}
      onChange={(e)=>setValue(Number(e.target.value))} />
      <p className="absolute text-3xl bottom--5 left-125 text-[#000000]" >{value}</p>
    </div>
  )
}