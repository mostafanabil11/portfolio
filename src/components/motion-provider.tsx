"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.18, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
