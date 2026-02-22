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
}

export default function Button({src,alt,overlayText,onClick,onHover,bottom,left,color,font_size,height,width}:PlayButtonProps){
    return (
    <div onClick={onClick} className="absolute bg-linear-65 border-4"
    style={{bottom:`${bottom}px`, left:`${left}px`,borderColor:color, width:`${width}px`,height:`${height}px`}}>
      <Image
        src={src}
        alt={alt} 
        fill
        unoptimized
      />

      <div className="absolute inset-0 flex items-center justify-center text-center">
        <p className="font-jersey25 text-white"
        style={{fontSize:`${font_size}px`}}>
          {overlayText}
        </p>
      </div>
    </div>
    );
}