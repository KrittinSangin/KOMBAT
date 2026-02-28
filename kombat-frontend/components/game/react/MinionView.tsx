import SpriteView from "./SpriteView";
import {Minion} from "../type/gameStates";
import {Vec2} from "../type/Primitive";

interface Props {minion: Minion, pos:Vec2}

export default function MinionView({minion, pos} : Props)
{
    return <SpriteView sprite={minion.sprite} pos={pos}/>
}