import {useSearchParams} from "next/navigation";
import {useRouter} from "next/dist/client/components/navigation";
import {checkState} from "../../page";
import {create} from "zustand";
import {Config} from "../../../ttypes/type";

type ConfigValues = {
    _Hp: number
    _minions: number
    _turnMax: number
    _startingBudget: number
    _maximumBudget: number
    _interest: number
    _hexCost: number
    _spawningCost: number
    _maximumSpawn: number
    _turnBudget: number
}

type ConfigureState = {
    config: ConfigValues
    setHp: (value: number) => void
    setMinions: (value: number) => void
    setTurnMax: (value: number) => void
    setStartingBudget: (value: number) => void
    setMaximumBudget: (value: number) => void
    setInterest: (value: number) => void
    setHexCost: (value: number) => void
    setSpawningCost: (value: number) => void
    setMaximumSpawn: (value: number) => void
    setTurnBudget: (value: number) => void

    setAll: (config: Partial<ConfigValues>) => void

    reset: () => void

    fetchDefaultConfig: () => Promise<void>;
}

export const defaultConfigStore: ConfigValues = {
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
}

export const useConfigStore = create<ConfigureState>((set) => ({
    config: defaultConfigStore,

    setHp: (value) => set((state) => ({config: {...state.config, _Hp: value}})),
    setMinions: (value) => set((state) => ({config: {...state.config, _minions: value}})),
    setTurnMax: (value) => set((state) => ({config: {...state.config, _turnMax: value}})),
    setStartingBudget: (value) => set((state) => ({config: {...state.config, _startingBudget: value}})),
    setMaximumBudget: (value) => set((state) => ({config: {...state.config, _maximumBudget: value}})),
    setInterest: (value) => set((state) => ({config: {...state.config, _interest: value}})),
    setHexCost: (value) => set((state) => ({config: {...state.config, _hexCost: value}})),
    setSpawningCost: (value) => set((state) => ({config: {...state.config, _spawningCost: value}})),
    setMaximumSpawn: (value) => set((state) => ({config: {...state.config, _maximumSpawn: value}})),
    setTurnBudget: (value) => set((state) => ({config: {...state.config, _turnBudget: value}})),

    setAll: (config) => set((state) => ({config: {...state.config, ...config}})),

    reset: () => set({config: defaultConfigStore}),
    fetchDefaultConfig: async () => {
        try {
            console.log("Fetching Default Config...")
            const res = await fetch(`${process.env.NEXT_PUBLIC_LINK}/data/defaultConfig`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            });
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }

            const data:Config = await res.json();
            set({config: Config2PermsConfigAdapter(data)})

        } catch (_)
        {
        }
    }
}))


export function PermsConfig2ConfigAdapter(pcfg: ConfigValues) {
    const cfg: Config = {
        spawnCost: pcfg._spawningCost,
        hexPurchaseCost: pcfg._hexCost,
        initBudget: pcfg._startingBudget,
        initHp: pcfg._Hp,
        turnBudget: pcfg._turnBudget,
        maxBudget: pcfg._maximumBudget,
        interestPct: pcfg._interest,
        maxTurns: pcfg._turnMax,
        maxSpawns: pcfg._maximumSpawn,
        mapWidth: 8,
        mapHeight: 8,
        startHexPosP1: [
            {row: 1, col: 1},
            {row: 1, col: 2},
            {row: 1, col: 3},
            {row: 2, col: 1},
            {row: 2, col: 2},
        ],
        startHexPosP2: [
            {row: 7, col: 7},
            {row: 7, col: 8},
            {row: 8, col: 6},
            {row: 8, col: 7},
            {row: 8, col: 8},
        ],
    }
    return cfg;
}

export function Config2PermsConfigAdapter(cfg: Config) {
    const pcfg: ConfigValues = {
        _spawningCost: cfg.spawnCost,
        _hexCost: cfg.hexPurchaseCost,
        _startingBudget: cfg.initBudget,
        _Hp: cfg.initHp,
        _turnBudget: cfg.turnBudget,
        _maximumBudget: cfg.maxBudget,
        _interest: cfg.interestPct,
        _turnMax: cfg.maxTurns,
        _maximumSpawn: cfg.maxSpawns,
        _minions: 5,
    }
    return pcfg;
}