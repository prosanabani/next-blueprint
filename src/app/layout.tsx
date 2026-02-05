import "@/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
};

/**
 * Root layout required by Next.js. Must include <html> and <body>.
 * Locale-specific attributes (lang, dir, font) are set by LocaleDocumentAttributes in [locale] layout.
 */
export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
