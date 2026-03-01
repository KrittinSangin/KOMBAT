import {Game} from "../../type/gameStates";
import UnitSelect from "../UI/UnitSelect";
import GameNavigationBar from "../UI/GameNavigationBar";
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
        <GameNavigationBar/>
        <NoticeWindow/>
        <EventLog/>
    </div>
}