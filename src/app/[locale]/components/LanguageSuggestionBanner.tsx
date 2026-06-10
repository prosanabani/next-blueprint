"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { supportedLocales, type Locale } from "@/i18n/shared";
import { Globe, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";

const DISMISS_KEY = "locale-banner-dismissed";

function getBrowserPreferredLocale(): Locale | undefined {
  if (typeof navigator === "undefined") {
    return undefined;
  }

  for (const tag of navigator.languages) {
    const normalized = tag.toLowerCase();
    const base = normalized.split("-")[0] ?? normalized;

    const exact = supportedLocales.find(
      (locale) => locale.toLowerCase() === normalized,
    );
    if (exact) {
      return exact;
    }

    const partial = supportedLocales.find(
      (locale) => locale.toLowerCase() === base,
    );
    if (partial) {
      return partial;
    }
  }

  return undefined;
}

export default function LanguageSuggestionBanner() {
  const t = useTranslations("LanguageBanner");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);
  const [suggestedLocale, setSuggestedLocale] = useState<Locale | null>(null);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (dismissed === "true") {
      return;
    }

    const preferred = getBrowserPreferredLocale();
    if (preferred && preferred !== locale) {
      setSuggestedLocale(preferred);
      setIsVisible(true);
    }
  }, [locale]);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setIsVisible(false);
  }

  function switchLanguage() {
    if (!suggestedLocale) {
      return;
    }

    startTransition(() => {
      router.replace({ pathname }, { locale: suggestedLocale });
      dismiss();
    });
  }

  if (!isVisible || !suggestedLocale) {
    return null;
  }

  return (
    <div
      className="border-b border-border bg-muted/60 px-4 py-2"
      role="region"
      aria-label={t("ariaLabel")}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm text-foreground">
          <Globe aria-hidden className="size-4 shrink-0" />
          {t("message", { language: t(`languages.${suggestedLocale}`) })}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Button disabled={isPending} onClick={switchLanguage} size="sm">
            {t("switch")}
          </Button>
          <Button
            aria-label={t("dismiss")}
            disabled={isPending}
            onClick={dismiss}
            size="icon"
            variant="ghost"
          >
            <X aria-hidden className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
