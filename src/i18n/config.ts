/**
 * Locale configuration driven by environment variables.
 *
 * NEXT_PUBLIC_DEFAULT_LOCALE — default locale (no URL prefix), e.g. "ar"
 * NEXT_PUBLIC_LOCALES        — comma-separated supported locales, e.g. "en,ar"
 * NEXT_PUBLIC_RTL_LOCALES    — comma-separated RTL locales, e.g. "ar"
 * NEXT_PUBLIC_LOCALE_IGNORED_PATHS — path segments that skip locale prefixes, e.g. "api,rpc,dashboard"
 * NEXT_PUBLIC_LOCALE_COOKIE  — cookie name for locale preference (default: NEXT_LOCALE)
 */

const FALLBACK_LOCALES = ["en", "ar"] as const;
const FALLBACK_DEFAULT_LOCALE = "ar";
const FALLBACK_RTL_LOCALES = ["ar"];
const FALLBACK_IGNORED_PATHS = ["api", "rpc", "dashboard", "_next", "_vercel"];

function parseList(
  raw: string | undefined,
  fallback: readonly string[],
): readonly string[] {
  if (!raw?.trim()) {
    return fallback;
  }

  const items = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : fallback;
}

export const defaultLocale =
  process.env.NEXT_PUBLIC_DEFAULT_LOCALE?.trim() || FALLBACK_DEFAULT_LOCALE;

export const supportedLocales = parseList(
  process.env.NEXT_PUBLIC_LOCALES,
  FALLBACK_LOCALES,
);

export const rtlLocales = parseList(
  process.env.NEXT_PUBLIC_RTL_LOCALES,
  FALLBACK_RTL_LOCALES,
);

export const ignoredPathSegments = parseList(
  process.env.NEXT_PUBLIC_LOCALE_IGNORED_PATHS,
  FALLBACK_IGNORED_PATHS,
);

export const LOCALE_COOKIE =
  process.env.NEXT_PUBLIC_LOCALE_COOKIE?.trim() || "NEXT_LOCALE";

export type Locale = (typeof supportedLocales)[number];

if (
  process.env.NODE_ENV !== "production" &&
  !supportedLocales.includes(defaultLocale)
) {
  throw new Error(
    `[i18n] NEXT_PUBLIC_DEFAULT_LOCALE "${defaultLocale}" must be included in NEXT_PUBLIC_LOCALES (${supportedLocales.join(", ")}).`,
  );
}
