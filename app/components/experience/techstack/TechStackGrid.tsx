import { MutableRefObject, useMemo } from "react";

import { TECH_STACK } from "@constants";
import TechCategoryCard from "./TechCategoryCard";

const ROW_GAP = 1.12;

interface TechStackGridProps {
  scroll: MutableRefObject<number>;
  selectedId: number | null;
  onSelect: (i: number) => void;
}

const TechStackGrid = ({ scroll, selectedId, onSelect }: TechStackGridProps) => {
  const cards = useMemo(
    () =>
      TECH_STACK.map((category, i) => (
        <TechCategoryCard
          key={category.name}
          category={category}
          index={i}
          position={[0, -i * ROW_GAP, 0]}
          selectedId={selectedId}
          scroll={scroll}
          onSelect={() => onSelect(i)}
        />
      )),
    [selectedId, scroll, onSelect]
  );

  return <group>{cards}</group>;
};

export default TechStackGrid;
