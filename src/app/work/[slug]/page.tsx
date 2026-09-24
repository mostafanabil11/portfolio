import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseHero } from "@/components/case/case-hero";
import { CaseSection, Lead, NoteGrid } from "@/components/case/case-section";
import { FlowDiagram } from "@/components/case/flow-diagram";
import { NextProject } from "@/components/case/next-project";
import { Screens } from "@/components/case/screens";
import { getNextProject, getProject, projects, type Project } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title = `${project.title} — ${project.kind}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      type: "article",
      images: [{ url: project.shot.src, width: project.shot.width, height: project.shot.height, alt: project.shotAlt }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article>
      <CaseHero project={project} total={projects.length} />

      <div className="mt-[clamp(3rem,7vw,6rem)]">
        <CaseSection n="01" title="Overview">
          <Lead paragraphs={project.overview} />
        </CaseSection>

        <CaseSection n="02" title="The problem">
          <Lead paragraphs={project.problem} />
        </CaseSection>

        <CaseSection n="03" title="The solution">
          <div className="grid gap-5 md:grid-cols-2 md:gap-[var(--col-gap)]">
            {project.solution.map((text, i) => (
              <p key={i} className="t-body text-[1.02rem] text-muted first:text-fg">
                {text}
              </p>
            ))}
          </div>
        </CaseSection>

        <CaseSection n="04" title="Key features">
          <NoteGrid notes={project.features} />
        </CaseSection>

        <CaseSection n="05" title="Architecture">
          <p className="max-w-[62ch] text-[clamp(1.15rem,1.5vw,1.4rem)] leading-[1.55]">{project.architecture.text}</p>
          <FlowDiagram flow={project.architecture.flow} services={project.architecture.services} />
          <NoteGrid notes={project.architecture.decisions} className="mt-3" />
        </CaseSection>

        <CaseSection n="06" title="Technology stack">
          <Stack groups={project.stackDetail} />
        </CaseSection>

        <CaseSection n="07" title="UI screens" wide>
          <Screens screens={project.screens} />
        </CaseSection>

        <CaseSection n="08" title="Challenges">
          <Challenges notes={project.challenges} />
        </CaseSection>

        <CaseSection n="09" title="Final result">
          <Lead paragraphs={project.result} />
        </CaseSection>

        <CaseSection n="10" title="Live website & code">
          <Links links={project.links} />
        </CaseSection>
      </div>

      <NextProject project={getNextProject(project.slug)} />
    </article>
  );
}

function Stack({ groups }: { groups: Project["stackDetail"] }) {
  return (
    <dl className="grid gap-x-[var(--col-gap)] gap-y-8 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.group}>
          <dt className="t-label border-b border-line pb-3 text-faint">{group.group}</dt>
          <dd className="mt-4 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line px-3 py-1 text-[0.875rem] text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Challenges({ notes }: { notes: Project["challenges"] }) {
  return (
    <ol className="border-b border-line">
      {notes.map((note, i) => (
        <li
          key={note.title}
          className="grid gap-x-[var(--col-gap)] gap-y-2 border-t border-line py-6 md:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.4fr)] md:py-8"
        >
          <span className="t-mono pt-[0.3em] text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="t-h3">{note.title}</h3>
          <p className="t-body text-muted">{note.text}</p>
        </li>
      ))}
    </ol>
  );
}

function Links({ links }: { links: Project["links"] }) {
  const rows = [
    links.live && { label: "Live website", href: links.live },
    links.github && { label: "Source code", href: links.github },
  ].filter((row): row is { label: string; href: string } => Boolean(row));

  if (rows.length === 0) return <p className="t-lead max-w-[46ch] text-muted">{links.note}</p>;

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {rows.map((row) => (
        <li key={row.label}>
          <a
            href={row.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col justify-between gap-10 rounded-[12px] border border-line bg-surface p-5 transition-colors duration-500 hover:border-line-strong md:p-6"
          >
            <span className="flex items-center justify-between">
              <span className="t-h3">{row.label}</span>
              <span
                aria-hidden
                className="text-muted transition-[translate,color] duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              >
                ↗
              </span>
            </span>
            <span className="t-mono break-all text-muted">{row.href.replace(/^https?:\/\//, "")}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
