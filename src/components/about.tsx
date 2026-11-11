import { site } from "@/lib/site";
import { Reveal, RevealLines } from "./reveal";
import { ScrollWords } from "./scroll-words";
import { SectionLabel } from "./section-label";

const facts = [
  { term: "Based in", detail: site.location },
  { term: "Focus", detail: "Full-stack product development" },
  { term: "Open to", detail: "Freelance projects & full-time roles" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="frame section-y border-t border-line">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <SectionLabel n="03">About</SectionLabel>
        </div>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <RevealLines
            as="h2"
            id="about-title"
            className="t-h2"
            lines={[
              "I build the part people see,",
              <span key="b" className="t-serif text-muted">
                and the part that has to keep working.
              </span>,
            ]}
          />

          {/* The paragraph comes into focus as it is read. */}
          <ScrollWords
            className="mt-[clamp(2.5rem,5vw,4rem)] max-w-[34ch] text-[clamp(1.35rem,2.5vw,2.15rem)] font-[480] leading-[1.32] tracking-[-0.022em] sm:max-w-[38ch]"
            text="Most of my projects start with an empty repository and end in production. I design the interface, build it in Next.js, write the API in NestJS, model the data in MongoDB and ship it."
          />

          <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-[var(--col-gap)] gap-y-10 md:grid-cols-2">
            <Reveal>
              <p className="t-body max-w-[46ch] text-muted">
                Doing all of it is how I keep both halves honest: a layout that feels calm on a phone, and an order that
                can never be placed twice. I&apos;d rather get fewer things exactly right than ship more that almost work.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="border-b border-line">
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
      </div>
    </section>
  );
}
