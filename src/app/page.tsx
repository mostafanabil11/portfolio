import { About } from "@/components/about";
import { Capabilities } from "@/components/capabilities";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ProjectCard } from "@/components/project-card";
import { Reveal, RevealLines } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { WarmApis } from "@/components/warm-apis";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "NestJS",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "Shopify",
  "REST APIs",
];

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
      <div aria-hidden className="glow" />
      <Hero />
      <Marquee items={technologies} label="Technologies I work with" />

      <section id="work" aria-labelledby="work-title" className="frame section-y">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel n="01">Selected work</SectionLabel>
            <RevealLines
              as="h2"
              id="work-title"
              className="t-h2 mt-5"
              lines={[
                "Products I’ve designed",
                <span key="b" className="t-serif text-muted">
                  and built end to end.
                </span>,
              ]}
            />
          </div>
          <Reveal delay={0.1} className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="t-body text-muted md:text-right">
              {projects.length} projects. Open one for the full case study, or go straight to the live site.
            </p>
          </Reveal>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-x-[var(--col-gap)] gap-y-[clamp(4rem,8vw,7rem)] md:grid-cols-2">
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
