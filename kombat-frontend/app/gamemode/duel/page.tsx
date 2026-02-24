"use client";

import { useEffect, useState } from "react";
import GameLayout from "../../../components/GameLayout"
import Button from "../../../components/Button"
import { useRouter } from "next/navigation";
import { checkState } from "../../page";

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

    const moveToCreateRoomPage = () => {
    checkState.getState().setState("duel_create_room");
    router.push("/gamemode/duel/create_room");
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
                    <Button src="" alt="Create Room" overlayText="Create Room" font_size="20" height="300" width="400" color="grey" bottom="-50" left="-410" onClick={moveToCreateRoomPage}></Button>
                    <Button src="" alt="Join Room" overlayText="Join Room" font_size="20" height="300" width="400" color="grey" bottom="-50" left="200" onClick={moveToJoinRoomPage} ></Button>
                    <Button src="" alt="Back" overlayText="Back" font_size="20" height="100" width="200" color="#6a0dad" bottom="-260" left="-500" onClick={moveToGameModePage}></Button>
            </GameLayout>
        </>
    )
}