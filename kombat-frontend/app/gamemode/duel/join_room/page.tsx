"use client";

import Button from "../../../../components/Button";
import GameLayout from "../../../../components/GameLayout";
import { useRouter } from "next/dist/client/components/navigation";
import { checkState } from "../../../page";
import { useState } from "react";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type RandState = {
  code: string;
  randomixe: () => void;
};

export const rand = create<RandState>()(
  persist(
    (set) => ({
      code: "",
      randomixe: () =>
        set({ code: Math.random().toString(36).substring(2, 6).toUpperCase() }),
    }),
    {
      name: "rand-storage", // key in localStorage
    }
  )
);
export default function JoinRoomPage(){
    const router = useRouter();
    const [Code, setCode] = useState("");

    const CodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const moveToDuelSelectPage = () => {
    checkState.getState().setState("duel");
        router.push("/gamemode/duel");
    };

    return (
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="Join Room" >
            <p className="text-color-[#000] w-[1000px] text-[70px] font-jersey25 tracking-[5px] absolute top-[-325px] left-[-20px]">Duel : Join Room</p>
                <div className="items-center w-[400px] h-[90px]" style={{ left:"200px", top:"300px", backgroundColor: "#B8B8B8" }}>
                    <div className="absolute left-41 top-3.5 w-[220px] h-[60px] bg-white"> 
                        <input type="text" value={Code} onChange={CodeChange} className="absolute top-[10px] left-[20px] w-45 h-10 text-[50px] font-jersey25" />
                    </div>
                    <p className="absolute left-10 text-[50px] top-2 text-black font-jersey25">Code</p>
                </div>
            <Button src="" alt="Back"  overlayText="Back" bottom="-300" left="-400" color="#6a0dad" font_size="70" height="90" width="200" onClick={moveToDuelSelectPage}/>
            <Button src="" alt="Join"  overlayText="Join" bottom="-300" left="600" color="#6a0dad" font_size="70" height="90" width="200"/>
            </GameLayout>
        </>
    )
}