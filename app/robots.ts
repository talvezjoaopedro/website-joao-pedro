import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * Answering crawlers, AI assistants included: being quotable in an answer is
 * as valuable here as ranking. Google-Extended only governs Gemini and AI
 * answers, never regular Search ranking.
 */
const assistants = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Google-Extended",
];

const robots = (): MetadataRoute.Robots => ({
    rules: [
        { userAgent: "*", allow: "/" },
        ...assistants.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
