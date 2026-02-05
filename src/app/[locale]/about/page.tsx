import { buildPageMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  return (
    <div className="mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-foreground">{t("title")}</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-muted-foreground">{t("body1")}</p>
        <p className="text-muted-foreground">{t("body2")}</p>
      </div>
    </div>
  );
}

/**
 * About page. Static (SSG); no dynamic params.
 * generateMetadata provides locale-specific title/description for SEO.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return buildPageMetadata({
    description: t("metaDescription"),
    locale,
    path: `${locale}/about`,
    title: t("metaTitle"),
  });
}
