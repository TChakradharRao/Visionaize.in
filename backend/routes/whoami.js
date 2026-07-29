/* eslint-disable prettier/prettier */
const express = require("express");
const { requireAuth } = require("../middleware");
const router = express.Router();

// returns decoded access token claims for debugging
router.get("/", requireAuth, async (req, res) => {
  res.json({ user: req.user || null });
});

module.exports = router;
