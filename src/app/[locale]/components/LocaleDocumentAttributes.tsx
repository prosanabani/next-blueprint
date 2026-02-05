"use client";

import { useEffect } from "react";

type Props = {
  readonly fontClassName: string;
  readonly locale: string;
};

/**
 * Sets lang, dir, and font class on the document element so the root layout
 * can stay minimal while [locale] still controls these attributes.
 */
export function LocaleDocumentAttributes({ fontClassName, locale }: Props) {
  useEffect(() => {
    const element = document.documentElement;
    element.lang = locale;
    element.dir = locale === "ar" ? "rtl" : "ltr";
    element.className = fontClassName;
  }, [fontClassName, locale]);
  return null;
}
