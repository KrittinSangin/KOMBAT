import Marker from "./Marker";
import {Vec2} from "../type/Primitive";


export default function HexMapView() {
    const width = 8;
    const height = 8;

    const start: Vec2 = {
        x: 250,
        y: 50
    }

    const space: Vec2 = {
        x: 100,
        y: 100
    }

    const scale: Vec2 = {
        x: 0.1,
        y: 0.1
    }


    return Array.from({length: height}, (_, y) =>
        Array.from({length: width}, (_, x) => ({x, y})))
        .flat().map((pair) => {
            return <Marker key={pair.x + width * pair.y}
                           position=
                               {
                                   {
                                       x: start.x + space.x * pair.x,
                                       y: start.y + (pair.x%2 == 0 ? space.y * pair.y : space.y * pair.y - space.y / 2)
                                   }
                               }
                           scale={{x: scale.x, y: scale.y}}
                           color={"red"}></Marker>
        })
}