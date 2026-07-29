/* eslint-disable prettier/prettier */
const { verifyAccessToken } = require("./utils/jwt");

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  }

  try {
    const token = header.slice(7);
    const claims = verifyAccessToken(token);
    req.user = claims;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = { requireAuth };
