import Marker from "./Marker";
import {Rect, Vec2} from "../type/Primitive";
import HexView from "./HexView";
import RectView from "./RectView";
import {HexMap} from "../type/HexMap";


export default function HexMapView(map:HexMap) {
    const row = map.row;
    const col = map.colum;

    const portWidth = window.innerWidth;
    const portHeight = window.innerHeight;

    const sheerX = 10;


    const space: Vec2 = {
        x: 120,
        y: 60
    }

    const scale: Vec2 = {
        x: 0.1,
        y: 0.1
    }

    const start: Vec2 = {
        x: (portWidth - space.x * col - sheerX * col) / 2,
        y: (portHeight - space.y * row + space.y) / 2
    }

    const midlinevert: Rect = {
        x: portWidth / 2 - 2,
        y: 0,
        w: 4,
        h: portHeight
    }

    const midlinehori: Rect = {
        x: 0,
        y: portHeight / 2 - 2,
        w: portWidth,
        h: 4
    }

    return <div>
        {Array.from({length: row}, (_, r) =>
            Array.from({length: col}, (_, c) => ({r,c})))
            .flat().map((rc) => {
                return <div key={rc.c + col * rc.r}>
                    <HexView x={start.x + space.x * rc.c  + sheerX * rc.r}
                             y={start.y + (rc.c  % 2 == 0 ? space.y * rc.r : space.y * rc.r - space.y / 2)}
                             isOdd={(rc.c  + rc.r) % 2 == 0}
                             minion={map.getHex({row : rc.r + 1, col: rc.c + 1})?.minion}
                    />
                    {/*<Marker key={pair.x + col * pair.y}*/}
                    {/*        position=*/}
                    {/*            {*/}
                    {/*                {*/}
                    {/*                    x: start.x + space.x * pair.x + sheerX * pair.y,*/}
                    {/*                    y: start.y + (pair.x % 2 == 0 ? space.y * pair.y : space.y * pair.y - space.y / 2)*/}
                    {/*                }*/}
                    {/*            }*/}
                    {/*        scale={{x: scale.x, y: scale.y}}*/}
                    {/*        color={"red"}></Marker>*/}
                </div>
            })}
        <RectView rect={midlinevert} c={"indianred"}/>
        <RectView rect={midlinehori} c={"indianred"}/>
    </div>

}