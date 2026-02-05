/**
 * SEO utilities: metadata builders and JSON-LD helpers.
 * Use with Next.js generateMetadata and layout/page exports.
 */

import {
  defaultOgImagePath,
  siteName,
  siteTagline,
  siteUrl,
} from "@/config/site";
import { type Metadata } from "next";

/**
 * Input for building page metadata.
 */
export type PageMetaInput = {
  /**
   * Meta description.
   */
  description: string;
  /**
   * Optional OG image path (relative to siteUrl).
   */
  imagePath?: string;
  /**
   * Optional locale for alternates.
   */
  locale?: string;
  /**
   * Optional noindex for this page.
   */
  noIndex?: boolean;
  /**
   * Optional path (no leading slash) for canonical and OG URL.
   */
  path?: string;
  /**
   * Page title (can include site name via titleTemplate in layout).
   */
  title: string;
};

/**
 * Build Next.js Metadata for a page (title, description, openGraph, twitter, alternates).
 * Use in generateMetadata() for SSG/SSR pages.
 */
export function buildPageMetadata(input: PageMetaInput): Metadata {
  const { description, imagePath, locale, noIndex, path = "", title } = input;
  const canonical = path ? canonicalUrl(path) : undefined;
  const image = ogImageUrl(imagePath);

  return {
    description,
    title,
    ...(noIndex && { robots: { follow: false, index: false } }),
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      description,
      images: [{ alt: title, height: 630, url: image, width: 1_200 }],
      locale: locale ?? undefined,
      siteName,
      title,
      type: "website",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
      title,
    },
  };
}

/**
 * JSON-LD: Place schema for destination pages.
 */
export function buildPlaceJsonLd(parameters: {
  description: string;
  image?: string;
  name: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    description: parameters.description,
    name: parameters.name,
    url: parameters.url,
    ...(parameters.image && { image: parameters.image }),
  };
}

/**
 * JSON-LD: WebPage schema for a single page.
 */
export function buildWebPageJsonLd(parameters: {
  description: string;
  locale?: string;
  name: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    description: parameters.description,
    inLanguage: parameters.locale,
    name: parameters.name,
    url: parameters.url,
  };
}

/**
 * JSON-LD: WebSite schema for the homepage (optional).
 * Renders as a script tag with type="application/ld+json".
 */
export function buildWebSiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: siteTagline,
    inLanguage: locale,
    name: siteName,
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=search_term_string",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/${locale}/search?q={search_term_string}`,
      },
    },
    url: canonicalUrl(locale),
  };
}

/**
 * Build canonical URL for a path (e.g. "en/about" or "ar/destinations/penang").
 * Use for Metadata.alternates.canonical and JSON-LD.
 */
export function canonicalUrl(path = ""): string {
  if (path.startsWith("http")) return path;
  // eslint-disable-next-line sonarjs/slow-regex, sonarjs/anchor-precedence
  const normalized = path.replace(/^\/+|\/+$/gu, "");
  return normalized ? `${siteUrl}/${normalized}` : siteUrl;
}

/**
 * Build Open Graph image URL (absolute).
 */
export function ogImageUrl(imagePath?: string): string {
  const path = imagePath ?? defaultOgImagePath;
  return path.startsWith("http")
    ? path
    : `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}
