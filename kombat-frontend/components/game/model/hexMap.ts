import {Hex, HexMap, Minion} from "../type/GameTypes";
import {HexPos} from "../../../ttypes/type";
import {HexDir} from "../../../ttypes/enums";

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

export const isAdjacentToTerritory = (map: HexMap, hex:Hex, team: number) =>
{
    for (let i = 0; i <= 5; i++)
    {
        const pos = nextInDir(hex.hexPos,i as HexDir)
        const check = hexMapGet(map,pos)

        if (check && check.team === team) return true;
    }
    return false;
}

export const buyableHex = (map: HexMap, team: number) =>
{
    return map.map.entries().toArray()
        .map(([_,hex])=>hex)
        .filter((hex) => isAdjacentToTerritory(map,hex,team) && hex.team === null)
}

function nextInDir(pos: HexPos, dir: HexDir): HexPos {
    let nextPos: HexPos;

    switch (dir) {
        case HexDir.up:
            nextPos = { row: pos.row - 1, col: pos.col };
            break;

        case HexDir.upRight: {
            const newRow = pos.col % 2 === 0 ? pos.row - 1 : pos.row;
            nextPos = { row: newRow, col: pos.col + 1 };
            break;
        }

        case HexDir.downRight: {
            const newRow = pos.col % 2 === 1 ? pos.row + 1 : pos.row;
            nextPos = { row: newRow, col: pos.col + 1 };
            break;
        }

        case HexDir.down:
            nextPos = { row: pos.row + 1, col: pos.col };
            break;

        case HexDir.downLeft: {
            const newRow = pos.col % 2 === 1 ? pos.row + 1 : pos.row;
            nextPos = { row: newRow, col: pos.col - 1 };
            break;
        }

        case HexDir.upLeft: {
            const newRow = pos.col % 2 === 0 ? pos.row - 1 : pos.row;
            nextPos = { row: newRow, col: pos.col - 1 };
            break;
        }

        default:
            throw new Error("Invalid direction");
    }

    return nextPos;
}

export function hexPosEqual(pos1:HexPos,pos2:HexPos)
{
    return pos1.row == pos2.row && pos1.col == pos2.col
}