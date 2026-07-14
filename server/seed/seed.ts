import "dotenv/config";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../src/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Section {
  heading: string | null;
  level: number;
  paragraphs: string[];
  bullets: string[];
  images: { src: string; alt: string }[];
  ctas: { label: string; href: string }[];
}

interface StructuredItem {
  post_type: "page" | "post" | "project" | "service" | "platform" | "solution";
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
  sections: Section[];
  all_images?: string[];
}

interface MenuItem {
  id: number;
  title: string;
  url: string;
  parent: number;
  order: number;
  target?: string;
}

const MENU_LOCATIONS: Record<string, string> = {
  "Primary menu": "header",
  "Secondary menu": "header-secondary",
  "Footer menu 1": "footer-1",
  "footer menu 2": "footer-2",
  "footer menu 3": "footer-3",
};

function nestMenu(items: MenuItem[]) {
  const byId = new Map<number, MenuItem & { children: MenuItem[] }>();
  for (const it of items) byId.set(it.id, { ...it, children: [] });
  const roots: (MenuItem & { children: MenuItem[] })[] = [];
  for (const it of byId.values()) {
    if (it.parent && byId.has(it.parent)) byId.get(it.parent)!.children.push(it);
    else roots.push(it);
  }
  return roots;
}

// --- Content ---
// Prefer the new structured seed; fall back to the raw HTML seed if missing.
async function loadContent(): Promise<StructuredItem[]> {
  const structured = join(__dirname, "content-structured.json");
  try {
    const raw = await readFile(structured, "utf8");
    return JSON.parse(raw) as StructuredItem[];
  } catch {
    return [];
  }
}

const items = await loadContent();

let inserted = 0;
for (const it of items) {
  const publishedAt = it.date ? new Date(it.date.replace(" ", "T") + "Z") : null;
  const contentJson = {
    sections: it.sections,
    tags: it.tags ?? [],
    all_images: it.all_images ?? [],
  };
  await pool.query(
    `INSERT INTO content (post_type, slug, title, excerpt, content_html, content_json,
                          cover_image, category, order_index, seo_title, seo_description,
                          og_image, published, published_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     ON CONFLICT (post_type, slug) DO UPDATE SET
       title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, content_html=EXCLUDED.content_html,
       content_json=EXCLUDED.content_json, cover_image=EXCLUDED.cover_image,
       category=EXCLUDED.category, order_index=EXCLUDED.order_index,
       seo_title=EXCLUDED.seo_title, seo_description=EXCLUDED.seo_description,
       og_image=EXCLUDED.og_image, published=EXCLUDED.published,
       published_at=COALESCE(EXCLUDED.published_at, content.published_at)`,
    [
      it.post_type, it.slug, it.title, it.excerpt ?? null,
      null, // content_html no longer used — UI renders structured sections
      JSON.stringify(contentJson),
      it.cover_image ?? null, it.category ?? null, it.order_index ?? 0,
      it.seo_title ?? null, it.seo_description ?? null, it.og_image ?? null,
      it.published ?? true, publishedAt,
    ]
  );
  inserted++;
}
console.log(`Seeded ${inserted} content items.`);

// --- Menus ---
const rawMenus = await readFile(join(__dirname, "menus-seed.json"), "utf8").catch(() => "{}");
const menus: Record<string, MenuItem[]> = JSON.parse(rawMenus);

let menusSeeded = 0;
for (const [wpName, location] of Object.entries(MENU_LOCATIONS)) {
  const list = menus[wpName];
  if (!list) continue;
  const tree = nestMenu(list);
  await pool.query(
    `INSERT INTO nav_menu (location, items_json) VALUES ($1, $2)
     ON CONFLICT (location) DO UPDATE SET items_json = EXCLUDED.items_json`,
    [location, JSON.stringify(tree)]
  );
  menusSeeded++;
}
console.log(`Seeded ${menusSeeded} menus.`);

await pool.end();
