import { Reveal, RevealLines } from "./reveal";
import { SectionLabel } from "./section-label";

const groups = [
  { name: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Responsive UI", "Animation"] },
  { name: "Backend", items: ["Node.js", "NestJS", "Express", "REST APIs", "Authentication", "MongoDB"] },
  { name: "Commerce", items: ["Shopify", "Liquid", "E-commerce", "Payment integrations", "Shipping integrations"] },
  { name: "Tools & deployment", items: ["Git", "GitHub", "Vercel", "Render", "MongoDB Atlas"] },
];

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="frame section-y border-t border-line">
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 lg:col-span-4">
          <SectionLabel n="02">Capabilities</SectionLabel>
          <RevealLines
            as="h2"
            id="capabilities-title"
            className="t-h2 mt-5"
            lines={["One person across", "the whole product."]}
          />
          <Reveal delay={0.1}>
            <p className="t-body mt-5 max-w-[34ch] text-muted">
              Fewer hand-offs, and nothing lost between design, code and deployment.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 grid gap-x-[var(--col-gap)] gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {groups.map((group, g) => (
            <Reveal key={group.name} delay={g * 0.07}>
              <div className="flex items-baseline justify-between border-b border-line pb-3">
                <h3 className="t-label">{group.name}</h3>
                <span className="t-mono text-faint">0{g + 1}</span>
              </div>
              <ul className="mt-4 grid gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[1.05rem] text-muted transition-[color,translate] duration-300 ease-out hover:translate-x-1 hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
