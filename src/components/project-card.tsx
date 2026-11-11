import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { ProjectPanel, morphName } from "./project-panel";
import { Reveal } from "./reveal";
import { Arrow, Roll } from "./ui";
import { cn } from "@/lib/cn";

const caseHref = (project: Project) => `/work/${project.slug}`;

/** The number rolls up and comes back in the accent colour. */
export function RollingNumber({ value }: { value: string }) {
  return (
    <span className="t-mono relative inline-flex overflow-hidden">
      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
        {value}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full text-accent transition-transform duration-500 ease-out group-hover:translate-y-0"
      >
        {value}
      </span>
    </span>
  );
}

/**
 * A project on the home page. The screen and the title both open the case
 * study (the screen morphs into its hero); the live site has its own button.
 */
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const live = project.links.live;

  return (
    <article id={`work-${project.slug}`} className={cn("group", featured && "md:col-span-2")}>
      <Link href={caseHref(project)} tabIndex={-1} aria-hidden data-cursor="Open" className="block">
        <ViewTransition name={morphName(project.slug)} share="morph" default="none">
          <ProjectPanel
            project={project}
            size={featured ? "wide" : "card"}
            sizes={featured ? "(min-width: 768px) 84vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
          />
        </ViewTransition>
      </Link>

      <Reveal
        delay={0.12}
        className={cn(
          "mt-5 grid gap-x-[var(--col-gap)] gap-y-5 md:mt-6",
          featured && "md:grid-cols-[minmax(0,1fr)_auto] md:items-end",
        )}
      >
        <div>
          <p className="t-mono flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
            <RollingNumber value={project.number} />
            <span aria-hidden className="h-px w-5 bg-line-strong" />
            <span>{project.kind}</span>
            <span className="text-faint">{project.year}</span>
          </p>

          <h3 className={cn("mt-3", featured ? "t-h2" : "t-title")}>
            <Link href={caseHref(project)} className="link-draw">
              {project.title}
            </Link>
          </h3>

          <p className="t-body mt-2.5 max-w-[56ch] text-muted">{project.summary}</p>

          <ul aria-label="Stack" className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li key={item} className="chip">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href={caseHref(project)} className="btn btn-sm btn-solid">
            <Roll>Case study</Roll>
            <Arrow dir="right" />
          </Link>
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline">
              <Roll>Live site</Roll>
              <Arrow />
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
}
