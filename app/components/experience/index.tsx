import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import { useRef } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from 'three';
import GridTile from "./GridTile";
import { TILE_SIZE, TILE_X, TILE_Y } from "./portalConfig";
import Projects from "./projects";
import Techstack from "./techstack";
import Work from "./work";

const Experience = () => {
  const titleRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);

  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: 0.4,
    color: 'white',
  };

  useFrame((state, delta) => {
    const d = data.range(0.8, 0.2);
    const e = data.range(0.7, 0.2);
    const targetY = d > 0 ? -1 : -30;

    if (groupRef.current && !isActive) {
      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        targetY,
        6,
        delta
      );
      groupRef.current.visible = groupRef.current.position.y > -20;
    }

    if (titleRef.current) {
      titleRef.current.children.forEach((text, i) => {
        const y =  Math.max(Math.min((1 - d) * (10 - i), 10), 0.5);
        text.position.y = THREE.MathUtils.damp(text.position.y, y, 7, delta);
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        (text as any).fillOpacity = e;
      });
    }
  });

  const getTitle = () => {
    const title = 'experience'.toUpperCase();
    return title.split('').map((char, i) => {
      const diff = isMobile ? 0.4 : 0.8;
      return (
        <Text key={i} {...fontProps} position={[i * diff, 2, 1]}>{char}</Text>
      );
    });
  };

  return (
    <group position={[0, -41.5, 12]} rotation={[-Math.PI / 2, 0 ,-Math.PI / 2]}>
      {/* <mesh receiveShadow position={[-5, 0, 0.1]}>
        <planeGeometry args={[10, 5, 1]} />
        <shadowMaterial opacity={0.1} />
      </mesh> */}
      <group rotation={[0, 0, Math.PI / 2]}>
        <group ref={titleRef} position={[isMobile ? -1.8 : -3.6, 2, -2]}>
          {getTitle()}
        </group>

        <group position={[0, -1, 0]} ref={groupRef}>
          {/* Single row of 3 portals. Layout/camera live in portalConfig.ts */}
          <GridTile title='WORK & EDUCATION'
            id="work"
            color='#b9c6d6'
            textAlign='left'
            size={TILE_SIZE}
            position={new THREE.Vector3(TILE_X.work, TILE_Y, 0)}>
            <Work/>
          </GridTile>
          <GridTile title='PROJECTS'
            id="projects"
            color='#bdd1e3'
            textAlign='right'
            size={TILE_SIZE}
            position={new THREE.Vector3(TILE_X.projects, TILE_Y, 0)}>
            <Projects/>
          </GridTile>
          <GridTile title='TECH STACK'
            id="techstack"
            color='#3d2e1f'
            textAlign='left'
            size={TILE_SIZE}
            position={new THREE.Vector3(TILE_X.techstack, TILE_Y, 0)}>
            <Techstack/>
          </GridTile>
        </group>
      </group>
    </group>
  );
};

export default Experience;