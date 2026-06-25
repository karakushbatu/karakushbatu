'use client';

import { useFrame } from "@react-three/fiber";
import { ReactNode, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Measures its children's bounding box once loaded and normalizes them: centers
 * the model and uniformly scales it so its largest dimension equals `size`.
 * Re-tries each frame until GLTF geometry is present.
 */
export function AutoFit({
  children,
  size = 3,
  position = [0, 0, 0],
  yOffset = 0,
}: {
  children: ReactNode;
  size?: number;
  position?: [number, number, number];
  yOffset?: number;
}) {
  const measureRef = useRef<THREE.Group>(null);
  const measured = useRef(false);
  const [fit, setFit] = useState<{ scale: number; offset: [number, number, number] }>({
    scale: 1,
    offset: [0, 0, 0],
  });

  useFrame(() => {
    if (measured.current || !measureRef.current) return;
    const box = new THREE.Box3().setFromObject(measureRef.current);
    if (box.isEmpty()) return;
    measured.current = true;
    const center = box.getCenter(new THREE.Vector3());
    const dims = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(dims.x, dims.y, dims.z) || 1;
    measureRef.current.worldToLocal(center);
    setFit({ scale: size / maxDim, offset: [-center.x, -center.y, -center.z] });
  });

  return (
    <group position={position}>
      <group scale={fit.scale} position={[0, yOffset, 0]}>
        <group ref={measureRef} position={fit.offset}>
          {children}
        </group>
      </group>
    </group>
  );
}
