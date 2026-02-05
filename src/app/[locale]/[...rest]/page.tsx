import { notFound } from "next/navigation";

/**
 * Catch-all route so unknown paths under [locale] (e.g. /en/unknown)
 * trigger the localized not-found.tsx instead of the default Next.js 404.
 * See: https://next-intl.dev/docs/environments/error-files#catching-unknown-routes
 */
export default function CatchAllPage() {
  notFound();
}
