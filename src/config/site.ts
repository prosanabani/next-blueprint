/**
 * Site-wide configuration used for SEO, metadata, sitemap, and shared copy.
 * Centralize here so metadata and Open Graph stay consistent across the app.
 */

import { type Locale } from "@/i18n/config";

/**
 * Base URL of the site (no trailing slash). Use env in production.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/**
 * Supported locales; driven by NEXT_PUBLIC_LOCALES.
 */

export type SiteLocale = Locale;

/**
 * Default locale (no URL prefix); driven by NEXT_PUBLIC_DEFAULT_LOCALE.
 */

/**
 * Site name for titles and branding.
 */
export const siteName = "Starter Template";

/**
 * Short tagline used in default description and Open Graph.
 */
export const siteTagline =
  "A Next.js starter with SSG, SEO, and i18n — ready to customize.";

/**
 * Default OG image path (relative to siteUrl).
 */
export const defaultOgImagePath = "/og-default.png";

/**
 * Social links (optional; used for JSON-LD and footer).
 */
export const socialLinks = {
  // twitter: "https://twitter.com/...",
  // facebook: "https://facebook.com/...",
} as const;

export { defaultLocale, supportedLocales as siteLocales } from "@/i18n/config";
