import { useEffect, useRef } from "react";

/**
 * Returns a ref whose `.current` is a 0..1 progress value driven by the user's
 * wheel / touch while a portal is active. Read it inside useFrame (no re-renders).
 * Used for cinematic scroll inside portals (rotate the figure, scroll posts...).
 */
export function usePortalScroll(active: boolean, sensitivity = 0.0008) {
  const progress = useRef(0);

  useEffect(() => {
    if (!active) {
      progress.current = 0;
      return;
    }

    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

    const onWheel = (e: WheelEvent) => {
      progress.current = clamp(progress.current + e.deltaY * sensitivity);
    };

    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      progress.current = clamp(progress.current + (lastY - y) * sensitivity * 3);
      lastY = y;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active, sensitivity]);

  return progress;
}
