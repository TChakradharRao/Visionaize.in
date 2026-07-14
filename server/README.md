# Visionaize API server

Node 20 + Express + Postgres backend for the Visionaize React frontend.
You deploy this on your own server next to your Postgres database; the
React app talks to it via `VITE_API_BASE_URL`.

## Quick start

```bash
cd server
cp .env.example .env
# Fill DATABASE_URL, JWT_*_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install

# 1. Create tables in your Postgres
npm run migrate
# (or: psql $DATABASE_URL -f migrations/0001_init.sql)

# 2. Create the first admin user (uses ADMIN_EMAIL/ADMIN_PASSWORD from .env)
npm run create-admin

# 3. Seed content (reads seed/content-seed.json — currently a stub)
npm run seed

# 4. Run
npm run dev          # development with tsx watch
npm run build && npm start  # production
```

## Generate JWT secrets

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Use a different value for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.

## API surface

### Public (no auth)
- `GET  /api/health`
- `GET  /api/public/settings`
- `GET  /api/public/menus`
- `GET  /api/public/content/:postType`              — list published
- `GET  /api/public/content/:postType/:slug`        — single published
- `POST /api/public/contact`                        — contact form (rate-limited 5/min)

### Auth
- `POST /api/auth/login`        — `{ email, password }` → `{ accessToken, user }` + httpOnly refresh cookie
- `POST /api/auth/refresh`      — rotates refresh cookie, returns new access token
- `POST /api/auth/logout`       — revokes refresh token

### Admin (Bearer access token, role=admin)
- `GET    /api/admin/content/:postType`
- `POST   /api/admin/content`            — upsert by (post_type, slug)
- `PUT    /api/admin/content/:id`
- `DELETE /api/admin/content/:id`
- `PUT    /api/admin/menus`
- `PUT    /api/admin/settings`
- `GET    /api/admin/contact`

`post_type` is one of: `page`, `post`, `project`, `service`, `platform`, `solution`.

## Deploy

### Option A — bare metal / VPS with PM2
```bash
npm run build
pm2 start dist/index.js --name visionaize-api
pm2 save
```

### Option B — systemd
Create `/etc/systemd/system/visionaize-api.service`:
```ini
[Unit]
Description=Visionaize API
After=network.target postgresql.service

[Service]
WorkingDirectory=/opt/visionaize/server
EnvironmentFile=/opt/visionaize/server/.env
ExecStart=/usr/bin/node dist/index.js
Restart=always
User=visionaize

[Install]
WantedBy=multi-user.target
```

### Option C — Docker
Create `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
COPY migrations ./migrations
EXPOSE 4000
CMD ["node", "dist/index.js"]
```

## Reverse-proxy snippet (nginx)

```nginx
location /api/ {
  proxy_pass http://127.0.0.1:4000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

The React frontend is served separately (any static host); set `VITE_API_BASE_URL=https://your-domain.com` so calls hit `/api/...` through the same domain.
