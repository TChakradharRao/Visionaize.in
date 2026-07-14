import type { ContentItem, ContentSection } from "./api";
import seedData from "./seed-content-data.json";

type SeedImage = { src: string; alt: string };
type SeedSection = {
  heading: string | null;
  level: number;
  paragraphs: string[];
  bullets: string[];
  images: SeedImage[];
  ctas: Array<{ label: string; href: string }>;
};

type SeedContentEntry = {
  post_type: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  cover_image?: string | null;
  category?: string | null;
  order_index?: number;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image?: string | null;
  published?: boolean;
  date?: string | null;
  tags?: string[];
  sections?: SeedSection[];
  all_images?: string[];
};

const seedEntries = seedData as SeedContentEntry[];

function toContentSection(section: SeedSection): ContentSection {
  return {
    heading: section.heading ?? null,
    level: section.level ?? 2,
    paragraphs: section.paragraphs ?? [],
    bullets: section.bullets ?? [],
    images: (section.images ?? []).map((image) => ({ src: image.src, alt: image.alt ?? "" })),
    ctas: (section.ctas ?? []).map((cta) => ({ label: cta.label, href: cta.href })),
  };
}

function toContentItem(entry: SeedContentEntry): ContentItem {
  const sections = (entry.sections ?? []).map(toContentSection);
  const heroImage = entry.cover_image || sections.find((section) => section.images.length)?.images[0]?.src || null;
  return {
    id: `${entry.post_type}:${entry.slug}`,
    post_type: entry.post_type,
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt ?? null,
    content_html: null,
    content_json: {
      sections,
      tags: entry.tags ?? [],
      all_images: entry.all_images ?? [],
    },
    cover_image: heroImage,
    category: entry.category ?? null,
    order_index: entry.order_index ?? 0,
    seo_title: entry.seo_title ?? entry.title ?? null,
    seo_description: entry.seo_description ?? entry.excerpt ?? null,
    og_image: entry.og_image || heroImage,
    published_at: entry.date ? new Date(entry.date.replace(" ", "T") + "Z").toISOString() : null,
    updated_at: entry.date ? new Date(entry.date.replace(" ", "T") + "Z").toISOString() : new Date().toISOString(),
  };
}

export function getSeedContentItem(postType: string, slug: string): ContentItem | null {
  const entry = seedEntries.find((item) => item.post_type === postType && item.slug === slug);
  return entry ? toContentItem(entry) : null;
}

export function getSeedContentItems(postType: string): ContentItem[] {
  return seedEntries.filter((item) => item.post_type === postType).map(toContentItem);
}
