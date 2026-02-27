import {Rect, Vec2} from "../type/Primitive";
import RectView from "./RectView";
import {Minion} from "../type/Minion";
import MinionView from "./MinionView";
import {Transform2} from "../type/Transform";

interface HexViewProps
{
    x:number
    y:number
    isOdd: boolean
    minion: Minion | null | undefined
}

export default function HexView({
    x,
    y,
    isOdd,
    minion
}: HexViewProps)
{
    const hexWidth = 100;
    const hexHeight = 50;

    const hexRect: Rect = {
        x: x,
        y: y,
        w: hexWidth,
        h: hexHeight
    }
    const getMinionRect = (m:Minion) =>
    {
        const minionTransform = m.sprite.transform

        const minionWidth = minionTransform.size.x;
        const minionHeight = minionTransform.size.y;
        const scaleX = minionTransform.scale.x;
        const scaleY = minionTransform.scale.y;



        const minionRect: Rect = {
            x: x + hexWidth / 2 - minionWidth * scaleX / 2 ,
            y: y - minionHeight * scaleY + hexHeight / 2 ,
            w: minionWidth * scaleX,
            h: minionHeight * scaleY
        }
        return minionRect;
    }

    const getMiniontransform= (m:Minion) =>
    {
        const rect = getMinionRect(m)
        return new Transform2(
            {
                x: rect.x,
                y: rect.y
            },
            {
                x: m.sprite.transform.size.x,
                y: m.sprite.transform.size.y
            },
            {
                x:m.sprite.transform.scale.x,
                y:m.sprite.transform.scale.y,
            }
        )
    }

    return <div>
        <RectView rect={hexRect} c={isOdd?"lightblue" :"blue"}/>
        {/*{minion && <RectView rect={getMinionRect(minion)} c={isOdd ? "green" : "darkolivegreen"}/>}*/}
        {minion && <MinionView minion={minion} transform={getMiniontransform(minion)} />}
    </div>
}