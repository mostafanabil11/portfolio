import { site } from "@/lib/site";
import { CopyEmail } from "./copy-email";
import { LocalTime } from "./local-time";
import { Magnetic } from "./magnetic";
import { Reveal, RevealLines } from "./reveal";
import { SectionLabel } from "./section-label";
import { Arrow, Roll } from "./ui";

const elsewhere = [
  { label: "GitHub", href: site.links.github, handle: site.links.github.replace("https://github.com/", "@") },
  { label: "LinkedIn", href: site.links.linkedin, handle: "Profile" },
].filter((link) => link.href);

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line">
      <div className="frame pt-[var(--section-y)]">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-8">
            <SectionLabel n="04">Contact</SectionLabel>
            <RevealLines
              as="h2"
              id="contact-title"
              className="t-h1 mt-6"
              lines={[
                "Have a project in mind?",
                <span key="b" className="t-serif text-muted">
                  Let’s build something worth using.
                </span>,
              ]}
            />
            <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={`mailto:${site.email}`} className="btn btn-solid">
                  <Roll>Email me</Roll>
                  <Arrow />
                </a>
              </Magnetic>
              <CopyEmail email={site.email} />
            </Reveal>
          </div>

          <Reveal delay={0.15} className="col-span-12 self-end lg:col-span-4 lg:col-start-9">
            <p className="t-label text-faint">Email</p>
            <a href={`mailto:${site.email}`} className="link-rule mt-2 inline-block break-all text-[1.05rem]">
              {site.email}
            </a>
            <p className="t-label mt-8 text-faint">Elsewhere</p>
            <ul className="mt-2 border-t border-line">
              {elsewhere.map((link) => (
                <li key={link.label} className="border-b border-line">
                  <a href={link.href} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between py-3">
                    <span className="text-[1.05rem] transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                      {link.label}
                    </span>
                    <span className="t-mono inline-flex items-center gap-2 text-muted transition-colors duration-300 group-hover:text-fg">
                      {link.handle}
                      <Arrow />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="mt-[var(--section-y)]">
          <div className="t-mono flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line py-6 text-faint">
            <p>
              © {site.year} {site.name}
            </p>
            <LocalTime />
            <a href="#index" className="group inline-flex items-center gap-2 transition-colors hover:text-fg">
              Back to top
              <span aria-hidden className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>

          {/* The name once more, set as wide as the page. */}
          <div aria-hidden className="pb-[clamp(1rem,2.5vw,2.5rem)] pt-[clamp(1.5rem,3vw,3rem)]">
            <RevealLines
              as="p"
              className="whitespace-nowrap text-center text-[clamp(2.6rem,14.6vw,14rem)] font-semibold leading-none tracking-[-0.05em] text-surface-2 [font-stretch:112%]"
              lines={[site.name]}
            />
          </div>
        </footer>
      </div>
    </section>
  );
}
