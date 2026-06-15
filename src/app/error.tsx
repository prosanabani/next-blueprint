"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { defaultLocale } from "@/i18n/config";
import {
  extractLocaleCookieValue,
  getLocaleFromPathname,
  localizedPath,
} from "@/i18n/shared";
import { getErrorMessages } from "@/lib/error-messages";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Error({ reset }: { readonly reset: () => void }) {
  const [locale, setLocale] = useState<string>(defaultLocale);

  useEffect(() => {
    const path = window.location.pathname;
    setLocale(
      getLocaleFromPathname(path, extractLocaleCookieValue(document.cookie)),
    );
  }, []);

  const t = getErrorMessages(locale);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-lg">
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center text-center pt-8 pb-0">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle
                  aria-hidden
                  className="h-8 w-8 text-destructive"
                />
              </div>
            </div>
            <CardTitle className="text-xl font-semibold text-foreground sm:text-2xl">
              {t.title}
            </CardTitle>
            <CardDescription className="mt-3 text-sm text-muted-foreground sm:text-base">
              {t.description}
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-center p-6 pt-4">
            <Button onClick={reset} size="lg">
              <RefreshCw className="me-2 h-4 w-4" />
              {t.tryAgain}
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={localizedPath(locale)}>
                <Home className="me-2 h-4 w-4" />
                {t.goToHomepage}
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
