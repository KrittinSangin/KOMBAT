import {Minion} from "../../type/GameTypes";
import {Vec2} from "../../type/Primitive";
import SpriteView from "../Renderer/SpriteView";
import {c_Transform2, c_Vec2} from "../../utils/utility";
import {Transform2} from "../../type/Rendering";

interface Props {minion: Minion, transform: Transform2}

export default function MinionView({minion, transform} : Props)
{
    return <SpriteView sprite={minion.sprite} transform={transform}/>
}