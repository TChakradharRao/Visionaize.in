/**
 * Download every WP attachment referenced by content-structured.json into
 * server/uploads/, preserving the /wp-content/uploads/YYYY/MM/ path so URLs stay
 * deterministic and easy to swap. Concurrent, resumable, polite (skips files
 * that already exist on disk).
 *
 * Run on the server (where 6 GB egress is fine):
 *   npm run download-attachments
 */
import "dotenv/config";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

// visionaize.com sits behind Sucuri Cloudproxy whose intermediate cert isn't
// in every system trust store; relax TLS verification for this download job.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";



const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const UPLOADS_DIR = join(ROOT, "uploads");
const LIST_FILE = join(ROOT, "seed", "attachments-list.json");
const MAP_FILE = join(ROOT, "seed", "attachments-map.json");

const CONCURRENCY = Number(process.env.DL_CONCURRENCY || 8);
const PUBLIC_PREFIX = process.env.PUBLIC_UPLOADS_PREFIX || "/uploads";

function localPathFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const m = u.pathname.match(/\/wp-content\/uploads\/(.+)$/);
    if (!m) return null;
    return m[1]; // e.g. 2023/05/foo.jpg
  } catch {
    return null;
  }
}

async function exists(p: string) {
  try { const s = await stat(p); return s.size > 0; } catch { return false; }
}

async function downloadOne(url: string): Promise<{ url: string; localPath: string | null; publicUrl: string | null; error?: string }> {
  const rel = localPathFromUrl(url);
  if (!rel) return { url, localPath: null, publicUrl: null, error: "not a wp-content/uploads URL" };
  const dest = join(UPLOADS_DIR, rel);
  const publicUrl = `${PUBLIC_PREFIX}/${rel}`;

  if (await exists(dest)) return { url, localPath: dest, publicUrl };

  await mkdir(dirname(dest), { recursive: true });

  let lastErr = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": UA, "Referer": "https://visionaize.com/" } });
      if (!res.ok) { lastErr = `HTTP ${res.status}`; await sleep(500 * (attempt + 1)); continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(dest, buf);
      return { url, localPath: dest, publicUrl };
    } catch (e) {
      lastErr = (e as Error).message;
      await sleep(500 * (attempt + 1));
    }
  }
  return { url, localPath: null, publicUrl: null, error: lastErr };
}

async function main() {
  const list: string[] = JSON.parse(await readFile(LIST_FILE, "utf8"));
  console.log(`Downloading ${list.length} attachments → ${UPLOADS_DIR}`);
  const results: Record<string, string> = {};
  const failed: { url: string; error: string }[] = [];

  let i = 0;
  async function worker(id: number) {
    while (i < list.length) {
      const my = i++;
      const url = list[my];
      const r = await downloadOne(url);
      if (r.publicUrl) {
        results[url] = r.publicUrl;
        if (my % 25 === 0) console.log(`  [${my + 1}/${list.length}] ${url}`);
      } else {
        failed.push({ url, error: r.error || "unknown" });
        console.warn(`  ! [${my + 1}/${list.length}] ${url}  ${r.error}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, (_, k) => worker(k)));

  await writeFile(MAP_FILE, JSON.stringify(results, null, 2));
  console.log(`\nDone. ${Object.keys(results).length} succeeded, ${failed.length} failed.`);
  console.log(`Map written → ${MAP_FILE}`);
  if (failed.length) {
    await writeFile(join(ROOT, "seed", "attachments-failed.json"), JSON.stringify(failed, null, 2));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
