"use client";

import Button from "../../../../components/Button";
import { useRouter } from "next/dist/client/components/navigation";
import { checkState } from "../../../page";
import { useState } from "react";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import GameLayout from "../../../gameInit/components/GameLayout";
import {useDuelOriginStore} from "../../Store/DuelOriginStore";


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

    const attemptToJoin = () => {
     const fetcher = async () => { 
            return await fetch(`${process.env.NEXT_PUBLIC_LINK}/data/join`, {
            method: 'POST', 
            body: Code
            })
        }
        fetcher().then(async response => {
           
                const data = await response.json();
                // console.log(data.isSuccess);
                if(data.isSuccess){
                useDuelOriginStore.getState().setOrigin(`${Code}`);
                router.push("/configuration/deepweb1?mode=Duel");
            } else {
                alert("Room does not exist. Please check the code and try again.");
                return
            }
         }).catch(error => {
            if(error == "TypeError: Failed to fetch"){
                alert("Server might be down. Please try again later.");
                return;
            }
            alert("Failed to connect to the server: " + error + "\nPlease try again later.");
            return;
         });

    }


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
            <Button src="/purple_btn.PNG" alt="Back"  overlayText="Back" bottom="-295" left="-439" color="#6a0dad" font_size="70" height="150" width="250" onClick={moveToDuelSelectPage}/>
            <Button src="/purple_btn.PNG" alt="Join"  overlayText="Join" bottom="-295" left="600" color="#6a0dad" font_size="70" height="150" width="250" onClick={attemptToJoin}/>
            </GameLayout>
        </>
    )
}