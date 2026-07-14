
# What we're building

A **React replica of visionaize.com** with your own backend — no WordPress, no Lovable Cloud.

## The two pieces

**1. Frontend (this Lovable project)**
- React + TanStack Start + Tailwind v4
- Every page from visionaize.com rebuilt as native React components (no WordPress HTML)
- Reads content from your API, renders it with hand-designed layouts
- Already built: Home, Header, Footer, Contact, Blog index, dynamic page/blog/service routes

**2. Backend (`/server` folder — you deploy on your own server)**
- Node 20 + Express + Postgres + JWT auth
- Public API for the site to read content
- Admin API for editing pages/posts (CMS)
- Serves the 6 GB of media from `/uploads/`
- Already built: full API, auth, DB schema, seed scripts

## Data flow

```text
visionaize.com (old WP)
   │
   │  scraped + SQL parsed → content-structured.json (150 pages, plain text + image refs)
   │  6 GB media → server/uploads/YYYY/MM/...
   ▼
Your Postgres  ◄── seed.ts loads JSON into `content` table
   ▲
   │  /api/public/content/:type/:slug
   │
Your Node API (server/)  ──/uploads/*──►  serves media
   ▲
   │  fetch
   │
React frontend (this repo)  ──renders──►  visitors
```

## Where we are now

- ✅ Backend API + DB schema + auth
- ✅ Content extracted from WP SQL into structured JSON (150 items)
- ✅ Media list ready (332 files) — you said you'll commit them into git
- ✅ Frontend shell: Home, Header, Footer, Contact, generic page template
- ⏳ Per-template designs (Industries, Platforms, Leadership, Case studies) — still using the generic template
- ⏳ `/admin` CMS UI for editing content — not started
- ⏳ Hooking up the committed media folder (rewrite URLs so `visionaize.com/wp-content/uploads/...` → `/uploads/...`)

## What I need from you to pick the next step

Which of these should I do next?

1. **Hand-design the remaining page templates** (Industry, Platform, Leadership, Case study) so the site looks like the real visionaize.com instead of the generic layout
2. **Build the `/admin` CMS UI** (login + edit pages/posts with rich text editor)
3. **Wire up your committed media folder** (generate the URL-rewrite map so images load from `/uploads/` instead of visionaize.com)
4. **Polish Home + Header + Footer to pixel-match visionaize.com** before anything else

If anything in the above is wrong about what you want, tell me and I'll revise the plan.
