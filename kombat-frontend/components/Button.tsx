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
}

export default function Button({src,alt,overlayText,onClick,onHover,bottom,left,color}:PlayButtonProps){
    return (
    <div onClick={onClick} className="absolute h-20 w-60 bg-linear-65 border-4"
    style={{bottom:`${bottom}px`, left:`${left}px`,borderColor:color}}>
      <Image
        src={src}
        alt={alt} 
        fill
        unoptimized
      />

      <div className="absolute inset-0 flex items-center justify-center text-center">
        <p className="font-jersey25 text-white text-7xl">
          {overlayText}
        </p>
      </div>
    </div>
    );
}