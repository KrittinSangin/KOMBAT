import {Game} from "../../type/GameTypes";
import UnitSelect from "../UI/UnitSelect";
import GameInfoBar from "../UI/GameInfoBar";
import NoticeWindow from "../UI/NoticeWindow";
import EventLog from "../UI/EventLog";
import GenericButton from "../../../Generic/GenericButton";
import {genGameDTO} from "../../model/randomizer";
import {useGameState} from "../../model/useGameState";

interface Props {
    game: Game
}

export default function UICanvas({game}: Props) {
    const {start,update,reset} = useGameState();



    return <div className="w-full h-full"
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                }}>
        <GenericButton onClick={()=> {
            update(genGameDTO());
            console.log(genGameDTO());
        }}>
            very useful test button
        </GenericButton>

        <UnitSelect deck={game.players[game.team].deck}></UnitSelect>
        <GameInfoBar game = {game}/>
        <NoticeWindow text={""} hidden={true}/>
        <EventLog/>
    </div>
}