import {Vec2} from "../type/Primitive";
import {Property} from "csstype";
import Color = Property.Color;
import SpriteView from "./SpriteView";
import {Sprite} from "../type/Rendering";

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
            transform :
                {
                    pos:{x:0,y:0},
                    scale:{x:scale,y:scale}
                },
            color : color,
        }

    return <SpriteView sprite={markerSprite} pos={pos}/>
}