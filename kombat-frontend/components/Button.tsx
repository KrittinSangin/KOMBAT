"use client";

import Image from 'next/image';

interface PlayButtonProps {
    src: string;
    alt: string;
    overlayText: string;
    onClick?: React.MouseEventHandler
    bottom: string;
    left: string;
    onHover?: React.MouseEventHandler
    color: string;
    font_size: string;
    height: string;
    width: string;
}

export default function Button({
                                   src,
                                   alt,
                                   overlayText,
                                   onClick,
                                   onHover,
                                   bottom,
                                   left,
                                   color,
                                   font_size,
                                   height,
                                   width
                               }: PlayButtonProps) {
    return (
        <div onClick={onClick} className="absolute"
             style={{height: `${height}px`, width: `${width}px`, bottom: `${bottom}px`, left: `${left}px`}}>
            <div className='relative w-full h-full'>

                <Image src={src} alt={alt} fill>
                </Image>
                <h1 className="absolute inset-0 flex items-center justify-center text-white mb-15"
                    style={{fontSize: `${font_size}px`}}>{overlayText}</h1>
            </div>
        </div>
    );
}