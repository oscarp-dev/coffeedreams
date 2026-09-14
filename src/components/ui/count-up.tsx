"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import useMeasure from "react-use-measure";

import { cn } from "@/lib/utils";

type DigitEffect = "none" | "fade" | "slide";

interface CountUpProps {
  to: number;
  from?: number;
  delay?: number;
  duration?: number;
  digitEffect?: DigitEffect;
  className?: string;
  separator?: string;
}

function OdometerDigit({ springValue, place }: { springValue: MotionValue<number>; place: number }) {
  const [ref, { height }] = useMeasure();
  const y = useTransform(springValue, (v) => {
    if (!height) return 0;
    const digit = (Math.abs(v) / place) % 10;
    return -digit * height;
  });

  return (
    <span className="relative inline-block w-[1ch] overflow-y-clip overflow-x-visible leading-none [font-variant-numeric:tabular-nums]">
      <span ref={ref} className="invisible block">0</span>
      <motion.span style={{ y }} className="absolute inset-x-0 top-0 flex flex-col">
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className="flex items-center justify-center" style={{ height: height || "1em" }}>
            {i % 10}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function FadeChar({ char, charKey }: { char: string; charKey: string }) {
  if (!/\d/.test(char)) return <span className="inline-block">{char}</span>;
  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={charKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="inline-block"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function CountUp({ to, from = 0, delay = 0, duration = 1.8, digitEffect = "slide", className, separator = "" }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "0px 0px 200px 0px" });

  const formatValue = React.useCallback(
    (latest: number) => {
      const formatted = Intl.NumberFormat("en-US", { useGrouping: !!separator, maximumFractionDigits: 0 }).format(Math.round(latest));
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [separator],
  );

  const [chars, setChars] = React.useState<string[]>(formatValue(from).split(""));

  React.useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      motionValue.set(to);
      springValue.jump(to);
      return;
    }
    const t = setTimeout(() => motionValue.set(to), delay * 1000);
    return () => clearTimeout(t);
  }, [isInView, motionValue, springValue, to, delay, prefersReducedMotion]);

  React.useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (digitEffect === "none") {
        if (ref.current) ref.current.textContent = formatValue(latest);
      } else {
        setChars(formatValue(latest).split(""));
      }
    });
    return () => unsubscribe();
  }, [springValue, formatValue, digitEffect]);

  if (digitEffect === "slide") {
    const targetStr = formatValue(to);
    const digitCount = targetStr.replace(/\D/g, "").length;
    let d = 0;
    return (
      <span ref={ref} className={cn("inline-flex items-center", className)} style={{ fontVariantNumeric: "tabular-nums" }}>
        {targetStr.split("").map((ch, i) => {
          if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
          const placeIdx = digitCount - 1 - d;
          d++;
          return <OdometerDigit key={i} springValue={springValue} place={Math.pow(10, placeIdx)} />;
        })}
      </span>
    );
  }

  if (digitEffect === "none") {
    return <span ref={ref} className={cn(className)} />;
  }

  return (
    <span ref={ref} className={cn("inline-flex items-center", className)}>
      {chars.map((char, i) => (
        <FadeChar key={i} char={char} charKey={`${i}-${char}`} />
      ))}
    </span>
  );
}
