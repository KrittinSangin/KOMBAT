import {HexPos} from "../../../ttypes/type";
import {Hex} from "./Hex";
import {Minion} from "./Minion";

export class HexMap
{
    private map : Map<string,Hex>
    readonly row : number
    readonly colum : number
    constructor(r:number, c:number) {
        this.row = r;
        this.colum = c;

        this.map = new Map
        (
            Array.from({length: this.row},(_,r) =>
                Array.from({length: this.colum}, (_,c) =>
                    ({r, c}))).flat().map((rc) => {
                        const pos: HexPos =
                            {
                                row: rc.r + 1,
                                col: rc.c + 1
                            }
                        const hex :Hex = new Hex(pos)
                        return [this.key(pos),hex]
            })
        )

    }

    private key(pos:HexPos) : string
    {
        return `r:${pos.row}-c:${pos.col}`
    }


    getHex(pos :HexPos): Hex | undefined
    {
        return this.map.get(this.key(pos))
    }

    putMinion(pos :HexPos, m:Minion)
    {
        this.map.get(this.key(pos))?.setMinion(m);
    }

    removeMinion(pos :HexPos, m:Minion)
    {
        this.map.get(this.key(pos))?.removeMinion();
    }

    setTeam(pos :HexPos, team:number)
    {
        this.map.get(this.key(pos))?.setTeam(team);
    }

    removeTeam(pos :HexPos)
    {
        this.map.get(this.key(pos))?.removeTeam();
    }


}