//position is relative to parent components
import {Vec2, Vec3} from "./Primitive";
import {Property} from "csstype";
import Color = Property.Color;

export type Transform2 =
{
    pos: Vec2,
    scale: Vec2,
}

//position is relative to parent components
export type Transform3 =
{
    pos: Vec3,
    scale: Vec3,
}

export type Texture =
{
    name: string; // key
    path: string; // value
    size: Vec2
}

export type Sprite =
{
    texture: Texture
    color: Color;
}

export const defaultTransform2 =
{
    pos: {x:0,y:0},
    scale: {x:1,y:1},
}
export const defaultTransform3 =
{
    pos: {x:0,y:0,z:0},
    scale: {x:1,y:1,z:1},
}

export type SpriteRatio = "followX" | "followY" | "freeform" | "uniform"