import {HexPos, PlayerInfo} from "../../../ttypes/type";
import {Minion} from "./Minion";

export class Player
{
    readonly info: PlayerInfo;
    public budget: number;
    public interestRatePercentage: number;
    public spawnCount: number;
    public deck: Minion[];

    constructor(info: PlayerInfo, deck:Minion[]) {
        this.info = info;
        this.budget = 0;
        this.interestRatePercentage = 0;
        this.spawnCount = 0;
        this.deck = deck;

        this.deck.forEach((m)=>m.team = this.info.team)
    }
}