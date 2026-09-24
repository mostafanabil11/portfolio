import { getProject } from "@/content/projects";

// A free Render instance can take ~40s to wake; give it room.
export const maxDuration = 60;

/**
 * Server-side health check for a project's API. The APIs send
 * `Cross-Origin-Resource-Policy: same-origin`, so the browser can't
 * ask them directly — this route asks on its behalf.
 */
export async function GET(_request: Request, ctx: RouteContext<"/api/status/[slug]">) {
  const { slug } = await ctx.params;
  const url = getProject(slug)?.links.health;
  if (!url) return Response.json({ status: "unknown" }, { status: 404 });

  let status: "online" | "offline" = "offline";
  try {
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(55_000) });
    if (response.ok) status = "online";
  } catch {
    // Timed out or unreachable: reported as offline.
  }
  return Response.json({ status }, { headers: { "Cache-Control": "no-store" } });
}
