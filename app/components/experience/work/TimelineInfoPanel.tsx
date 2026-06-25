'use client';

import { useEffect, useState } from "react";

import { useTimelineStore } from "@stores";
import { WorkTimelinePoint } from "@types";

/**
 * Screen-space info panel for the Work timeline. Fades in on the edge as you
 * scroll onto a milestone, dissolves out, then re-enters for the next one.
 */
const TimelineInfoPanel = () => {
  const point = useTimelineStore((s) => s.point);
  const visible = useTimelineStore((s) => s.visible);
  const [display, setDisplay] = useState<WorkTimelinePoint | null>(null);
  const [phase, setPhase] = useState<"hidden" | "in" | "out">("hidden");

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!point || !visible) {
      setPhase("out");
      const t = setTimeout(() => {
        setDisplay(null);
        setPhase("hidden");
      }, 420);
      return () => clearTimeout(t);
    }

    if (display?.title === point.title && display?.year === point.year) {
      setPhase("in");
      return;
    }

    setPhase("out");
    const t = setTimeout(() => {
      setDisplay(point);
      setPhase("in");
    }, 380);
    return () => clearTimeout(t);
  }, [point, visible, display?.title, display?.year]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const show = phase === "in" && display;

  return (
    <div className={`timeline-panel${show ? " is-visible" : ""}`}>
      {display && (
        <div className="timeline-panel__inner" key={display.title + display.year}>
          <div className="timeline-panel__year">{display.year?.toUpperCase()}</div>
          <div className="timeline-panel__title">{display.title}</div>
          {display.subtitle && <div className="timeline-panel__role">{display.subtitle}</div>}
          {display.description && <p className="timeline-panel__desc">{display.description}</p>}
          {!!display.technologies?.length && (
            <div className="timeline-panel__tech">{display.technologies.join("  ·  ")}</div>
          )}
          {display.achievements?.map((a) => (
            <div className="timeline-panel__ach" key={a}>
              ★ {a}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelineInfoPanel;
