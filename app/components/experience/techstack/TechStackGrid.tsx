import { useMemo, useState } from "react";
import { isMobile } from "react-device-detect";

import { TECH_STACK } from "@constants";
import { usePortalStore } from "@stores";
import TechCategoryCard from "./TechCategoryCard";

const ROW_GAP = 1.5;

/** Single-column stack on the left — visible once the camera passes behind the figure. */
const TechStackGrid = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isActive = usePortalStore((state) => state.activePortalId === "techstack");
  const activeId = isActive ? selectedId : null;

  const onClick = (id: number) => {
    if (!isMobile) return;
    setSelectedId(id === selectedId ? null : id);
  };

  const cards = useMemo(() => {
    const startY = ((TECH_STACK.length - 1) * ROW_GAP) / 2;
    return TECH_STACK.map((category, i) => (
      <TechCategoryCard
        key={category.name}
        category={category}
        index={i}
        position={[0, startY - i * ROW_GAP, 0]}
        activeId={activeId}
        onClick={() => onClick(i)}
      />
    ));
  }, [activeId, isActive]);

  return <group>{cards}</group>;
};

export default TechStackGrid;
