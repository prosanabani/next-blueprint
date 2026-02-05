# Next Blueprint

> A modern, production-ready Next.js starter template that gets you up and running in minutes, not hours.

I built this template because I was tired of setting up the same configuration over and over again for every new project. After countless hours of tweaking, testing, and refining, I've assembled what I believe is a solid foundation for building modern web applications with Next.js.

This isn't just another boilerplate—it's a carefully curated collection of tools and patterns that I use in production. Every dependency has been chosen for a reason, and every configuration decision has been made with scalability and developer experience in mind.

## ✨ What's Inside

### Core Framework
- **Next.js 15.3.2** with App Router - The latest and greatest from the Vercel team
- **React 19** with React Compiler - Experience the future of React development
- **TypeScript** with strict mode - Catch errors before they reach production

### Internationalization
- **next-intl** - Full i18n support out of the box
- **English & Arabic** locales pre-configured (easily extensible)
- **RTL support** - Proper right-to-left layout handling for Arabic
- **Type-safe translations** - Never misspell a translation key again

### Styling & UI
- **Tailwind CSS v4** - The latest version with modern features
- **shadcn/ui** (New York style) - Beautiful, accessible components
- **Dark mode** - System-aware theme switching with next-themes
- **Custom design tokens** - Comprehensive spacing, typography, and color scales
- **OKLCH color space** - Better color consistency across themes

### Developer Experience
- **Path aliases** - Clean imports with `@/` prefix
- **ESLint** - Comprehensive linting with Canonical, SonarJS, and Next.js rules
- **Icon support** - Iconify, Lucide React, and unplugin-icons for flexible icon usage
- **Font optimization** - Geist Sans, Geist Mono, and Roboto with automatic optimization

### Code Quality
- **Strict TypeScript** - Maximum type safety
- **Comprehensive ESLint rules** - Catch issues before they become problems
- **React Compiler** - Automatic optimization of your React code

## 🚀 Quick Start

### Prerequisites

Make sure you have one of these package managers installed:
- [pnpm](https://pnpm.io/) (recommended)
- [npm](https://www.npmjs.com/)
- [yarn](https://yarnpkg.com/)
- [bun](https://bun.sh/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prosanabani/next-blueprint.git
   cd next-blueprint
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) and you should see your app running.

## 📁 Project Structure

```
next-blueprint/
├── src/
│   ├── app/
│   │   └── [locale]/          # Locale-based routing
│   │       ├── components/     # Page-specific components
│   │       ├── layout.tsx      # Root layout with i18n
│   │       └── page.tsx        # Home page
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   ├── i18n/                   # Internationalization config
│   ├── lib/                    # Utility functions
│   ├── providers/              # React context providers
│   ├── styles/                 # Global styles
│   └── middleware.ts           # Next.js middleware
├── messages/                   # Translation files
│   ├── en.json
│   └── ar.json
├── public/                     # Static assets
└── ...config files
```

## 🎨 Customization

### Adding a New Locale

1. Add the locale to `src/i18n/routing.ts`:
   ```typescript
   export const routing = defineRouting({
     defaultLocale: "en",
     locales: ["en", "ar", "fr"], // Add your locale here
   });
   ```

2. Create a translation file in `messages/`:
   ```json
   // messages/fr.json
   {
     "HomePage": {
       "title": "Bienvenue",
       "about": "À propos"
     }
   }
   ```

### Theming

The theme system uses CSS variables defined in `src/styles/globals.css`. You can customize colors, spacing, typography, and more by modifying the `:root` and `.dark` selectors.

### Adding shadcn/ui Components

This template is configured for shadcn/ui. To add a new component:

```bash
npx shadcn@latest add [component-name]
```

The configuration is already set up in `components.json`, so components will be added to the correct location automatically.

## 🛠️ Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production (includes type checking)
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint and fix auto-fixable issues

## 📦 Key Dependencies

### Core
- `next@15.3.2` - React framework
- `react@19.0.0` - UI library
- `typescript@5.8.3` - Type safety

### Internationalization
- `next-intl@4.3.0` - i18n solution

### Styling
- `tailwindcss@4.1.11` - Utility-first CSS
- `next-themes@0.4.6` - Theme management

### UI Components
- `@radix-ui/*` - Headless UI primitives
- `lucide-react` - Icon library
- `class-variance-authority` - Component variants

### Developer Tools
- `eslint` - Code linting
- `@iconify/react` - Icon system
- `unplugin-icons` - Icon bundler

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration with i18n and icon plugins
- `tsconfig.json` - TypeScript configuration with path aliases
- `eslint.config.mjs` - ESLint rules and plugins
- `components.json` - shadcn/ui configuration
- `tailwind.config.js` - Tailwind CSS configuration (if using v3, v4 uses CSS)

## 🌍 Browser Support

This template targets modern browsers that support:
- ES2017+ JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (variables)

## 🤝 Contributing

I'm always open to suggestions and improvements! If you have ideas for features, find bugs, or want to contribute, please feel free to:

1. Open an issue to discuss your idea
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

This template wouldn't exist without the amazing work of:
- The Next.js team at Vercel
- The shadcn/ui community
- The maintainers of all the wonderful open-source packages used here

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

---

**Built with care and attention to detail.** If this template helps you build something amazing, I'd love to hear about it! 🚀
