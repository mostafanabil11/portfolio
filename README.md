# Mostafa Nabil — Portfolio

Personal portfolio: a dark, typography-led site with a case study for each project.

**Stack:** Next.js 16 (App Router, static generation), React 19, TypeScript, Tailwind CSS v4, Motion.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Where things live

```
src/
├── app/
│   ├── page.tsx                  Home: hero, selected work, capabilities, about, contact
│   ├── work/[slug]/page.tsx      Case study template (statically generated per project)
│   ├── api/status/[slug]/        Server-side health check for each project's demo API
│   ├── globals.css               Design tokens, type scale, motion and view-transition CSS
│   └── opengraph-image.png       Share card
├── content/
│   ├── projects.ts               All project copy, links and screenshots — edit this to change the work
│   ├── work/<slug>/*.webp        Screenshots
│   └── portrait.webp
├── components/                   Header, hero, showcases, reveals, cursor, case-study sections
└── lib/site.ts                   Name, email, social links, location
```

### Adding or editing a project

Everything about a project is one object in `src/content/projects.ts`: copy for each of the ten
case-study sections, links, stack and screenshots. Drop new screenshots into
`src/content/work/<slug>/` as `.webp` and import them at the top of the file. `shot` is the 16:10
desktop screenshot, `phone` the phone screenshot shown on small screens, and `photo: true` shows a
photograph full-bleed instead. The first project in the list is featured full width.

### Contact details

`src/lib/site.ts` holds the email and social links. The LinkedIn link stays hidden until
`links.linkedin` is filled in.

## Design system

- **Type:** Mona Sans (one variable family; headings use its wider cuts via `font-stretch`),
  Fragment Mono for numbers and metadata.
- **Colour:** near-black `#0a0a0b`, surfaces `#121214`/`#19191c`, text `#eeede9` with two greys,
  one accent `#ff6a3d`. All tokens live at the top of `globals.css`.
- **Grid:** 12 columns with fluid gutters (`frame`, `grid-12` utilities).

## Motion

- Headlines rise out of masks; images wipe up into view; hairlines draw themselves.
- A project's screen opens its live site ("View ↗" cursor); its title opens the case study, and
  the screen morphs into the case-study hero using the View Transitions API (React
  `<ViewTransition>`). The morph needs a production build to pair reliably, because pages must be
  prefetched for it to form.
- Screens lift on hover and project numbers roll to the accent colour.
- `prefers-reduced-motion` turns movement off everywhere; phones show headlines immediately.

## Demo APIs

The projects' APIs run on free Render instances that sleep when idle. The home page quietly
wakes them through `/api/status/<slug>` once per visit, and each case study shows whether its API
is awake.

## Deploying

Import the repository into Vercel; no configuration is needed. Set `NEXT_PUBLIC_SITE_URL` to the
final URL (or a custom domain later) so canonical URLs, the sitemap and share cards point at it.
