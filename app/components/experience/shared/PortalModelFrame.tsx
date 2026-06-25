"use client";

import gsap from "gsap";
import { ReactNode, useEffect, useRef } from "react";
import * as THREE from "three";

import { PortalModelLayout } from "../portalLayouts";

interface PortalModelFrameProps {
  active: boolean;
  preview: PortalModelLayout;
  activeLayout: PortalModelLayout;
  children: ReactNode;
}

/** Door-preview vs. interior framing. Snaps on exit; delayed move on enter (after portal blend). */
export function PortalModelFrame({
  active,
  preview,
  activeLayout,
  children,
}: PortalModelFrameProps) {
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!ref.current) return;
    const g = ref.current;

    if (!active) {
      g.position.set(...preview.position);
      g.rotation.set(...preview.rotation);
      g.scale.setScalar(preview.scale);
      return;
    }

    const run = () => {
      gsap.to(g.position, {
        x: activeLayout.position[0],
        y: activeLayout.position[1],
        z: activeLayout.position[2],
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(g.rotation, {
        x: activeLayout.rotation[0],
        y: activeLayout.rotation[1],
        z: activeLayout.rotation[2],
        duration: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(g.scale, {
        x: activeLayout.scale,
        y: activeLayout.scale,
        z: activeLayout.scale,
        duration: 0.6,
        ease: "power2.inOut",
      });
    };

    const t = setTimeout(run, 520);
    return () => clearTimeout(t);
  }, [active, activeLayout, preview]);

  return (
    <group
      ref={ref}
      position={preview.position}
      rotation={preview.rotation}
      scale={preview.scale}>
      {children}
    </group>
  );
}
