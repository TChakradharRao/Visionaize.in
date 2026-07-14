/**
 * After download-attachments.ts produces attachments-map.json, rewrite every
 * old visionaize.com URL inside content-structured.json + menus-seed.json
 * to the new /uploads/... URL.
 *
 *   npm run rewrite-urls
 */
import "dotenv/config";
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SEED = join(__dirname, "..", "seed");

async function main() {
  const map: Record<string, string> = JSON.parse(
    await readFile(join(SEED, "attachments-map.json"), "utf8")
  );
  const keys = Object.keys(map);
  if (!keys.length) {
    console.warn("attachments-map.json is empty — run download-attachments first.");
    return;
  }
  // Build a replacer that handles both http and https variants.
  function rewrite(text: string): string {
    let out = text;
    for (const [oldUrl, newUrl] of Object.entries(map)) {
      const alt = oldUrl.replace(/^https?:/, "https:");
      out = out.split(oldUrl).join(newUrl).split(alt).join(newUrl);
    }
    return out;
  }

  for (const file of ["content-structured.json", "menus-seed.json", "content-seed.json"]) {
    const p = join(SEED, file);
    try {
      const raw = await readFile(p, "utf8");
      const next = rewrite(raw);
      if (next !== raw) {
        await writeFile(p, next);
        console.log(`✔ rewrote URLs in ${file}`);
      } else {
        console.log(`· no changes in ${file}`);
      }
    } catch {
      console.log(`· skipped ${file} (not found)`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
