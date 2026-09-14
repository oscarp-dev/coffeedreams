"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const HIDDEN = { opacity: 0, y: 16 };
const SHOWN = { opacity: 1, y: 0 };

export function RevealImage({
  src,
  className,
  index = 0,
  style,
}: {
  src: string;
  className?: string;
  index?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
    if (img.complete) queueMicrotask(() => setLoaded(true));
  }, [src]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      ref={ref}
      initial={HIDDEN}
      animate={isInView && loaded ? { ...SHOWN, transition } : HIDDEN}
      className={cn("bg-cover bg-center", className)}
      style={{ backgroundImage: `url(${src})`, ...style }}
    />
  );
}
