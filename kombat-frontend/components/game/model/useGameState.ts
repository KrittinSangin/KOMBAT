import {create} from "zustand";
import {Game, StartInfo} from "../type/GameTypes";
import {GameDTO} from "../../../ttypes/type";
import {emptyGameDTO, emptyGame, startGame, updateGame} from "./game";

type useGameState = {
    game: Game,
    gameDTO: GameDTO,
    start: (startInfo:StartInfo) => void,
    set: (game:Game) => void,
    update: (dto:GameDTO) => void,
    reset: () => void
}

export const useGameState = create<useGameState>((set) => ({
    game:emptyGame,
    gameDTO: emptyGameDTO,

    start: (startInfo) =>
        set({game: startGame(startInfo)}),

    set: (game) =>
        set({game: game}),

    update: (dto) => set((state) => ({
        game: updateGame(state.game,dto),
        gameDTO: dto
    })),

    reset: () => set({game:emptyGame, gameDTO:emptyGameDTO}),
}))