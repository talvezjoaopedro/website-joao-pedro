import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "/styles/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const title = "João Pedro / Designer & Developer";
const description = "by @talvezjoaopedro";

// Absolute URLs are required in share previews. On Vercel this is the
// production domain (the custom one when there is one); the env var is the
// escape hatch for anywhere else.
const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "http://localhost:3000");

// The share image is app/opengraph-image.png: Next reads its size and type
// from the file itself and emits the og:image tags, with the text in
// app/opengraph-image.alt.txt as the alt.
export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
        title,
        description,
        siteName: "João Pedro",
        url: "/",
        type: "website",
    },
    twitter: {
        // Without this X falls back to the small square card.
        card: "summary_large_image",
        title,
        description,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
