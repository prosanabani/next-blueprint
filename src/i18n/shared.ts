import {
  defaultLocale,
  ignoredPathSegments,
  type Locale,
  LOCALE_COOKIE,
  rtlLocales,
  supportedLocales,
} from "./config";

/**
 * Extract a non-default locale prefix from a pathname, e.g. "/en/about" → "en".
 */
export function extractLocaleFromPath(pathname: string): Locale | null {
  const match = /^\/([a-z]{2}(?:-[A-Za-z]{2})?)(?:\/|$)/u.exec(pathname);
  const locale = match?.[1];

  if (!locale || !isValidLocale(locale) || locale === defaultLocale) {
    return null;
  }

  return locale;
}

/**
 * Resolve locale for the current request.
 * Public pages: URL is source of truth. Ignored paths: cookie, then default.
 */
export function getCurrentLocale(
  pathname: string,
  cookieValue?: null | string,
): Locale {
  if (shouldIgnorePath(pathname)) {
    return parseLocaleCookie(cookieValue) ?? defaultLocale;
  }

  return extractLocaleFromPath(pathname) ?? defaultLocale;
}

/**
 * Resolve locale from a pathname (URL is source of truth on public pages).
 */
export function getLocaleFromPathname(
  pathname: string,
  cookieValue?: null | string,
): Locale {
  return getCurrentLocale(pathname, cookieValue);
}

export function isRtlLocale(locale: string): boolean {
  return (rtlLocales as readonly string[]).includes(locale);
}

export function isValidLocale(locale: string | undefined): locale is Locale {
  return (
    locale !== undefined &&
    (supportedLocales as readonly string[]).includes(locale)
  );
}

/**
 * Build a localized path segment (no origin).
 * Default locale omits the prefix: "/about" vs "/en/about".
 */
export function localizedPath(locale: string, path = ""): string {
  const normalized = trimSlashes(path);

  if (locale === defaultLocale) {
    return normalized ? `/${normalized}` : "/";
  }

  return normalized ? `/${locale}/${normalized}` : `/${locale}`;
}

/**
 * Parse the browser Accept-Language header and return the best matching locale.
 */
export function matchAcceptLanguage(header: null | string): Locale | undefined {
  if (!header) {
    return undefined;
  }

  const preferences = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.split("=")[1] ?? "1") : 1;
      return { q, tag: tag?.toLowerCase() ?? "" };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferences) {
    const base = tag.split("-")[0];
    const exact = supportedLocales.find(
      (locale) => locale.toLowerCase() === tag,
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

/**
 * Read locale from the preference cookie value.
 */
export function parseLocaleCookie(
  cookieValue: null | string | undefined,
): Locale | null {
  if (!cookieValue || !isValidLocale(cookieValue)) {
    return null;
  }

  return cookieValue;
}

/**
 * Read the locale preference from document.cookie (client-only).
 */
export function readLocaleFromDocumentCookie(): string | undefined {
  const pattern = new RegExp(
    String.raw`(?:^|;\s*)${LOCALE_COOKIE}=([^;]+)`,
    "u",
  );
  return pattern.exec(document.cookie)?.[1];
}

/**
 * Paths that bypass locale prefix handling (API, RPC, authenticated areas).
 */
export function shouldIgnorePath(pathname: string): boolean {
  const pattern = new RegExp(
    String.raw`^/(?:${ignoredPathSegments.join("|")})(?:/|$)`,
    "u",
  );
  return pattern.test(pathname);
}

/**
 * Strip a locale prefix from a pathname, including the default locale prefix.
 */
export function stripLocalePrefix(pathname: string): string {
  const urlLocale = extractLocaleFromPath(pathname);
  if (urlLocale) {
    return pathname.replace(`/${urlLocale}`, "") || "/";
  }

  if (pathname.startsWith(`/${defaultLocale}/`)) {
    return pathname.replace(`/${defaultLocale}`, "") || "/";
  }

  if (pathname === `/${defaultLocale}`) {
    return "/";
  }

  return pathname;
}

function trimSlashes(path: string): string {
  let start = 0;
  let end = path.length;
  while (start < end && path[start] === "/") start++;
  while (end > start && path[end - 1] === "/") end--;
  return path.slice(start, end);
}

export {
  defaultLocale,
  ignoredPathSegments,
  type Locale,
  LOCALE_COOKIE,
  rtlLocales,
  supportedLocales,
} from "./config";
