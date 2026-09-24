"use client";

import { useEffect } from "react";

/**
 * The demo APIs run on free Render instances that sleep after 15 idle minutes
 * and take ~40s to wake. Nudge them once per visit, while the visitor is still
 * reading, so a live demo opened later loads immediately. The requests go
 * through /api/status because the APIs refuse cross-origin reads.
 */
export function WarmApis({ slugs }: { slugs: string[] }) {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("apis-warmed")) return;
      sessionStorage.setItem("apis-warmed", "1");
    } catch {
      // Storage can be unavailable (private mode); warming is still harmless.
    }
    const warm = () => {
      for (const slug of slugs) fetch(`/api/status/${slug}`, { cache: "no-store" }).catch(() => {});
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 5000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 3000);
    return () => clearTimeout(id);
  }, [slugs]);

  return null;
}
