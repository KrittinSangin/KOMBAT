import {Property} from "csstype";
import Color = Property.Color;
import {Rect} from "../type/Primitive";

interface RectProp {
    rect: Rect,
    c: Color,
}
export default function RectView(
    {
        rect,
        c,
    }: RectProp
) {
    return (<div
            key={`${rect.x}-${rect.y}-${rect.w}-${rect.h}`}
            style={{
                position: "absolute",
                left: rect.x,
                top: rect.y,
                width: rect.w,
                height: rect.h,
                backgroundColor: c
            }}
        />
    );
}