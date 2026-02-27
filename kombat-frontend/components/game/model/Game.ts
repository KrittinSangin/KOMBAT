import {Config, PlayerInfo} from "../../../ttypes/type";
import {GameStateEnum} from "../../../ttypes/enums";
import {Player} from "../type/Player";
import {HexMap} from "../type/HexMap";
import {Minion} from "../type/Minion";

export class Game
{
    private cfg: Config

    readonly players: Player[];

    readonly map:HexMap;
    public minion: Minion[] = [];

    public gameState: GameStateEnum = GameStateEnum.empty;

    public team: number = 0;
    public turn: number = 0;

    constructor(cfg: Config, p1:PlayerInfo,p2:PlayerInfo,deck1:Minion[],deck2:Minion[]) {
        this.cfg = cfg;
        this.players = Array.of(
            new Player(p1,deck1),
            new Player(p2,deck2)
        );

        this.map = new HexMap(cfg.mapWidth,cfg.mapHeight);
    }


}