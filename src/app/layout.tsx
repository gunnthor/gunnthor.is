import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

/* Self-hosted variable WOFF2 files, so builds and visitors never request
   Google Fonts. Subset to Latin-1 plus typographic punctuation (þ, ð, æ, ö
   and the accented vowels included) and limited to weights 300 to 500.
   There is deliberately no italic: it put 127 KB on the critical path for two
   half-headlines, and muted roman does the same job. */
const newsreader = localFont({
  src: "./_assets/Newsreader-Latin.woff2",
  weight: "300 500",
  style: "normal",
  display: "swap",
  variable: "--font-newsreader",
  adjustFontFallback: "Times New Roman",
});

const geistMono = localFont({
  src: "./_assets/GeistMono-Latin.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-geist-mono",
  adjustFontFallback: false,
});

const title = `${site.name} · Maps and tools from Iceland's public data`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.metaDescription,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.metaDescription,
    url: site.url,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title, description: site.metaDescription },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f0e9",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[var(--ink)] focus:px-4 focus:py-3 focus:font-mono focus:text-sm focus:text-[var(--paper)]"
        >
          Skip to content
        </a>
        <div className="flex min-h-dvh flex-col">
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
