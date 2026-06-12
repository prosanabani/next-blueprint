/**
 * Sitemap for SEO. Generated at build time (static).
 * Lists all locale and locale+path combinations so crawlers can discover every page.
 * Served at /sitemap.xml.
 */
import { routing } from "@/i18n/routing";
import { buildLocalizedUrl } from "@/lib/seo";
import { type MetadataRoute } from "next";

const changeFrequency = "weekly" as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    changeFrequency,
    lastModified: new Date(),
    priority: 1,
    url: buildLocalizedUrl("", locale),
  }));
}
