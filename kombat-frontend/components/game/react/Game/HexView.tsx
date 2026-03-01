import {Rect, Vec2} from "../../type/Primitive";
import {Hex, Minion} from "../../type/gameStates";
import {Sprite, Texture} from "../../type/Rendering";
import {c_Transform2, c_Vec2} from "../../utils/utility";
import {gamHexB_T, gamHexN_T, gamHexR_T} from "../../resources/textureResource";
import SpriteView from "../Renderer/SpriteView";
import MinionView from "./MinionView";
import {text} from "node:stream/consumers";

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
    const SIZE = 90;

    const hexRect: Rect = {
        x: pos.x,
        y: pos.y,
        w: SIZE,
        h: SIZE/2
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

    const renderHex : (team:number|null) => Sprite = (team:number|null) =>
    {
        let texture:Texture = {name: "", path: "", size: c_Vec2(0,0)}

        if (team)  texture = gamHexR_T;
        else  texture = team == 0? gamHexB_T : gamHexN_T;

        const scale = SIZE/texture.size.x


        return {
            texture: texture,
            transform:c_Transform2(
                c_Vec2(0,0),
                c_Vec2(scale,scale)
            ),
            color: "transparent",
        }
    }

    if (!hex) return <></>
    return <div>
        {/*<RectView rect={hexRect} c={"lightblue"}/>*/}
        {/*{hex.minion && <RectView rect={minionRect(hex.minion)} c={"green"}/>}*/}
        <SpriteView sprite={renderHex(hex.team)} pos={pos}/>
        {hex.minion && <MinionView minion = {hex.minion} pos = {minionRectAsPos(minionRect(hex.minion))}/>}
    </div>
}