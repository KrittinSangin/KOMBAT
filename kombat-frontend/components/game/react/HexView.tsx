import {Rect, Vec2} from "../type/Primitive";
import RectView from "./RectView";
import MinionView from "./MinionView";
import {Hex, Minion} from "../type/gameStates";

interface Props
{
    idx: number
    pos: Vec2,
    hex?: Hex
}

export default function HexView({
    idx,
    pos,
    hex
}: Props)
{
    const hexWidth = 100;
    const hexHeight = 50;

    const hexRect: Rect = {
        x: pos.x,
        y: pos.y,
        w: hexWidth,
        h: hexHeight
    }

    const minionRect = (m:Minion) => {
        const textureSize = m.sprite.texture.size;
        const transform = m.sprite.transform;

        return {
            x: pos.x + (hexRect.w - textureSize.x * transform.scale.x) / 2,
            y: pos.y + (hexRect.h /2) - textureSize.y * transform.scale.x,
            w: textureSize.x * transform.scale.x,
            h: textureSize.y * transform.scale.y,
        }
    }

    const minionRectAsPos =(rect:Rect) =>
    {
        return {x:rect.x,y:rect.y};
    }

    if (!hex) return <></>
    return <div>
        <RectView rect={hexRect} c={"lightblue"}/>
        {/*{hex.minion && <RectView rect={minionRect(hex.minion)} c={"green"}/>}*/}
        {hex.minion && <MinionView minion = {hex.minion} pos = {minionRectAsPos(minionRect(hex.minion))}/>}
    </div>
}