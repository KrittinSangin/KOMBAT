import { useEffect, useState } from "react";

interface ProfileConfigProps {
    team: number;
    left:number;
    top:number;
    online:boolean; 
    // true=online, false=offline
}

export default function ProfileConfig({ team, left, top, online }: ProfileConfigProps) {
    const [playerName, setPlayerName] = useState("Player" + String(team));
    let Online:string = "#3ee64c";
    let Offline:string = "#c62323";

    const NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setPlayerName(e.target.value);
  };

    return(
        <>
            <div className="fixed w-[400px] h-[90px]" style={{ left:`${left}px`, top:`${top}px`, backgroundColor: "#B8B8B8" }}>
                <div className="absolute left-3.5 top-3.5 w-[60px] h-[60px] bg-white"></div>
                <input type="text" value={playerName} onChange={NameChange} className="absolute top-6 left-25 w-45 h-10 text-[50px] font-jersey25" />
                <div className="w-8 h-8 rounded-full absolute left-[330px] top-[30px]" style={{backgroundColor: online ? Online : Offline}}></div>    
            </div>
        </>
    )
}