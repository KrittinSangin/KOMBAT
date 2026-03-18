import {create} from "zustand";
import {Game, StartInfo} from "../type/GameTypes";
import {GameDTO} from "../../../ttypes/type";
import {emptyGame, startGame, updateGame} from "./game";

type useGameState = {
    game: Game,
    start: (startInfo:StartInfo) => void,
    set: (game:Game) => void,
    update: (dto:GameDTO) => void,
    reset: () => void
}

export const useGameState = create<useGameState>((set) => ({
    game:emptyGame,

    start: (startInfo) =>
        set({game: startGame(startInfo)}),

    set: (game) =>
        set({game: game}),

    update: (dto) => set((state) => ({
        game: updateGame(state.game,dto)
    })),

    reset: () => set({game:emptyGame}),
}))