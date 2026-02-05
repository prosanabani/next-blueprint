/**
 * Sitemap for SEO. Generated at build time (static).
 * Lists all locale and locale+path combinations so crawlers can discover every page.
 * Served at /sitemap.xml.
 */
import { siteUrl } from "@/config/site";
import { destinationSlugs } from "@/data/destinations";
import { routing } from "@/i18n/routing";
import { type MetadataRoute } from "next";

const changeFrequency = "weekly" as const;
const priority = 0.8;

export default function sitemap(): MetadataRoute.Sitemap {
  const basePaths = ["", "about", "destinations"];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of basePaths) {
      const url = path ? `${siteUrl}/${locale}/${path}` : `${siteUrl}/${locale}`;
      entries.push({
        changeFrequency,
        lastModified: new Date(),
        priority: path ? priority : 1,
        url,
      });
    }

    for (const slug of destinationSlugs) {
      entries.push({
        changeFrequency,
        lastModified: new Date(),
        priority: 0.7,
        url: `${siteUrl}/${locale}/destinations/${slug}`,
      });
    }
  }

  return entries;
}
