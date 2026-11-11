import portrait from "@/content/portrait.webp";
import { site } from "@/lib/site";
import { LocalTime } from "./local-time";
import { Magnetic } from "./magnetic";
import { RevealImage } from "./reveal-image";
import { Arrow, Roll } from "./ui";

const facts = [
  { term: "Stack", detail: "Next.js · NestJS · MongoDB" },
  { term: "Bilingual", detail: "English · Arabic" },
  { term: "Commerce", detail: "Custom stores · Shopify" },
  { term: "Based in", detail: "Egypt · Open to remote" },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;
const line = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  return (
    <section
      id="index"
      aria-label="Introduction"
      className="frame relative pb-[clamp(3.5rem,7vw,6rem)] pt-[calc(var(--header-h)+clamp(1.75rem,7vh,4.5rem))]"
    >
      <p className="fade-late t-label inline-flex items-center gap-3 text-muted" style={delay(60)}>
        <span aria-hidden className="pulse" />
        Available for freelance &amp; full-time
      </p>

      <h1 className="t-hero mt-[clamp(1.25rem,2.5vw,2rem)]">
        <span className="line-mask">
          <span style={line(0)}>{site.name}</span>
        </span>
        <span className="line-mask">
          <span style={line(1)} className="t-serif text-muted">
            {site.role}
          </span>
        </span>
      </h1>

      <div className="grid-12 mt-[clamp(2.5rem,5vw,4.5rem)] gap-y-12">
        <div className="col-span-12 flex flex-col md:col-span-6 lg:col-span-5">
          <p className="fade-late t-lead max-w-[40ch] text-fg/85" style={delay(450)}>
            I design and build complete web products — the interface people use, and the APIs and data behind it.
          </p>

          <div className="fade-late mt-9 flex flex-wrap items-center gap-3" style={delay(580)}>
            <Magnetic>
              <a href="#work" className="btn btn-solid">
                <Roll>View my work</Roll>
                <Arrow dir="down" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-outline">
                <Roll>Get in touch</Roll>
              </a>
            </Magnetic>
          </div>

          <dl
            className="fade-late mt-[clamp(3rem,6vw,4.5rem)] grid grid-cols-2 gap-x-[var(--col-gap)] border-t border-line md:mt-auto"
            style={delay(720)}
          >
            {facts.map((fact) => (
              <div key={fact.term} className="border-b border-line py-4">
                <dt className="t-label text-faint">{fact.term}</dt>
                <dd className="mt-1.5 text-[0.95rem] text-fg">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="col-span-12 sm:col-span-8 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <RevealImage
            src={portrait}
            alt="Portrait of Mostafa Nabil in a dark suit and red tie, standing by a railing."
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, (min-width: 640px) 66vw, 100vw"
            preload
            parallax={5}
            className="aspect-[4/5] rounded-[16px] border border-line"
            imageClassName="object-[50%_35%]"
          />
          <figcaption className="t-mono mt-3 flex justify-between text-muted">
            <span>{site.name}</span>
            <LocalTime />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
