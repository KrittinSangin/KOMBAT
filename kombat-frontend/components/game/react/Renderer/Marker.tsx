import {Property} from "csstype";
import Color = Property.Color;
import SpriteView from "../Renderer/SpriteView";
import {Sprite} from "../../type/Rendering";
import {Vec2} from "../../type/Primitive";
import {c_Transform2, c_Vec2} from "../../utils/utility";

interface Props
{
    pos: Vec2
    scale: number
    color: Color
}

export default function Marker({pos, scale, color} : Props)
{
    const markerSprite : Sprite =
        {
            texture :
                {
                    name : "marker",
                    path : "/game/texture/Marker_GreyScale.png",
                    size : {x:150,y:150}
                },
            color : color,
        }

    return <SpriteView sprite={markerSprite} transform={c_Transform2(pos,c_Vec2(scale,scale))}/>
}