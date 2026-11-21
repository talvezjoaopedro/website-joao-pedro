import type { MetadataRoute } from "next";
import { description, name, title } from "@/lib/site";

const manifest = (): MetadataRoute.Manifest => ({
    name: title,
    short_name: name,
    description,
    start_url: "/",
    display: "standalone",
    background_color: "#457054",
    theme_color: "#457054",
    // Only the .ico exists today. Proper 192 and 512 PNGs need an export from
    // the source file; see the note in the handover.
    icons: [
        {
            src: "/favicon.ico",
            sizes: "16x16 32x32",
            type: "image/x-icon",
        },
    ],
});

export default manifest;
