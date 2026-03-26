import {Game} from "../../type/GameTypes";
import {useIntent} from "../../model/useIntent";
import {GameStateEnum, PlayerIntentEnum} from "../../../../ttypes/enums";
import NoticeWindow from "./NoticeWindow";
import {useEffect, useState} from "react";
import {useSocketStore} from "../../../../app/gameInit/Store/SocketStore";
import {useGameStateStore} from "../../model/useGameStateStore";
import {useOriginStore} from "../../../../app/gamemode/Store/DuelOriginStore";

interface Props {
    game: Game
}

export default function GameInfoBar({game}: Props) {
    const {myTeam} = useOriginStore();
    const {setIntent, submitIntent,askBotIntent} = useIntent();
    const {client} = useSocketStore();

    const [dotCount, setDotCount] = useState<number>(0);

    const running = game.gameState === GameStateEnum.execute;

    useEffect(() => {
        if (!running) return;

        const interval = setInterval(() => {
            setDotCount(prev => prev > 2 ? 1 : prev + 1);
        }, 300);

        return () => clearInterval(interval);
    }, [running]);


    const team = myTeam();

    const budgetMax = game.cfg.maxBudget;
    const turn = game.turn;
    const turnMax = game.cfg.maxTurns;
    const spawnsLeft = game.cfg.maxSpawns - game.players[team].spawnCount;
    const gameState = game.gameState;

    const currentBudget = game.players[team].budget;
    const interestRate = game.players[team].interestRatePercentage;

    const handleIntent = (intent: PlayerIntentEnum) => {

        if (game.team == myTeam()) {
            setIntent(intent);
            if (client)
                submitIntent(client);
        }
    }

    const handleBot = (intent: PlayerIntentEnum) => {
            if (client)
                askBotIntent(client);
    }

    function noticeWindowHandle() {
        let message = "";

        switch (game.team) {
            case 0:
                message += "Player 0 "
                break;
            case 1:
                message += "Player 1 "
                break;
        }

        switch (game.gameState) {
            case GameStateEnum.empty:
                message += "empty state"
                break;
            case GameStateEnum.start:
                message += "Spawn free minion"
                break;
            case GameStateEnum.buyHex:
                message += "Buy hex"
                break;
            case GameStateEnum.buyMinion:
                message += "Buy minion"
                break;
            case GameStateEnum.execute:
                message += "Executing Strategy"
                for (let i = 0; i < dotCount; i++) message += ".";
                break;
            case GameStateEnum.end:
                message += "Game Over"
                break;
            default:
                message += "Not a state"
                break;
        }

        return <NoticeWindow text={message} hidden={false}/>
    }

    return <nav>
        {noticeWindowHandle()}

        {/*budget*/}
        <div
            className=" absolute top-0 left-1/2 -translate-x-80 - translate-y-
                    h40 w-64 flex flex-col justify-start items-start
                    bg-yellow-300
                    text-m"
        >
            <span>Team : {team}</span>
            <span>Budget : {currentBudget}$ / {budgetMax}$</span>
            <span>Interest : {interestRate}%</span>
            <span>Spawns Left : {spawnsLeft}</span>
            <span>GameState : {gameState}</span>
        </div>

        {/*turn triangle*/}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 ">
            <div
                className="bg-white w-32 h-32 drop-shadow-2xl
                        flex flex-col items-center"
            >
                <span className="font-bold text-3xl">Turn</span>
                <span className="font-bold text-3xl">{turn}/{turnMax}</span>
            </div>
        </div>

        {/*give up button*/}
        <button
            className=" absolute top-0 left-1/2 translate-x-24 translate-y-10 rounded-md
                    h-10 w-28 flex flex-col justify-center items-center drop-shadow-2xl
                    bg-red-800 text-white
                    text-2xl z-10
                    transition active:scale-95"
            onClick={() => handleIntent(PlayerIntentEnum.resign)}
        >
            Surrender
        </button>

        {/*skip button*/}
        <button
            className=" absolute top-0 left-1/2 translate-x-24 translate-y-22 rounded-md
                    h-10 w-28 flex flex-col justify-center items-center drop-shadow-2xl
                    bg-teal-600 text-white
                    text-2xl z-10
                    transition active:scale-95"
            onClick={() => handleIntent(PlayerIntentEnum.skip)}
        >
            Skip
        </button>

        {/*advance button*/}
        <button
            className=" absolute top-0 left-1/2 translate-x-56 translate-y-10 rounded-md
                    h-22 w-28 flex flex-col justify-center items-center drop-shadow-2xl
                    bg-lime-700 text-white
                    text-2xl z-10
                    transition active:scale-95"
            onClick={() => {

                handleBot(PlayerIntentEnum.skip)
            }}
        >
            Advance Bot
        </button>
    </nav>
}