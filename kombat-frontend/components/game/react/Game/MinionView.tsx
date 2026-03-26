import {Minion} from "../../type/GameTypes";
import {Vec2} from "../../type/Primitive";
import SpriteView from "../Renderer/SpriteView";
import {c_Transform2, c_Vec2} from "../../utils/utility";
import {Transform2} from "../../type/Rendering";
import HealthBar from "./HealthBar";
import {useGameStateStore} from "../../model/useGameStateStore";

interface Props {minion: Minion, transform: Transform2}

export default function MinionView({minion, transform} : Props)
{
    const {game} = useGameStateStore();

    return <div>
        <SpriteView sprite={minion.sprite} transform={transform}/>
        <HealthBar hp={minion.hp} hpMax={game.cfg.initHp} team={minion.team}></HealthBar>
    </div>
}