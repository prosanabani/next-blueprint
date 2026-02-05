import { GoBackButton } from "./components/GoBackButton";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Compass, Home, MapPin } from "lucide-react";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound.seo");
  return {
    description: t("description"),
    openGraph: {
      description: t("description"),
      title: t("title"),
      type: "website",
    },
    robots: {
      follow: true,
      index: false,
    },
    title: t("title"),
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className=" flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full">
        <div className="rounded-xl border border-border bg-card p-8 shadow-lg sm:p-10">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin aria-hidden className="h-8 w-8" />
            </div>
          </div>
          <p className="text-center text-6xl font-bold tabular-nums text-muted-foreground/50 sm:text-7xl">
            404
          </p>
          <h1 className="mt-4 text-center text-xl font-semibold text-foreground sm:text-2xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-center text-sm text-muted-foreground sm:text-base">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="w-full sm:w-auto" size="lg">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                {t("goToHomepage")}
              </Link>
            </Button>
            <div className="w-full sm:w-auto">
              <GoBackButton label={t("goBack")} />
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t("tryTheseInstead")}
        </p>
        <nav
          aria-label={t("quickLinksAriaLabel")}
          className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm"
        >
          <Link
            className="inline-flex items-center gap-1.5 text-primary hover:underline"
            href="/about"
          >
            <Compass className="h-4 w-4" />
            {t("about")}
          </Link>
          <Link
            className="inline-flex items-center gap-1.5 text-primary hover:underline"
            href="/destinations"
          >
            {t("destinations")}
          </Link>
        </nav>
      </div>
    </div>
  );
}
