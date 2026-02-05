"use client";

/**
 * Main navigation. Uses i18n Link so locale is preserved.
 * Renders as a simple horizontal nav; style with Tailwind as needed.
 */
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Nav() {
  const t = useTranslations("Nav");

  return (
    <nav
      aria-label={t("ariaLabel")}
      className="border-b border-border bg-card px-4 py-3"
    >
      <div className="mx-auto flex items-center justify-between gap-4">
        <Link
          className="text-lg font-semibold text-foreground hover:text-primary"
          href="/"
        >
          {t("home")}
        </Link>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/about"
            >
              {t("about")}
            </Link>
          </li>
          <li>
            <Link
              className="text-muted-foreground hover:text-foreground"
              href="/destinations"
            >
              {t("destinations")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
