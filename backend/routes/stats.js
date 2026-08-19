/* eslint-disable prettier/prettier */
const express = require("express");
const pool = require("../db");
const { requireAuth } = require("../middleware");
const router = express.Router();

function requireStatsAccess(req, res, next) {
  if (!req.user || !['admin', 'editor', 'viewer'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Requires admin, editor, or viewer role' });
  }
  next();
}

router.get("/", requireAuth, requireStatsAccess, async (req, res) => {
  try {
    const { rows: trendRows } = await pool.query(
      `SELECT to_char(created_at, 'YYYY-MM-DD') AS day, count(*)::int AS count
       FROM public.contact_submissions
       GROUP BY day
       ORDER BY day ASC`
    );

    const { rows: topEnquiryPages } = await pool.query(
      `SELECT COALESCE(NULLIF(source_page, ''), 'Unknown') AS source_page, count(*)::int AS count
       FROM public.contact_submissions
       GROUP BY source_page
       ORDER BY count DESC
       LIMIT 10`
    );

    const { rows: enquiriesByType } = await pool.query(
      `SELECT COALESCE(NULLIF(payload->>'form_type', ''), 'Contact Form') AS form_type, count(*)::int AS count
       FROM public.contact_submissions
       GROUP BY form_type
       ORDER BY count DESC`
    );

    res.json({ enquiriesOverTime: trendRows, topEnquiryPages, enquiriesByType });
  } catch (err) {
    console.error('Failed to load stats', err);
    res.status(500).json({ error: 'Failed to load stats' });
  }
});

module.exports = router;
