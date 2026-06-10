1. Treat i18n as routing + translations, not just strings
   Most libraries handle translations; the hard part is URL structure, redirects, cookies, and SSR. A solid setup separates:

Translation layer (e.g. use-intl) — strings, pluralization, formatting
Integration layer — locale detection, URL rewriting, middleware, cookies 2. Use a single source of truth for strings
All copy lives in one place per language
Adding a language should be mostly: new message file + add to supportedLocales
Avoid hardcoded strings scattered across components 3. Choose the right URL prefix strategy (this is critical for SEO)
The article recommends no prefix for the default language, prefix for others:

URL Language
/about
English (default)
/es/about
Spanish
Why this is the sweet spot:

Default audience gets clean URLs (/pricing, not /en/pricing)
Each language has its own indexable URL for hreflang
CDN caching stays simple (one URL = one cached response)
No redirect tax on your most important pages
Avoid:

Always prefix (/en/about) — wastes /, adds redirects, uglier canonical URLs
Never prefix — terrible for SEO; Google only sees one language per URL 4. The URL is the source of truth on public pages
On marketing/content routes, the URL dictates the language. No magic guessing.

/about → always English
/es/about → always Spanish
Shareable links behave predictably for everyone
This is the most SEO- and CDN-friendly approach.

5. Be very careful with automatic redirects
   Key rules:

Never redirect based on Accept-Language alone on content pages — Googlebot uses en, VPN/travel users get wrong language, and Vary: Accept-Language kills cache hit rates
If you redirect at all, only on / for returning users with a cookie
Never redirect if the user explicitly navigated to a prefixed URL
Prefer a non-intrusive banner: “This page is available in Español → Switch” 6. Use cookies, not localStorage, for preferences
Cookies work server-side (SSR)
localStorage causes a flash of wrong language on every load
Set cookies on path=/ when syncing from prefixed URLs or language switcher 7. Support “ignored paths” for non-SEO areas
Some routes should bypass locale prefixes entirely:

/api/_, /rpc/_ — no localization in URLs
/dashboard/\* — authenticated area; read locale from cookie, not URL
This avoids /es/dashboard and keeps app internals simpler.

8. Split server vs client concerns cleanly
   Use separate entry points (@app/i18n/client vs @app/i18n/server):

Server: middleware, redirects, cookie handling
Client: URL rewriting, window/document APIs
Shared: config, types, locale validation
This prevents bundler errors and keeps the client bundle small.

9. Use TanStack Router’s rewrite system correctly
   The router should see de-localized paths internally:

input (deLocalizeUrl) — /es/about → /about before routing
output (localizeUrl) — <Link to="/about"> → /es/about when locale is Spanish
Plus a /{-$locale} layout route with beforeLoad validation so /random-page 404s instead of being treated as a locale.

10. Server middleware handles what React cannot
    Concern Layout route Server middleware
    Invalid locale → 404
    Yes
    No
    /en/about → /about redirect
    No
    Yes
    Sync cookie from URL
    No
    Yes
    Strip locale from ignored paths
    No
    Yes
    Middleware runs before HTML is sent; the layout route runs inside React.

11. Locale detection must be identical on server and client
    Use isomorphic functions (createIsomorphicFn):

Public pages → locale from URL
Ignored paths → locale from cookie
Same logic on server and client to avoid hydration mismatches 12. Load messages efficiently for SSR
Async, per-locale loading (don’t ship Spanish strings to English users)
Cache messages aggressively (staleTime: Infinity)
Set <html lang={locale}> correctly
Wrap the app in IntlProvider that reacts to route/locale changes 13. Type safety end-to-end
Type-safe translation keys (useTranslations('auth'))
Type-safe localized links (LocalizedLink) so invalid routes fail at compile time 14. Make adding languages trivial
Adding a language should require only:

New message file
Add to supportedLocales
Register in messages index
No route changes, no middleware updates, no new config files.

The article’s “perfect implementation” checklist
If you follow the guide’s intent, a production-ready setup has:

Single source of truth for all strings
Default locale unprefixed, others prefixed (/about, /es/about)
URL = language on public pages
No aggressive auto-redirects; banner + cookie for preference
Cookies over localStorage for SSR
Ignored paths for API/dashboard (cookie-based locale)
Router rewrite + optional {-$locale} param + validation
Server middleware for redirects and cookie sync
Isomorphic locale detection (no hydration flash)
Async message loading with per-locale bundles
Type-safe translations and links
Small bundle, SSR-compatible library (use-intl or Paraglide)
The core insight: localization quality is mostly an architecture decision — URL strategy, redirect policy, and where locale is read (URL vs cookie) matter more than which translation API you pick.

If you want, I can map these principles onto your next-blueprint-2 project structure and suggest a concrete folder layout for TanStack Start.
