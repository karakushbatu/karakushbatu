import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { useExperienceNear } from "@/app/hooks/useExperienceNear";
import { usePortalStore } from "@stores";
import { Wanderer } from "../../models/Wanderer";
import { PORTAL_CAM_OFFSETS, PORTAL_LAYOUTS } from "../portalLayouts";
import { PORTAL_CAM, TILE_X } from "../portalConfig";
import { PortalModelFrame } from "../shared/PortalModelFrame";
import ProjectsCarousel from "./ProjectsCarousel";
import { TouchPanControls } from "./TouchPanControls";

const Projects = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "projects");
  const near = useExperienceNear(0.66);
  const data = useScroll();
  const { preview, active } = PORTAL_LAYOUTS.projects;
  const camZ = PORTAL_CAM.z + PORTAL_CAM_OFFSETS.projects.z;

  useEffect(() => {
    data.el.style.overflow = isActive ? "hidden" : "auto";
    if (isActive) {
      gsap.to(camera.position, {
        x: TILE_X.projects,
        y: PORTAL_CAM.y,
        z: camZ,
        duration: 1,
      });
    }
  }, [isActive]);

  useFrame((state, delta) => {
    if (isActive) {
      if (!isMobile) {
        camera.rotation.y = THREE.MathUtils.lerp(
          camera.rotation.y,
          TILE_X.projects / 12 - (state.pointer.x * Math.PI) / 5,
          0.03
        );
        camera.position.z = THREE.MathUtils.damp(
          camera.position.z,
          camZ - state.pointer.y * 0.8,
          7,
          delta
        );
      }
    }
  });

  return (
    <group>
      <PortalModelFrame active={isActive} preview={preview} activeLayout={active}>
        <Wanderer />
      </PortalModelFrame>
      {near && <ProjectsCarousel />}
      {isActive && isMobile && <TouchPanControls />}
    </group>
  );
};

export default Projects;
