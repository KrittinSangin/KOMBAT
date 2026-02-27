import {HexPos} from "../../../ttypes/type";
import {Minion} from "./Minion";
import {HexMap} from "./HexMap";

export class Hex {
    private hexPos: HexPos;
    public minion: Minion | null | undefined;
    public team?: number | null;

    constructor(hexPos: HexPos) {
        this.hexPos = hexPos;
        this.minion = null;
        this.team = null;
    }

    setMinion(minion: Minion) {
        this.minion = minion;
    }

    removeMinion() {
        this.minion = null;
    }

    setTeam(team: number) {
        this.team = team
    }

    removeTeam() {
        this.team = null;
    }

}