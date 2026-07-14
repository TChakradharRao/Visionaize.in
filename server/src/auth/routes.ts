import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { pool } from "../db.js";
import {
  newRefreshToken,
  signAccessToken,
  verifyRefreshToken,
} from "./jwt.js";

export const authRouter = Router();

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

authRouter.post("/login", async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const { rows } = await pool.query(
    "SELECT id, email, password_hash, role FROM users WHERE email = $1",
    [parsed.data.email]
  );
  const user = rows[0];
  // Always run bcrypt to avoid timing oracle
  const ok = user
    ? await bcrypt.compare(parsed.data.password, user.password_hash)
    : await bcrypt.compare(parsed.data.password, "$2a$12$invalidsaltinvalidsaltiux1OqgQk2cqI2.0OQk7BFkVlhM6Vq1aS");
  if (!user || !ok) return res.status(401).json({ error: "Invalid credentials" });

  const access = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  const refresh = newRefreshToken(user.id);

  await pool.query(
    `INSERT INTO refresh_tokens (jti, user_id, expires_at, user_agent, ip)
     VALUES ($1, $2, $3, $4, $5)`,
    [refresh.jti, user.id, refresh.expiresAt, req.headers["user-agent"] || null, req.ip]
  );

  res.cookie("rt", refresh.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
    expires: refresh.expiresAt,
  });

  res.json({
    accessToken: access,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

authRouter.post("/refresh", async (req, res) => {
  const token = req.cookies?.rt;
  if (!token) return res.status(401).json({ error: "No refresh token" });

  let claims;
  try {
    claims = verifyRefreshToken(token);
  } catch {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  const { rows } = await pool.query(
    `SELECT rt.jti, rt.revoked_at, rt.expires_at, u.email, u.role
       FROM refresh_tokens rt
       JOIN users u ON u.id = rt.user_id
      WHERE rt.jti = $1 AND rt.user_id = $2`,
    [claims.jti, claims.sub]
  );
  const row = rows[0];
  if (!row || row.revoked_at || new Date(row.expires_at) < new Date()) {
    return res.status(401).json({ error: "Refresh token revoked or expired" });
  }

  // Rotate: revoke old, issue new
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
    sameSite: "strict",
    path: "/api/auth",
    expires: next.expiresAt,
  });

  const access = signAccessToken({ sub: claims.sub, email: row.email, role: row.role });
  res.json({ accessToken: access, user: { id: claims.sub, email: row.email, role: row.role } });
});

authRouter.post("/logout", async (req, res) => {
  const token = req.cookies?.rt;
  if (token) {
    try {
      const claims = verifyRefreshToken(token);
      await pool.query("UPDATE refresh_tokens SET revoked_at = now() WHERE jti = $1", [claims.jti]);
    } catch {
      /* ignore */
    }
  }
  res.clearCookie("rt", { path: "/api/auth" });
  res.json({ ok: true });
});
