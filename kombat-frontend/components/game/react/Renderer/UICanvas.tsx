import {Game} from "../../type/GameTypes";
import UnitSelect from "../UI/UnitSelect";
import GameInfoBar from "../UI/GameInfoBar";
import NoticeWindow from "../UI/NoticeWindow";
import EventLog from "../UI/EventLog";
import GenericButton from "../../../Generic/GenericButton";
import {genGameDTO} from "../../model/randomizer";
import {useGameStateStore} from "../../model/useGameStateStore";
import EndScreen from "../UI/EndScreen";

interface Props {
    game: Game
}

export default function UICanvas({game}: Props) {
    const {start, update, reset} = useGameStateStore();


    return <div className="w-full h-full"
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                }}>
        <div className="z-50" hidden={true}>
            <GenericButton onClick={()=> {
                update(genGameDTO());
                console.log(genGameDTO());
            }}>
                very useful test button
            </GenericButton>
        </div>

        <UnitSelect deck={game.players[game.team].deck}></UnitSelect>
        <GameInfoBar game={game}/>
        <EndScreen game={game} ></EndScreen>
    </div>
}