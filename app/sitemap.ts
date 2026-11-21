import type { MetadataRoute } from "next";
import { lastModified, siteUrl } from "@/lib/site";

const sitemap = (): MetadataRoute.Sitemap => [
    {
        url: siteUrl,
        lastModified: new Date(lastModified),
        changeFrequency: "monthly",
        priority: 1,
    },
];

export default sitemap;
