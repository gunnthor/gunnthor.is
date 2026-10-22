import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Next merges metadata shallowly, so a page that sets `openGraph` replaces the
 * layout's entire object. Every page builds its metadata here so siteName,
 * locale, Twitter tags and the share image are never silently dropped.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = `${title} · ${site.name}`;
  const images = [{ url: image, width: 1200, height: 630, alt: fullTitle }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en", title: fullTitle, description, url: `${site.url}${path}`, images },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
