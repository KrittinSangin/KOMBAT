import {create} from "zustand";
import {Game} from "../type/GameTypes";
import {GameDTO, StartInfoDTO} from "../../../ttypes/type";
import {emptyGameDTO, emptyGame, startGame, updateGame} from "./game";

type useGameState = {
    game: Game,
    gameDTO: GameDTO,
    start: (startInfo:StartInfoDTO) => void,
    set: (game:Game) => void,
    update: (dto:GameDTO) => void,
    reset: () => void
}

export const useGameStateStore = create<useGameState>((set) => ({
    game:emptyGame,
    gameDTO: emptyGameDTO,

    start: (startInfo) =>
        set(() => {
            return {game: startGame(startInfo)}
        }),

    set: (game) =>
        set(() => {
            return {game: game}
        }),

    update: (dto) => set((state) => {
        const newGame = updateGame(state.game,dto);

        return {
            game: {...newGame},
            gameDTO: {...dto}
        }
    }),

    reset: () => set({game:emptyGame, gameDTO:emptyGameDTO}),
}))