import Image from "next/image";

export default function Homepage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
    <Image
      src="/homepage_bg.jpeg"
      alt="homepage_bg"
      fill
      priority
      className="object-cover"
    />
     </div>
    <h1 className="
    relative 
    font-jersey25 
    text-[#000] 
    [text-shadow:_7px_7px_0_#fff,_-7px_-7px_0_#fff,_7px_-7px_0_#fff,_-7px_7px_0_#fff]
    text-[256px] 
    font-[400] 
    text-center 
    leading-[152%] 
    tracking-[10.24px] 
    drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
  ">
    KOMBAT
  </h1>
    </main>
  );
}