import { cn } from "@/lib/cn";

/**
 * A numbered case-study chapter. The label column sticks while the content
 * scrolls; `wide` lets the content (screens) use the full width below it.
 */
export function CaseSection({
  n,
  title,
  wide = false,
  children,
}: {
  n: string;
  title: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  const id = `section-${n}`;
  return (
    <section aria-labelledby={id} className="frame">
      <div className="grid-12 gap-y-8 border-t border-line py-[clamp(3.5rem,7vw,6.5rem)]">
        <div className={cn("col-span-12", !wide && "lg:col-span-3")}>
          <h2
            id={id}
            className="t-label flex items-center gap-3 text-muted lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]"
          >
            <span className="t-mono text-accent">{n}</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            {title}
          </h2>
        </div>
        <div className={cn("col-span-12", !wide && "lg:col-span-8 lg:col-start-5")}>{children}</div>
      </div>
    </section>
  );
}

/** Paragraphs; the first carries the weight, the rest step back. */
export function Lead({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="grid gap-5">
      {paragraphs.map((text, i) => (
        <p key={i} className={cn("max-w-[62ch]", i === 0 ? "text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.55]" : "t-lead text-muted")}>
          {text}
        </p>
      ))}
    </div>
  );
}

/** Two-column list of short titled notes (features, decisions). */
export function NoteGrid({ notes, className }: { notes: { title: string; text: string }[]; className?: string }) {
  return (
    <ol className={cn("grid gap-x-[var(--col-gap)] gap-y-3 md:grid-cols-2", className)}>
      {notes.map((note, i) => (
        <li
          key={note.title}
          className="rounded-[12px] border border-line bg-surface p-5 transition-colors duration-500 hover:border-line-strong md:p-6"
        >
          <span className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="t-h3 mt-6">{note.title}</h3>
          <p className="t-body mt-2 text-muted">{note.text}</p>
        </li>
      ))}
    </ol>
  );
}
