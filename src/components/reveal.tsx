"use client";

import { m } from "motion/react";
import { EASE_IN_OUT, EASE_OUT } from "./motion-provider";
import { cn } from "@/lib/cn";

// The huge top margin counts anything already scrolled past as "in view", so a
// fast jump (End key, restored scroll position) never leaves content hidden.
export const viewport = { once: true, margin: "100000px 0px -12% 0px" } as const;

/** Fades and lifts a block into place the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1.1, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}

/** Lines rise out of a mask, one after another. Pass the lines explicitly. */
export function RevealLines({
  lines,
  as: Tag = "p",
  id,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: React.ReactNode[];
  as?: "p" | "h2" | "h3";
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <m.span
            className={cn("block", lineClassName)}
            initial={{ y: "108%" }}
            whileInView={{ y: "0%" }}
            viewport={viewport}
            transition={{ duration: 1.15, delay: delay + i * 0.085, ease: EASE_OUT }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}

/** A hairline that draws itself from the left. */
export function Rule({ className }: { className?: string }) {
  return (
    <m.div
      aria-hidden
      className={cn("h-px origin-left bg-line", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewport}
      transition={{ duration: 1.4, ease: EASE_IN_OUT }}
    />
  );
}
