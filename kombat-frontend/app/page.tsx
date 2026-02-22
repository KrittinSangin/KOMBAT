import Image from "next/image";
import PlayButton from "../components/PlayButton";

export default function Homepage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
    <Image
      src="/homepage_bg.jpeg"
      alt="homepage"
      fill
      priority
      className="object-cover"
    />
     </div>
    <h1 className="
    relative 
    bottom-30 left-3
    font-jersey25 
    text-[#000] 
    [text-shadow:_7px_7px_0_#fff,_-7px_-7px_0_#fff,_7px_-7px_0_#fff,_-7px_7px_0_#fff]
    text-[170px] 
    font-[400] 
    leading-[152%] 
    tracking-[10.24px] 
    drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
  ">
    KOMBAT
  </h1>
  <PlayButton src="" alt="play" overlayText="Play"></PlayButton>
    </main>
    
  );
}