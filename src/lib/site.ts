function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Mostafa Nabil",
  role: "Full-stack developer",
  location: "Egypt",
  timeZone: "Africa/Cairo",
  year: "2026",
  url: resolveSiteUrl(),
  description:
    "Mostafa Nabil is a full-stack developer in Egypt who designs and builds complete web products — Next.js interfaces, NestJS APIs, payments and deployment.",
  email: "mostafa.nabil.arafa01@gmail.com",
  links: {
    github: "https://github.com/mostafanabil11",
    // Add your LinkedIn profile URL here; the link is hidden while empty.
    linkedin: "",
  },
} as const;

export const nav = [
  { id: "index", label: "Index", href: "/#index" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export type NavId = (typeof nav)[number]["id"];
