import { About } from "@/components/about";
import { Capabilities } from "@/components/capabilities";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal, RevealLines } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { WarmApis } from "@/components/warm-apis";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

const withApi = projects.flatMap((project) => (project.links.health ? [project.slug] : []));

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressCountry: "EG" },
  sameAs: Object.values(site.links).filter(Boolean),
  knowsAbout: ["Next.js", "React", "TypeScript", "NestJS", "Node.js", "MongoDB", "Shopify", "E-commerce"],
};

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className="frame section-y border-t border-line">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel n="01">Selected work</SectionLabel>
            <RevealLines
              as="h2"
              id="work-title"
              className="t-h2 mt-5"
              lines={["Products I’ve designed", <span key="b" className="text-muted">and built end to end.</span>]}
            />
          </div>
          <Reveal delay={0.1} className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="t-body text-muted md:text-right">
              Click a screen to open the live site, or a title for the full case study.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-[var(--col-gap)] gap-y-[clamp(3.5rem,7vw,6rem)] md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} featured={i === 0} />
          ))}
        </div>
      </section>

      <Capabilities />
      <About />
      <Contact />

      <WarmApis slugs={withApi} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
