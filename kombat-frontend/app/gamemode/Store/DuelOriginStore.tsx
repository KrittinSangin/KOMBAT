import {create} from "zustand";

type DuelOrigin = {
    state: string;
    setOrigin: (value: string) => void;
    checkOrigin: () => string;
};


export const useDuelOriginStore = create<DuelOrigin>((set, get) => ({
    state: "null",
    setOrigin: (value) => set({state: value}),
    checkOrigin: () => get().state,
}));