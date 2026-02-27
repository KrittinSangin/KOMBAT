import {Sprite} from "./Sprite";

export class Minion
{
    readonly name: string;
    public sprite: Sprite;
    public team: number = -1;
    public hp: number;
    readonly def: number;

    constructor(name:string, sr: Sprite,hp:number,def:number) {
        this.name = name;
        this.sprite = sr;
        this.hp = hp;
        this.def = def;
    }


}