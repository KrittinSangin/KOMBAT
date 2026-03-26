import {create} from "zustand";

export type StrategyFile = {
    name: string;
    content: string;
    isParsedSuccess: boolean;
    spriteName: string;
    defenseFactor: number
    ownerIndex: number|null;
}

interface StrategyFilesStore {
    files: StrategyFile[];
    setFiles: (min: StrategyFile[]) => void
    reset: () => void
}

export const useStrategyFilesStore = create<StrategyFilesStore>((set) => ({
    files: [],
    setFiles: (min: StrategyFile[]) => set({files: min}),
    reset: () => set({files:[]}),
}));
