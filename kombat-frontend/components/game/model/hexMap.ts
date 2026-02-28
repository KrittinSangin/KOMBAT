import {Hex, HexMap, Minion} from "../type/gameStates";
import {HexPos} from "../../../ttypes/type";

export const hexKey = (pos:HexPos) => {
    return `${pos.row}-${pos.col}`;
}

const tuplePair = (a:number,b:number) => Array.from({length: a}, (_,j) => Array.from({length: b}, (_,i) => [i,j]) ).flat()

export const createHexMap : (r:number,c:number) => HexMap = (r:number,c:number) =>(
    {
        map: new Map(tuplePair(r,c).map((pair) => [
            hexKey(
                {
                    row : pair[0]+1,
                    col : pair[1]+1
                }
            ),
            {
                hexPos: {
                    row : pair[0]+1,
                    col : pair[1]+1
                },
                minion: null,
                team: null
            }
        ])),
        row:r,
        colum:c,
    }
)


export const hexMapGet = (map: HexMap, pos: HexPos) => {
    const hex =map.map.get(hexKey(pos));
    return hex;
}

