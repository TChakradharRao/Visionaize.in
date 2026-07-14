import { Router } from "express";
import { z } from "zod";
import { pool } from "../db.js";
import { requireAdmin } from "../auth/middleware.js";

export const contentRouter = Router();

const POST_TYPES = ["page", "post", "project", "service", "platform", "solution"] as const;
type PostType = (typeof POST_TYPES)[number];

const ContentSchema = z.object({
  post_type: z.enum(POST_TYPES),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-/]+$/i),
  title: z.string().min(1).max(300),
  excerpt: z.string().max(2000).optional().nullable(),
  content_html: z.string().optional().nullable(),
  content_json: z.any().optional().nullable(),
  cover_image: z.string().url().optional().nullable(),
  category: z.string().max(100).optional().nullable(),
  order_index: z.number().int().optional().default(0),
  seo_title: z.string().max(200).optional().nullable(),
  seo_description: z.string().max(500).optional().nullable(),
  og_image: z.string().url().optional().nullable(),
  published: z.boolean().optional().default(false),
});

// ---------- PUBLIC READS ----------
// GET /api/public/content/:postType            -> list published
// GET /api/public/content/:postType/:slug      -> single published
contentRouter.get("/public/content/:postType", async (req, res) => {
  const pt = req.params.postType as PostType;
  if (!POST_TYPES.includes(pt)) return res.status(404).json({ error: "Unknown post type" });
  const { rows } = await pool.query(
    `SELECT id, post_type, slug, title, excerpt, cover_image, category, order_index,
            seo_title, seo_description, og_image, published_at, updated_at
       FROM content
      WHERE post_type = $1 AND published = true
      ORDER BY order_index ASC, published_at DESC NULLS LAST`,
    [pt]
  );
  res.json({ items: rows });
});

contentRouter.get("/public/content/:postType/:slug", async (req, res) => {
  const pt = req.params.postType as PostType;
  if (!POST_TYPES.includes(pt)) return res.status(404).json({ error: "Unknown post type" });
  const { rows } = await pool.query(
    `SELECT * FROM content WHERE post_type = $1 AND slug = $2 AND published = true`,
    [pt, req.params.slug]
  );
  if (!rows[0]) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

// ---------- ADMIN CRUD ----------
contentRouter.get("/admin/content/:postType", requireAdmin, async (req, res) => {
  const pt = req.params.postType as PostType;
  if (!POST_TYPES.includes(pt)) return res.status(404).json({ error: "Unknown post type" });
  const { rows } = await pool.query(
    `SELECT id, post_type, slug, title, published, published_at, updated_at, order_index, category
       FROM content WHERE post_type = $1 ORDER BY updated_at DESC`,
    [pt]
  );
  res.json({ items: rows });
});

contentRouter.post("/admin/content", requireAdmin, async (req, res) => {
  const parsed = ContentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const { rows } = await pool.query(
    `INSERT INTO content
       (post_type, slug, title, excerpt, content_html, content_json, cover_image, category,
        order_index, seo_title, seo_description, og_image, published, published_at, author_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,
             CASE WHEN $13 THEN now() ELSE NULL END, $14)
     ON CONFLICT (post_type, slug) DO UPDATE SET
       title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, content_html=EXCLUDED.content_html,
       content_json=EXCLUDED.content_json, cover_image=EXCLUDED.cover_image,
       category=EXCLUDED.category, order_index=EXCLUDED.order_index,
       seo_title=EXCLUDED.seo_title, seo_description=EXCLUDED.seo_description,
       og_image=EXCLUDED.og_image, published=EXCLUDED.published,
       published_at=CASE WHEN EXCLUDED.published AND content.published_at IS NULL
                         THEN now() ELSE content.published_at END
     RETURNING *`,
    [
      d.post_type, d.slug, d.title, d.excerpt ?? null, d.content_html ?? null,
      d.content_json ?? null, d.cover_image ?? null, d.category ?? null,
      d.order_index ?? 0, d.seo_title ?? null, d.seo_description ?? null,
      d.og_image ?? null, d.published ?? false, req.user!.sub,
    ]
  );
  res.json(rows[0]);
});

contentRouter.put("/admin/content/:id", requireAdmin, async (req, res) => {
  const parsed = ContentSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  const { rows } = await pool.query(
    `UPDATE content SET
        title         = COALESCE($2, title),
        slug          = COALESCE($3, slug),
        excerpt       = COALESCE($4, excerpt),
        content_html  = COALESCE($5, content_html),
        content_json  = COALESCE($6, content_json),
        cover_image   = COALESCE($7, cover_image),
        category      = COALESCE($8, category),
        order_index   = COALESCE($9, order_index),
        seo_title     = COALESCE($10, seo_title),
        seo_description = COALESCE($11, seo_description),
        og_image      = COALESCE($12, og_image),
        published     = COALESCE($13, published),
        published_at  = CASE WHEN $13 = true AND published_at IS NULL THEN now() ELSE published_at END
      WHERE id = $1 RETURNING *`,
    [
      req.params.id, d.title, d.slug, d.excerpt, d.content_html, d.content_json,
      d.cover_image, d.category, d.order_index, d.seo_title, d.seo_description,
      d.og_image, d.published,
    ]
  );
  if (!rows[0]) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

contentRouter.delete("/admin/content/:id", requireAdmin, async (req, res) => {
  const result = await pool.query("DELETE FROM content WHERE id = $1", [req.params.id]);
  if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});
