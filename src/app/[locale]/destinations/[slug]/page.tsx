import { getDestinationBySlug } from "@/data/destinations";
import { buildPageMetadata, buildPlaceJsonLd, canonicalUrl } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function DestinationPage({
  params,
}: {
  readonly params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const t = await getTranslations("DestinationsPage");
  const name = t(destination.nameKey);
  const description = t(destination.descriptionKey);
  const url = canonicalUrl(`${locale}/destinations/${slug}`);
  const jsonLd = buildPlaceJsonLd({
    description,
    image: destination.imagePath
      ? canonicalUrl(destination.imagePath)
      : undefined,
    name,
    url,
  });

  return (
    <div className="mx-auto px-4 py-10">
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <article>
        <h1 className="mb-4 text-3xl font-bold text-foreground">{name}</h1>
        <p className="text-muted-foreground">{description}</p>
        {/* Placeholder for future rich content (images, sections, etc.) */}
      </article>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return { title: "Not found" };

  const t = await getTranslations({ locale, namespace: "DestinationsPage" });
  const name = t(destination.nameKey);
  const description = t(destination.descriptionKey);

  return buildPageMetadata({
    description,
    imagePath: destination.imagePath,
    locale,
    path: `${locale}/destinations/${slug}`,
    title: name,
  });
}

/**
 * Single destination page. SSG: generateStaticParams pre-renders all locale+slug combos at build time.
 * generateMetadata and JSON-LD (Place schema) for SEO.
 */
export async function generateStaticParams() {
  const { routing } = await import("@/i18n/routing");
  const { destinationSlugs } = await import("@/data/destinations");
  const parameters: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const slug of destinationSlugs) {
      parameters.push({ locale, slug });
    }
  }

  return parameters;
}
