import Marker from "./Marker";
import HexView from "./HexView";
import {useEffect, useState} from "react";
import RectView from "../Renderer/RectView";
import {Vec2} from "../../type/Primitive";
import {HexMap} from "../../type/gameStates";
import useDeviceSize from "../../../CustomHook/useDeviceSize";
import {hexMapGet} from "../../model/hexMap";
import UnitCard from "../UI/UnitCard";
import {c_Vec2, c_Vec3} from "../../utils/utility";

export default function HexMapView(map:HexMap) {
    const SPACE_X = 70;
    const SPACE_Y = 40;

    const OFFSET_X = 0
    const OFFSET_Y = 60

    const [width, height] = useDeviceSize()
    const row = map.row;
    const col = map.colum;

    const viewportX = width;
    const viewportY = height;

    const sheerX = 0;

    const space: Vec2 = c_Vec2(SPACE_X,SPACE_Y);

    const start: Vec2 = c_Vec2(
        (viewportX - space.x * col - sheerX * col) / 2 + OFFSET_X,
        (viewportY - space.y * row + space.y) / 2 + OFFSET_Y
)

    const horizontalLine = (w:number) => {
        const hw = w/2
        return<RectView rect={
            {
                x: viewportX / hw - hw,
                y: 0,
                w: w,
                h: viewportY
            }
        } c={"indianred"}/>
    }

    const verticalLine = (w:number) => {
        const hw = w/2;
        return<RectView rect={
            {
                x: 0,
                y: viewportY / hw - hw,
                w: viewportX,
                h: w
            }
        } c={"indianred"}/>
    }

    const calculatePos: (r:number,c:number) => Vec2 = (r,c) =>(
    {
        x: start.x + space.x * c  + sheerX * r,
        y: start.y + (c  % 2 == 0 ? space.y * r : space.y * r - space.y / 2),
    })

    return <div>
        {Array.from({length: row}, (_, r) =>
            Array.from({length: col}, (_, c) => ({r,c})))
            .flat().map((rc) => {
                return <div key={rc.c+1 + col * rc.r+1}>
                    <HexView
                        idx = {rc.c+1 + col * rc.r+1}
                        pos = {calculatePos(rc.r,rc.c)}
                        hex= {hexMapGet(map,{row:rc.r+1, col:rc.c+1})}
                    />
                </div>
            })}
        {horizontalLine(4)}
        {verticalLine(4)}
    </div>

}