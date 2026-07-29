/* eslint-disable prettier/prettier */
const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in backend/.env or environment");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on("connect", (client) => {
  client
    .query("SET search_path TO visionaize, public")
    .catch((err) => console.error("Failed to set search_path:", err));
});

async function ensureUsersRoleConstraint() {
  const client = await pool.connect();
  try {
    await client.query("SET search_path TO visionaize, public");
    const { rows } = await client.query(`
      SELECT conname, pg_get_constraintdef(oid) AS definition
      FROM pg_constraint
      WHERE conrelid = 'visionaize.users'::regclass
        AND contype = 'c'
        AND conname = 'users_role_check'
    `);

    const constraint = rows[0];
    if (!constraint) {
      return;
    }

    const definition = String(constraint.definition || "");
    if (definition.includes("'viewer'")) {
      return;
    }

    await client.query(`
      ALTER TABLE visionaize.users
      DROP CONSTRAINT IF EXISTS users_role_check;
      ALTER TABLE visionaize.users
      ADD CONSTRAINT users_role_check CHECK (role IN ('admin','editor','viewer'));
    `);
    console.log("Updated users role constraint to allow the 'viewer' role.");
  } catch (err) {
    console.error("Failed to ensure users role constraint:", err);
  } finally {
    client.release();
  }
}

ensureUsersRoleConstraint().catch((err) => {
  console.error("Failed to ensure users role constraint on startup:", err);
});

module.exports = pool;
