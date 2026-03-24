import {create} from "zustand";
import type {ConfigureState} from "../ttypes/type";

export const _useConfigStore = create<ConfigureState>((set) => ({
    _Hp: 1,
    _minions: 1,
    _turnMax: 1,
    _startingBudget: 1,
    _maximumBudget: 1,
    _interest: 1,
    _hexCost: 1,
    _spawningCost: 1,
    _maximumSpawn: 1,
    _turnBudget: 1,

    setHp: (value) => set({_Hp: value}),
    setMinions: (value) => set({_minions: value}),
    setTurnMax: (value) => set({_turnMax: value}),
    setStartingBudget: (value) => set({_startingBudget: value}),
    setMaximumBudget: (value) => set({_maximumBudget: value}),
    setInterest: (value) => set({_interest: value}),
    setHexCost: (value) => set({_hexCost: value}),
    setSpawningCost: (value) => set({_spawningCost: value}),
    setMaximumSpawn: (value) => set({_maximumSpawn: value}),
    setTurnBudget: (value) => set({_turnBudget: value}),

    setAll: (config) =>
        set((state) => ({
            ...state,
            ...config
        })),
}))