import {Game} from "../../type/GameTypes";
import UnitSelect from "../UI/UnitSelect";
import GameInfoBar from "../UI/GameInfoBar";
import NoticeWindow from "../UI/NoticeWindow";
import EventLog from "../UI/EventLog";

interface Props {
    game: Game
}

export default function UICanvas({game}: Props) {

    return <div className="w-full h-full"
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                }}>
        <UnitSelect deck={game.players[game.team].deck}></UnitSelect>
        <GameInfoBar/>
        <NoticeWindow text={""} hidden={true}/>
        <EventLog hidden={true}/>
    </div>
}