import HexView from "./HexView";
import RectView from "../Renderer/RectView";
import {Vec2} from "../../type/Primitive";
import {HexMap} from "../../type/GameTypes";
import useDeviceSize from "../../../CustomHook/useDeviceSize";
import {buyableHex, hexMapGet, hexPosEqual} from "../../model/hexMap";
import {c_Vec2} from "../../utils/utility";
import {useGameStateStore} from "../../model/useGameStateStore";
import {GameStateEnum} from "../../../../ttypes/enums";
import {useIntent} from "../../model/useIntent";
import {useOriginStore} from "../../../../app/gamemode/Store/DuelOriginStore";


export default function HexMapView(map:HexMap) {
    //zustand
    const {game} = useGameStateStore();

    const [SC_WIDTH, SC_HEIGHT] = useDeviceSize()
    const N_ROW = map.row;
    const N_COL = map.colum;

    //Hex Highlighting
    const {gameState} = game;
    const highlights = gameState === GameStateEnum.buyHex? buyableHex(map,game.team).map((hex)=>hex.hexPos) : [];

    //Hex Rendering
    const SPACING = c_Vec2(70,50);
    // const SIZE = c_Vec2(120,60);
    const OFFSET = c_Vec2(0,100)

    const SHEER = c_Vec2(0,0)

    const start: Vec2 = c_Vec2(
        OFFSET.x + (SC_WIDTH/2 - (SPACING.x + SHEER.x) * N_COL / 2),
        OFFSET.y + (SC_HEIGHT/2 - (SPACING.y + SHEER.y) * N_ROW / 2),
        // OFFSET.x + (SC_WIDTH/2 - (SPACING.x + SHEER.x/2) * N_COL),
        // OFFSET.y + (SC_HEIGHT/2 - (SPACING.y + SHEER.y) * N_ROW),
)

    const horizontalLine = (w:number) => {
        const hw = w/2
        return<RectView rect={
            {
                x: SC_WIDTH / hw - hw,
                y: 0,
                w: w,
                h: SC_HEIGHT
            }
        } c={"indianred"}/>
    }

    const verticalLine = (w:number) => {
        const hw = w/2;
        return<RectView rect={
            {
                x: 0,
                y: SC_HEIGHT / hw - hw,
                w: SC_WIDTH,
                h: w
            }
        } c={"indianred"}/>
    }

    const calculatePos: (r:number,c:number) => Vec2 = (r,c) =>(
    {
        x: start.x + SPACING.x * c  + SHEER.x * r,
        y: start.y + (c  % 2 == 0 ? SPACING.y * r : SPACING.y * r - SPACING.y / 2) + SHEER.y * c,
    })

    return <div>
        {
            Array.from({ length: N_ROW }, (_, r) => r)
                .flatMap(r => {
                    const cols = [
                        ...Array.from({ length: Math.ceil(N_COL / 2) }, (_, i) => 2 * (i + 1) - 1),
                        ...Array.from({ length: Math.floor(N_COL / 2) }, (_, i) => 2 * i)
                    ]

                    return cols
                        .filter(c => c < N_COL)
                        .map(c => ({ r, c }))
                })
                .map((rc) => (
                    <div key={(rc.c + 1) + N_COL * (rc.r + 1)}>
                        <HexView
                            idx={rc.c + 1 + N_COL * rc.r + 1}
                            highlight={highlights.some((pos) => {
                                const hex = hexMapGet(map, { row: rc.r + 1, col: rc.c + 1 })?.hexPos;
                                if (hex) return hexPosEqual(pos, hex); else return false;
                            })}
                            pos={calculatePos(rc.r, rc.c)}
                            hex={hexMapGet(map, { row: rc.r + 1, col: rc.c + 1 })}
                        />
                    </div>
                ))
        }
        {/*{horizontalLine(4)}*/}
        {/*{verticalLine(4)}*/}
    </div>

}