import {create} from "zustand";

type OriginStore = {
    state: string;
    setOrigin: (value: string) => void;
    checkOrigin: () => string;
    isHost: () => boolean
    myTeam: () => 0|1
};


export const useOriginStore = create<OriginStore>((set, get) => ({
    state: "null",
    setOrigin: (value) => set({state: value}),
    checkOrigin: () => get().state,
    isHost: () => get().state == "CREATE",
    myTeam: () => get().isHost()? 0:1
}));