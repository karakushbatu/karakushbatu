import { usePortalStore, useScrollStore } from "@stores";

/** True when the experience section is near or a portal is open — gates heavy portal content. */
export function useExperienceNear(threshold = 0.68) {
  const scrollProgress = useScrollStore((s) => s.scrollProgress);
  const isActive = usePortalStore((s) => !!s.activePortalId);
  return isActive || scrollProgress >= threshold;
}
