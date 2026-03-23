import {HexPos, PlayerIntent} from "../../../ttypes/type";
import {PlayerIntentEnum} from "../../../ttypes/enums";
import {Minion} from "../type/GameTypes";
import {create} from "zustand";

type useIntent = {
    intent: PlayerIntent,
    setIntent: (intent: PlayerIntentEnum) => void,
    setMinion: (minion: number) => void,
    setHex: (pos: HexPos) => void,
    submitIntent: () => void,
}

const emptyIntent:PlayerIntent = {intent: PlayerIntentEnum.empty, hex: undefined, minion: undefined};

export const useIntent = create<useIntent>((set) => ({
    intent: emptyIntent,

    setIntent: (intent_: PlayerIntentEnum) =>
        set((state) => ({
            intent: {...state.intent, intent: intent_}
        })),

    setMinion: (minion: number) =>
        set((state) => ({
            intent: {...state.intent, minion: minion}
        })),

    setHex: (pos: HexPos) =>
        set((state) => ({
            intent: {...state.intent, hex: pos}
        })),
    submitIntent: () => set((state) => {

        console.log("submit intent to back-end");
        console.log(state.intent);
        return {intent:emptyIntent};
    })
}))