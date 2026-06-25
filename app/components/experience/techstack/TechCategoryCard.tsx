import { Edges, Text } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore } from "@stores";
import { TechCategory } from "@types";

interface TechCategoryCardProps {
  category: TechCategory;
  position: [number, number, number];
  index: number;
  activeId: number | null;
  onClick: () => void;
}

const CARD_W = 2.4;
const CARD_H = 1.35;

const TechCategoryCard = ({ category, position, index, activeId, onClick }: TechCategoryCardProps) => {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [desktopHovered, setDesktopHovered] = useState(false);
  const isActive = usePortalStore((state) => state.activePortalId === "techstack");
  const hovered = isMobile ? activeId === index : desktopHovered;

  useEffect(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.userData.baseOpacity = 0.32;
  }, []);

  useEffect(() => {
    if (!ref.current || !meshRef.current) return;
    gsap.killTweensOf(ref.current.scale);
    gsap.to(ref.current.scale, {
      x: hovered ? 1.1 : 1,
      y: hovered ? 1.1 : 1,
      z: hovered ? 1.1 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(ref.current.position, { z: hovered ? 0.5 : 0, duration: 0.3 });
    gsap.to(meshRef.current.material as THREE.Material, {
      opacity: hovered ? 0.92 : 0.32,
      duration: 0.3,
    });
    return () => {
      if (ref.current) gsap.killTweensOf(ref.current.scale);
    };
  }, [hovered]);

  const handlePointerOver = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!isMobile && isActive) {
      setDesktopHovered(true);
      document.body.style.cursor = "pointer";
    }
  };
  const handlePointerOut = () => {
    if (!isMobile && isActive) {
      setDesktopHovered(false);
      document.body.style.cursor = "auto";
    }
  };

  return (
    <group
      position={position}
      ref={ref}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}>
      <mesh ref={meshRef}>
        <planeGeometry args={[CARD_W, CARD_H, 1]} />
        <meshBasicMaterial color="#0a1420" transparent opacity={0.32} depthWrite={false} />
        {/* Bright crisp border so the card stays legible even when very transparent */}
        <Edges color="#cdddef" lineWidth={2} />
      </mesh>
      <Text
        font="./soria-font.ttf"
        color="#ffffff"
        anchorX="left"
        anchorY="top"
        fontSize={0.24}
        renderOrder={10}
        position={[-CARD_W / 2 + 0.16, CARD_H / 2 - 0.14, 0.04]}>
        {category.name}
      </Text>
      <Text
        font="./Vercetti-Regular.woff"
        color="#b3c4da"
        anchorX="left"
        anchorY="top"
        fontSize={0.145}
        lineHeight={1.35}
        maxWidth={CARD_W - 0.32}
        renderOrder={10}
        position={[-CARD_W / 2 + 0.16, CARD_H / 2 - 0.52, 0.04]}>
        {category.items.join("   ·   ")}
      </Text>
    </group>
  );
};

export default TechCategoryCard;
