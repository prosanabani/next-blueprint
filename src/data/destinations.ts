/**
 * Static data for destination pages. Used for SSG: generateStaticParams and list page.
 * In a real app this could come from a CMS or markdown files.
 */

export type Destination = {
  /**
   * Localized short description (key for next-intl).
   */
  descriptionKey: string;
  /**
   * Optional image path for OG/cards (relative to public or absolute).
   */
  imagePath?: string;
  /**
   * Localized name (key for next-intl).
   */
  nameKey: string;
  /**
   * Unique slug for URL (e.g. "penang", "langkawi").
   */
  slug: string;
};

/**
 * All destinations; slugs are used in generateStaticParams for SSG.
 */
export const destinations: Destination[] = [
  {
    descriptionKey: "destinations.penang.description",
    imagePath: "/og-penang.png",
    nameKey: "destinations.penang.name",
    slug: "penang",
  },
  {
    descriptionKey: "destinations.langkawi.description",
    nameKey: "destinations.langkawi.name",
    slug: "langkawi",
  },
  {
    descriptionKey: "destinations.kualalumpur.description",
    nameKey: "destinations.kualalumpur.name",
    slug: "kuala-lumpur",
  },
];

/**
 * Slugs only, for generating static params.
 */
export const destinationSlugs = destinations.map((d) => d.slug);

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
