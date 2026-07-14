import "dotenv/config";
import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pool } from "../src/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = join(__dirname, "..", "migrations");

const files = (await readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith(".sql")).sort();
for (const f of files) {
  console.log(`Running ${f}...`);
  const sql = await readFile(join(MIGRATIONS_DIR, f), "utf8");
  await pool.query(sql);
}
console.log("Migrations complete.");
await pool.end();
