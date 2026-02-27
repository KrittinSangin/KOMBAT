import {Minion} from "../type/Minion";
import SpriteView from "./SpriteView";
import {Transform2} from "../type/Transform";

type MinionViewProps = {
    minion: Minion;
    transform: Transform2;
};

export default function MinionView({ minion,transform }: MinionViewProps)
{
    return <SpriteView texturePath={minion.sprite.texturePath} transform={transform} color={minion.sprite.color} ></SpriteView>

}