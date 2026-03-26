import {MinionBlueprint} from "./MinionBlueprint";
import {create} from "zustand";

type MinionPreviewStore = {
    exportedDeck:MinionBlueprint[],
    setExportedDeck:(setter:MinionBlueprint[]) => void
}

export const useMinionPreviewStore = create<MinionPreviewStore>((set) => ({
    exportedDeck: [],
    setExportedDeck: (setter) => set({exportedDeck: setter})
}))