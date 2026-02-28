"use client";

import GameLayout from "../../components/GameLayout";
import PlayButton from "../../components/Button";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <GameLayout src="/homepage_bg.jpeg" alt="Forbidden Access">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="
          font-jersey25 
          text-[#6a0dad]
          text-[120px] 
          font-[400] 
          leading-[152%] 
          tracking-[10.24px]
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          [text-shadow:_2px_2px_0_#fff,_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff]
        ">
          403
        </h1>

        <h2 className="
          font-jersey25
          text-[#fff]
          text-[60px]
          font-[400]
          tracking-[5px]
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
          [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000]
          text-center
        ">
          Access Denied
        </h2>

        <p className="
          max-w-md
          text-center
          text-[24px]
          text-[#fff]
          font-semibold
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
          [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000]
        ">
          You don't have permission to access this path. Please return to the home page to continue.
        </p>

        <PlayButton
          src="/purple_btn.PNG"
          alt="home"
          overlayText="Go Home"
          onClick={handleGoHome}

          bottom="-180"
          left="125"
          color="#6a0dad"
          font_size="50"
          height="150"
          width="230"
        />
      </div>
    </GameLayout>
  );
}
