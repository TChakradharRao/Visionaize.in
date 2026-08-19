/* eslint-disable prettier/prettier */
const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware");

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = Math.max(1, Math.min(1000, parseInt(req.query.pageSize, 10) || 10));
    const q = typeof req.query.q === 'string' && req.query.q.trim() ? req.query.q.trim() : null;
    const handled = typeof req.query.handled === 'string' ? req.query.handled : null;

    const where = [];
    const params = [];

    if (q) {
      // search across common text fields and payload as text
      const like = `%${q}%`;
      params.push(like, like, like, like, like, like, like);
      where.push(`(name ILIKE $${params.length - 6} OR email ILIKE $${params.length - 5} OR company ILIKE $${params.length - 4} OR phone ILIKE $${params.length - 3} OR message ILIKE $${params.length - 2} OR source_page ILIKE $${params.length - 1} OR payload::text ILIKE $${params.length})`);
    }

    if (handled === 'true') {
      where.push('handled_at IS NOT NULL');
    } else if (handled === 'false') {
      where.push('handled_at IS NULL');
    }

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    // total count
    const countRes = await pool.query(`SELECT COUNT(*) AS cnt FROM public.contact_submissions ${whereClause}`, params);
    const total = parseInt(countRes.rows[0].cnt, 10) || 0;

    // pagination
    const offset = (page - 1) * pageSize;
    // append limit/offset params
    params.push(pageSize, offset);

    const itemsRes = await pool.query(
      `SELECT id, name, email, company, phone, message, source_page, payload, ip, user_agent, created_at, handled_at
         FROM public.contact_submissions
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    res.json({ items: itemsRes.rows, total });
  } catch (err) {
    console.error('Failed to load enquiries', err);
    res.status(500).json({ error: 'Failed to load enquiries' });
  }
});

module.exports = router;
