/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = async () => {
  // Dynamically import plugins
  const createNextIntlPlugin = (await import("next-intl/plugin")).default;
  const unpluginIcons = (await import("unplugin-icons/webpack")).default;

  const withNextIntl = createNextIntlPlugin();

  return withNextIntl({
    experimental: {
      reactCompiler: true, // If using React 19 compiler
    },
    webpack: (config) => {
      config.resolve.alias["@"] = path.resolve(__dirname, "src");
      // Add alias for virtual icon modules
      config.resolve.alias["~icons"] = "unplugin-icons/virtual";

      // Configure unplugin-icons
      config.plugins.push(
        unpluginIcons({
          compiler: "jsx",
          jsx: "react",
          autoInstall: true,
          // extension: "tsx",
          scale: 1,
          transform: (svg) => {
            return svg.replace(/^<svg /, '<svg fill="currentColor" ');
          },
          customCollections: {
            // Add any custom icon collections if needed
          },
        })
      );

      // Add resolve fallback for virtual modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };

      return config;
    },
  });
};

// TODO:
// - file structure
// - shadcn
//     - theming
//     - configuration
//     -
