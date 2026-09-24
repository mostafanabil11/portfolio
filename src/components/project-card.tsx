import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { ProjectPanel, morphName } from "./project-panel";
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
 * A project on the home page. The screen opens the live site ("View"); the
 * title opens the case study, morphing the screen into its hero.
 */
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const live = project.links.live;
  const mediaProps = live
    ? { href: live, target: "_blank", rel: "noreferrer", "data-cursor": "View ↗" }
    : { href: caseHref(project), "data-cursor": "Read" };

  const panel = (
    <ViewTransition name={morphName(project.slug)} share="morph" default="none">
      <ProjectPanel
        project={project}
        size={featured ? "wide" : "card"}
        sizes={featured ? "(min-width: 768px) 84vw, 100vw" : "(min-width: 768px) 42vw, 100vw"}
      />
    </ViewTransition>
  );

  return (
    <article id={`work-${project.slug}`} className={cn("group", featured && "md:col-span-2")}>
      {live ? (
        <a {...mediaProps} tabIndex={-1} aria-hidden className="block">
          {panel}
        </a>
      ) : (
        <Link {...mediaProps} tabIndex={-1} aria-hidden className="block">
          {panel}
        </Link>
      )}

      <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 md:mt-6 md:grid-cols-[auto_minmax(0,1fr)_auto]">
        <span className="pt-[0.3em] text-muted">
          <RollingNumber value={project.number} />
        </span>

        <div>
          <h3 className="t-h3">
            <Link
              href={caseHref(project)}
              className="transition-colors duration-300 hover:text-accent focus-visible:text-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="t-body mt-1 text-muted">{project.kind}</p>
          {featured && <p className="t-body mt-3 max-w-[58ch] text-muted">{project.summary}</p>}
          <p className="t-mono mt-3 text-faint">{project.stack.join("  ·  ")}</p>
        </div>

        <div className="col-span-2 mt-5 flex items-center gap-5 md:col-span-1 md:mt-0 md:items-start md:pt-[0.2em]">
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className="t-label group/link inline-flex items-center gap-1.5">
              Live site
              <span className="inline-block transition-transform duration-500 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
                ↗
              </span>
            </a>
          )}
          <Link href={caseHref(project)} className="t-label group/link inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
            Case study
            <span className="inline-block transition-transform duration-500 ease-out group-hover/link:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
