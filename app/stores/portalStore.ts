import { create } from 'zustand';

interface PortalStore {
  activePortalId: string | null;
  setActivePortal: (activePortalId: string | null) => void;
  // True during the exit transition so ScrollWrapper doesn't fight the
  // camera reset (prevents the jump/glitch when leaving a portal).
  isTransitioning: boolean;
  setTransitioning: (isTransitioning: boolean) => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  activePortalId: null,
  setActivePortal: (activePortalId) => set(() => ({ activePortalId })),
  isTransitioning: false,
  setTransitioning: (isTransitioning) => set(() => ({ isTransitioning })),
}))
