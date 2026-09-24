"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_IN_OUT } from "./motion-provider";
import { cn } from "@/lib/cn";

// Client navigations keep this module alive, so something that has already been
// revealed once (e.g. when coming back from a case study) appears immediately
// instead of re-running its wipe underneath a view-transition morph.
const revealed = new Set<string>();

// The huge top margin counts anything already scrolled past as "in view", so a
// fast jump (End key, restored scroll position) never leaves content hidden.
const viewport = { once: true, margin: "100000px 0px -8% 0px" } as const;

/** Wipes its contents up into view the first time it's scrolled to. */
export function RevealFrame({
  id,
  className,
  style,
  children,
}: {
  /** Stable key so the reveal isn't replayed after a client navigation. */
  id: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      style={style}
      initial={revealed.has(id) || reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={viewport}
      onViewportEnter={() => revealed.add(id)}
      transition={{ duration: 1.3, ease: EASE_IN_OUT }}
    >
      {children}
    </m.div>
  );
}

/** A single image in a revealing frame, with optional scroll drift. */
export function RevealImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  ratio,
  parallax = 0,
  preload = false,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Width / height, when the frame should follow the image's own proportions. */
  ratio?: number;
  /** Percentage of travel either side of centre. Photographs only: it needs overscan. */
  parallax?: number;
  preload?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const drift = parallax > 0 && !reduce;

  return (
    <div ref={ref}>
      <RevealFrame
        id={src.src}
        className={cn("relative overflow-hidden bg-surface", className)}
        style={ratio ? { aspectRatio: ratio } : undefined}
      >
        <m.div
          className={cn("absolute inset-x-0", drift ? "-inset-y-[7%]" : "inset-y-0")}
          style={drift ? { y } : undefined}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            placeholder="blur"
            className={cn("object-cover", imageClassName)}
          />
        </m.div>
      </RevealFrame>
    </div>
  );
}
