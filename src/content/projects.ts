import type { StaticImageData } from "next/image";

import primexCover from "./work/primex/cover.webp";
import primexMembership from "./work/primex/membership.webp";
import primexTrainer from "./work/primex/trainer.webp";
import primexArabic from "./work/primex/arabic.webp";
import primexMobile from "./work/primex/mobile.webp";
import primexMobileMembership from "./work/primex/mobile-membership.webp";

import novaHome from "./work/novacart/home.webp";
import novaProducts from "./work/novacart/products.webp";
import novaProduct from "./work/novacart/product.webp";
import novaMobile from "./work/novacart/mobile.webp";
import novaMobileProducts from "./work/novacart/mobile-products.webp";

import fireCover from "./work/firehouse/cover.webp";
import fireMenu from "./work/firehouse/menu.webp";
import fireItem from "./work/firehouse/item.webp";
import fireTrack from "./work/firehouse/track.webp";
import fireMobile from "./work/firehouse/mobile.webp";
import fireMobileMenu from "./work/firehouse/mobile-menu.webp";

import valiantHome from "./work/valiant/home.webp";
import valiantProducts from "./work/valiant/products.webp";
import valiantProduct from "./work/valiant/product.webp";
import valiantSale from "./work/valiant/sale.webp";
import valiantMobile from "./work/valiant/mobile.webp";
import valiantMobileProducts from "./work/valiant/mobile-products.webp";

import kovaCover from "./work/kova/cover.webp";
import kovaMen from "./work/kova/men.webp";
import kovaWomen from "./work/kova/women.webp";
import kovaEternals from "./work/kova/eternals.webp";

export type Figure = { src: StaticImageData; alt: string; caption: string };

export type Screen =
  | { kind: "wide"; figure: Figure }
  | { kind: "pair"; figures: [Figure, Figure] }
  | { kind: "phones"; figures: Figure[]; caption: string };

export type Note = { title: string; text: string };

export type Project = {
  slug: string;
  number: string;
  title: string;
  kind: string;
  year: string;
  summary: string;
  role: string;
  scope: string[];
  stack: string[];
  links: { live?: string; github?: string; health?: string; note?: string };
  /** Desktop screenshot (or photograph, see `photo`) shown on cards and the case-study hero. */
  shot: StaticImageData;
  shotAlt: string;
  /** Phone screenshot used instead of `shot` on small screens. */
  phone?: StaticImageData;
  /** The shot is a photograph, shown full-bleed rather than framed like a screen. */
  photo?: boolean;
  overview: string[];
  problem: string[];
  solution: string[];
  features: Note[];
  architecture: {
    text: string;
    flow?: { label: string; detail: string }[];
    services?: { label: string; detail: string }[];
    decisions: Note[];
  };
  stackDetail: { group: string; items: string[] }[];
  screens: Screen[];
  challenges: Note[];
  result: string[];
};

const webFlow = (frontend: string, api: string) => [
  { label: "Browser", detail: "Customer & staff" },
  { label: "Next.js", detail: `${frontend} · Vercel` },
  { label: "NestJS API", detail: `${api} · Render` },
  { label: "MongoDB", detail: "Atlas" },
];

export const projects: Project[] = [
  {
    slug: "primex",
    number: "01",
    title: "PrimeX",
    kind: "Gym membership platform",
    year: "2026",
    summary:
      "Memberships, class booking and an admin dashboard for a gym with several branches — in English and Arabic.",
    role: "Design & full-stack development",
    scope: ["Interface design", "Frontend", "API & data model", "Payments", "Deployment"],
    stack: ["Next.js", "NestJS", "MongoDB"],
    links: {
      live: "https://prime-x-dusky.vercel.app",
      github: "https://github.com/mostafanabil11/PrimeX",
      health: "https://primex-api-9v4y.onrender.com/health",
    },
    shot: primexCover,
    phone: primexMobile,
    shotAlt: "PrimeX homepage: a dark hero reading “Break the limit” beside a photo of the gym’s illuminated logo.",
    overview: [
      "PrimeX is the website and back office for a gym that runs more than one branch. Visitors compare plans, meet the trainers and read the weekly timetable; members manage their subscription and bookings; staff run everything else from an admin dashboard.",
      "The whole product works in English and Arabic — with a genuinely right-to-left layout, not a translated left-to-right one.",
    ],
    problem: [
      "A gym’s offer is more complicated than a price list. Plans differ by branch access, class credits, freeze days and guest passes; classes have a fixed number of places; and a lot of the business still happens at the front desk, in cash, over WhatsApp.",
      "The site had to sell memberships clearly without pretending the gym is an online-only business — and staff needed one place to see a member’s entire history.",
    ],
    solution: [
      "I modelled the gym the way it actually operates — branches, plans, trainers, class types and recurring weekly schedules — and built every page on top of that model instead of around static content.",
      "The join flow takes card payments through Paymob or records cash paid at the desk. Each member-facing capability sits behind its own feature flag on both frontend and backend, so the gym could launch as a showcase that routes enquiries to WhatsApp, with online sales and booking ready to switch on without a rebuild.",
    ],
    features: [
      { title: "Plans & join funnel", text: "Class-credit or unlimited plans, single- or all-branch tiers, freeze days and guest passes. Pay by card, or in cash at the desk." },
      { title: "Timetable & booking", text: "Sessions generated from weekly rules. Booking can never exceed capacity, and credits come back when a class is cancelled." },
      { title: "Member account", text: "Membership status, upcoming and past classes, payment history, profile and notification settings." },
      { title: "Admin dashboard", text: "KPIs, branches, plans, trainers and schedules; members with their full history; cash payments, content editing, an enquiry inbox and an audit log." },
      { title: "English & Arabic", text: "Two languages with a right-to-left layout designed for Arabic, not mirrored as an afterthought." },
      { title: "Accounts", text: "Email and password with OTP verification, Google sign-in and password reset." },
    ],
    architecture: {
      text: "A Next.js App Router frontend on Vercel talks to a NestJS API on Render, backed by MongoDB Atlas. The split is deliberate: the API runs scheduled jobs in-process, which needs a long-lived server that a serverless platform would never keep awake.",
      flow: webFlow("App Router", "REST"),
      services: [
        { label: "Paymob", detail: "Card payments, HMAC-verified callbacks" },
        { label: "Brevo", detail: "Transactional email over HTTP" },
        { label: "Google", detail: "OAuth sign-in" },
      ],
      decisions: [
        { title: "No overselling, even under load", text: "A booking claims its seat with one conditional update that only succeeds while the booked count is below capacity. Two members racing for the last place can’t both win." },
        { title: "Sessions that rotate", text: "Tokens live in httpOnly cookies with per-device refresh-token rotation and reuse detection. Deactivated accounts are rejected on every rotation, not just at login." },
        { title: "Flags, not forks", text: "Membership sales, class booking and member accounts are each gated separately — which is how one codebase runs today in showcase mode." },
        { title: "Email that arrives", text: "Free Render instances block SMTP ports, so production mail goes through Brevo’s HTTP API and the active transport is logged at startup." },
      ],
    },
    stackDetail: [
      { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "TanStack Query", "Tailwind CSS v4", "shadcn/ui", "next-intl"] },
      { group: "Backend", items: ["NestJS 10", "MongoDB & Mongoose", "Passport (JWT, Google)", "Zod", "Swagger", "Scheduled jobs"] },
      { group: "Services", items: ["Paymob", "Brevo", "Nodemailer"] },
      { group: "Infrastructure", items: ["Vercel", "Render", "MongoDB Atlas"] },
    ],
    screens: [
      { kind: "wide", figure: { src: primexMembership, alt: "PrimeX membership page with four plan cards and a term selector.", caption: "Membership plans, priced by term." } },
      {
        kind: "pair",
        figures: [
          { src: primexArabic, alt: "PrimeX homepage in Arabic with a right-to-left layout.", caption: "The same homepage in Arabic, right to left." },
          { src: primexTrainer, alt: "A PrimeX trainer profile with specialities and weekly availability.", caption: "Trainer profiles with specialities and availability." },
        ],
      },
      {
        kind: "phones",
        caption: "On a phone: the homepage and the plan picker.",
        figures: [
          { src: primexMobile, alt: "PrimeX homepage on a phone.", caption: "Home" },
          { src: primexMobileMembership, alt: "PrimeX membership plans on a phone.", caption: "Membership" },
        ],
      },
    ],
    challenges: [
      { title: "Cross-site cookies in production", text: "Locally the site and API share localhost. Deployed, they sit on different domains and every request becomes cross-site — Lax cookies silently stopped being sent, so login appeared to work and everything after it failed. Cookies now switch to SameSite=None; Secure in production." },
      { title: "Images that pointed at a laptop", text: "Early data stored absolute localhost image URLs, which in production resolved to the visitor’s own machine. Images are now root-relative, and a script checks every path in the database against committed files before each deploy." },
      { title: "Selling before selling", text: "The gym wasn’t ready to take payments online on day one. Gating each capability separately let it launch with WhatsApp enquiries, without dead pages or a second codebase." },
    ],
    result: [
      "PrimeX is live as a bilingual showcase site, with the complete online join-and-book flow built and ready to switch on.",
      "Its foundations — authentication, payments, the admin area and the deployment setup — became the base I build new products on.",
    ],
  },
  {
    slug: "novacart",
    number: "02",
    title: "NovaCart",
    kind: "Full-stack e-commerce",
    year: "2026",
    summary:
      "A complete online store — catalogue, cart, Stripe checkout and an admin API — seeded with a real-sized catalogue.",
    role: "Full-stack development",
    scope: ["Frontend", "REST API", "Payments", "Email", "Deployment"],
    stack: ["Next.js", "NestJS", "Stripe"],
    links: {
      live: "https://novacart-acme-4d41.vercel.app",
      github: "https://github.com/mostafanabil11/E-commerce",
      health: "https://novacart-api-el8p.onrender.com/health",
    },
    shot: novaHome,
    phone: novaMobile,
    shotAlt: "NovaCart storefront: a grocery hero banner beside two promotional tiles, above a row of category tiles.",
    overview: [
      "NovaCart is a general-purpose online store built as two applications that share one contract: a NestJS and MongoDB REST API, and a Next.js storefront.",
      "It ships with a seed dataset — 56 products across 10 categories, 60 subcategories and 54 brands, with 332 reviews — so a fresh clone is a fully stocked shop rather than an empty template.",
    ],
    problem: [
      "Most portfolio stores stop at the product grid. The hard parts of commerce live elsewhere: prices the client can’t tamper with, stock that stays correct, payments confirmed by the provider instead of the browser, and accounts and emails that behave like a real shop’s.",
    ],
    solution: [
      "The API owns every number that matters. Carts are priced on the server with stock checks and coupons; orders reserve inventory when they’re placed and count a sale only once payment settles.",
      "Checkout hands off to Stripe, and the order is confirmed by a signature-verified webhook — idempotently, so a replayed event changes nothing.",
    ],
    features: [
      { title: "Catalogue", text: "Live search, category and brand filters, sorting by price, rating, newest and best-selling, with pagination." },
      { title: "Product pages", text: "Image galleries with thumbnails, ratings and related products." },
      { title: "Cart & wishlist", text: "Server-calculated totals, stock checks and coupon support." },
      { title: "Checkout", text: "Validated shipping details, then Stripe Checkout. Paymob is integrated on the API as well." },
      { title: "Accounts", text: "Sign-up, email verification that never blocks sign-in, and a three-step password reset." },
      { title: "Admin API", text: "Catalogue management with image upload, soft deletes with restore, audit trails, order status and refunds." },
    ],
    architecture: {
      text: "A Next.js 15 storefront on Vercel and a NestJS 11 API on Render with MongoDB. Redis caching is optional — the API keeps working when it isn’t there.",
      flow: webFlow("Storefront", "REST v1"),
      services: [
        { label: "Stripe", detail: "Checkout + signed webhooks" },
        { label: "Paymob", detail: "HMAC-SHA512 callbacks" },
        { label: "Brevo", detail: "EJS email templates" },
        { label: "Redis", detail: "Optional cache" },
      ],
      decisions: [
        { title: "Webhooks are the source of truth", text: "Stripe events are verified against the raw request body and Paymob callbacks with HMAC-SHA512 before anything changes. Settlement is idempotent." },
        { title: "Ratings stored, not computed", text: "Each product keeps its average rating and review count, recalculated on every review write, so listing pages never aggregate on read." },
        { title: "Nothing is really deleted", text: "Catalogue records are soft-deleted, can be restored, and keep a trail of who created, changed or removed them." },
        { title: "A cache that can disappear", text: "Redis speeds up hot reads when it’s available; when it isn’t, requests fall through to MongoDB instead of failing." },
      ],
    },
    stackDetail: [
      { group: "Frontend", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "NextAuth", "React Hook Form", "Zod", "Framer Motion"] },
      { group: "Backend", items: ["NestJS 11", "MongoDB & Mongoose", "JWT & bcrypt", "class-validator", "Multer", "ioredis", "Swagger"] },
      { group: "Services", items: ["Stripe", "Paymob", "Brevo"] },
      { group: "Infrastructure", items: ["Vercel", "Render", "MongoDB"] },
    ],
    screens: [
      { kind: "wide", figure: { src: novaProducts, alt: "NovaCart product listing with search and product cards.", caption: "The catalogue, with live search." } },
      { kind: "wide", figure: { src: novaProduct, alt: "NovaCart product page for a curved monitor with gallery and price.", caption: "Product page: gallery, rating and delivery details." } },
      {
        kind: "phones",
        caption: "The storefront on a phone.",
        figures: [
          { src: novaMobile, alt: "NovaCart homepage on a phone.", caption: "Home" },
          { src: novaMobileProducts, alt: "NovaCart product listing on a phone.", caption: "Products" },
        ],
      },
    ],
    challenges: [
      { title: "Trusting the right party", text: "A successful redirect back from Stripe proves nothing. Orders become paid only when a verified webhook says so, and duplicate deliveries are ignored." },
      { title: "Verification without friction", text: "A code is emailed at sign-up, but the account is usable immediately; a dismissible banner nudges instead of a wall that loses customers." },
      { title: "A store you can reproduce", text: "A versioned catalogue snapshot with local imagery rebuilds the whole shop from one command — the difference between a demo and a working product." },
    ],
    result: [
      "NovaCart works end to end: browse, add to cart, pay with Stripe in test mode and receive a confirmed order — with Swagger documentation for every endpoint.",
    ],
  },
  {
    slug: "fire-house",
    number: "03",
    title: "Fire House",
    kind: "Restaurant ordering",
    year: "2026",
    summary:
      "Direct online ordering for a restaurant: a customisable menu, guest checkout, card or cash on delivery, and order tracking.",
    role: "Design & full-stack development",
    scope: ["Interface design", "Frontend", "API & data model", "Payments", "Deployment"],
    stack: ["Next.js", "NestJS", "Paymob"],
    links: {
      live: "https://fire-house-wnhg.vercel.app",
      github: "https://github.com/mostafanabil11/fire-house",
      health: "https://restaurant-ordering-api-lnuo.onrender.com/health",
    },
    shot: fireCover,
    phone: fireMobile,
    shotAlt: "Fire House homepage: burgers and loaded fries under the headline “Big flavour. Your way.”",
    overview: [
      "Fire House is an ordering website for a burger and fried-chicken kitchen — the kind of restaurant that gives away a share of every order to delivery apps.",
      "Customers browse the menu, customise each dish, pay by card or cash on delivery and follow their order, without creating an account. The kitchen runs the menu, stock and orders from an admin area.",
    ],
    problem: [
      "A menu isn’t a product catalogue. The same burger can be ordered as a combo, loaded, with extra sauces or with a note for the kitchen — and every combination has its own price.",
      "Ordering had to stay quick on a phone, work for first-time guests, and never let the browser decide what a meal costs.",
    ],
    solution: [
      "I built menu items around variants and modifier groups — meal upgrades, add-ons and sauces — that the server resolves and prices. Each cart line is identified by a hash of the dish, its variant, its sorted options and its note, so identical meals merge and different ones stay separate.",
      "Checkout reserves stock and creates orders idempotently. Cards go through Paymob with HMAC-verified callbacks; cash on delivery is a first-class option, not a fallback.",
    ],
    features: [
      { title: "Customisable menu", text: "Categories, search, and dishes with variants, optional upgrades, add-ons and a note for the kitchen." },
      { title: "Guest checkout", text: "Order without an account; sign in only for saved addresses and history." },
      { title: "Card or cash", text: "Paymob card payments, or cash on delivery." },
      { title: "Order tracking", text: "Look up any order with its number and the email used at checkout." },
      { title: "Arabic & English", text: "A language switch across the whole storefront." },
      { title: "Kitchen admin", text: "Dashboard, menu and stock movements, orders, coupons, customers, reviews, settings and an audit log." },
    ],
    architecture: {
      text: "The same split as my other commerce builds — Next.js on Vercel, NestJS on Render, MongoDB Atlas — with a scheduler in the API that releases stock held by abandoned card payments every minute.",
      flow: webFlow("Storefront", "REST"),
      services: [
        { label: "Paymob", detail: "Card payments, HMAC callbacks" },
        { label: "Brevo", detail: "Order emails" },
        { label: "Google", detail: "OAuth sign-in" },
      ],
      decisions: [
        { title: "The server prices the meal", text: "The browser only sends identifiers. Prices, options and availability are re-read from the database on every cart change." },
        { title: "Deterministic cart lines", text: "A SHA-256 key over dish, variant, sorted modifiers and a normalised note decides whether two additions are the same line." },
        { title: "Idempotent orders", text: "Checkout carries an idempotency key, so a double tap or a retried request returns the existing order instead of creating a second one." },
        { title: "Stock that comes back", text: "Card checkouts reserve stock; a scheduled job releases reservations from abandoned payments — the reason the API runs on a long-lived server." },
      ],
    },
    stackDetail: [
      { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS v4", "shadcn/ui", "React Hook Form"] },
      { group: "Backend", items: ["NestJS 10", "MongoDB & Mongoose", "JWT with refresh rotation", "Google OAuth", "Zod", "Swagger", "Scheduled jobs"] },
      { group: "Services", items: ["Paymob", "Brevo"] },
      { group: "Infrastructure", items: ["Vercel", "Render", "MongoDB Atlas"] },
    ],
    screens: [
      { kind: "wide", figure: { src: fireMenu, alt: "Fire House menu with category tabs and dish cards.", caption: "The menu — four categories, 29 dishes, searchable." } },
      { kind: "wide", figure: { src: fireItem, alt: "Customising the Classic Beef Burger with meal upgrades and sauces.", caption: "Customising a dish; the total follows every choice." } },
      {
        kind: "phones",
        caption: "Most orders happen on a phone, so the phone came first.",
        figures: [
          { src: fireMobile, alt: "Fire House homepage on a phone.", caption: "Home" },
          { src: fireMobileMenu, alt: "Fire House menu on a phone.", caption: "Menu" },
        ],
      },
      { kind: "wide", figure: { src: fireTrack, alt: "Fire House order tracking form asking for order number and email.", caption: "Order tracking — no account required." } },
    ],
    challenges: [
      { title: "Customisation without chaos", text: "Letting people change everything about a dish multiplies the ways a price can go wrong. Resolving every option on the server, and validating each group’s rules there, kept the client simple and the totals exact." },
      { title: "Abandoned payments", text: "A customer who opened the card form and walked away was holding stock hostage. Time-boxed reservations, released by a scheduled job, fixed it." },
      { title: "Email on free hosting", text: "Render’s free tier blocks SMTP, so order emails go out through Brevo’s HTTP API in production." },
    ],
    result: [
      "Fire House is live with its full menu, guest checkout and order tracking.",
      "It reuses the commerce core I first built for Valiant, reshaped for food — the foundations were designed to be adapted, not rewritten.",
    ],
  },
  {
    slug: "valiant",
    number: "04",
    title: "Valiant",
    kind: "Fashion e-commerce",
    year: "2026",
    summary:
      "An online store for a monochrome clothing label — sizes and colours, sale pricing, card or cash checkout, and a full admin.",
    role: "Design & full-stack development",
    scope: ["Interface design", "Frontend", "API & data model", "Payments", "Deployment"],
    stack: ["Next.js", "NestJS", "Paymob"],
    links: {
      live: "https://valiant-seven.vercel.app",
      github: "https://github.com/mostafanabil11/Valiant-clothing-brand",
      health: "https://valiant-api-27hn.onrender.com/health",
    },
    shot: valiantHome,
    phone: valiantMobile,
    shotAlt: "Valiant homepage: the wordmark above a black-and-white photo of tailored clothes on a rail.",
    overview: [
      "Valiant is an online store for a menswear and womenswear label with a quiet, monochrome identity.",
      "It covers the whole commercial loop: a catalogue with sizes, colours and sale pricing; checkout by card or cash on delivery; order tracking; and an admin area for running the shop day to day.",
    ],
    problem: [
      "Fashion stores fail in the details — a size that’s sold out but still addable, a sale price that changes at checkout, an abandoned payment holding the last medium.",
      "The brand also needed its restraint carried through every page, down to the size selector, not just the homepage.",
    ],
    solution: [
      "I built a server-authoritative commerce core: the cart re-reads prices and stock on every change, checkout reserves inventory and creates orders idempotently, and Paymob payments are confirmed by HMAC-verified webhooks.",
      "On top of it, the storefront keeps to the brand’s black-and-white, editorial language — type, spacing and photography doing the work colour usually does.",
    ],
    features: [
      { title: "Catalogue", text: "Men’s and women’s collections, categories and subcategories, search, filters and sale pricing." },
      { title: "Product pages", text: "Size selection, colours linked across products, and a size guide." },
      { title: "Checkout", text: "Paymob card payments or cash on delivery, with coupons." },
      { title: "Customer accounts", text: "OTP-verified sign-up, Google sign-in, saved addresses, order history and a wishlist." },
      { title: "Retention", text: "Reviews, newsletter sign-up and back-in-stock notifications." },
      { title: "Admin", text: "Dashboard, products and stock movements, orders, customers, coupons, reviews, settings and an audit log." },
    ],
    architecture: {
      text: "Next.js 16 on Vercel, a NestJS API on Render and MongoDB Atlas. The server validates its environment on boot and refuses to start with a broken configuration.",
      flow: webFlow("Storefront", "REST"),
      services: [
        { label: "Paymob", detail: "Card payments, HMAC callbacks" },
        { label: "Email", detail: "OTP & order mail" },
        { label: "Google", detail: "OAuth sign-in" },
      ],
      decisions: [
        { title: "Never trust the client", text: "The browser sends product and variant identifiers, never prices. Totals are always calculated on the server." },
        { title: "Reservations with expiry", text: "Card checkouts hold stock until payment settles or the hold expires; a scheduled job returns abandoned stock to the shelf." },
        { title: "Webhook-confirmed payments", text: "Orders are marked paid only by Paymob callbacks that pass HMAC verification." },
        { title: "Fail at boot, not at checkout", text: "Configuration is validated on startup. Card checkout stays off until every Paymob key is present, instead of failing in front of a customer." },
      ],
    },
    stackDetail: [
      { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "TanStack Query", "Zustand", "Tailwind CSS v4", "shadcn/ui", "React Hook Form"] },
      { group: "Backend", items: ["NestJS 10", "MongoDB & Mongoose", "JWT with refresh rotation", "Google OAuth", "Zod", "Swagger"] },
      { group: "Services", items: ["Paymob", "Nodemailer"] },
      { group: "Infrastructure", items: ["Vercel", "Render", "MongoDB Atlas"] },
    ],
    screens: [
      { kind: "wide", figure: { src: valiantProduct, alt: "Valiant product page for a navy knitted polo with size options.", caption: "Product page: sizes, linked colours and a size guide." } },
      {
        kind: "pair",
        figures: [
          { src: valiantProducts, alt: "Valiant product listing with filters.", caption: "All products, with filters and sorting." },
          { src: valiantSale, alt: "Valiant sale page with discounted items.", caption: "Sale pricing carried through to checkout." },
        ],
      },
      {
        kind: "phones",
        caption: "The store on a phone.",
        figures: [
          { src: valiantMobile, alt: "Valiant homepage on a phone.", caption: "Home" },
          { src: valiantMobileProducts, alt: "Valiant product listing on a phone.", caption: "Products" },
        ],
      },
    ],
    challenges: [
      { title: "Stock under contention", text: "Two customers buying the last item shouldn’t both succeed. Reserving at checkout and updating stock atomically makes the second one fail cleanly." },
      { title: "Two hosts, one session", text: "With the site and API on separate domains, auth cookies had to become SameSite=None; Secure — otherwise login looked successful and every following request was signed out." },
      { title: "Designing restraint", text: "A monochrome brand leaves nowhere to hide. Spacing, type and photography had to carry the hierarchy colour normally would." },
    ],
    result: [
      "Valiant is live with a full catalogue, working checkout and an admin area.",
      "Its commerce core went on to power Fire House and the PrimeX join flow.",
    ],
  },
  {
    slug: "kova",
    number: "05",
    title: "Kova",
    kind: "Custom Shopify theme",
    year: "2026",
    summary:
      "A Shopify storefront for a Cairo streetwear label, built from custom, merchant-editable sections on top of Dawn.",
    role: "Design & Shopify development",
    scope: ["Art direction", "Design tokens", "Theme development", "Store setup"],
    stack: ["Shopify", "Liquid", "CSS"],
    links: {
      note: "The store is in private preview behind Shopify’s password page. A walkthrough is available on request.",
    },
    shot: kovaCover,
    photo: true,
    shotAlt: "Kova campaign image: two models in dark tailoring inside a concrete building.",
    overview: [
      "Kova is a Shopify store for a contemporary streetwear label based in Cairo, priced in Egyptian pounds.",
      "Instead of a heavily modified off-the-shelf theme, the brand’s pages are built from custom sections I wrote for Dawn — a hero, curated collections and a brand statement — that the owner can edit without touching code.",
    ],
    problem: [
      "Shopify makes it easy to open a store and hard to make it look like anyone’s but the theme’s. The label wanted a quieter, more considered storefront than a template allows — and the owner still needed to run it alone after launch.",
    ],
    solution: [
      "I left Dawn’s core files untouched and built the brand layer beside them: new sections, a snippet for motion and cart feedback, and a stylesheet driven by design tokens defined before any Liquid was written.",
      "Every section exposes its content through the theme editor, so headlines, images, links and featured collections are the merchant’s to change.",
    ],
    features: [
      { title: "Custom hero", text: "Art-directed image, eyebrow, headline, introduction and two calls to action — all editable." },
      { title: "Curated collections", text: "Two featured collections with custom imagery, plus a category strip of up to four blocks." },
      { title: "Brand statement", text: "An editorial section for the label’s voice." },
      { title: "Motion & feedback", text: "Entrance animations, a smoother cart drawer and an add-to-cart confirmation, all switched off for reduced-motion preferences." },
    ],
    architecture: {
      text: "Dawn is the base. Everything brand-specific lives in new sections, snippets and a token-driven stylesheet, so updating the theme never overwrites the design.",
      flow: [
        { label: "Theme editor", detail: "Merchant edits" },
        { label: "Custom sections", detail: "Liquid + schema" },
        { label: "Brand layer", detail: "Tokens · CSS · motion" },
        { label: "Dawn", detail: "Untouched core" },
      ],
      decisions: [
        { title: "Core files untouched", text: "Custom work lives in its own files, so the base theme can be updated safely." },
        { title: "Editable by default", text: "Content is schema settings, not hard-coded markup — the owner doesn’t need a developer for a new campaign." },
        { title: "Motion that respects people", text: "Animations run only when prefers-reduced-motion allows them." },
        { title: "Tokens before templates", text: "Colour, type and spacing were designed first, then translated into CSS variables the sections share." },
      ],
    },
    stackDetail: [
      { group: "Platform", items: ["Shopify", "Dawn"] },
      { group: "Code", items: ["Liquid", "CSS", "JavaScript", "Section schema"] },
      { group: "Design", items: ["Design tokens", "Art direction", "Responsive imagery"] },
      { group: "Commerce", items: ["EGP market", "Collections", "Cart drawer"] },
    ],
    screens: [
      {
        kind: "pair",
        figures: [
          { src: kovaMen, alt: "Kova men’s collection image.", caption: "Men’s collection feature." },
          { src: kovaWomen, alt: "Kova women’s collection image.", caption: "Women’s collection feature." },
        ],
      },
      { kind: "wide", figure: { src: kovaEternals, alt: "Kova editorial campaign image.", caption: "Campaign imagery for the brand-statement section." } },
    ],
    challenges: [
      { title: "Brand versus template", text: "The hardest part of Shopify work is resisting the theme’s defaults. Building sections from scratch, rather than restyling existing ones, kept the design intentional." },
      { title: "Handing over control", text: "A store its owner can’t edit isn’t finished. Every piece of copy and imagery had to live in the editor, with sensible defaults." },
      { title: "Reviewing behind a password", text: "Development stores can’t remove the password page, so reviews run through theme preview links — which is why there’s no public link here yet." },
    ],
    result: [
      "The theme is complete and running on the store in private preview. It goes public when the password page comes down.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
