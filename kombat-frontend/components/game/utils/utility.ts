import {HexPos} from "../../../ttypes/type";
import {Vec2, Vec3} from "../type/Primitive";
import {Texture, Transform2, Sprite} from "../type/Rendering";

export function c_hexPos(r:number,c:number) : HexPos {
    return{
        row:r,
        col:c
    }
}

export function c_Vec2(x:number,y:number) : Vec2 {
    return{
        x:x,
        y:y
    }
}

export function c_Vec3(x:number,y:number,z:number) : Vec3 {
    return{
        x:x,
        y:y,
        z:z
    }
}

function extractFileName(path: string): string {
    const fileWithExt = path.split("/").pop();
    if (!fileWithExt) {
        throw new Error("Invalid path");
    }

    return fileWithExt.split(".")[0];
}

export function c_Texture(path:string,dim:Vec2): Texture
{
    return {
        name: extractFileName(path),
        path: path,
        size: dim

    }
}

export function c_Sprite(texture:Texture): Sprite
{
    return {
        texture:texture,
        color:"transparent"
    }
}

export function c_Transform2(pos:Vec2,scale:Vec2): Transform2
{
    return {pos:pos,scale:scale}
}
export function c_Transform2Empty(): Transform2
{
    return {pos: c_Vec2(0,0),scale:c_Vec2(1,1)}
}