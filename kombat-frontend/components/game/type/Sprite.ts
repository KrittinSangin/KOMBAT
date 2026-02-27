import {Vec2} from "./Primitive";
import {Transform2} from "./Transform";
import {Property} from "csstype";
import Color = Property.Color;

export class Sprite
{
    readonly texturePath :string;
    public transform: Transform2;
    public color: Color = "white";

    constructor(path: string, transform: Transform2, color: Color)
    {
        this.texturePath = path;
        this.transform = transform;
        this.color = color;
    }
}