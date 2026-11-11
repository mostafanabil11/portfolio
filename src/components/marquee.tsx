/**
 * A slow, endless strip. The list is rendered twice and each copy slides one
 * full width, so the loop has no seam; the second copy is hidden from
 * assistive tech. Pauses under the pointer.
 */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="marquee-row">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-[clamp(1.25rem,2.6vw,2.5rem)] text-[clamp(1.5rem,3vw,2.6rem)] font-[560] tracking-[-0.03em] text-faint transition-colors duration-500 [font-stretch:108%] hover:text-fg">
            {item}
          </span>
          <span aria-hidden className="size-1.5 rotate-45 bg-line-strong" />
        </li>
      ))}
    </ul>
  );

  return (
    <div role="group" aria-label={label} className="marquee border-y border-line py-[clamp(1.25rem,2.4vw,2rem)]">
      {row(false)}
      {row(true)}
    </div>
  );
}
