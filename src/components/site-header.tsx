"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { LocalTime } from "./local-time";
import { EASE_IN_OUT, EASE_OUT } from "./motion-provider";
import { nav, site, type NavId } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [section, setSection] = useState<NavId>("index");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const current: NavId | null = onHome ? section : pathname.startsWith("/work") ? "work" : null;

  // Step out of the way while reading down; come back as soon as the reader scrolls up.
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        if (Math.abs(y - lastY) < 6) return;
        setHidden(y > lastY && y > 180);
        lastY = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Which homepage section is under the middle of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id as NavId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const item of nav) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [onHome]);

  // Mobile menu (a disclosure): lock scroll, close on Escape, keep focus on the toggle.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const toggle = toggleRef.current;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[translate,background-color,border-color] duration-500 ease-out",
          scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className="frame grid-12 h-[var(--header-h)] items-center">
          <Link
            href="/"
            onClick={close}
            className={cn(
              "t-label col-span-6 justify-self-start transition-opacity duration-500 md:col-span-3",
              // On the home page the hero carries the name until the reader scrolls.
              onHome && !scrolled && !open && "pointer-events-none opacity-0",
            )}
            aria-label={`${site.name} — home`}
          >
            {site.name}
          </Link>

          <nav aria-label="Primary" className="hidden md:col-span-4 md:col-start-5 md:block">
            <ul className="flex gap-[clamp(1.25rem,2.4vw,2.5rem)]">
              {nav.map((item) => {
                const active = current === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={active ? "location" : undefined}
                      className="group t-label relative inline-flex items-center"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -left-3 top-1/2 size-[5px] -translate-y-1/2 bg-accent transition-transform duration-500 ease-out",
                          active ? "scale-100" : "scale-0",
                        )}
                      />
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          active ? "text-fg" : "text-muted group-hover:text-fg",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="col-span-6 flex items-center justify-end gap-6 md:col-span-4 md:col-start-9">
            <LocalTime className="t-mono hidden md:inline" />
            <button
              ref={toggleRef}
              type="button"
              className="t-label md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="frame fixed inset-0 z-40 flex flex-col bg-bg pb-8 pt-[calc(var(--header-h)+2.5rem)] md:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: EASE_IN_OUT }}
          >
            <nav aria-label="Mobile">
              <ol className="border-t border-line">
                {nav.map((item, i) => (
                  <li key={item.id} className="overflow-hidden border-b border-line">
                    <m.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, delay: 0.18 + i * 0.06, ease: EASE_OUT }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        aria-current={current === item.id ? "location" : undefined}
                        className="flex items-baseline justify-between py-3"
                      >
                        <span className="t-h1">
                          {item.label}
                        </span>
                        <span className={cn("t-mono", current === item.id ? "text-accent" : "text-muted")}>
                          0{i + 1}
                        </span>
                      </Link>
                    </m.div>
                  </li>
                ))}
              </ol>
            </nav>

            <m.div
              className="mt-auto grid gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <a href={`mailto:${site.email}`} className="t-body break-all">
                {site.email}
              </a>
              <div className="t-mono flex justify-between text-muted">
                <a href={site.links.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <LocalTime />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
