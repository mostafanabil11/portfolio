"use client";

import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

const spring = { stiffness: 220, damping: 18, mass: 0.4 } as const;

/** Leans its child towards the pointer while hovered, and springs back. Mouse only. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.span
      ref={ref}
      className={cn("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse" || !ref.current) return;
        const box = ref.current.getBoundingClientRect();
        x.set((event.clientX - (box.left + box.width / 2)) * strength);
        y.set((event.clientY - (box.top + box.height / 2)) * strength);
      }}
      onPointerLeave={reset}
      onPointerDown={reset}
    >
      {children}
    </m.span>
  );
}
