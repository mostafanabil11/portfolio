"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Status = "checking" | "waking" | "online" | "offline";

const copy: Record<Status, string> = {
  checking: "Checking the API…",
  waking: "Waking the API. Free hosting sleeps when idle; this can take ~40s",
  online: "API online",
  offline: "API not responding right now",
};

/** Shows whether the project's demo API is awake, via /api/status. */
export function ApiStatus({ slug }: { slug: string }) {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;
    const slow = window.setTimeout(() => setStatus((s) => (s === "checking" ? "waking" : s)), 1500);

    fetch(`/api/status/${slug}`, { cache: "no-store" })
      .then((response) => response.json() as Promise<{ status: Status }>)
      .then(({ status }) => !cancelled && setStatus(status === "online" ? "online" : "offline"))
      .catch(() => !cancelled && setStatus("offline"))
      .finally(() => window.clearTimeout(slow));

    return () => {
      cancelled = true;
      window.clearTimeout(slow);
    };
  }, [slug]);

  return (
    <p className="t-mono flex items-baseline gap-2 text-muted" aria-live="polite">
      <span
        aria-hidden
        className={cn(
          "inline-block size-[7px] shrink-0 translate-y-[-1px] rounded-full",
          status === "online" && "bg-emerald-400",
          status === "offline" && "border border-faint",
          (status === "checking" || status === "waking") && "animate-pulse bg-accent motion-reduce:animate-none",
        )}
      />
      {copy[status]}
    </p>
  );
}
