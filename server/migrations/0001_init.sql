-- Visionaize CMS — initial schema
-- Run with: psql $DATABASE_URL -f migrations/0001_init.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "citext";

-- ---------- USERS & AUTH ----------
CREATE TABLE IF NOT EXISTS users (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email           citext UNIQUE NOT NULL,
  password_hash   text NOT NULL,
  role            text NOT NULL DEFAULT 'editor' CHECK (role IN ('admin','editor')),
  display_name    text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  jti          uuid PRIMARY KEY,
  user_id      uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at   timestamptz NOT NULL,
  revoked_at   timestamptz,
  user_agent   text,
  ip           inet,
  created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_refresh_user ON refresh_tokens(user_id);

-- ---------- CONTENT ----------
-- Generic content entity used for pages, posts, projects, services.
-- post_type distinguishes them; each has slug unique within type.
CREATE TABLE IF NOT EXISTS content (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_type         text NOT NULL CHECK (post_type IN ('page','post','project','service','platform','solution')),
  slug              text NOT NULL,
  title             text NOT NULL,
  excerpt           text,
  content_html      text,
  content_json      jsonb,
  cover_image       text,
  category          text,
  order_index       int  NOT NULL DEFAULT 0,
  seo_title         text,
  seo_description   text,
  og_image          text,
  published         boolean NOT NULL DEFAULT false,
  published_at      timestamptz,
  author_id         uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_type, slug)
);
CREATE INDEX IF NOT EXISTS idx_content_type_pub ON content(post_type, published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_slug      ON content(slug);

-- ---------- NAVIGATION ----------
CREATE TABLE IF NOT EXISTS nav_menu (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location    text UNIQUE NOT NULL,   -- 'header', 'footer-primary', 'footer-secondary'
  items_json  jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- ---------- SITE SETTINGS ----------
CREATE TABLE IF NOT EXISTS site_settings (
  key        text PRIMARY KEY,
  value_json jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------- CONTACT FORM ----------
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       citext NOT NULL,
  company     text,
  phone       text,
  message     text NOT NULL,
  source_page text,
  ip          inet,
  user_agent  text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  handled_at  timestamptz
);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);

-- ---------- UPDATED_AT TRIGGERS ----------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS trg_users_updated     ON users;
DROP TRIGGER IF EXISTS trg_content_updated   ON content;
DROP TRIGGER IF EXISTS trg_nav_updated       ON nav_menu;
DROP TRIGGER IF EXISTS trg_settings_updated  ON site_settings;

CREATE TRIGGER trg_users_updated    BEFORE UPDATE ON users           FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_content_updated  BEFORE UPDATE ON content         FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_nav_updated      BEFORE UPDATE ON nav_menu        FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_settings_updated BEFORE UPDATE ON site_settings   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
