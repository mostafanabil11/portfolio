"use client";

import { m, useScroll, useSpring } from "motion/react";

/** A hairline across the top of the window that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.4 });
  return <m.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-fg/70" style={{ scaleX }} />;
}
