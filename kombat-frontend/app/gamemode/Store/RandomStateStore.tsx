import {useRouter} from "next/dist/client/components/navigation";
import {useState} from "react";
import {create} from "zustand";
import {persist} from "zustand/middleware";

type RandState = {
    code: string;
    randomize: () => void;
};

export const RandomStateStore = create<RandState>()(
    persist(
        (set) => ({
            code: "",
            randomize: () =>
                set({ code: Math.random().toString(36).substring(2, 6).toUpperCase() }),
        }),
        {
            name: "rand-storage", // key in localStorage
        }
    )
);
