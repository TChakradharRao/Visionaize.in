import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { authRouter } from "./auth/routes.js";
import { contentRouter } from "./routes/content.js";
import { contactRouter } from "./routes/contact.js";
import { menusRouter } from "./routes/menus.js";
import { settingsRouter } from "./routes/settings.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = process.env.UPLOADS_DIR || join(__dirname, "..", "uploads");

const app = express();
const PORT = Number(process.env.PORT || 4000);

// CORS origins are intentionally unrestricted for now (see app.use(cors) below).

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
// CORS: allow any origin. Reflect the request's Origin header so credentialed
// requests (cookies for refresh tokens) still work — browsers reject
// `Access-Control-Allow-Origin: *` together with credentials.
app.use(cors({
  origin: (origin, cb) => cb(null, origin || true),
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning", "X-Requested-With", "Accept", "Origin"],
  maxAge: 86400,
}));
app.options("*", cors());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(pinoHttp());

app.get("/api/health", (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Serve downloaded WordPress attachments from <server>/uploads at /uploads/*
app.use(
  "/uploads",
  express.static(UPLOADS_DIR, {
    immutable: true,
    maxAge: "30d",
    fallthrough: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api", contentRouter);
app.use("/api", contactRouter);
app.use("/api", menusRouter);
app.use("/api", settingsRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Visionaize API listening on :${PORT}`);
});
