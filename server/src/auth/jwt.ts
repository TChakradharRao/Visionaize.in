import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_TTL = process.env.ACCESS_TOKEN_TTL || "15m";
const REFRESH_TTL_DAYS = Number(process.env.REFRESH_TOKEN_TTL_DAYS || 7);

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set");
}

export interface AccessClaims {
  sub: string;          // user id
  email: string;
  role: "admin" | "editor";
}

export interface RefreshClaims {
  sub: string;
  jti: string;
}

export function signAccessToken(claims: AccessClaims): string {
  return jwt.sign(claims, ACCESS_SECRET, { expiresIn: ACCESS_TTL as any });
}

export function verifyAccessToken(token: string): AccessClaims {
  return jwt.verify(token, ACCESS_SECRET) as AccessClaims;
}

export function newRefreshToken(userId: string): {
  token: string;
  jti: string;
  expiresAt: Date;
} {
  const jti = randomUUID();
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  const token = jwt.sign({ sub: userId, jti } as RefreshClaims, REFRESH_SECRET, {
    expiresIn: `${REFRESH_TTL_DAYS}d`,
  });
  return { token, jti, expiresAt };
}

export function verifyRefreshToken(token: string): RefreshClaims {
  return jwt.verify(token, REFRESH_SECRET) as RefreshClaims;
}
