"use client";
import {useState} from "react";

interface Sliderprops {
    min: number
    max: number
    bottom: number
    left: number
    overlayText: string
    borderColor: string
    sliderColor: string
    setState?: (value: number) => void
    value: number
}


export default function Slider({
                                   min,
                                   max,
                                   bottom,
                                   left,
                                   overlayText,
                                   borderColor,
                                   sliderColor,
                                   setState,
                                   value
                               }: Sliderprops) {
    const percentage = ((value - min) / (max - min)) * 100;
    const clamp = (num: number) => {
        return Math.min(max, Math.max(min, num));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = (clamp(Number(e.target.value)));
        setState?.(newValue)
    };

    return (
        <div className="flex w-180 gap-5 absolute" style={{bottom: `${bottom}px`, left: `${left}px`}}>
            <p className="text-xl w-250 text-right">{overlayText}</p>
            <input type="range"

                   style={{
                       accentColor: borderColor, background: `linear-gradient(to right,
    ${sliderColor} ${percentage}%,
    ${borderColor} ${percentage}%)`,
                       "--thumb-color": sliderColor
                   } as React.CSSProperties}

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
                   onChange={handleChange}/>
            <input type="text" min={min} max={max} value={value} onChange={(e) => {
                const onlyNumber = e.target.value.replace(/\D/g, "");
                const newValue = (clamp(Number(onlyNumber)));
                setState?.(newValue)
            }}
                   className="w-10 h-10 text-xl font-jersey25"/>
            {/* <p className="absolute text-3xl bottom--5 left-125 text-[#000000]" >{value}</p> */}
        </div>
    )
}