import Link from "next/link";
import { ViewTransition } from "react";
import type { Project } from "@/content/projects";
import { RollingNumber } from "../project-card";
import { ProjectPanel, morphName } from "../project-panel";

/** The way out of a case study is the next one; its screen morphs into place. */
export function NextProject({ project }: { project: Project }) {
  return (
    <section aria-label="Next project" className="frame">
      <Link
        href={`/work/${project.slug}`}
        data-cursor="Next"
        className="group grid-12 items-center gap-y-8 border-t border-line py-[clamp(3.5rem,8vw,7rem)]"
      >
        <div className="col-span-12 md:col-span-5">
          <p className="t-label flex items-center gap-3 text-muted">
            <span>Next project</span>
            <RollingNumber value={project.number} />
          </p>
          <p className="t-h1 mt-5 transition-colors duration-300 group-hover:text-accent">{project.title}</p>
          <p className="t-body mt-3 text-muted">{project.kind}</p>
          <span className="t-label mt-8 inline-flex items-center gap-2">
            Read the case study
            <span aria-hidden className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <ViewTransition name={morphName(project.slug)} share="morph" default="none">
            <ProjectPanel project={project} sizes="(min-width: 768px) 48vw, 100vw" />
          </ViewTransition>
        </div>
      </Link>
    </section>
  );
}
