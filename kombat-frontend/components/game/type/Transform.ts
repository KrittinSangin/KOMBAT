import {Vec2, Vec3} from "./Primitive";

export class Transform2
{
    public pos: Vec2;
    public size: Vec2
    public scale: Vec2;

    constructor(pos: Vec2, size: Vec2, scale: Vec2)
    constructor(val: Vec2, size: Vec2)
    constructor(val: Vec2)
    constructor()
    constructor(pos?: Vec2, size?:Vec2, scale?: Vec2)
    {
        this.pos = pos? pos : {x:0,y:0};
        this.size = size? size : {x:100,y:100};
        this.scale = scale? scale : {x:1,y:1};
    }

    translate(dv: Vec2)
    {
        this.pos =
            {
                x: this.pos.x + dv.x,
                y: this.pos.y + dv.y
            }
    }
}

export class Transform3
{
    public pos: Vec3;
    public size: Vec3
    public scale: Vec3;

    constructor(pos: Vec3, size: Vec3, scale: Vec3)
    constructor(val: Vec3, size: Vec3)
    constructor(val: Vec3)
    constructor()
    constructor(pos?: Vec3, size?:Vec3, scale?: Vec3)
    {
        this.pos = pos? pos : {x:0,y:0,z:0};
        this.size = size? size : {x:100,y:100,z:100};
        this.scale = scale? scale : {x:1,y:1,z:1};
    }

    translate(dv: Vec3)
    {
        this.pos =
            {
                x: this.pos.x + dv.x,
                y: this.pos.y + dv.y,
                z: this.pos.z + dv.z
            }
    }
}