import {Minion} from "../../type/GameTypes";
import {Vec2} from "../../type/Primitive";
import SpriteView from "../Renderer/SpriteView";

interface Props {minion: Minion, pos:Vec2}

export default function MinionView({minion, pos} : Props)
{
    return <SpriteView sprite={minion.sprite} pos={pos}/>
}