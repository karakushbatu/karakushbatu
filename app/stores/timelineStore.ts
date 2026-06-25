import { create } from "zustand";
import { WorkTimelinePoint } from "../types";

interface TimelineStore {
  point: WorkTimelinePoint | null;
  visible: boolean;
  showPoint: (point: WorkTimelinePoint) => void;
  hide: () => void;
}

export const useTimelineStore = create<TimelineStore>((set) => ({
  point: null,
  visible: false,
  // Keep `point` mounted while hiding so the panel can fade out gracefully.
  showPoint: (point) => set({ point, visible: true }),
  hide: () => set({ visible: false }),
}));
