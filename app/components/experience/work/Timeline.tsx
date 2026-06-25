import { Box, Edges, Line, Text, TextProps } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { usePortalStore } from "@stores";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { WORK_TIMELINE } from "@constants";
import { useTimelineStore } from "@stores";
import { WorkTimelinePoint } from "@types";
import { PORTAL_CAM, TILE_X } from "../portalConfig";

const reusableLeft = new THREE.Vector3(-0.38, 0, -0.1);
const reusableRight = new THREE.Vector3(0.48, 0, -0.1);

const TimelinePoint = ({
  point,
  diff,
  current,
}: {
  point: WorkTimelinePoint;
  diff: number;
  current: boolean;
}) => {
  const getPoint = useMemo(() => {
    switch (point.position) {
      case "left":
        return reusableLeft;
      case "right":
        return reusableRight;
      default:
        return new THREE.Vector3();
    }
  }, [point.position]);

  const textAlign = point.position === "left" ? "right" : "left";

  // Dim every point except the one currently in focus — this stops labels of
  // neighbouring points (which sit close together in 3D) from overlapping into
  // garbled text.
  const labelOpacity = (current ? 1 : 0.16) * (1 - diff);

  const textProps: Partial<TextProps> = useMemo(
    () => ({
      font: "./Vercetti-Regular.woff",
      color: "white",
      anchorX: textAlign,
      fillOpacity: labelOpacity,
    }),
    [textAlign, labelOpacity]
  );

  const titleProps = useMemo(
    () => ({
      ...textProps,
      font: "./soria-font.ttf",
      maxWidth: 3,
    }),
    [textProps]
  );

  return (
    <group position={point.point} scale={isMobile ? 0.35 : 0.6}>
      <Box args={[0.2, 0.2, 0.2]} position={[0, 0, -0.1]} scale={[1 - diff, 1 - diff, 1 - diff]}>
        <meshBasicMaterial color="white" wireframe />
        <Edges color="white" lineWidth={1.5} />
      </Box>

      <group position={getPoint}>
        <Text {...textProps} fontSize={0.3} position={[-diff / 2, 0, 0]}>
          {point.year}
        </Text>
        <group position={[0, -0.5, 0]}>
          <Text {...titleProps} fontSize={0.5} maxWidth={2.4} position={[0, -diff / 2, 0]}>
            {point.title}
          </Text>
          {current && (
            <Text {...textProps} fontSize={0.18} maxWidth={2.2} position={[0, -0.48 - diff, 0]}>
              {point.subtitle}
            </Text>
          )}
        </group>
      </group>
    </group>
  );
};

const Timeline = ({ progress }: { progress: number }) => {
  const { camera } = useThree();
  const isActive = usePortalStore((state) => state.activePortalId === "work");
  const showPoint = useTimelineStore((s) => s.showPoint);
  const hidePanel = useTimelineStore((s) => s.hide);
  const lastIndexRef = useRef(-1);
  const timeline = useMemo(() => WORK_TIMELINE, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(timeline.map((p) => p.point), false), [timeline]);
  const curvePoints = useMemo(() => curve.getPoints(500), [curve]);
  const visibleCurvePoints = useMemo(
    () => curvePoints.slice(0, Math.max(1, Math.ceil(progress * curvePoints.length))),
    [curvePoints, progress]
  );
  const visibleTimelinePoints = useMemo(
    () => timeline.slice(0, Math.max(1, Math.round(progress * (timeline.length - 1) + 1))),
    [timeline, progress]
  );

  // The point currently in focus (drives the info card + label emphasis).
  const activeIndex = Math.round(progress * (timeline.length - 1));

  const [visibleDashedCurvePoints, setVisibleDashedCurvePoints] = useState<THREE.Vector3[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useFrame((_, delta) => {
    if (isActive) {
      const position = curve.getPoint(progress);
      camera.position.x = THREE.MathUtils.damp(camera.position.x, TILE_X.work + position.x, 4, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, PORTAL_CAM.y + position.z, 4, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, PORTAL_CAM.z - position.y, 4, delta);

      // Publish the focused milestone to the screen-space info panel.
      if (activeIndex !== lastIndexRef.current) {
        lastIndexRef.current = activeIndex;
        if (timeline[activeIndex]) showPoint(timeline[activeIndex]);
      }
    }
  });

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    if (groupRef.current) {
      tl.to(groupRef.current.scale, {
        x: isActive ? 1 : 0,
        y: isActive ? 1 : 0,
        z: isActive ? 1 : 0,
        duration: 1,
        delay: isActive ? 0.4 : 0,
      });
      tl.to(
        groupRef.current.position,
        {
          y: isActive ? 0 : -2,
          duration: 1,
          delay: isActive ? 0.4 : 0,
        },
        0
      );
    }

    if (isActive) {
      let i = 0;
      clearInterval(intervalRef.current!);
      setTimeout(() => {
        intervalRef.current = setInterval(() => {
          const p = i++ / 100;
          setVisibleDashedCurvePoints(curvePoints.slice(0, Math.max(1, Math.ceil(p * curvePoints.length))));
          if (i > 100 && intervalRef.current) clearInterval(intervalRef.current);
        }, 10);
      }, 1000);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleDashedCurvePoints([]);
      clearInterval(intervalRef.current!);
      hidePanel();
      lastIndexRef.current = -1;
    }

    return () => clearInterval(intervalRef.current!);
  }, [isActive]);

  return (
    <group position={[0, -0.1, -0.1]}>
      <Line points={visibleCurvePoints} color="white" lineWidth={3} />
      {visibleDashedCurvePoints.length > 0 && (
        <Line points={visibleDashedCurvePoints} color="white" lineWidth={0.5} dashed dashSize={0.25} gapSize={0.25} />
      )}
      <group ref={groupRef}>
        {visibleTimelinePoints.map((point, i) => {
          const diff = Math.min(2 * Math.max(i - progress * (timeline.length - 1), 0), 1);
          return <TimelinePoint point={point} key={i} diff={diff} current={isActive && i === activeIndex} />;
        })}
      </group>
    </group>
  );
};

export default Timeline;
