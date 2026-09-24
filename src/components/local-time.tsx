"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

const format = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timeZone,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

/** Current time in Egypt. Rendered as a placeholder on the server. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => format.format(Date.now()),
    () => null,
  );

  return (
    <span className={className}>
      <span className="text-muted">{site.location}</span>{" "}
      <time aria-label={time ? `Local time ${time}` : undefined}>{time ?? "--:--"}</time>
    </span>
  );
}
