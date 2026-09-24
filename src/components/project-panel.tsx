import Image from "next/image";
import type { Project } from "@/content/projects";
import { RevealFrame } from "./reveal-image";
import { cn } from "@/lib/cn";

export const morphName = (slug: string) => `project-${slug}`;

const aspect = {
  card: "aspect-[4/5] md:aspect-[16/9]",
  wide: "aspect-[4/5] md:aspect-[2/1]",
} as const;

/**
 * A project's screen, set in a dark panel: the desktop screenshot on larger
 * screens, the phone screenshot on phones, both running off the bottom edge.
 * Photographs fill the panel instead. Hovering a parent `.group` lifts the screen.
 */
export function ProjectPanel({
  project,
  size = "card",
  sizes,
  preload = false,
  reveal = true,
}: {
  project: Project;
  size?: keyof typeof aspect;
  /** `sizes` for the desktop screenshot. */
  sizes: string;
  preload?: boolean;
  reveal?: boolean;
}) {
  const lift = "transition-transform duration-[1.2s] ease-out group-hover:-translate-y-[2.5%] group-hover:scale-[1.012]";

  const content = project.photo ? (
    <Image
      src={project.shot}
      alt={project.shotAlt}
      fill
      preload={preload}
      placeholder="blur"
      sizes={sizes}
      className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.035]"
    />
  ) : (
    <>
      {/* Padding in % is relative to width, so the top and side margins match. */}
      <div className={cn("absolute inset-0 px-[7%] pt-[7%]", project.phone && "max-md:hidden")}>
        <div className={cn("relative aspect-[16/10] overflow-hidden rounded-t-[10px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] outline outline-1 -outline-offset-1 outline-white/10", lift)}>
          <Image
            src={project.shot}
            alt={project.shotAlt}
            fill
            preload={preload}
            placeholder="blur"
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      </div>
      {project.phone && (
        <div className="absolute inset-0 px-[22%] pt-[10%] md:hidden">
          <div className={cn("relative aspect-[900/1948] overflow-hidden rounded-t-[18px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] outline outline-1 -outline-offset-1 outline-white/10", lift)}>
            <Image src={project.phone} alt={project.shotAlt} fill placeholder="blur" sizes="60vw" className="object-cover object-top" />
          </div>
        </div>
      )}
    </>
  );

  const frame = cn(
    "relative overflow-hidden rounded-[14px] border border-line bg-surface transition-colors duration-500 group-hover:border-line-strong",
    aspect[size],
  );

  return reveal ? (
    <RevealFrame id={`panel-${project.slug}-${size}`} className={frame}>
      {content}
    </RevealFrame>
  ) : (
    <div className={frame}>{content}</div>
  );
}
