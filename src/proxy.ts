import { routing } from "./i18n/routing";
import {
  extractLocaleFromPath,
  LOCALE_COOKIE,
  shouldIgnorePath,
  stripLocalePrefix,
} from "./i18n/shared";
import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // /en/dashboard → /dashboard (ignored paths never carry a locale prefix)
  const strippedPath = stripLocalePrefix(pathname);
  if (strippedPath !== pathname && shouldIgnorePath(strippedPath)) {
    url.pathname = strippedPath;
    return NextResponse.redirect(url, 301);
  }

  if (shouldIgnorePath(pathname)) {
    const ignoredPathResponse = NextResponse.next();
    ignoredPathResponse.headers.set("x-pathname", pathname);
    return ignoredPathResponse;
  }

  const i18nResponse = handleI18nRouting(request);

  // Sync locale cookie when user visits an explicitly prefixed URL
  const urlLocale = extractLocaleFromPath(pathname);
  if (urlLocale && i18nResponse instanceof NextResponse) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    if (urlLocale !== cookieLocale) {
      setLocaleCookie(i18nResponse, urlLocale);
    }
  }

  if (i18nResponse instanceof NextResponse) {
    i18nResponse.headers.set("x-pathname", pathname);
  }

  return i18nResponse;
}

function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}

export const config = {
  matcher: [
    // Root and unprefixed pathnames (required for localePrefix: 'as-needed')
    "/",
    "/((?!api|rpc|dashboard|_next|_vercel|.*\\..*).*)",
  ],
};
