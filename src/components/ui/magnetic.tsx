"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode, type MouseEvent } from "react";

export function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 200, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 16, mass: 0.4 });

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength);
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
