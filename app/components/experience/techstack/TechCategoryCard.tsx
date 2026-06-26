import { Edges, Text } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore } from "@stores";
import { TechCategory } from "@types";
import { CARDS } from "./techStackCamera";

const THEME = {
  cardBg: "#1c140b",
  edge: "#c9954a",
  accent: "#f2c97a",
  title: "#f6d79a",
  body: "#e6d4ad",
  restOpacity: 0.62,
};

interface TechCategoryCardProps {
  category: TechCategory;
  position: [number, number, number];
  index: number;
  selectedId: number | null;
  scroll: MutableRefObject<number>;
  onSelect: () => void;
}

const CARD_W = 3.15;
const CARD_H = 1.02;
const SLIDE_IN = 4.5; // how far off the left edge cards start (bigger = more dramatic)
const smoothstep = (t: number) => t * t * (3 - 2 * t);

const TechCategoryCard = ({ category, position, index, selectedId, scroll, onSelect }: TechCategoryCardProps) => {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const accentRef = useRef<THREE.Mesh>(null);
  const titleRef = useRef<THREE.Object3D>(null);
  const bodyRef = useRef<THREE.Object3D>(null);
  const fadeRef = useRef(0);
  const emphRef = useRef(0); // smoothed hover/selected emphasis
  const [hovered, setHovered] = useState(false);
  const isActive = usePortalStore((state) => state.activePortalId === "techstack");
  const selected = selectedId === index;

  useFrame(() => {
    const g = ref.current;
    if (!g || !isActive) return;

    // Smooth staggered reveal.
    const raw = THREE.MathUtils.clamp(
      (scroll.current - CARDS.revealStart - index * CARDS.revealStep) / CARDS.revealWindow,
      0,
      1
    );
    fadeRef.current = THREE.MathUtils.lerp(fadeRef.current, smoothstep(raw), 0.1);
    const f = fadeRef.current;

    // Smooth emphasis (selected > hovered > rest).
    const targetEmph = selected ? 1 : hovered ? 0.55 : 0;
    emphRef.current = THREE.MathUtils.lerp(emphRef.current, targetEmph, 0.14);
    const e = emphRef.current;

    g.visible = f > 0.02;
    const s = (0.86 + f * 0.14) * (1 + e * 0.1);
    g.scale.setScalar(s);
    // Slide in from off the left edge + settle, with a tiny rotate for flair.
    g.position.set(position[0] - (1 - f) * SLIDE_IN, position[1], position[2] + e * 0.4);
    g.rotation.z = (1 - f) * 0.06;

    const bgMat = meshRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (bgMat) bgMat.opacity = f * (THEME.restOpacity + e * 0.34);
    const accMat = accentRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (accMat) accMat.opacity = f * (0.5 + e * 0.5);

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (titleRef.current) (titleRef.current as any).fillOpacity = f;
    if (bodyRef.current) (bodyRef.current as any).fillOpacity = f * 0.95;
    /* eslint-enable @typescript-eslint/no-explicit-any */
  });

  const handlePointerOver = (ev: ThreeEvent<MouseEvent>) => {
    ev.stopPropagation();
    if (!isMobile && isActive) {
      setHovered(true);
      onSelect(); // show this card's detail on hover (like the Projects cards)
      document.body.style.cursor = "pointer";
    }
  };
  const handlePointerOut = () => {
    if (!isMobile && isActive) {
      setHovered(false);
      document.body.style.cursor = "auto";
    }
  };

  const left = -CARD_W / 2;

  return (
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
      <mesh ref={meshRef}>
        <planeGeometry args={[CARD_W, CARD_H, 1]} />
        <meshBasicMaterial color={THEME.cardBg} transparent opacity={0} depthWrite={false} />
        <Edges color={THEME.edge} lineWidth={1.2} />
      </mesh>
      <mesh ref={accentRef} position={[left + 0.05, 0, 0.02]}>
        <planeGeometry args={[0.05, CARD_H - 0.1, 1]} />
        <meshBasicMaterial color={THEME.accent} transparent opacity={0} depthWrite={false} />
      </mesh>
      <Text
        ref={titleRef}
        font="./soria-font.ttf"
        color={THEME.title}
        anchorX="left"
        anchorY="top"
        fontSize={0.215}
        maxWidth={CARD_W - 0.3}
        fillOpacity={0}
        renderOrder={10}
        position={[left + 0.2, CARD_H / 2 - 0.12, 0.04]}>
        {category.name}
      </Text>
      <Text
        ref={bodyRef}
        font="./Vercetti-Regular.woff"
        color={THEME.body}
        anchorX="left"
        anchorY="top"
        fontSize={0.115}
        lineHeight={1.4}
        letterSpacing={0.01}
        maxWidth={CARD_W - 0.34}
        fillOpacity={0}
        renderOrder={10}
        position={[left + 0.2, CARD_H / 2 - 0.42, 0.04]}>
        {category.items.join("   ")}
      </Text>
    </group>
  );
};

export default TechCategoryCard;
