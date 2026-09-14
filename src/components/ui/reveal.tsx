"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

const HIDDEN = { opacity: 0, y: 28, filter: "blur(6px)" };

export function Reveal({
  children,
  className,
  style,
  index = 0,
  as: Tag = "div",
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  index?: number;
  as?: "div" | "span";
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = Tag === "span" ? motion.span : motion.div;
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };
  return (
    <MotionTag
      initial={HIDDEN}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transition }}
      viewport={{ once: true, amount: 0.25 }}
      className={cn(className)}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
