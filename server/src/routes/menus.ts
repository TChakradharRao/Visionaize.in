import { Router } from "express";
import { z } from "zod";
import { pool } from "../db.js";
import { requireAdmin } from "../auth/middleware.js";

export const menusRouter = Router();

menusRouter.get("/public/menus", async (_req, res) => {
  const { rows } = await pool.query(`SELECT location, items_json FROM nav_menu`);
  const map: Record<string, unknown> = {};
  for (const r of rows) map[r.location] = r.items_json;
  res.json(map);
});

const MenuSchema = z.object({
  location: z.string().min(1).max(50),
  items_json: z.array(z.any()),
});

menusRouter.put("/admin/menus", requireAdmin, async (req, res) => {
  const parsed = MenuSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  await pool.query(
    `INSERT INTO nav_menu (location, items_json) VALUES ($1, $2)
     ON CONFLICT (location) DO UPDATE SET items_json = EXCLUDED.items_json`,
    [parsed.data.location, JSON.stringify(parsed.data.items_json)]
  );
  res.json({ ok: true });
});
