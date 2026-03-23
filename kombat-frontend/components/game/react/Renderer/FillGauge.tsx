import {Vec2} from "../../type/Primitive";
import {release} from "node:os";

interface Props {
    dim: Vec2,
    percent: number,
    bgColor: string,
    fillColor: string,
    children?: React.ReactNode
}

export default function FillGauge({dim, percent,bgColor = "black", fillColor = "white", children}: Props) {
    return <div className="relative"
        style={{
        width: dim.x,
        height: dim.y,
        backgroundColor: bgColor,
    }}>
        <div className="absolute"
             style={{
                 width: dim.x * percent,
                 height: dim.y,
                 backgroundColor: fillColor
             }}>
        </div>
        <div className="relative">
            {children}
        </div>
    </div>
}