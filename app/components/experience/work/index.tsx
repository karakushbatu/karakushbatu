import { ScrollControls } from "@react-three/drei";
import { usePortalStore, useScrollStore } from "@stores";
import { useEffect } from "react";

import { Memory } from "../../models/Memory";
import { PORTAL_LAYOUTS } from "../portalLayouts";
import { PortalModelFrame } from "../shared/PortalModelFrame";
import Timeline from "./Timeline";
import { useExperienceNear } from "@/app/hooks/useExperienceNear";

const Work = () => {
  const isActive = usePortalStore((state) => state.activePortalId === "work");
  const near = useExperienceNear(0.66);
  const { scrollProgress, setScrollProgress } = useScrollStore();
  const { preview, active } = PORTAL_LAYOUTS.work;

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;
    setScrollProgress(progress);
  };

  useEffect(() => {
    if (isActive) {
      const scrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      if (!scrollWrapper || !originalScrollWrapper) return;

      setScrollProgress(0);
      scrollWrapper.addEventListener("scroll", handleScroll);
      scrollWrapper.style.zIndex = "1";
      originalScrollWrapper.style.zIndex = "-1";
    } else {
      const scrollWrapper = document.querySelector('div[style*="z-index: 1"]') as HTMLElement;
      const originalScrollWrapper = document.querySelector('div[style*="z-index: -1"]') as HTMLElement;

      if (scrollWrapper && originalScrollWrapper) {
        scrollWrapper.scrollTo({ top: 0, behavior: "smooth" });
        setScrollProgress(0);
        scrollWrapper.removeEventListener("scroll", handleScroll);
        scrollWrapper.style.zIndex = "-1";
        originalScrollWrapper.style.zIndex = "1";
      }
    }
  }, [isActive]);

  return (
    <group>
      <mesh receiveShadow>
        <planeGeometry args={[4, 4, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh>
      <ScrollControls style={{ zIndex: -1 }} pages={2} maxSpeed={0.4}>
        <PortalModelFrame active={isActive} preview={preview} activeLayout={active}>
          <Memory />
        </PortalModelFrame>
        {near && <Timeline progress={isActive ? scrollProgress : 0} />}
      </ScrollControls>
    </group>
  );
};

export default Work;
