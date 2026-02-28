import Marker from "./Marker";
import {Rect, Vec2} from "../type/Primitive";
import HexView from "./HexView";
import RectView from "./RectView";
import {useEffect, useState} from "react";
import useDeviceSize from "../../CustomHook/useDeviceSize";
import {Hex, HexMap} from "../type/gameStates";
import {hexMapGet} from "../model/hexMap";

export default function HexMapView(map:HexMap) {
    const [width, height] = useDeviceSize()
    const row = map.row;
    const col = map.colum;

    const viewportX = width;
    const viewportY = height;

    const sheerX = 0;

    const space: Vec2 = {
        x: 120,
        y: 60
    }
    const start: Vec2 = {
        x: (viewportX - space.x * col - sheerX * col) / 2 ,
        y: (viewportY - space.y * row) / 2
    }

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
                        hex={hexMapGet(map,{row:rc.r+1, col:rc.c+1})}
                    />
                </div>
            })}
        {horizontalLine(4)}
        {verticalLine(4)}
    </div>

}