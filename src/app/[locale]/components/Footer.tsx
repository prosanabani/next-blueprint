"use client";

import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { ModeToggle } from "./ModeToggle";
/**
 * Site footer: copyright, optional links, theme/locale toggles.
 */
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-border bg-muted/30 px-4 py-6"
      role="contentinfo"
    >
      <div className="mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} {t("copyright")}
        </p>
        <div className="flex items-center gap-4">
          <Link
            className="text-sm text-muted-foreground hover:text-foreground"
            href="/about"
          >
            {t("about")}
          </Link>
          <Link
            className="text-sm text-muted-foreground hover:text-foreground"
            href="/destinations"
          >
            {t("destinations")}
          </Link>
          <ModeToggle />
          <LocaleSwitcherSelect />
        </div>
      </div>
    </footer>
  );
}
