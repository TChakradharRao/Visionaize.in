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

// Return an empty list of mapped forms (placeholder)
router.get("/", requireAuth, requireAdminRole, async (req, res) => {
  res.json({ items: [] });
});

router.post("/", requireAuth, requireAdminRole, async (req, res) => {
  const data = req.body || {};
  const item = {
    id: String(Date.now()),
    provider: data.provider || 'unknown',
    formName: data.formName || '',
    externalFormId: data.externalFormId || '',
    mappedFields: data.mappedFields || 0,
    config: data.config || {},
    lastUpdated: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  res.status(201).json({ item });
});

router.delete("/:id", requireAuth, requireAdminRole, async (req, res) => {
  // noop in placeholder
  res.json({ ok: true });
});

module.exports = router;
