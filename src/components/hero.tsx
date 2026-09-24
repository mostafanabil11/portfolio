import portrait from "@/content/portrait.webp";
import { site } from "@/lib/site";
import { LocalTime } from "./local-time";
import { RevealImage } from "./reveal-image";

const facts = [
  { term: "Stack", detail: "Next.js · NestJS · MongoDB" },
  { term: "Payments", detail: "Paymob · Stripe" },
  { term: "Commerce", detail: "Custom stores · Shopify" },
  { term: "Based in", detail: "Egypt · Open to remote" },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section
      id="index"
      aria-label="Introduction"
      className="frame pb-[clamp(3.5rem,8vw,6rem)] pt-[calc(var(--header-h)+clamp(1.5rem,5vh,3.5rem))]"
    >
      <div className="grid-12 items-end gap-y-10">
        <figure className="order-first col-span-12 sm:col-span-8 sm:col-start-3 md:order-last md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
          <RevealImage
            src={portrait}
            alt="Portrait of Mostafa Nabil in a dark suit and red tie, standing by a railing."
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, (min-width: 640px) 66vw, 100vw"
            preload
            className="aspect-[4/5] rounded-[14px] border border-line"
            imageClassName="object-[50%_35%]"
          />
          <figcaption className="t-mono mt-3 flex justify-between text-muted">
            <span>{site.name}</span>
            <LocalTime />
          </figcaption>
        </figure>

        <div className="col-span-12 md:col-span-7 md:pb-10 lg:col-span-7">
          <p className="fade-late t-label inline-flex items-center gap-2.5 text-muted" style={delay(80)}>
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Available for freelance &amp; full-time
          </p>

          <h1 className="t-hero mt-6">
            <span className="line-mask">
              <span style={{ "--i": 0 } as React.CSSProperties}>{site.name}</span>
            </span>
            <span className="line-mask text-muted">
              <span style={{ "--i": 1 } as React.CSSProperties}>{site.role}</span>
            </span>
          </h1>

          <p className="fade-late t-lead mt-6 max-w-[42ch] text-muted" style={delay(450)}>
            I design and build complete web products — the interface people use, and the APIs, payments and deployment
            behind it.
          </p>

          <div className="fade-late mt-9 flex flex-wrap items-center gap-3" style={delay(600)}>
            <a href="#work" className="btn btn-solid">
              View my work
              <span aria-hidden>↓</span>
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <dl
        className="fade-late mt-[clamp(3rem,7vw,5rem)] grid grid-cols-2 gap-x-[var(--col-gap)] gap-y-6 border-t border-line pt-6 md:grid-cols-4"
        style={delay(750)}
      >
        {facts.map((fact) => (
          <div key={fact.term}>
            <dt className="t-label text-faint">{fact.term}</dt>
            <dd className="mt-2 text-[0.95rem] text-fg">{fact.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
