// Shared layout + camera config for the single ROW of 3 portals.
// Tiles sit at the same local y (= 0) so every portal reuses the same proven
// camera framing; only the x changes per tile. Tune here in one place.

import { isMobile } from "react-device-detect";

export type PortalId = "work" | "projects" | "techstack";

// Tile size (square side) and x-position of each tile in the row.
export const TILE_SIZE = isMobile ? 1.7 : 2.7;

export const TILE_X: Record<PortalId, number> = isMobile
  ? { work: -1.95, projects: 0, techstack: 1.95 }
  : { work: -3, projects: 0, techstack: 3 };

export const TILE_Y = 0;

// Camera framing used by every portal when it becomes active.
// `y` is the camera height — raise this (toward 0) if the view feels too low.
export const PORTAL_CAM = {
  y: -36.5,
  z: isMobile ? 11.5 : 13.5,
};
