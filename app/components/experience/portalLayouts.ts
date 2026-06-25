import type { PortalId } from "./portalConfig";

/** 3D transform for framing a model inside a portal tile (door preview). */
export interface PortalModelLayout {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

/** Per-portal layout presets — tune preview vs. active without touching portal logic. */
export const PORTAL_LAYOUTS: Record<
  PortalId,
  { preview: PortalModelLayout; active: PortalModelLayout }
> = {
  // Portal 1 — wide establishing shot of the full painting
  work: {
    preview: { position: [0.05, -0.7, 1.45], rotation: [0, 0.08, 0], scale: 1.45 },
    active: { position: [0, -6, 1], rotation: [0, 0, 0], scale: 5 },
  },
  // Portal 2 — the wanderer on the peak, viewed from a little back so the
  // standing figure is in frame. Lower `scale` = zoom out / see more painting.
  // `position`: lower y reveals higher (the figure on the summit); +x shifts right.
  projects: {
    preview: { position: [0.4, -0.4, 0.6], rotation: [0, 1.1, 0], scale: 1 },
    active: { position: [0, -1, -1], rotation: [0, Math.PI / 6, 0], scale: 1.5 },
  },
  // Portal 3 — sand wanderer. Active framing matches the lookAt in techstack/index.tsx.
  techstack: {
    preview: { position: [0, -0.35, 0.4], rotation: [0, Math.PI, 0], scale: 0.4 },
    active: { position: [0, -0.35, 0], rotation: [0, 0, 0], scale: 1.2 },
  },
};

/** Camera offsets applied on top of PORTAL_CAM when a portal is active. */
export const PORTAL_CAM_OFFSETS: Record<PortalId, { z: number; y?: number }> = {
  work: { z: 0 },
  projects: { z: -2.2 },
  techstack: { z: 0 },
};
