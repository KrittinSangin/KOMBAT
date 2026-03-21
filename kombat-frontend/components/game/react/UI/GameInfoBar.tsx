import {Game} from "../../type/GameTypes";
import {useIntent} from "../../model/useIntent";
import {PlayerIntentEnum} from "../../../../ttypes/enums";
import EventLog from "./EventLog";
import NoticeWindow from "./NoticeWindow";

interface Props
{
    game : Game
}

export default function GameInfoBar({game}:Props) {

    const {setIntent,submitIntent} = useIntent();

    const team = game.team;

    const budgetMax = game.cfg.maxBudget;
    const turn = game.turn;
    const turnMax = game.cfg.maxTurns;
    const spawnsLeft = game.cfg.maxSpawns - game.players[team].spawnCount;
    const gameState = game.gameState;

    const currentBudget = game.players[game.team].budget;
    const interestRate = game.players[game.team].interestRatePercentage;

    const handleIntent = (intent:PlayerIntentEnum ) =>
    {
        setIntent(intent);
        submitIntent();
    }

    return <nav>
        <NoticeWindow text={""} hidden={false}/>

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
        <div
            className=" absolute top-0 left-1/2 translate-x-24 translate-y-10 rounded-md
                    h-10 w-28 flex flex-col justify-center items-center drop-shadow-2xl
                    bg-red-800 text-white
                    text-2xl z-10"
            onClick={() => handleIntent(PlayerIntentEnum.resign)}
        >
            Surrender
        </div>

        {/*skip button*/}
        <div
            className=" absolute top-0 left-1/2 translate-x-24 translate-y-22 rounded-md
                    h-10 w-28 flex flex-col justify-center items-center drop-shadow-2xl
                    bg-teal-600 text-white
                    text-2xl z-10"
            onClick={() => handleIntent(PlayerIntentEnum.skip)}
        >
            Skip
        </div>
    </nav>
}