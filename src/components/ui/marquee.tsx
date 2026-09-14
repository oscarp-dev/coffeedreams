"use client";

import type { ReactNode } from "react";

const REPEATS = 6;

export function Marquee({ children, className, durationSeconds = 28 }: { children: ReactNode[]; className?: string; durationSeconds?: number }) {
  // durationSeconds is the time for one set-width of travel; the keyframe shifts by REPEATS/2 set-widths per cycle.
  const cycleDuration = durationSeconds * (REPEATS / 2);
  return (
    <div className={`marquee-mask relative overflow-hidden ${className ?? ""}`}>
      <div className="marquee-track flex w-max items-center" style={{ animationDuration: `${cycleDuration}s` }}>
        {Array.from({ length: REPEATS }, (_, i) => (
          <div key={i} className="flex items-center" aria-hidden={i > 0}>{children}</div>
        ))}
      </div>
    </div>
  );
}
