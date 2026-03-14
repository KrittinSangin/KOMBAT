"use client";

import Image from 'next/image';

interface PlayButtonProps {
  src: string;
  alt: string;
  overlayText:string;
  onClick?:React.MouseEventHandler
  bottom: string;
  left: string;
  onHover?:React.MouseEventHandler
  color:string;
  font_size:string;
  height:string;
  width:string;
  opacity: string
  playAnim: string
}


export default function ButtonForInitPage({src,alt,overlayText,onClick,onHover,bottom,left,color,font_size,height,width,opacity,playAnim}:PlayButtonProps){
  let animationClass = "border-[#696969]";
  if (playAnim === "Failed") animationClass = "animate-shake";
  if (playAnim === "Passed") animationClass = "animate-jump";
  
  return (
    <div onClick={onClick} className={`${animationClass} absolute z-120  opacity-${opacity}`} style={{height:`${height}px`, width:`${width}px`,bottom:`${bottom}px`,left:`${left}px`}}>
      <div >

        <Image src={src} alt={alt} fill>
        </Image>
          <h1 className={`${animationClass} absolute inset-0 top-[30px] flex items-center justify-center text-black mb-15 opacity-${opacity}`} style={{fontSize:`${font_size}px`}}>{overlayText}</h1>
      </div>
    </div>
    );
}