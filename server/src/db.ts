import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const DB_SCHEMA = process.env.DB_SCHEMA ?? "visionaize";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30_000,
});

// Set default search_path for every new connection so unqualified table
// references resolve to the `visionaize` schema first.
pool.on("connect", (client) => {
  client.query(`SET search_path TO ${DB_SCHEMA}, public`).catch((err) => {
    console.error("Failed to set search_path:", err);
  });
});

export type DbClient = pg.PoolClient;
