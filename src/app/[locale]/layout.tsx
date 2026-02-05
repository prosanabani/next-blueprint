import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { siteName, siteTagline, siteUrl } from "@/config/site";
import "../../styles/globals.css";
import { routing } from "@/i18n/routing";
import { buildWebSiteJsonLd, canonicalUrl } from "@/lib/seo";
import { ThemeProvider } from "@/providers/theme-provider";
import { type Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { notFound } from "next/navigation";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

/**
 * Default metadata for all locale routes. Each page can override via its own generateMetadata.
 * Title template ensures "Page Title | Site Name" for inner pages.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = canonicalUrl(locale); // e.g. https://site.com/en

  return {
    alternates: {
      canonical: baseUrl,
      languages: {
        ar: canonicalUrl("ar"),
        en: canonicalUrl("en"),
      },
    },
    description: siteTagline,
    metadataBase: new URL(siteUrl),
    openGraph: {
      description: siteTagline,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      siteName,
      title: siteName,
      type: "website",
      url: baseUrl,
    },
    robots: {
      follow: true,
      index: true,
    },
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    twitter: {
      card: "summary_large_image",
      description: siteTagline,
      title: siteName,
    },
  };
}

/**
 * SSG: pre-render all locale segments at build time.
 */
export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }));
};

export default async function LocaleLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const jsonLd = buildWebSiteJsonLd(locale);

  return (
    <html
      className={roboto.variable}
      dir={locale === "ar" ? "rtl" : "ltr"}
      lang={locale}
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* JSON-LD for SEO: WebSite schema (valid in body per spec). */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <NextIntlClientProvider>
            <div className="flex min-h-screen flex-col">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
