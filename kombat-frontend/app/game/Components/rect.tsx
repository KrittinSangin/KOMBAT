import {Property} from "csstype";
import Color = Property.Color;

export default function rect(x: number, y: number, w: number, h: number, c:Color) {
    return (<div
            key={`${x}-${y}`}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: w,
                height: h,
                backgroundColor: c
            }}
        />
    );
}