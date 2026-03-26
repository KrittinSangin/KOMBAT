import {Game} from "../../type/GameTypes";
import {GameStateEnum, PlayerIntentEnum} from "../../../../ttypes/enums";
import {absolutePathToPage} from "next/dist/shared/lib/page-path/absolute-path-to-page";
import SpriteView from "../Renderer/SpriteView";
import {c_Sprite, c_Transform2, c_Vec2} from "../../utils/utility";
import {crown_B_T, crown_R_T, ribbon_B_T, ribbon_P_T, ribbon_R_T} from "../../resources/textureResource";
import {Property} from "csstype";
import Color = Property.Color;
import useDeviceSize from "../../../CustomHook/useDeviceSize";
import SpriteWithOverlay from "../Renderer/SpriteViewWithOverlay";
import {Span} from "next/dist/server/lib/trace/tracer";
import {useGameStateStore} from "../../model/useGameStateStore";
import {router} from "next/client";
import {useRouter} from "next/navigation";

interface Props {
    game: Game
}

export default function EndScreen({game}: Props) {

    const router = useRouter();

    const {gameDTO} = useGameStateStore();
    //Data
    const turn = game.turn;
    const maxTurn = game.cfg.maxTurns;
    const isGameEnd = game.gameState === GameStateEnum.end
    const isDraw = gameDTO.isGameDraw //fix here
    const winner = gameDTO.winner;

    const minionLefts = [
        game.minion.filter((m) => m.team === 0).length,
        game.minion.filter((m) => m.team === 1).length
    ]
    const minionHPSums = [
        game.minion.filter((m) => m.team === 0).reduce((acc, cur) => acc + cur.hp, 0),
        game.minion.filter((m) => m.team === 1).reduce((acc, cur) => acc + cur.hp, 0)
    ]
    const totalBudget = [
        game.players[0].budget,
        game.players[1].budget
    ]

    //View
    const [width, height] = useDeviceSize()

    const ribbonDownscaleFactor = 0.3;
    const crownDownscaleFactor = 0.35;

    const hideScreen = !isGameEnd;
    const doShowgameDrawScreen = isGameEnd && isDraw

    const ribbonSize = c_Vec2(
        ribbon_R_T.size.x * ribbonDownscaleFactor,
        ribbon_R_T.size.y * ribbonDownscaleFactor,
    );

    const ribbonOffset = c_Vec2(
        (width / 2 - ribbonSize.x) / 2,
        height / 4
    )

    const drawRibbonOffset = c_Vec2(
        (width - ribbonSize.x) / 2,
        height / 4
    )

    const crownSize = c_Vec2(
        crown_R_T.size.x * crownDownscaleFactor,
        crown_R_T.size.y * crownDownscaleFactor,
    );

    const crownOffset = c_Vec2(
        (width / 2 - crownSize.x) / 2,
        height / 12
    )


    return <div
        hidden={hideScreen}
        // hidden={false}
    >

        {/*Backdrop*/}
        <div className="w-full h-full bg-black z-20 opacity-20"
             style={{
                 position: "absolute",
                 left: 0,
                 top: 0,
             }}/>

        {/*Draw Screen*/}
        <div hidden={!doShowgameDrawScreen}>
            <div className="absolute w-full h-full top-0 left-0 bg-purple-800 opacity-20 z-20"></div>
            <div className="absolute top-0 left-0 z-30">
                {/*<SpriteView sprite={c_Sprite(crown_R_T)} transform={c_Transform2(crownOffset, c_Vec2(crownDownscaleFactor, crownDownscaleFactor))}></SpriteView>*/}

                <SpriteWithOverlay sprite={c_Sprite(ribbon_P_T)}
                                   transform={c_Transform2(drawRibbonOffset, c_Vec2(ribbonDownscaleFactor, ribbonDownscaleFactor))}>
                <span className="flex translate-y-1/8 justify-center h-full w-full text-white text-5xl">
                        Draw
                </span>
                </SpriteWithOverlay>

            </div>
        </div>

        {/*Victory Screen*/}
        <div hidden={doShowgameDrawScreen}>
            <div className="absolute w-1/2 h-full top-0 left-0 bg-red-500 opacity-20 z-20"></div>
            <div className="absolute w-1/2 h-full top-0 left-1/2 bg-blue-500 opacity-20 z-20"></div>

            <div className="absolute top-0 left-0 z-30">
                <div hidden={winner != 0}>
                    <SpriteView sprite={c_Sprite(crown_R_T)}
                                transform={c_Transform2(crownOffset, c_Vec2(crownDownscaleFactor, crownDownscaleFactor))}></SpriteView>
                </div>

                <SpriteWithOverlay sprite={c_Sprite(ribbon_R_T)}
                                   transform={c_Transform2(ribbonOffset, c_Vec2(ribbonDownscaleFactor, ribbonDownscaleFactor))}>
                <span className="flex translate-y-1/8 justify-center h-full w-full text-white text-5xl">
                        {winner === 0 ? "Victory" : "Defeat"}
                </span>
                </SpriteWithOverlay>

            </div>
            <div className="absolute top-0 left-1/2  z-30">
                <div hidden={winner != 1}>

                    <SpriteView sprite={c_Sprite(crown_B_T)}
                                transform={c_Transform2(crownOffset, c_Vec2(crownDownscaleFactor, crownDownscaleFactor))}></SpriteView>
                </div>

                <SpriteWithOverlay sprite={c_Sprite(ribbon_B_T)}
                                   transform={c_Transform2(ribbonOffset, c_Vec2(ribbonDownscaleFactor, ribbonDownscaleFactor))}>
                <span className="flex translate-y-1/8 justify-center h-full w-full text-white text-5xl">
                        {winner === 1 ? "Victory" : "Defeat"}
                </span>
                </SpriteWithOverlay>
            </div>
        </div>

        <div className="absolute top-1/2 left-1/2 z-25 rounded-xl
            -translate-x-1/2 -translate-y-1/4
            w-150 h-100 bg-gray-200">
        </div>

        {/*Game Result*/}
        <div className="absolute w-full top-11/24 left-0 z-50
                        flex gap-4 flex-col justify-center items-center
                        text-5xl ">
            <span>Turn : {turn}/{maxTurn}</span>
            <span>P1 : Result : P2</span>
            <span>{minionLefts[0]} : Minion : {minionLefts[1]}</span>
            <span>{minionHPSums[0]} : hp : {minionHPSums[1]}</span>
            <span>{totalBudget[0]} : Budget : {totalBudget[1]}</span>
        </div>


        {/*To Menu button Button*/}
        <div className={"absolute w-full top-27/32 flex flex-col justify-center items-center z-50"}>

            <button
                className="rounded-md
                    h-12 w-42 flex flex-col justify-center items-center drop-shadow-2xl
                    bg-teal-600 text-white
                    text-3xl z-10
                    transition active:scale-95 hover:bg-teal-700"
                onClick={() => router.push("/")}
            >
                Back to Menu
            </button>
        </div>
    </div>
}