import { routing } from "./routing";
import {
  defaultLocale,
  getCurrentLocale,
  LOCALE_COOKIE,
  parseLocaleCookie,
  shouldIgnorePath,
} from "./shared";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname") ?? "";
  const cookieStore = await cookies();
  const cookieLocale = parseLocaleCookie(
    cookieStore.get(LOCALE_COOKIE)?.value,
  );

  // Ignored paths (e.g. /dashboard): locale from cookie, not URL
  if (pathname && shouldIgnorePath(pathname)) {
    const locale = getCurrentLocale(pathname, cookieLocale);
    return {
      locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  }

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
