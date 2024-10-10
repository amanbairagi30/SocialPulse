import { create } from "zustand"

interface SidebarState {
    sidebarVisibility: boolean
    isCollapsed: boolean
    toggleSidebarVisibility: (check: boolean) => void
    toggleCollapsed: () => void
}

export const useSidebarStore = create<SidebarState>()((set) => ({
    sidebarVisibility: false,
    isCollapsed: false,
    toggleSidebarVisibility: (check) => set((state) => ({ sidebarVisibility: check })),
    toggleCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed }))
}))