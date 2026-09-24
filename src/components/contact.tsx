import { site } from "@/lib/site";
import { CopyEmail } from "./copy-email";
import { LocalTime } from "./local-time";
import { Reveal, RevealLines } from "./reveal";
import { SectionLabel } from "./section-label";

const elsewhere = [
  { label: "GitHub", href: site.links.github, handle: site.links.github.replace("https://github.com/", "@") },
  { label: "LinkedIn", href: site.links.linkedin, handle: "Profile" },
].filter((link) => link.href);

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line">
      <div className="frame pt-[var(--section-y)]">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <SectionLabel n="04">Contact</SectionLabel>
            <RevealLines
              as="h2"
              id="contact-title"
              className="t-h1 mt-6"
              lines={["Have a project in mind?", <span key="b" className="text-muted">Let’s build something worth using.</span>]}
            />
            <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-solid">
                Email me
                <span aria-hidden>↗</span>
              </a>
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
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-baseline justify-between py-3"
                  >
                    <span className="text-[1.05rem] transition-colors group-hover:text-accent">{link.label}</span>
                    <span className="t-mono text-muted">
                      {link.handle}{" "}
                      <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <footer className="t-mono mt-[var(--section-y)] flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line py-6 text-faint">
          <p>
            © {site.year} {site.name}
          </p>
          <LocalTime />
          <a href="#index" className="transition-colors hover:text-fg">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
