import {Vec2} from "../type/Primitive";
import {Property} from "csstype";
import Color = Property.Color;
import SpriteView from "./SpriteView";
import {Transform2} from "../type/Transform";

interface MarkerProps
{
    key : number
    position: Vec2,
    scale: Vec2,
    color: Color
}

export default function Marker(
    {
        position,
        scale,
        color
    } : MarkerProps
)
{
    const src = "/game/texture/Marker_GreyScale.png";
    const t = new Transform2(position, {x: 150, y: 150}, scale)

    return <SpriteView texturePath={src} transform={t} color={color}></SpriteView>
}