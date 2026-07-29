/* eslint-disable prettier/prettier */
const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "change-me-access";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "change-me-refresh";
const ACCESS_TTL = process.env.ACCESS_TOKEN_TTL || "15m";
const REFRESH_TTL_DAYS = Number(process.env.REFRESH_TOKEN_TTL_DAYS || 7);

function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}

function newRefreshToken(userId) {
  const jti = require("crypto").randomUUID();
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  const token = jwt.sign({ sub: userId, jti }, REFRESH_SECRET, { expiresIn: `${REFRESH_TTL_DAYS}d` });
  return { token, jti, expiresAt };
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

module.exports = { signAccessToken, verifyAccessToken, newRefreshToken, verifyRefreshToken };
