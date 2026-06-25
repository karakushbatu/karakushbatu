import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { RefObject, Suspense, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { useExperienceNear } from "@/app/hooks/useExperienceNear";
import { usePortalScroll } from "@/app/hooks/usePortalScroll";
import { usePortalStore } from "@stores";
import { AutoFit } from "../../models/AutoFit";
import { TechStackWanderer } from "../../models/TechStackWanderer";
import { PORTAL_LAYOUTS } from "../portalLayouts";
import { PORTAL_CAM, TILE_X } from "../portalConfig";
import { PortalModelFrame } from "../shared/PortalModelFrame";
import TechStackGrid from "./TechStackGrid";

// ╔══════════════════════════════════════════════════════════════════════╗
// ║  TECH STACK CAMERA — TUNE THESE (live-reload in `npm run dev`)         ║
// ║                                                                        ║
// ║  Camera sits close in FRONT of the figure and glides to BEHIND it as   ║
// ║  you scroll (0 → 1). It always looks AT the figure's spot.             ║
// ║                                                                        ║
// ║  • Figure too small / far?  →  raise FIGURE_SIZE  (or lower CAM_FRONT)  ║
// ║  • Want to be even closer?  →  lower CAM_FRONT / CAM_BACK magnitudes    ║
// ╚══════════════════════════════════════════════════════════════════════╝
const FIGURE_SIZE = 7;          // model size — BIGGER = figure fills more of the screen
const CAM_FRONT = 1.3;          // camera distance in front on enter (SMALLER = closer)
const CAM_BACK = -1.6;          // camera distance behind after scrolling
const CAM_Y_FRONT = 0.35;       // camera height on enter (negative = look up at it)
const CAM_Y_BACK = 0.6;         // camera height once behind
const LOOK_Y = -0.1;            // vertical aim point on the figure
const CAM_DAMP = 4;             // follow smoothness
const PARALLAX = 0.04;          // mouse parallax (0 to disable)

const CARDS_OFFSET: [number, number, number] = [-2.7, 0.1, 0.2];

const TechStackFigure = ({
  active,
  figureRef,
}: {
  active: boolean;
  figureRef: RefObject<THREE.Group | null>;
}) => {
  const { preview, active: activeLayout } = PORTAL_LAYOUTS.techstack;
  return (
    <PortalModelFrame active={active} preview={preview} activeLayout={activeLayout}>
      <group ref={figureRef}>
        <AutoFit size={FIGURE_SIZE}>
          <TechStackWanderer />
        </AutoFit>
      </group>
    </PortalModelFrame>
  );
};

const TechStackInterior = () => {
  const { camera } = useThree();
  const scroll = usePortalScroll(true);
  const cardsRef = useRef<THREE.Group>(null);
  const hintRef = useRef<THREE.Group>(null);
  const lookAt = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const p = scroll.current;
    const camZ = THREE.MathUtils.lerp(CAM_FRONT, CAM_BACK, p);
    const camY = THREE.MathUtils.lerp(CAM_Y_FRONT, CAM_Y_BACK, p);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, TILE_X.techstack, CAM_DAMP, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, PORTAL_CAM.y + camY, CAM_DAMP, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, PORTAL_CAM.z + camZ, CAM_DAMP, delta);

    lookAt.current.set(TILE_X.techstack, PORTAL_CAM.y + LOOK_Y, PORTAL_CAM.z);
    camera.lookAt(lookAt.current);
    if (!isMobile && PARALLAX) {
      camera.rotation.y += state.pointer.x * PARALLAX;
    }

    const fade = THREE.MathUtils.smoothstep(p, 0.32, 0.78);
    if (cardsRef.current) {
      cardsRef.current.position.set(...CARDS_OFFSET);
      cardsRef.current.visible = fade > 0.03;
      cardsRef.current.traverse((obj) => {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if ((obj as any).fillOpacity !== undefined) {
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          (obj as any).fillOpacity = fade;
        }
        const mesh = obj as THREE.Mesh;
        if (mesh.material && "opacity" in mesh.material) {
          const mat = mesh.material as THREE.MeshBasicMaterial;
          mat.transparent = true;
          mat.opacity = fade * (mat.userData.baseOpacity ?? 0.32);
        }
      });
    }

    if (hintRef.current) {
      hintRef.current.children.forEach((c) => {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        (c as any).fillOpacity = p > 0.06 ? 0 : 1;
      });
    }
  });

  return (
    <>
      <group ref={cardsRef}>
        <TechStackGrid />
      </group>
      <group ref={hintRef} position={[0, 1.7, 1]}>
        <Text font="./Vercetti-Regular.woff" color="#1c2735" anchorX="center" fontSize={0.13}>
          scroll to walk behind the wanderer
        </Text>
      </group>
    </>
  );
};

const Techstack = () => {
  const isActive = usePortalStore((s) => s.activePortalId === "techstack");
  const near = useExperienceNear(0.66);
  const { camera } = useThree();
  const figureRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!isActive) return;
    gsap.to(camera.position, {
      x: TILE_X.techstack,
      y: PORTAL_CAM.y + CAM_Y_FRONT,
      z: PORTAL_CAM.z + CAM_FRONT,
      duration: 1,
    });
  }, [isActive, camera]);

  return (
    <group>
      <color attach="background" args={["#c2cedd"]} />
      <ambientLight intensity={1.15} />
      <hemisphereLight args={["#ffffff", "#5a6a82", 1]} />
      <directionalLight position={[5, 8, 6]} intensity={1.9} />
      <directionalLight position={[-4, 4, -2]} intensity={0.65} />

      {near && (
        <Suspense fallback={null}>
          <TechStackFigure active={isActive} figureRef={figureRef} />
        </Suspense>
      )}

      {isActive && <TechStackInterior />}
    </group>
  );
};

export default Techstack;
