/* eslint-disable prettier/prettier */
const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const { requireAuth } = require("../middleware");

const router = express.Router();

function requireAdmin(req, res, next) {
  const role = req.user?.role;
  if (!role || !['admin', 'editor'].includes(role)) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

function normalizeRole(role) {
  const safeRole = String(role || "").trim().toLowerCase();
  return ['admin', 'editor', 'viewer'].includes(safeRole) ? safeRole : 'editor';
}

router.use(requireAuth, requireAdmin);

router.get("/", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, email, role, display_name, created_at, updated_at
         FROM users
        ORDER BY created_at DESC`
    );
    res.json({ items: rows });
  } catch (err) {
    console.error("Failed to list users", err);
    res.status(500).json({ error: "Failed to list users" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password, role, displayName } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const safeRole = normalizeRole(role);
    const { rows } = await pool.query(
      `INSERT INTO users (email, password_hash, role, display_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, role, display_name, created_at, updated_at`,
      [email, passwordHash, safeRole, displayName ?? null]
    );

    res.status(201).json({ item: rows[0] });
  } catch (err) {
    console.error("Failed to create user", err);
    res.status(500).json({ error: "Failed to create user", details: err.message || String(err) });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updates = [];
    const values = [];

    if (req.body?.password) {
      const hashed = await bcrypt.hash(req.body.password, 12);
      updates.push(`password_hash = $${values.length + 1}`);
      values.push(hashed);
    }
    if (req.body?.role !== undefined) {
      updates.push(`role = $${values.length + 1}`);
      values.push(normalizeRole(req.body.role));
    }
    if (req.body?.displayName !== undefined) {
      updates.push(`display_name = $${values.length + 1}`);
      values.push(req.body.displayName ?? null);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No valid update fields provided" });
    }

    values.push(req.params.id);
    const { rows } = await pool.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = $${values.length}
       RETURNING id, email, role, display_name, created_at, updated_at`,
      values
    );

    if (!rows[0]) return res.status(404).json({ error: "User not found" });
    res.json({ item: rows[0] });
  } catch (err) {
    console.error("Failed to update user", err);
    res.status(500).json({ error: "Failed to update user", details: err.message || String(err) });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (req.user?.sub === req.params.id) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }

    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete user", err);
    res.status(500).json({ error: "Failed to delete user", details: err.message || String(err) });
  }
});

module.exports = router;
