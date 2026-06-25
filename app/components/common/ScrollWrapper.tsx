'use client';

import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore, useScrollStore } from "@stores";

const ScrollWrapper = (props: { children: React.ReactNode | React.ReactNode[]}) => {
  const { camera } = useThree();
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);
  const isTransitioning = usePortalStore((state) => state.isTransitioning);
  const setScrollProgress = useScrollStore((state) => state.setScrollProgress);

  // Hand the camera fully to the portal (and its exit reset) while a portal is
  // open or transitioning — otherwise both write the camera and it glitches.
  const lockCamera = isActive || isTransitioning;

  useFrame((state, delta) => {
    if (data) {
      const a = data.range(0, 0.3);
      const b = data.range(0.3, 0.5);
      const d = data.range(0.85, 0.18);

      if (!lockCamera) {
        camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -0.5 * Math.PI * a, 5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, -37 * b, 7, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 5 + 10 * d, 7, delta);

        setScrollProgress(data.range(0, 1));
      }

      // Move camera slightly on mouse movement.
      if (!isMobile && !lockCamera) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 90, 0.05);
      }
    }
  });

  const children = Array.isArray(props.children) ? props.children : [props.children];

  return <>
    {children.map((child, index) => {
      return <group key={index}>
        {child}
      </group>
    })}
  </>
}

export default ScrollWrapper;