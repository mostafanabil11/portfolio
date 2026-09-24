import { cn } from "@/lib/cn";

/** "01 / Selected work" — the small running head above each section title. */
export function SectionLabel({ n, children, className }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("t-label flex items-center gap-3 text-muted", className)}>
      <span className="t-mono text-accent">{n}</span>
      <span aria-hidden className="h-px w-6 bg-line-strong" />
      {children}
    </p>
  );
}
