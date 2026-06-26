import { Edges, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";
import * as THREE from "three";

import { TechCategory } from "@types";
import { DETAIL } from "./techStackCamera";

const PANEL_W = 1.55;
const PANEL_H = 1.12;
/** The panel only shows past this scroll point — scrolling back hides it. */
const SCROLL_MIN = 0.2;
const THEME = { bg: "#140e07", edge: "#caa05a", title: "#f6d79a", body: "#e6d4ad", accent: "#e0b566" };

interface TechStackDetailProps {
  category: TechCategory;
  selected: boolean;
  scroll: MutableRefObject<number>;
}

/**
 * Detail card (portal space, right side). Appears when a category is selected
 * AND we're near the final pose; scrolling back hides it. depthTest is off so
 * the figure can never hide it.
 */
const TechStackDetail = ({ category, selected, scroll }: TechStackDetailProps) => {
  const ref = useRef<THREE.Group>(null);
  const fade = useRef(0);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;

    const visible = selected && scroll.current > SCROLL_MIN;
    fade.current = THREE.MathUtils.damp(fade.current, visible ? 1 : 0, 8, delta);
    const f = fade.current;
    g.visible = f > 0.01;

    g.position.set(DETAIL.x + (1 - f) * 0.5, DETAIL.y, DETAIL.z);
    g.rotation.y = DETAIL.rotY;
    const s = 0.95 + f * 0.05;
    g.scale.set(s, s, s);

    g.traverse((obj) => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      if ((obj as any).fillOpacity !== undefined) (obj as any).fillOpacity = f;
      const mat = (obj as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
      if (mat && "opacity" in mat) {
        mat.transparent = true;
        mat.opacity = f * (mat.userData.base ?? 1);
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
    });
  });

  const left = -PANEL_W / 2 + 0.16;

  return (
    <group ref={ref} visible={false} renderOrder={30}>
      <mesh
        ref={(m) => {
          if (m) (m.material as THREE.Material).userData.base = 0.42;
        }}>
        <planeGeometry args={[PANEL_W, PANEL_H, 1]} />
        <meshBasicMaterial color={THEME.bg} transparent opacity={0} depthWrite={false} depthTest={false} />
        <Edges color={THEME.edge} lineWidth={1} />
      </mesh>

      <Text
        font="./soria-font.ttf"
        color={THEME.title}
        anchorX="left"
        anchorY="top"
        fontSize={0.15}
        maxWidth={PANEL_W - 0.24}
        fillOpacity={0}
        renderOrder={31}
        position={[left, PANEL_H / 2 - 0.13, 0.04]}>
        {category.name}
      </Text>
      <Text
        font="./Vercetti-Regular.woff"
        color={THEME.body}
        anchorX="left"
        anchorY="top"
        fontSize={0.073}
        lineHeight={1.4}
        maxWidth={PANEL_W - 0.26}
        fillOpacity={0}
        renderOrder={31}
        position={[left, PANEL_H / 2 - 0.36, 0.04]}>
        {category.detail ?? ""}
      </Text>
      <Text
        font="./Vercetti-Regular.woff"
        color={THEME.accent}
        anchorX="left"
        anchorY="top"
        fontSize={0.07}
        lineHeight={1.5}
        letterSpacing={0.015}
        maxWidth={PANEL_W - 0.26}
        fillOpacity={0}
        renderOrder={31}
        position={[left, PANEL_H / 2 - 0.6, 0.04]}>
        {category.items.join("   ·   ")}
      </Text>
    </group>
  );
};

export default TechStackDetail;
