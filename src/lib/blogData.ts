import rawPosts from "@/data/blogs.json";
import resourceTags from "@/data/resourceTags.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  published_at: string; // ISO date
  author?: string;
  reading_time?: string;
  category: string;
  tags: string[];
  blocks: ContentBlock[];
}

// ---------------------------------------------------------------------------
// Data access
// ---------------------------------------------------------------------------

// blogs.json is the single source of truth for blog content. It's imported
// once here and re-exported through small helper functions so every page
// (blog index, blog post view, resource center) reads from the same place.
const posts = rawPosts as BlogPost[];

/** All posts, sorted newest first. */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => Date.parse(b.published_at) - Date.parse(a.published_at)
  );
}

/** Single post by slug, or undefined if it doesn't exist. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Distinct category list, alphabetically sorted. */
export function getCategories(): string[] {
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}

/** Distinct tag list actually used on posts, alphabetically sorted. */
export function getTags(): string[] {
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
}

/**
 * Full site tag taxonomy (src/data/resourceTags.json), in its original,
 * curated order. This is what the Digital Twin Resource Center sidebar
 * renders — it's intentionally broader than getTags(), since not every tag
 * in the taxonomy has a matching post yet (e.g. event/partner tags like
 * "Webinar" or "Chiyoda"). Filtering by a tag with no matching posts simply
 * shows the empty state.
 */
export function getResourceTags(): string[] {
  return resourceTags as string[];
}

/** Posts related to a given post (same category, excluding itself). */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Filtering helper shared by the resource center (and reusable elsewhere)
// ---------------------------------------------------------------------------

export interface PostFilters {
  search?: string;
  categories?: string[]; // empty/undefined = all categories
  tags?: string[]; // empty/undefined = all tags
}

export function filterPosts(all: BlogPost[], filters: PostFilters): BlogPost[] {
  const search = filters.search?.trim().toLowerCase();
  const categories = filters.categories ?? [];
  const tags = filters.tags ?? [];

  return all.filter((p) => {
    if (categories.length > 0 && !categories.includes(p.category)) return false;
    if (tags.length > 0 && !tags.some((t) => p.tags.includes(t))) return false;
    if (search) {
      const haystack = `${p.title} ${p.excerpt} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });
}