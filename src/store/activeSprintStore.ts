import { create } from "zustand";
import { ISprint } from "../types/ISprint";

interface IActiveSprintStore {
    activeSprint: ISprint | null
    setActiveSprint: (newActiveSprint: ISprint) => void
    removeActiveSprint: () => void
}

export const activeSprintStore = create<IActiveSprintStore>((set) => ({
    activeSprint: null,
    setActiveSprint: (newActiveSprint: ISprint) => set({ activeSprint: newActiveSprint }),
    removeActiveSprint: () => ({ activeSprint: null })
}))