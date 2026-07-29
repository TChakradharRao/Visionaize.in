// @ts-ignore: allow missing dev dependency types in environments without @types/express
import { Router } from "express";
import { z } from "zod";
// @ts-ignore: allow missing dev dependency types in environments without @types/express-rate-limit
import rateLimit from "express-rate-limit";
import { pool } from "../db.js";
import { requireAdmin } from "../auth/middleware.js";

export const contactRouter = Router();

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  company: z.string().max(200).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  message: z.string().min(5).max(5000),
  source_page: z.string().max(500).optional().nullable(),
});

const submitLimiter = rateLimit({ windowMs: 60_000, max: 5 });

contactRouter.post("/public/contact", submitLimiter, async (req: any, res: any) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const d = parsed.data;
  await pool.query(
    `INSERT INTO contact_submissions (name, email, company, phone, message, source_page, ip, user_agent)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [d.name, d.email, d.company ?? null, d.phone ?? null, d.message, d.source_page ?? null,
     req.ip, req.headers["user-agent"] || null]
  );
  res.json({ ok: true });
});

contactRouter.get("/admin/contact", requireAdmin, async (_req: any, res: any) => {
  const { rows } = await pool.query(
    `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 500`
  );
  res.json({ items: rows });
});
