/* eslint-disable prettier/prettier */
const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const { signAccessToken, newRefreshToken, verifyRefreshToken } = require("../utils/jwt");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

  const result = await pool.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = $1",
    [email]
  );
  const user = result.rows[0];
  const valid = user
    ? await bcrypt.compare(password, user.password_hash)
    : false;

  if (!user || !valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  const refresh = newRefreshToken(user.id);

  await pool.query(
    `INSERT INTO refresh_tokens (jti, user_id, expires_at, user_agent, ip)
     VALUES ($1, $2, $3, $4, $5)`,
    [refresh.jti, user.id, refresh.expiresAt, req.headers["user-agent"] || null, req.ip]
  );

  res.cookie("rt", refresh.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/api/auth",
    expires: refresh.expiresAt,
  });

  res.json({ accessToken, user: { id: user.id, email: user.email, role: user.role } });
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies?.rt;
  if (!token) return res.status(401).json({ error: "No refresh token" });

  let claims;
  try {
    claims = verifyRefreshToken(token);
  } catch {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  const result = await pool.query(
    `SELECT rt.jti, rt.revoked_at, rt.expires_at, u.email, u.role
       FROM refresh_tokens rt
       JOIN users u ON u.id = rt.user_id
      WHERE rt.jti = $1 AND rt.user_id = $2`,
    [claims.jti, claims.sub]
  );
  const row = result.rows[0];
  if (!row || row.revoked_at || new Date(row.expires_at) < new Date()) {
    return res.status(401).json({ error: "Refresh token revoked or expired" });
  }

  const next = newRefreshToken(claims.sub);
  await pool.query("UPDATE refresh_tokens SET revoked_at = now() WHERE jti = $1", [claims.jti]);
  await pool.query(
    `INSERT INTO refresh_tokens (jti, user_id, expires_at, user_agent, ip)
     VALUES ($1, $2, $3, $4, $5)`,
    [next.jti, claims.sub, next.expiresAt, req.headers["user-agent"] || null, req.ip]
  );

  res.cookie("rt", next.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    path: "/api/auth",
    expires: next.expiresAt,
  });

  const accessToken = signAccessToken({ sub: claims.sub, email: row.email, role: row.role });
  res.json({ accessToken, user: { id: claims.sub, email: row.email, role: row.role } });
});

router.post("/logout", async (req, res) => {
  const token = req.cookies?.rt;
  if (token) {
    try {
      const claims = verifyRefreshToken(token);
      await pool.query("UPDATE refresh_tokens SET revoked_at = now() WHERE jti = $1", [claims.jti]);
    } catch {
      // ignore invalid token
    }
  }
  res.clearCookie("rt", { path: "/api/auth" });
  res.json({ ok: true });
});

module.exports = router;
