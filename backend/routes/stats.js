/* eslint-disable prettier/prettier */
const express = require("express");
const { requireAuth } = require("../middleware");
const router = express.Router();

function requireAdminRole(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Requires admin role' });
  }
  next();
}

// Return simple empty stats placeholder
router.get("/", requireAuth, requireAdminRole, async (req, res) => {
  res.json({ enquiriesOverTime: [], topForms: [], providerBreakdown: [] });
});

module.exports = router;
