import { Router } from "express";
import { z } from "zod";
import { pool } from "../db.js";
import { requireAdmin } from "../auth/middleware.js";

export const settingsRouter = Router();

settingsRouter.get("/public/settings", async (_req, res) => {
  const { rows } = await pool.query(`SELECT key, value_json FROM site_settings`);
  const out: Record<string, unknown> = {};
  for (const r of rows) out[r.key] = r.value_json;
  res.json(out);
});

const SetSchema = z.object({ key: z.string().min(1), value_json: z.any() });

settingsRouter.put("/admin/settings", requireAdmin, async (req, res) => {
  const parsed = SetSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  await pool.query(
    `INSERT INTO site_settings (key, value_json) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value_json = EXCLUDED.value_json`,
    [parsed.data.key, JSON.stringify(parsed.data.value_json)]
  );
  res.json({ ok: true });
});
