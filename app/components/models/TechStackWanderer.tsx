"use client";

import { PORTAL_MODELS } from "@/app/constants/models";
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

type WandererProps = React.JSX.IntrinsicElements["group"];

/**
 * Tech Stack portal figure. Loads `public/models/tech-stack-wanderer.glb`.
 * Replace that file with a new Sketchfab GLB export — no code changes needed.
 */
export function TechStackWanderer(props: WandererProps) {
  const { scene } = useGLTF(PORTAL_MODELS.techStack);

  // Tilt Brush exports use fully-white emissive PBR materials, which render as a
  // featureless white blob. The brush colours live in the COLOR_0 vertex
  // attribute, so swap to unlit vertex-coloured materials that show them.
  const clone = useMemo(() => {
    const c = SkeletonUtils.clone(scene);
    c.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      const src = mesh.material as THREE.MeshStandardMaterial;
      const hasVertexColor = !!mesh.geometry.getAttribute("color");
      mesh.material = new THREE.MeshBasicMaterial({
        vertexColors: hasVertexColor,
        color: hasVertexColor ? 0xffffff : 0xc89b6a,
        map: src?.map ?? null,
        side: THREE.DoubleSide,
        transparent: !!src?.transparent,
        opacity: src?.opacity ?? 1,
        depthWrite: !src?.transparent,
        toneMapped: false,
      });
    });
    return c;
  }, [scene]);

  return <primitive object={clone} {...props} />;
}

useGLTF.preload(PORTAL_MODELS.techStack);
