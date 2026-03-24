import {create} from "zustand";

export type joinedHandler = {
    hostID: string
    clientID: string
    setHostID: (value: string) => void
    setClientID: (value: string) => void
}

export const useJoinedHandler = create<joinedHandler>((set) => ({
    hostID: "null",
    clientID: "null",
    setHostID: (value: string) => set({hostID: value}),
    setClientID: (value: string) => set({clientID: value})
}))
