"use client";

import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { defaultLocale } from "@/i18n/config";
import {
  getLocaleFromPathname,
  isRtlLocale,
  localizedPath,
  readLocaleFromDocumentCookie,
} from "@/i18n/shared";
import { getGlobalErrorMessages } from "@/lib/error-messages";
import { Home, RefreshCw, ServerCrash } from "lucide-react";
import { useEffect, useState } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  const [locale, setLocale] = useState<string>(defaultLocale);

  useEffect(() => {
    const nextLocale = getLocaleFromPathname(
      window.location.pathname,
      readLocaleFromDocumentCookie(),
    );
    setLocale(nextLocale);
    const root = document.documentElement;
    root.lang = nextLocale;
    root.dir = isRtlLocale(nextLocale) ? "rtl" : "ltr";
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  const t = getGlobalErrorMessages(locale);
  const homeHref = localizedPath(locale);

  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="w-full max-w-lg">
            <div className="rounded-xl border border-border bg-card p-8 shadow-lg sm:p-10">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <ServerCrash
                    aria-hidden
                    className="h-8 w-8 text-destructive"
                  />
                </div>
              </div>
              <p className="text-center text-6xl font-bold tabular-nums text-muted-foreground/50 sm:text-7xl">
                500
              </p>
              <h1 className="mt-4 text-center text-xl font-semibold text-foreground sm:text-2xl">
                {t.title}
              </h1>
              <p className="mt-3 text-center text-sm text-muted-foreground sm:text-base">
                {t.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => reset()}
                  size="lg"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t.tryAgain}
                </Button>
                <Button
                  asChild
                  className="w-full sm:w-auto"
                  size="lg"
                  variant="outline"
                >
                  <a href={homeHref}>
                    <Home className="mr-2 h-4 w-4" />
                    {t.goToHomepage}
                  </a>
                </Button>
              </div>

              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>{t.contactSupport}</p>
                <p className="mt-2">
                  {t.errorId}: {error.digest ?? "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
