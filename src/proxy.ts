import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import {
  extractLocaleFromPath,
  LOCALE_COOKIE,
  shouldIgnorePath,
  stripLocalePrefix,
} from "./i18n/shared";

const handleI18nRouting = createMiddleware(routing);

function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}

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
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  const response = handleI18nRouting(request);

  // Sync locale cookie when user visits an explicitly prefixed URL
  const urlLocale = extractLocaleFromPath(pathname);
  if (urlLocale && response instanceof NextResponse) {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    if (urlLocale !== cookieLocale) {
      setLocaleCookie(response, urlLocale);
    }
  }

  if (response instanceof NextResponse) {
    response.headers.set("x-pathname", pathname);
  }

  return response;
}

export const config = {
  matcher: [
    // Root and unprefixed pathnames (required for localePrefix: 'as-needed')
    "/",
    "/((?!api|rpc|dashboard|_next|_vercel|.*\\..*).*)",
  ],
};
