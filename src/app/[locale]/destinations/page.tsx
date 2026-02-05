import { destinations } from "@/data/destinations";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function DestinationsPage() {
  const t = await getTranslations("DestinationsPage");

  return (
    <div className="mx-auto px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-foreground">{t("title")}</h1>
      <p className="mb-8 text-muted-foreground">{t("subtitle")}</p>

      <ul className="grid gap-4 sm:grid-cols-2" role="list">
        {destinations.map((destination) => (
          <li key={destination.slug}>
            <Link
              className="block rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent hover:text-accent-foreground"
              href={`/destinations/${destination.slug}`}
            >
              <span className="flex items-center gap-2 font-semibold text-foreground">
                <MapPin aria-hidden className="size-4 shrink-0 text-primary" />
                {/* Use translation key for name; fallback to slug for simplicity if key missing */}
                {t(destination.nameKey)}
              </span>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {t(destination.descriptionKey)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Destinations list page. SSG (data is static at build time).
 * generateMetadata for SEO; no generateStaticParams needed (locale is handled by parent).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DestinationsPage" });
  return buildPageMetadata({
    description: t("metaDescription"),
    locale,
    path: `${locale}/destinations`,
    title: t("metaTitle"),
  });
}
