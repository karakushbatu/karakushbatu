/**
 * Tech Stack camera calibration — tune these while testing in the portal.
 *
 * scroll = 0  → FRONT  (wanderer facing you — ref image 1)
 * scroll = 1  → BEHIND (camera swung round behind the wanderer — ref image 2)
 *
 * All offsets are relative to TILE_X.techstack and PORTAL_CAM.z + offset.
 */

/** Wheel sensitivity — higher = reaches the behind shot with LESS scrolling (faster). */
export const SCROLL_SENSITIVITY = 0.0019;

/** How quickly the camera catches the scroll target (0.05 slow … 0.18 snappy). */
export const CAM_YAW_LERP = 0.13;
export const CAM_POS_DAMP = 10;

// ── Model framing (portal door + interior start) — portalLayouts.ts mirrors these ──
// The model is FIGURE-CENTERED (see SandDuneWanderer): the explorer sits at the
// origin (~0.64u) and the desert spills out around it. `scale` controls how big
// the explorer is, `position` places it in frame.
export const MODEL_PREVIEW = {
  position: [1.2, 0.4, -2] as [number, number, number],
  rotation: [-0.15, Math.PI / 50, -0.1] as [number, number, number],
  scale: 3.5, // full standing figure (ref image 2). Raise to zoom in, lower to zoom out.
};


// scroll = 0 — first look (front establishing shot you tuned).
export const MODEL_ACTIVE = {
  position: [-1.8, 2.3, -1.4] as [number, number, number],
  rotation: [-.2, Math.PI / 3, -0] as [number, number, number],
  scale: 5, // full standing figure (ref image 2). Raise to zoom in, lower to zoom out.
};

// scroll = 1 — final resting pose (behind the wanderer). The model eases from
// MODEL_ACTIVE → MODEL_FINAL as you scroll; the camera stays put.
export const MODEL_FINAL = {
  position: [1.5, 2, -1] as [number, number, number],
  rotation: [0, -Math.PI / 1.3, -0.1] as [number, number, number],
  scale: 4,
};

/** How smoothly the model eases between poses (higher = snappier). */
export const MODEL_DAMP = 3.5;


// ── Camera keyframe A — front establishing shot (scroll = 0) ──
export const CAM_FRONT = {
  /** Extra yaw on top of TILE_X / 12 */
  yawOffset: 0,
  /** Extra X offset from TILE_X.techstack */
  xOffset: 0,
  /** Extra Z offset from camZ */
  zOffset: 0,
};

// ── Camera keyframe B — behind the wanderer (scroll = 1) ──
export const CAM_BEHIND = {
  /** Orbit amount. ~0.9–1.0·π ≈ fully behind; lower = more of a side view. */
  yawOffset: Math.PI * 0.92,
  /** Negative = camera shifts left so the figure sits on the right of frame. */
  xOffset: -0.8,
  /** Positive = pull back / rise so you look over the desert behind the figure. */
  zOffset: 1.15,
};

// ── Tech cards (left column, in portal space) ──
export const CARDS = {
  x: -6,
  z: 1.2,
  /** Vertical position of the column (raise/lower the whole stack). */
  columnTop: 3.2,
  /** Slight turn toward the viewer (radians). */
  rotY: 0.3,
  /** How far the column drifts UP as you scroll (smaller = stays put). */
  scrollLift: 1.4,
  /** Scroll value before first card fades in */
  revealStart: 0.08,
  /** Stagger between cards */
  revealStep: 0.12,
  /** Fade window per card */
  revealWindow: 0.24,
};

// ── "scroll" hint on first entry (camera-relative: x=L/R, y=up/down, z=front<0) ──
export const HINT = {
  x: 0,
  y: -1.45,
  z: -3.2,
};

// ── Detail panel (portal space, same coords as the cards/model) ──
// x = right, y = up/down, z = toward camera (higher = more in front of figure).
export const DETAIL = {
  x: 1.5,
  y: 2.9,
  z: 1.8,
  rotY: -0.18,
};

export function getCameraKeyframes(tileX: number, camZ: number, baseYaw: number) {
  return {
    front: {
      yaw: baseYaw + CAM_FRONT.yawOffset,
      x: tileX + CAM_FRONT.xOffset,
      z: camZ + CAM_FRONT.zOffset,
    },
    behind: {
      yaw: baseYaw + CAM_BEHIND.yawOffset,
      x: tileX + CAM_BEHIND.xOffset,
      z: camZ + CAM_BEHIND.zOffset,
    },
  };
}
