import {Game} from "../../type/gameStates";
import GameView from "../Game/GameView";

interface Props
{
    game :Game
}

export default function GameCanvas({game}: Props) {
    return <div
        style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
        }}
    >
        <GameView game={game}/>
    </div>
}