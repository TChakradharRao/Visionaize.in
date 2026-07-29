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

// Return default column definitions (placeholder)
router.get("/", requireAuth, requireAdminRole, async (req, res) => {
  const defaults = [
    { key: 'email', label: 'Email', type: 'text', enabled: true },
    { key: 'name', label: 'Name', type: 'text', enabled: true },
    { key: 'created_at', label: 'Created', type: 'date', enabled: true },
  ];
  res.json({ items: defaults });
});

router.put("/", requireAuth, requireAdminRole, async (req, res) => {
  const { columns } = req.body || {};
  // In a real implementation we'd persist these; here we echo back
  res.json({ items: Array.isArray(columns) ? columns : [] });
});

module.exports = router;
