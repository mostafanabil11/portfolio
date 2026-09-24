"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { EASE_OUT } from "./motion-provider";

/**
 * A label that trails the pointer over elements marked `data-cursor="Label"`.
 * Mouse and trackpad only; it never replaces the cursor anywhere else.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  // The text outlives visibility so the label doesn't blank out while shrinking.
  const [hover, setHover] = useState({ text: "", visible: false });
  const reduce = useReducedMotion();

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const over = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      const text = target?.dataset.cursor;
      setHover((prev) => (text ? { text, visible: true } : { ...prev, visible: false }));
    };
    // Clicking navigates away; don't leave the label hanging over the next page.
    const hide = () => setHover((prev) => ({ ...prev, visible: false }));

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("click", hide);
    root.addEventListener("pointerleave", hide);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("click", hide);
      root.removeEventListener("pointerleave", hide);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80]"
      style={{ x: reduce ? x : springX, y: reduce ? y : springY }}
    >
      <m.div
        className="t-label grid size-[5.75rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-fg text-bg"
        initial={false}
        animate={{ scale: hover.visible ? 1 : 0, opacity: hover.visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        {hover.text}
      </m.div>
    </m.div>
  );
}
