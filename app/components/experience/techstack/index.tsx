import { Text, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { useExperienceNear } from "@/app/hooks/useExperienceNear";
import { usePortalScroll } from "@/app/hooks/usePortalScroll";
import { TECH_STACK } from "@constants";
import { usePortalStore } from "@stores";
import { SandDuneWanderer } from "../../models/SandDuneWanderer";
import { PORTAL_CAM_OFFSETS } from "../portalLayouts";
import { PORTAL_CAM, TILE_X } from "../portalConfig";
import TechStackDetail from "./TechStackDetail";
import TechStackGrid from "./TechStackGrid";
import {
  CARDS,
  getCameraKeyframes,
  HINT,
  MODEL_ACTIVE,
  MODEL_DAMP,
  MODEL_FINAL,
  MODEL_PREVIEW,
  SCROLL_SENSITIVITY,
} from "./techStackCamera";

const smoothstep = (t: number) => t * t * (3 - 2 * t);

const { lerp, damp } = THREE.MathUtils;

type Pose = { position: [number, number, number]; rotation: [number, number, number]; scale: number };

// Ease a group's transform toward lerp(a → b, t). Camera stays put; only the
// model moves, so scrolling rotates/translates the wanderer from front to back.
const easePose = (m: THREE.Group, a: Pose, b: Pose, t: number, d: number, delta: number) => {
  m.position.x = damp(m.position.x, lerp(a.position[0], b.position[0], t), d, delta);
  m.position.y = damp(m.position.y, lerp(a.position[1], b.position[1], t), d, delta);
  m.position.z = damp(m.position.z, lerp(a.position[2], b.position[2], t), d, delta);
  m.rotation.x = damp(m.rotation.x, lerp(a.rotation[0], b.rotation[0], t), d, delta);
  m.rotation.y = damp(m.rotation.y, lerp(a.rotation[1], b.rotation[1], t), d, delta);
  m.rotation.z = damp(m.rotation.z, lerp(a.rotation[2], b.rotation[2], t), d, delta);
  const s = damp(m.scale.x, lerp(a.scale, b.scale, t), d, delta);
  m.scale.set(s, s, s);
};

const Techstack = () => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "techstack");
  const near = useExperienceNear(0.66);
  const scroll = usePortalScroll(isActive, SCROLL_SENSITIVITY);
  const data = useScroll();

  // Lock the page scroll while the portal is open — otherwise the wheel also
  // scrolls the main page, so exiting lands on the wrong (window) section.
  useEffect(() => {
    data.el.style.overflow = isActive ? "hidden" : "auto";
    return () => {
      data.el.style.overflow = "auto";
    };
  }, [isActive, data]);

  const modelRef = useRef<THREE.Group>(null);
  const columnRef = useRef<THREE.Group>(null);
  const hintGroupRef = useRef<THREE.Group>(null);
  const hintTextRef = useRef<THREE.Mesh>(null);
  const hintSpot = useRef(new THREE.Vector3());
  const camQuat = useRef(new THREE.Quaternion());
  const parentQuat = useRef(new THREE.Quaternion());

  // Which category card is selected (drives the right-side detail panel).
  const [selected, setSelected] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);
  const handleSelect = (i: number) => {
    // Always select (no toggle) so a double-fired click can't instantly hide it.
    setSelected(i);
    setDisplayed(i);
  };

  const camZ = PORTAL_CAM.z + PORTAL_CAM_OFFSETS.techstack.z;
  const baseYaw = TILE_X.techstack / 12;
  const front = getCameraKeyframes(TILE_X.techstack, camZ, baseYaw).front;

  // Park the camera at the front establishing shot; it doesn't move afterwards.
  useEffect(() => {
    if (!isActive) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(null);
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(camera.rotation);
    gsap.to(camera.position, { x: front.x, y: PORTAL_CAM.y, z: front.z, duration: 1, ease: "power2.inOut" });
    gsap.to(camera.rotation, { y: front.yaw, duration: 1, ease: "power2.inOut" });
  }, [isActive, camera, front.x, front.z, front.yaw]);

  useFrame((_, delta) => {
    const m = modelRef.current;
    if (!m) return;

    if (isActive) {
      const t = scroll.current;
      easePose(m, MODEL_ACTIVE, MODEL_FINAL, t, MODEL_DAMP, delta);

      if (columnRef.current) {
        columnRef.current.position.y = damp(
          columnRef.current.position.y,
          CARDS.columnTop + t * CARDS.scrollLift,
          6,
          delta
        );
      }

      // Pin the "scroll" hint to a fixed spot on screen (camera-attached) and
      // fade it out as soon as the user starts scrolling.
      const hg = hintGroupRef.current;
      if (hg && hg.parent) {
        hintSpot.current.set(HINT.x, HINT.y, HINT.z);
        camera.localToWorld(hintSpot.current);
        hg.parent.worldToLocal(hintSpot.current);
        hg.position.copy(hintSpot.current);
        camera.getWorldQuaternion(camQuat.current);
        hg.parent.getWorldQuaternion(parentQuat.current);
        hg.quaternion.copy(parentQuat.current).invert().multiply(camQuat.current);
      }
      if (hintTextRef.current) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        (hintTextRef.current as any).fillOpacity = 1 - smoothstep(THREE.MathUtils.clamp(t / 0.12, 0, 1));
      }
    } else {
      easePose(m, MODEL_PREVIEW, MODEL_PREVIEW, 0, MODEL_DAMP, delta);
    }
  });

  return (
    <group>
      <color attach="background" args={["#1a1209"]} />
      <ambientLight intensity={1.05} />

      <group
        ref={modelRef}
        position={MODEL_PREVIEW.position}
        rotation={MODEL_PREVIEW.rotation}
        scale={MODEL_PREVIEW.scale}>
        <SandDuneWanderer />
      </group>

      {near && isActive && (
        <>
          <group ref={hintGroupRef}>
            <Text
              ref={hintTextRef}
              font="./Vercetti-Regular.woff"
              color="#e7cfa0"
              anchorX="center"
              anchorY="middle"
              fontSize={0.16}
              letterSpacing={0.14}
              outlineWidth={0.008}
              outlineColor="#2a1d10"
              renderOrder={20}>
              ↓ scroll to walk with the wanderer
            </Text>
          </group>
          <group
            ref={columnRef}
            position={[isMobile ? -0.2 : CARDS.x, CARDS.columnTop, CARDS.z]}
            rotation={[0, CARDS.rotY, 0]}>
            <TechStackGrid scroll={scroll} selectedId={selected} onSelect={handleSelect} />
          </group>
          <TechStackDetail category={TECH_STACK[displayed]} selected={selected !== null} scroll={scroll} />
        </>
      )}
    </group>
  );
};

export default Techstack;
