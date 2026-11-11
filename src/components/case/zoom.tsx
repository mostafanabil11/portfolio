"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { EASE_OUT } from "../motion-provider";

const noop = () => () => {};

/**
 * Makes a screenshot enlargeable: click (or Enter) opens it full-window over a
 * dimmed page; click anywhere, the close button or Escape puts it back.
 */
export function Zoom({
  src,
  alt,
  caption,
  children,
}: {
  src: StaticImageData;
  alt: string;
  caption: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // The overlay is portalled to <body>, which only exists in the browser.
  const inBrowser = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const trigger = triggerRef.current;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      // The dialog has a single control; keep focus on it.
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        data-cursor="Zoom"
        aria-label={`Enlarge screenshot: ${caption}`}
        onClick={() => setOpen(true)}
        className="block w-full rounded-[inherit] text-left"
      >
        {children}
      </button>

      {inBrowser &&
        createPortal(
          <AnimatePresence>
            {open && (
              <m.div
                role="dialog"
                aria-modal="true"
                aria-label={caption}
                className="fixed inset-0 z-[70] flex cursor-zoom-out flex-col items-center justify-center gap-4 bg-bg/90 p-[clamp(1rem,3vw,3rem)] backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={() => setOpen(false)}
              >
                <button
                  ref={closeRef}
                  type="button"
                  className="t-label absolute right-[var(--gutter)] top-5 inline-flex h-9 items-center gap-2 rounded-full border border-line-strong bg-surface/80 px-4"
                  onClick={() => setOpen(false)}
                >
                  Close <span aria-hidden>✕</span>
                </button>

                <m.div
                  className="flex min-h-0 flex-col items-center gap-4"
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    sizes="100vw"
                    placeholder="blur"
                    className="h-auto max-h-[calc(100svh-9rem)] w-auto max-w-full rounded-[12px] border border-line-strong object-contain shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]"
                  />
                  <p className="t-mono max-w-[60ch] text-center text-muted">{caption}</p>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
