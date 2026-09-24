import { site } from "@/lib/site";
import { Reveal, RevealLines } from "./reveal";
import { SectionLabel } from "./section-label";

const facts = [
  { term: "Based in", detail: site.location },
  { term: "Focus", detail: "Full-stack product development" },
  { term: "Currently", detail: "Building an online coaching platform" },
  { term: "Open to", detail: "Freelance projects & full-time roles" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="frame section-y border-t border-line">
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <SectionLabel n="03">About</SectionLabel>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <RevealLines
            as="h2"
            id="about-title"
            className="t-h2"
            lines={["I build the part people see,", <span key="b" className="text-muted">and the part that has to keep working.</span>]}
          />

          <Reveal className="mt-8 grid gap-5 md:grid-cols-2 md:gap-[var(--col-gap)]">
            <p className="t-body text-muted">
              Most of my projects start with an empty repository and end in production. I design the interface, build
              it in Next.js, write the API in NestJS, model the data in MongoDB, connect the payments and ship it —
              usually to Vercel and Render.
            </p>
            <p className="t-body text-muted">
              Doing all of it is how I keep both halves honest: a layout that feels calm on a phone, and an order that
              can never be charged twice. I&apos;d rather get fewer things exactly right than ship more that almost work.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <dl className="grid gap-x-[var(--col-gap)] sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.term} className="flex items-baseline justify-between gap-4 border-t border-line py-3.5">
                  <dt className="t-label text-faint">{fact.term}</dt>
                  <dd className="text-right text-[0.95rem]">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
