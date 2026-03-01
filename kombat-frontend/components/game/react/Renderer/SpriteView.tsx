import Image from "next/image";
import {Sprite, Transform2} from "../../type/Rendering";
import {Vec2} from "../../type/Primitive";

interface Props {sprite:Sprite, pos:Vec2}

export default function SpriteView({sprite,pos}:Props) {
    const transform = sprite.transform;
    const offset = sprite.transform.pos;

    const x = pos.x + offset.x;
    const y = pos.y+ offset.y;
    const w = sprite.texture.size.x * transform.scale.x;
    const h = sprite.texture.size.y * transform.scale.y;
    const c = sprite.color;
    const path = sprite.texture.path;
    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: w,
                height: h,
            }}>
            <Image
                src={sprite.texture.path}
                width={w}
                height={h}
                loading={"eager"}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                }} alt={""}/>
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: c,
                    mixBlendMode: "color",
                    pointerEvents: "none",
                    WebkitMaskBoxImage: `url(${sprite.texture.path})`,
                }}/>
        </div>
    )
}