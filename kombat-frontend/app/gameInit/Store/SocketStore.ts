import {create} from "zustand";
import {Client} from "@stomp/stompjs";

interface SocketStore {
    client: Client | null;
    setClient: (client: Client) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
    client: null,
    setClient: (client) => set({client}),
}));