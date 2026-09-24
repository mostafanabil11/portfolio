import type { Figure, Screen } from "@/content/projects";
import { RevealImage } from "../reveal-image";
import { cn } from "@/lib/cn";

function Shot({
  figure,
  label,
  sizes,
  className,
  rounded = "rounded-[12px]",
}: {
  figure: Figure;
  label: string;
  sizes: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <figure className={className}>
      <RevealImage
        src={figure.src}
        alt={figure.alt}
        sizes={sizes}
        ratio={figure.src.width / figure.src.height}
        className={cn("border border-line", rounded)}
      />
      <figcaption className="t-mono mt-3 flex gap-3 text-muted">
        <span className="shrink-0 text-faint">{label}</span>
        <span>{figure.caption}</span>
      </figcaption>
    </figure>
  );
}

/** Large screenshots, laid out by kind: full width, side by side, or phones. */
export function Screens({ screens }: { screens: Screen[] }) {
  let count = 0;
  const next = () => `Fig. ${String(++count).padStart(2, "0")}`;

  return (
    <div className="grid gap-y-[clamp(3rem,6vw,5.5rem)]">
      {screens.map((screen, i) => {
        if (screen.kind === "wide") {
          return <Shot key={i} figure={screen.figure} label={next()} sizes="(min-width: 1536px) 1440px, 100vw" />;
        }

        if (screen.kind === "pair") {
          return (
            <div key={i} className="grid gap-x-[var(--col-gap)] gap-y-10 md:grid-cols-2">
              {screen.figures.map((figure) => (
                <Shot key={figure.caption} figure={figure} label={next()} sizes="(min-width: 768px) 48vw, 100vw" />
              ))}
            </div>
          );
        }

        const label = next();
        return (
          <div
            key={i}
            className="grid-12 items-end gap-y-8 rounded-[16px] border border-line bg-surface px-[6%] pt-[6%] max-md:pb-8"
          >
            {screen.figures.map((figure, j) => (
              <Shot
                key={figure.caption}
                figure={figure}
                label={`${label}${String.fromCharCode(97 + j)}`}
                sizes="(min-width: 768px) 22vw, 45vw"
                rounded="rounded-[20px]"
                className={cn(
                  "col-span-6 md:col-span-3",
                  j === 0 && "md:col-start-2",
                  j === 1 && "md:col-start-6 md:mb-[7vw]",
                  "md:pb-8",
                )}
              />
            ))}
            <p className="t-lead col-span-12 max-w-[22ch] text-muted md:col-span-3 md:col-start-10 md:pb-8">
              {screen.caption}
            </p>
          </div>
        );
      })}
    </div>
  );
}
