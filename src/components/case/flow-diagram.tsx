import type { Project } from "@/content/projects";

type Architecture = Project["architecture"];

/**
 * The request path as a row of cells joined by arrows, with the external
 * services the API talks to underneath. Stacks vertically on phones.
 */
export function FlowDiagram({ flow, services }: Pick<Architecture, "flow" | "services">) {
  if (!flow) return null;
  return (
    <figure className="mt-10 overflow-hidden rounded-[12px] border border-line bg-surface">
      <ol className="grid md:grid-cols-4">
        {flow.map((node, i) => (
          <li
            key={node.label}
            className="relative border-line p-5 max-md:border-b max-md:last:border-b-0 md:border-r md:last:border-r-0"
          >
            <span className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</span>
            <p className="t-h3 mt-8 md:mt-10">{node.label}</p>
            <p className="t-mono mt-1.5 text-muted">{node.detail}</p>
            {i < flow.length - 1 && (
              <span
                aria-hidden
                className="t-mono absolute z-10 grid size-6 place-items-center rounded-full border border-line-strong bg-surface-2 text-muted max-md:-bottom-3 max-md:left-5 md:-right-3 md:top-1/2 md:-translate-y-1/2"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>

      {services && services.length > 0 && (
        <div className="grid border-t border-line bg-bg/40 md:grid-cols-4">
          <p className="t-label border-line p-5 text-faint max-md:border-b md:border-r">External services</p>
          <ul className="grid grid-cols-2 md:col-span-3 md:auto-cols-fr md:grid-flow-col md:grid-cols-none">
            {services.map((service) => (
              <li
                key={service.label}
                className="border-line p-5 max-md:border-b max-md:odd:border-r md:border-r md:last:border-r-0"
              >
                <p className="text-[0.975rem] font-medium">{service.label}</p>
                <p className="t-mono mt-1.5 text-muted">{service.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}
