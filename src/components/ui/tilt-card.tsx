"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode, type PointerEvent } from "react";

// Adapted from Motion's "Tilt card" (21st.dev/@motiondotdev): springs the card towards the pointer
// and adds a soft light that follows it. Mouse only, so touch scrolling stays untouched.
export function TiltCard({ children, maxTilt = 8, className }: { children: ReactNode; maxTilt?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const spring = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const scale = useSpring(1, spring);
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const lightOpacity = useSpring(0, spring);
  const light = useMotionTemplate`radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,.28), transparent 55%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    rotateX.set(maxTilt * (0.5 - y));
    rotateY.set(maxTilt * (x - 0.5));
    lightX.set(x * 100);
    lightY.set(y * 100);
    scale.set(1.02);
    lightOpacity.set(1);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    lightOpacity.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 900 }}
      className={`relative will-change-transform ${className ?? ""}`}
    >
      {children}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light" style={{ background: light, opacity: lightOpacity }} />
    </motion.div>
  );
}
