import Image from "next/image";
import {Sprite, SpriteRatio, Transform2} from "../../type/Rendering";
import {Vec2} from "../../type/Primitive";

interface Props {
    sprite:Sprite,
    transform?:Transform2
    children?: React.ReactNode

}

export default function SpriteView({sprite,transform,children}:Props) {

    const x = transform? transform.pos.x : 0 ;
    const y = transform? transform.pos.y : 0 ;
    const w = sprite.texture.size.x * (transform? transform.scale.x : 1);
    const h = sprite.texture.size.y * (transform? transform.scale.y : 1);

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
                src={path}
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
                    WebkitMaskBoxImage: `url(${path})`,
                }}/>
            {children}
        </div>
    )
}