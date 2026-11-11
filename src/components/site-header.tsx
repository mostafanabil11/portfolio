"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { LocalTime } from "./local-time";
import { EASE_IN_OUT, EASE_OUT } from "./motion-provider";
import { Roll } from "./ui";
import { nav, site, type NavId } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [section, setSection] = useState<NavId>("index");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<NavId | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLLIElement>(null);

  const current: NavId | null = onHome ? section : pathname.startsWith("/work") ? "work" : null;
  const target = hovered ?? current;

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

  // One pill sits behind the current link and slides to whichever link is hovered.
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    const place = () => {
      const link = target ? list.querySelector<HTMLElement>(`[data-nav="${target}"]`) : null;
      if (!link || link.offsetWidth === 0) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.opacity = "1";
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [target]);

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
          "pointer-events-none fixed inset-x-0 top-0 z-50 transition-[translate] duration-700 ease-out",
          hidden && !open && "-translate-y-[130%]",
        )}
      >
        <div className="frame pt-3">
          <div
            className={cn(
              "pointer-events-auto relative flex h-[3.25rem] items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-[background-color,border-color,box-shadow] duration-700 ease-out",
              scrolled || open
                ? "border-line bg-surface/70 shadow-[0_12px_40px_-18px_rgb(0_0_0/0.9)] backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
          >
            <Link href="/" onClick={close} className="t-label inline-flex items-center gap-2.5" aria-label={`${site.name} — home`}>
              <span aria-hidden className="pulse" />
              {site.name}
            </Link>

            <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
              <ul ref={listRef} className="relative flex items-center" onPointerLeave={() => setHovered(null)}>
                <li
                  ref={pillRef}
                  aria-hidden
                  role="presentation"
                  className="absolute inset-y-0 left-0 my-auto h-8 rounded-full bg-white/[0.08] opacity-0 transition-[transform,width,opacity] duration-500 ease-out"
                />
                {nav.map((item) => {
                  const active = current === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        data-nav={item.id}
                        aria-current={active ? "location" : undefined}
                        onPointerEnter={() => setHovered(item.id)}
                        onFocus={() => setHovered(item.id)}
                        onBlur={() => setHovered(null)}
                        className={cn(
                          "t-label relative inline-flex h-8 items-center px-3.5 transition-colors duration-300",
                          active || hovered === item.id ? "text-fg" : "text-muted",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <LocalTime className="t-mono hidden lg:inline" />
              <Link href="/#contact" className="btn btn-sm btn-solid hidden md:inline-flex">
                <Roll>Let’s talk</Roll>
              </Link>
              <button
                ref={toggleRef}
                type="button"
                className="t-label inline-flex h-9 items-center gap-2.5 rounded-full border border-line-strong px-4 md:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? "Close" : "Menu"}
                <span aria-hidden className="relative block h-2 w-3.5">
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 h-px bg-fg transition-transform duration-500 ease-out",
                      open && "translate-y-[3.5px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px bg-fg transition-transform duration-500 ease-out",
                      open && "-translate-y-[3.5px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="frame fixed inset-0 z-40 flex flex-col bg-bg pb-8 pt-[calc(var(--header-h)+2rem)] md:hidden"
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
                        <span className="t-h1">{item.label}</span>
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
