"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

const HIDDEN = { opacity: 0, y: 16 };
const SHOWN = { opacity: 1, y: 0 };

export function RevealImage({
  src,
  alt = "",
  sizes = "100vw",
  className,
  index = 0,
  style,
}: {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
  index?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [loaded, setLoaded] = useState(false);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      ref={ref}
      initial={HIDDEN}
      animate={isInView && loaded ? { ...SHOWN, transition } : HIDDEN}
      className={cn("relative", className)}
      style={style}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" onLoad={() => setLoaded(true)} />
    </motion.div>
  );
}
