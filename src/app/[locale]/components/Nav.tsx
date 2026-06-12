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
      <div className="mx-auto">
        <Link
          className="text-lg font-semibold text-foreground hover:text-primary"
          href="/"
        >
          {t("home")}
        </Link>
      </div>
    </nav>
  );
}
