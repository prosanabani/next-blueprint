import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/lib/seo";
import { CircleChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

/**
 * Home page. SSG by default (no dynamic data).
 * Metadata is built per-locale for SEO (title, description, canonical).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  return buildPageMetadata({
    description: t("metaDescription"),
    locale,
    path: locale,
    title: t("metaTitle"),
  });
}

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className="mx-auto px-4 py-10">
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto text-lg text-muted-foreground">{t("tagline")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/destinations">
              <CircleChevronRight aria-hidden className="size-5" />
              {t("ctaDestinations")}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">{t("about")}</Link>
          </Button>
        </div>
      </section>

      {/* Short intro */}
      <section
        aria-labelledby="intro-heading"
        className="rounded-lg border border-border bg-card p-6 text-muted-foreground"
      >
        <h2
          className="mb-2 text-xl font-semibold text-foreground"
          id="intro-heading"
        >
          {t("introHeading")}
        </h2>
        <p>{t("introBody")}</p>
      </section>
    </div>
  );
}
