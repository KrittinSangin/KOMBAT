"use client";

import { useEffect, useState } from "react";
import GameLayout from "../../../components/GameLayout"
import Button from "../../../components/Button"
import { useRouter } from "next/navigation";
import { checkState } from "../../page";
import { rand } from "./join_room/page";
export default function DuelPage(){
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (checkState.getState().state !== "duel") {
      router.push("/forbidden");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);


    const moveToGameModePage = () => {
      checkState.getState().setState("gamemode");
    router.push("/gamemode");
  };

        const moveToConfigPage = (mode: string) => {
    checkState.getState().setState("duel_create_room");
  rand.getState().randomixe(); 

// TODO: Send the randomized code to the back-end here before navigating to the configuration page
// possibly fetch(env.LINK+"/???")
  console.log(rand.getState().code);

    router.push(`/configuration?mode=${mode}`);
  };

    const moveToJoinRoomPage = () => {
    router.push("/gamemode/duel/join_room");
  };

  if (!isAuthorized) {
    return (
      <GameLayout src="/homepage_bg.jpeg" alt="Duel" />
    );
  }

    return(
        <>
            <GameLayout src="/homepage_bg.jpeg" alt="Duel">
                <h1 className="relative
    bottom-70 left-0
    font-jersey25 
    text-[#000] 
    text-[100px]  
    tracking-[5px] ">
                    Duel
                </h1>
                    <Button src="/grey_btn.PNG" alt="Create Room" overlayText="Create Room" font_size="50" height="300" width="500" color="grey" bottom="-50" left="-400" onClick={() => moveToConfigPage("Duel")}></Button>
                    <Button src="/grey_btn.PNG" alt="Join Room" overlayText="Join Room" font_size="50" height="300" width="500" color="grey" bottom="-50" left="100" onClick={moveToJoinRoomPage} ></Button>
                    <Button src="/purple_btn.PNG" alt="Back" overlayText="Back" font_size="70" height="150" width="250" color="#6a0dad" bottom="-269" left="-550" onClick={moveToGameModePage}></Button>
            </GameLayout>
        </>
    )
}