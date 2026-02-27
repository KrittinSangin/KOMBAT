import {Sprite} from "../type/Sprite";
import {Transform2} from "../type/Transform";
import Image from "next/image";

interface SpriteViewProps {
    texturePath: string;
    transform: Transform2;
    color: string;
}

export default function SpriteView({
    texturePath,
    transform,
    color
}: SpriteViewProps) {
    return (
        <div
            style={{
                position: "absolute",
                left: transform.pos.x,
                top: transform.pos.y,
                width: transform.size.x * transform.scale.x,
                height: transform.size.y * transform.scale.y,
            }}>
            <Image
                src={texturePath}
                width={transform.size.x * transform.scale.x}
                height={transform.size.y * transform.scale.y}
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
                    WebkitMaskBoxImage: `url(${texturePath})`,
                }}/>
        </div>
    )
}