"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const REPEATS = 4;
// Per-frame (16ms) factor pulling velocity back toward the auto-scroll speed after a drag or arrow nudge.
const FRICTION = 0.95;
const NUDGE_VELOCITY = 1.4;

export function Marquee({ children, className, durationSeconds = 28 }: { children: ReactNode[]; className?: string; durationSeconds?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidth = useRef(0);
  const x = useMotionValue(0);
  const velocity = useRef(0); // px per ms
  const hovered = useRef(false);
  const drag = useRef<{ lastX: number; lastT: number } | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => { setWidth.current = track.scrollWidth / REPEATS; });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Keep x within [-setWidth, 0) so the repeated sets always cover the viewport.
  const wrap = (value: number) => {
    const w = setWidth.current;
    return w ? (((value % w) + w) % w) - w : value;
  };

  useAnimationFrame((_, delta) => {
    if (drag.current) return;
    const target = hovered.current || reduceMotion ? 0 : -setWidth.current / (durationSeconds * 1000);
    velocity.current += (target - velocity.current) * (1 - Math.pow(FRICTION, delta / 16));
    x.set(wrap(x.get() + velocity.current * delta));
  });

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { lastX: event.clientX, lastT: event.timeStamp };
    velocity.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.lastX;
    const dt = Math.max(1, event.timeStamp - drag.current.lastT);
    x.set(wrap(x.get() + dx));
    velocity.current = dx / dt;
    drag.current = { lastX: event.clientX, lastT: event.timeStamp };
  };
  const endDrag = () => { drag.current = null; };
  const nudge = (direction: 1 | -1) => { velocity.current = direction * NUDGE_VELOCITY; };

  const arrowClass = "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-cream/90 text-ink/60 transition-colors hover:border-terracotta hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta sm:flex";

  return (
    <div
      className={`relative ${className ?? ""}`}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") hovered.current = true; }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") hovered.current = false; }}
    >
      <div
        className="marquee-mask relative cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <motion.div ref={trackRef} className="flex w-max items-center" style={{ x }}>
          {Array.from({ length: REPEATS }, (_, i) => (
            <div key={i} className="flex items-center" aria-hidden={i > 0}>{children}</div>
          ))}
        </motion.div>
      </div>
      <button type="button" aria-label="Anterior" onClick={() => nudge(1)} className={`${arrowClass} left-4 lg:left-8`}><ChevronLeft size={18} /></button>
      <button type="button" aria-label="Siguiente" onClick={() => nudge(-1)} className={`${arrowClass} right-4 lg:right-8`}><ChevronRight size={18} /></button>
    </div>
  );
}
