/**
 * robots.txt for SEO. Allows all crawlers on /; disallows API and internals; points to sitemap.
 * Served at /robots.txt.
 */
import { siteUrl } from "@/config/site";
import { type MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: ["/api/", "/_next/", "/trpc/"],
      userAgent: "*",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
