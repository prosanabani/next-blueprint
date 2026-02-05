/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = async () => {
  const createNextIntlPlugin = (await import("next-intl/plugin")).default;
  const withNextIntl = createNextIntlPlugin();

  return withNextIntl({
    experimental: {
      reactCompiler: true,
    },
    webpack: (config) => {
      config.resolve.alias["@"] = path.resolve(__dirname, "src");
      // Icons: template uses @iconify/react + lucide-react. For virtual ~icons
      // (unplugin-icons), add the plugin and ~icons alias — note Next 15 dev
      // uses Turbopack so webpack plugins only apply to production build.
      return config;
    },
  });
};
