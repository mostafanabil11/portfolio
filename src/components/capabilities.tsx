import { Reveal, RevealLines, Rule } from "./reveal";
import { SectionLabel } from "./section-label";

const groups = [
  { name: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive UI", "Animation"] },
  { name: "Backend", items: ["Node.js", "NestJS", "Express", "REST APIs", "Authentication", "MongoDB"] },
  { name: "Commerce", items: ["Shopify", "Liquid", "E-commerce", "Online ordering", "Admin dashboards"] },
  { name: "Tools & libraries", items: ["Git", "GitHub", "TanStack Query", "Zod", "Swagger"] },
];

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="frame section-y">
      <div className="grid-12 items-end gap-y-6">
        <div className="col-span-12 md:col-span-7">
          <SectionLabel n="02">Capabilities</SectionLabel>
          <RevealLines
            as="h2"
            id="capabilities-title"
            className="t-h2 mt-5"
            lines={[
              "One person across",
              <span key="b" className="t-serif text-muted">
                the whole product.
              </span>,
            ]}
          />
        </div>
        <Reveal delay={0.1} className="col-span-12 md:col-span-4 md:col-start-9">
          <p className="t-body text-muted md:text-right">Fewer hand-offs, and nothing lost between design and code.</p>
        </Reveal>
      </div>

      {/* Hovering one row lets the others step back. */}
      <ul className="group/list mt-[clamp(2.5rem,5vw,4rem)]">
        {groups.map((group, g) => (
          <li
            key={group.name}
            className="transition-opacity duration-500 ease-out group-hover/list:opacity-45 hover:!opacity-100"
          >
            <Rule />
            <Reveal delay={g * 0.06} className="caps-row group/row grid-12 items-baseline gap-y-4 py-[clamp(1.5rem,3vw,2.25rem)]">
              <span className="t-mono col-span-2 text-faint transition-colors duration-500 group-hover/row:text-accent md:col-span-1">
                0{g + 1}
              </span>
              <h3 className="t-title col-span-10 transition-transform duration-700 ease-out group-hover/row:translate-x-2 md:col-span-4">
                {group.name}
              </h3>
              <ul className="col-span-12 flex flex-wrap gap-1.5 md:col-span-7">
                {group.items.map((item) => (
                  <li key={item} className="chip chip-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
        <li aria-hidden>
          <Rule />
        </li>
      </ul>
    </section>
  );
}
