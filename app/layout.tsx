import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "/styles/globals.css";
import {
    description,
    handle,
    jobTitle,
    knowsAbout,
    lastModified,
    location,
    name,
    profiles,
    siteUrl,
    title,
} from "@/lib/site";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// The share image is app/opengraph-image.png: Next reads its size and type
// from the file itself and emits the og:image tags, with the text in
// app/opengraph-image.alt.txt as the alt.
export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    // Keeps the .vercel.app deployment domain and any ?utm_ variant from being
    // indexed as separate copies of this page.
    alternates: { canonical: "/" },
    openGraph: {
        title,
        description,
        siteName: name,
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

// One @graph with stable @id values, so Person, WebSite and ProfilePage are
// read as three facets of the same entity instead of three unrelated things.
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": `${siteUrl}/#person`,
            name,
            alternateName: handle,
            jobTitle,
            description,
            url: siteUrl,
            image: `${siteUrl}/avatar.webp`,
            address: {
                "@type": "PostalAddress",
                addressLocality: location.locality,
                addressCountry: location.country,
            },
            knowsAbout,
            sameAs: profiles,
        },
        {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            url: siteUrl,
            name: title,
            description,
            inLanguage: "en",
            publisher: { "@id": `${siteUrl}/#person` },
        },
        {
            "@type": "ProfilePage",
            "@id": `${siteUrl}/#profile-page`,
            url: siteUrl,
            name: title,
            isPartOf: { "@id": `${siteUrl}/#website` },
            mainEntity: { "@id": `${siteUrl}/#person` },
            dateModified: lastModified,
            inLanguage: "en",
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
            </body>
        </html>
    );
}
