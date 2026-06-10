import ar from "../../messages/ar.json";
import en from "../../messages/en.json";

import { defaultLocale, type Locale } from "@/i18n/config";

const messages: Record<string, typeof en> = { ar, en };

export type ErrorMessages = {
  description: string;
  goToHomepage: string;
  title: string;
  tryAgain: string;
};

export type GlobalErrorMessages = {
  contactSupport: string;
  description: string;
  errorId: string;
  goToHomepage: string;
  title: string;
  tryAgain: string;
};

function resolveMessages(locale: string) {
  return messages[locale] ?? messages[defaultLocale] ?? messages.en;
}

export function getErrorMessages(locale: Locale | string): ErrorMessages {
  return resolveMessages(locale).Error as ErrorMessages;
}

export function getGlobalErrorMessages(
  locale: Locale | string,
): GlobalErrorMessages {
  return resolveMessages(locale).GlobalError as GlobalErrorMessages;
}
