import { defineRouting } from "next-intl/routing";

import {
  defaultLocale,
  LOCALE_COOKIE,
  supportedLocales,
} from "./config";

export const routing = defineRouting({
  defaultLocale,
  locales: [...supportedLocales],
  // Default locale: /about — other locales: /en/about
  localePrefix: "as-needed",
  // URL dictates language on public pages; no Accept-Language redirects
  localeDetection: false,
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
    name: LOCALE_COOKIE,
    path: "/",
  },
});
