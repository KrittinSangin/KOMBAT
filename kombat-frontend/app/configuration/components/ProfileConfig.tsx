import {ProfileConfigProps} from "../../../ttypes/type";
import {useGlobalPlayerStore} from "../Store/GlobalPlayerStore";

export default function ProfileConfig({ team, left, top, online1, online2 }: ProfileConfigProps) {
    const {player1,player2,setPlayer1Name,setPlayer2Name} = useGlobalPlayerStore();

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
            {team == 2 || team == 3 ? <img
                src="/robot.jpg"
                ></img> : <></>
                }
            </div>
        </div>
    );
}