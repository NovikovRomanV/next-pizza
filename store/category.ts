import {create} from "zustand/react";

type State = {
    activeId: number
    setActiveId: (activeId: number) => void
}

export const useCategoryStore = create<State>()((set) => ({
    activeId: 1,
    setActiveId: (activeId: number) => set({ activeId }),
}))