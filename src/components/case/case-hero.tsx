import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { ProjectPanel, morphName } from "../project-panel";
import { ApiStatus } from "./api-status";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export function CaseHero({ project, total }: { project: Project; total: number }) {
  const { live, github, health, note } = project.links;

  const meta = [
    { term: "Type", detail: project.kind },
    { term: "Role", detail: project.role },
    { term: "Stack", detail: project.stack.join(" · ") },
    { term: "Year", detail: project.year },
  ];

  return (
    <header className="frame pt-[calc(var(--header-h)+clamp(1.5rem,4vh,3rem))]">
      <div className="t-label flex items-center justify-between gap-4 text-muted">
        <Link
          href={`/#work-${project.slug}`}
          className="group inline-flex items-center gap-2 transition-colors hover:text-fg"
        >
          <span aria-hidden className="inline-block transition-transform duration-500 ease-out group-hover:-translate-x-1">
            ←
          </span>
          All work
        </Link>
        <span className="t-mono">
          Case study {project.number} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="grid-12 mt-[clamp(2.5rem,7vw,5rem)] items-end gap-y-8">
        <div className="col-span-12 lg:col-span-7">
          <h1 className="t-h1">
            <span className="line-mask">
              <span>{project.title}</span>
            </span>
          </h1>
          <p className="fade-late t-lead mt-5 max-w-[46ch] text-muted" style={delay(250)}>
            {project.summary}
          </p>
        </div>

        <div className="fade-late col-span-12 lg:col-span-4 lg:col-start-9" style={delay(400)}>
          {live || github ? (
            <div className="flex flex-wrap gap-3">
              {live && (
                <a href={live} target="_blank" rel="noreferrer" className="btn btn-solid">
                  Visit live site <span aria-hidden>↗</span>
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noreferrer" className="btn btn-outline">
                  Source code
                </a>
              )}
            </div>
          ) : (
            <p className="t-body text-muted">{note}</p>
          )}
          {health && (
            <div className="mt-4">
              <ApiStatus slug={project.slug} />
            </div>
          )}
        </div>
      </div>

      <dl
        className="fade-late mt-10 grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-5 border-t border-line pt-5 md:grid-cols-4"
        style={delay(500)}
      >
        {meta.map((item) => (
          <div key={item.term}>
            <dt className="t-label text-faint">{item.term}</dt>
            <dd className="mt-1.5 text-[0.95rem]">{item.detail}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-[clamp(2.5rem,5vw,4rem)]">
        {live ? (
          <a href={live} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden data-cursor="View ↗" className="group block">
            <ViewTransition name={morphName(project.slug)} share="morph" default="none">
              <ProjectPanel project={project} size="wide" sizes="(min-width: 1536px) 1440px, 100vw" preload reveal={false} />
            </ViewTransition>
          </a>
        ) : (
          <div className="group">
            <ViewTransition name={morphName(project.slug)} share="morph" default="none">
              <ProjectPanel project={project} size="wide" sizes="(min-width: 1536px) 1440px, 100vw" preload reveal={false} />
            </ViewTransition>
          </div>
        )}
      </div>
    </header>
  );
}
