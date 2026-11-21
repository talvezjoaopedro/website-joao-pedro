/**
 * Shared site facts. Metadata, JSON-LD, robots, sitemap and the manifest all
 * read from here, so none of them can drift apart from the others.
 */

/** Production domain. Share previews, canonical and sitemap need absolute URLs. */
export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://talvezjoaopedro.com";

export const name = "João Pedro Magalhães";
export const handle = "talvezjoaopedro";
export const jobTitle = "Product Designer & Design Engineer";
export const title = `${name} — ${jobTitle}`;
export const description =
    "Product Designer & Design Engineer in Portugal. UI/UX design, high-fidelity prototypes, design systems and branding, from Figma to code.";

export const location = { locality: "Barcelos", country: "PT" };

/** Date the page content last changed. Feeds the sitemap and ProfilePage. */
export const lastModified = "2026-11-21";

/**
 * Profile pages that identify the same person, for schema.org sameAs. Only
 * pages that unambiguously are this person belong here: a shared design file
 * is not a profile, so the Figma portfolio link is deliberately absent.
 */
export const profiles = [
    "https://github.com/talvezjoaopedro",
    "https://www.linkedin.com/in/talvezjoaopedro/",
    "https://layers.to/talvezjoaopedro",
];

export const knowsAbout = [
    "Product Design",
    "UI/UX Design",
    "Prototyping",
    "Design Systems",
    "Branding",
    "Frontend Development",
    "React",
    "OutSystems",
    "Figma",
    "Accessibility (WCAG)",
];
