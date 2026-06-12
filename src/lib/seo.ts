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
import { localizedPath, supportedLocales } from "@/i18n/shared";
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
   * Locale for canonical URL and alternates.
   */
  locale: string;
  /**
   * Optional noindex for this page.
   */
  noIndex?: boolean;
  /**
   * Path without locale prefix (e.g. "" for home, "blog/my-post").
   */
  path?: string;
  /**
   * Page title (can include site name via titleTemplate in layout).
   */
  title: string;
};

/**
 * Build absolute URL for a locale-aware path.
 */
export function buildLocalizedUrl(path: string, locale: string): string {
  const localized = localizedPath(path, locale);
  return localized === "/" ? siteUrl : `${siteUrl}${localized}`;
}

/**
 * Build hreflang alternates for all supported locales.
 */
export function buildLanguageAlternates(path = ""): Record<string, string> {
  return Object.fromEntries(
    supportedLocales.map((locale) => [locale, buildLocalizedUrl(path, locale)]),
  );
}

/**
 * Build Next.js Metadata for a page (title, description, openGraph, twitter, alternates).
 * Use in generateMetadata() for SSG/SSR pages.
 */
export function buildPageMetadata(input: PageMetaInput): Metadata {
  const { description, imagePath, locale, noIndex, path = "", title } = input;
  const canonical = buildLocalizedUrl(path, locale);
  const image = ogImageUrl(imagePath);

  return {
    description,
    title,
    ...(noIndex && { robots: { follow: false, index: false } }),
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      description,
      images: [{ alt: title, height: 630, url: image, width: 1_200 }],
      locale: locale === "ar" ? "ar_SA" : "en_US",
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
        urlTemplate: `${buildLocalizedUrl("search", locale)}?q={search_term_string}`,
      },
    },
    url: buildLocalizedUrl("", locale),
  };
}

/**
 * @deprecated Use buildLocalizedUrl(path, locale) instead.
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
