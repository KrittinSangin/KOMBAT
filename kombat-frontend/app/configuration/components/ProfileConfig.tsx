import { ProfileConfigProps } from "../../../ttypes/type";
import { create } from "zustand";
import { NameOf2Players } from "../../../ttypes/type";

export const Global2Players = create<NameOf2Players>((set) =>({
    player1 : "Player1",
    player2 : "Player2",
    setPlayer1Name: (value: string) => set({player1 : value}),
    setPlayer2Name: (value: string) => set({player2 : value})
}))

export default function ProfileConfig({ team, left, top, online1, online2 }: ProfileConfigProps) {
    const player1 = Global2Players(s => s.player1);
    const player2 = Global2Players(s => s.player2);
    const setPlayer1Name = Global2Players(s => s.setPlayer1Name);
    const setPlayer2Name = Global2Players(s => s.setPlayer2Name);

    const Online = "#3ee64c";
    const Offline = "#c62323";
   
    return (
        <div
            className="fixed w-[400px] h-[210px] border-3"
            style={{ left: `${left}px`, top: `${top}px`, backgroundColor: "#B8B8B8" }}
        >
            <div className="absolute left-3.5 top-3.5 w-[60px] h-[60px] bg-white"></div>
            <input
                type="text"
                value={player1}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="absolute top-6 left-25 w-45 h-10 text-[50px] font-jersey25"
            />
            <div
                className="w-8 h-8 rounded-full absolute left-[330px] top-[30px]"
                style={{ backgroundColor: online1 ? Online : Offline }}
            >
                {team == 3 ? <img
                src="/robot.jpg"
                ></img> : <></>
                }
            </div>

            <div className="absolute left-3.5 top-32.5 w-[60px] h-[60px] bg-white"></div>
            <input
                type="text"
                value={player2}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="absolute top-35 left-25 w-45 h-10 text-[50px] font-jersey25"
            />
            <div
                className="w-8 h-8 rounded-full absolute left-[330px] top-[140px]"
                style={{ backgroundColor: online2 ? Online : Offline }}
            >
            {team == 2 || 3 ? <img
                src="/robot.jpg"
                ></img> : <></>
                }
            </div>
        </div>
    );
}