import Image from "next/image";
import {Sprite, Transform2} from "../../type/Rendering";
import {Vec2} from "../../type/Primitive";

interface Props {sprite:Sprite}

export default function SpriteViewRelative({sprite}:Props) {
    const { transform, texture, color } = sprite;
    const offset = transform.pos;

    const x = offset.x;
    const y = offset.y;
    const w = texture.size.x * transform.scale.x;
    const h = texture.size.y * transform.scale.y;
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
                    backgroundColor: color,
                    mixBlendMode: "color",
                    pointerEvents: "none",
                    WebkitMaskBoxImage: `url(${texture.path})`,
                }}/>
        </div>
    )
}