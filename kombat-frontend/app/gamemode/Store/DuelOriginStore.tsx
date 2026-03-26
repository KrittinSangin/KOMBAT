import {create} from "zustand";

type OriginStore = {
    state: string;
    mode: "DUEL"|"SOLITAIRE"|"AUTO"|""
    setOrigin: (value: string) => void;
    checkOrigin: () => string;
    isHost: () => boolean;
    myTeam: () => 0|1;
    setModeDuel: () => void;
    setModeSolitaire: () => void;
    setModeAuto: () => void;
    isMode: (mode:"DUEL"|"SOLITAIRE"|"AUTO"|"") => boolean
};


export const useOriginStore = create<OriginStore>((set, get) => ({
    state: "null",
    mode: "",
    setOrigin: (value) => set({state: value}),
    checkOrigin: () => get().state,
    isHost: () => get().state == "CREATE",
    myTeam: () => get().isHost()? 0:1,
    setModeDuel: ()             => set({mode:"DUEL"}),
    setModeSolitaire: ()    => set({mode:"SOLITAIRE"}),
    setModeAuto: ()         => set({mode:"AUTO"}),
    isMode: (mode) => get().mode == mode,
}));