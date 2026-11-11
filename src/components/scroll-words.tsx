"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <m.span style={{ opacity }}>{children} </m.span>;
}

/**
 * A paragraph that comes into focus word by word as it is scrolled through:
 * each word brightens over its own slice of the scroll range.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {reduce
        ? text
        : words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 4) / words.length)]}>
              {word}
            </Word>
          ))}
    </p>
  );
}
