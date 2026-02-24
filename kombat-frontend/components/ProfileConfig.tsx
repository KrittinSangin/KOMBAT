import { useEffect, useState } from "react";

interface ProfileConfigProps {
    team: number;
}

export default function ProfileConfig({ team }: ProfileConfigProps) {
    const [playerName, setPlayerName] = useState("Player" + String(team));

    const NameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setPlayerName(e.target.value);
  };

    return(
        <>
            <div className="fixed left-[900px] top-[270px] w-[400px] h-[90px]" style={{ backgroundColor: "#B8B8B8" }}>
                <div className="absolute left-3.5 top-3.5 w-[60px] h-[60px] bg-white"></div>
                <input type="text" value={playerName} onChange={NameChange} className="absolute top-6 left-25 w-45 h-10 text-[50px] font-jersey25" />
            </div>
        </>
    )
}