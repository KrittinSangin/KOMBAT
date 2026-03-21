import SpriteView from "./SpriteView";
import {Sprite, Transform2} from "../../type/Rendering";
import {c_Transform2, c_Transform2Empty, c_Vec2} from "../../utils/utility";

interface Props {
    sprite:Sprite,
    transform?:Transform2
    children?: React.ReactNode
}
export default function SpriteWithOverlay({ sprite, transform, children }:Props) {
    const x = transform? transform.pos.x : 0 ;
    const y = transform? transform.pos.y : 0 ;

    const scale = transform? transform.scale : c_Vec2(1,1);

    const w = sprite.texture.size.x * (transform? transform.scale.x : 1);
    const h = sprite.texture.size.y * (transform? transform.scale.y : 1);
    return (
        <div style={{
            position: "absolute",
            left: x,
            top: y,
            width: w,
            height: h,
        }}>
            <SpriteView sprite={sprite} transform={c_Transform2(c_Vec2(0,0),scale)} />
            <div className="absolute inset-0 z-10">
                {children}
            </div>
        </div>
    );
}