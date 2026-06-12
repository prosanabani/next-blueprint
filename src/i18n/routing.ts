import { defaultLocale, LOCALE_COOKIE, supportedLocales } from "./config";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  defaultLocale,
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
    name: LOCALE_COOKIE,
    path: "/",
  },
  // URL dictates language on public pages; no Accept-Language redirects
  localeDetection: false,
  // Default locale: /about — other locales: /en/about
  localePrefix: "as-needed",
  locales: [...supportedLocales],
});
