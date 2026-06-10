"use client";

import { isRtlLocale } from "@/i18n/shared";
import { useLayoutEffect } from "react";

type Props = {
  readonly fontClassName: string;
  readonly locale: string;
};

/**
 * Applies font class on <html> after locale attributes are set server-side via inline script.
 */
export function LocaleDocumentAttributes({ fontClassName, locale }: Props) {
  useLayoutEffect(() => {
    const element = document.documentElement;
    element.lang = locale;
    element.dir = isRtlLocale(locale) ? "rtl" : "ltr";
    element.className = fontClassName;
  }, [fontClassName, locale]);

  return null;
}
