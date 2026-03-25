import {create} from "zustand";

export type MinionBlueprint = {
    name : string,
    def : number,
    strategyFileName: string,
    isStrategyParsedOk: boolean,
    index : number,
    spriteName : string
}

type MinionBlueprintsStore = {
    minionBlueprints : MinionBlueprint[],
    isInitialized: boolean
    initializeBlueprintCount : (count:number) => void,
    setBlueprint : (index:number,blueprint:MinionBlueprint) => void,
    clear: () => void
}

export const useMinionBlueprintsStore = create<MinionBlueprintsStore>((set) => ({
    minionBlueprints: [],
    isInitialized: false,
    initializeBlueprintCount: (count:number) => set({minionBlueprints: Array.from({length:count}).map((_,i)=>({
            name: `Minion${i+1}`,
            def: 0,
            strategyFileName: "",
            isStrategyParsedOk: false,
            index: i,
            spriteName: ""
        })),
    isInitialized: true}),

    setBlueprint: (index:number,blueprint:MinionBlueprint) => set((state) => {
        const newBlueprints = [...state.minionBlueprints];
        newBlueprints[index] = blueprint;
        return {minionBlueprints: newBlueprints}
    }),

    clear: () => set({minionBlueprints:[],isInitialized:false})
}))