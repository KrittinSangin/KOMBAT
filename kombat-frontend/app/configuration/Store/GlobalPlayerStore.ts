import {create} from "zustand";


export type globalPlayerStore = {
    player1: string;
    player2: string;
    setPlayer1Name: (value: string) => void
    setPlayer2Name: (value: string) => void
}

export const useGlobalPlayerStore = create<globalPlayerStore>((set) => ({
    player1: "Player1",
    player2: "Player2",
    setPlayer1Name: (value: string) => set({player1: value}),
    setPlayer2Name: (value: string) => set({player2: value})
}))