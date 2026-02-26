import Image from "next/image";
import { PropsWithChildren } from 'react';

interface GameLayoutProps{
    src:string;
    alt:string
}

export default function GameLayout({children,src,alt}:PropsWithChildren<GameLayoutProps>){
    return(
        <>
        <main className="relative z-0 min-h-screen w-full flex items-center justify-center">
            <Image
              src={src}
              alt={alt}
              priority
              fill
              className="object-cover"
            />
            <div className="relative z-10">{children}</div>
        </main>
        </>
    )
}