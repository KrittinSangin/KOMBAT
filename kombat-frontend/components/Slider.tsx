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
  <div className="flex flex-col items-center gap-0 w-5/7 max-w-3xl mx-auto my-1/8 m-0">
    
    <p className="text-xl font-jersey25 items-start md:w-6/6 w-full m-0">
      {overlayText}
    </p>

    <div className="flex flex-row w-full">
    <input
      type="range"
      style={{
        accentColor: borderColor,
        background: `linear-gradient(to right,
        ${sliderColor} ${percentage}%,
        ${borderColor} ${percentage}%)`,
        "--thumb-color": sliderColor
      } as React.CSSProperties}
      className="
        appearance-none
        w-full
        flex-1
        h-6
        rounded-full
        border-4 border-[#b1b1ab]
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:w-5
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-[var(--thumb-color)]
        [&::-webkit-slider-thumb]:border-2
        [&::-webkit-slider-thumb]:border-[var(--thumb-color)]
      "
      min={min}
      max={max}
      value={value}
      onChange={handleChange}
    />

    <input
      type="text"
      value={value}
      onChange={(e) => {
        const onlyNumber = e.target.value.replace(/\D/g, "");
        const newValue = clamp(Number(onlyNumber));
        setState?.(newValue);
      }}
      className="w-16 h-10 text-center text-xl font-jersey25"
    />
    </div>

  </div>
)
}