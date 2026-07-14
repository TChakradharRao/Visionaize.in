#!/usr/bin/env python3
"""
Re-parse server/seed/content-seed.json:
  - strip raw HTML
  - extract per-page structured sections (headings, paragraphs, bullets, images, CTAs)
  - collect all attachment URLs into a flat list for the downloader
Outputs:
  server/seed/content-structured.json
  server/seed/attachments-list.json
"""
import json, re, os, html, sys
from urllib.parse import urlparse
from bs4 import BeautifulSoup, NavigableString

SRC = "server/seed/content-seed.json"
OUT = "server/seed/content-structured.json"
ATT = "server/seed/attachments-list.json"

WP_HOSTS = {"visionaize.com", "www.visionaize.com"}

def is_wp_attachment(url: str) -> bool:
    try:
        u = urlparse(url)
    except Exception:
        return False
    if u.netloc and u.netloc not in WP_HOSTS:
        return False
    return "/wp-content/uploads/" in u.path

def norm_url(url: str) -> str:
    if not url: return url
    if url.startswith("//"): return "https:" + url
    if url.startswith("/"): return "https://visionaize.com" + url
    return url

def text_of(el) -> str:
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True)).strip()

def extract_sections(html_str: str):
    soup = BeautifulSoup(html_str or "", "html.parser")
    # remove scripts/styles/noscript
    for t in soup(["script", "style", "noscript"]):
        t.decompose()

    sections = []
    current = {"heading": None, "level": 2, "paragraphs": [], "bullets": [], "images": [], "ctas": []}

    def flush():
        nonlocal current
        has_content = (current["heading"] or current["paragraphs"] or current["bullets"]
                       or current["images"] or current["ctas"])
        if has_content:
            sections.append(current)
        current = {"heading": None, "level": 2, "paragraphs": [], "bullets": [], "images": [], "ctas": []}

    # walk top-level descendants in document order
    for el in soup.descendants:
        if isinstance(el, NavigableString):
            continue
        name = el.name
        if name in ("h1", "h2", "h3"):
            t = text_of(el)
            if not t: continue
            # new section on h2/h3
            if name in ("h2", "h3"):
                flush()
                current["heading"] = t
                current["level"] = int(name[1])
            else:
                # h1 -> page title, skip (already in title field)
                pass
        elif name == "p":
            t = text_of(el)
            if t and len(t) > 1:
                current["paragraphs"].append(t)
            # also gather images / links inside p
            for img in el.find_all("img"):
                src = norm_url(img.get("src") or img.get("data-src") or "")
                if src:
                    current["images"].append({"src": src, "alt": img.get("alt") or ""})
            for a in el.find_all("a"):
                href = a.get("href") or ""
                txt = text_of(a)
                if href and txt and len(txt) < 80 and ("button" in (a.get("class") or []) or
                                                       any(k in (a.get("class") or []) for k in ["btn","cta"])):
                    current["ctas"].append({"label": txt, "href": href})
        elif name in ("ul", "ol"):
            for li in el.find_all("li", recursive=False):
                t = text_of(li)
                if t:
                    current["bullets"].append(t)
        elif name == "img":
            # standalone img (not already captured inside a <p>)
            if el.find_parent("p"): continue
            src = norm_url(el.get("src") or el.get("data-src") or "")
            if src:
                current["images"].append({"src": src, "alt": el.get("alt") or ""})
        elif name == "a":
            if el.find_parent("p"): continue
            href = el.get("href") or ""
            txt = text_of(el)
            classes = el.get("class") or []
            if href and txt and len(txt) < 80 and any(k in classes for k in ["button","btn","cta","elementor-button"]):
                current["ctas"].append({"label": txt, "href": href})

    flush()

    # final cleanup: dedupe empty trailing sections, dedupe paragraphs within a section
    cleaned = []
    seen_all = set()
    for s in sections:
        s["paragraphs"] = [p for p in dict.fromkeys(s["paragraphs"]) if p not in seen_all]
        for p in s["paragraphs"]:
            seen_all.add(p)
        s["bullets"] = list(dict.fromkeys(s["bullets"]))
        # de-dupe images by src
        seen_img = set(); imgs = []
        for im in s["images"]:
            if im["src"] in seen_img: continue
            seen_img.add(im["src"]); imgs.append(im)
        s["images"] = imgs
        if (s["heading"] or s["paragraphs"] or s["bullets"] or s["images"] or s["ctas"]):
            cleaned.append(s)
    return cleaned

def collect_all_images(html_str: str):
    soup = BeautifulSoup(html_str or "", "html.parser")
    out = []
    for img in soup.find_all("img"):
        src = norm_url(img.get("src") or img.get("data-src") or "")
        if src: out.append(src)
    # background-image style attrs
    for el in soup.find_all(style=True):
        m = re.findall(r"url\(([^)]+)\)", el["style"])
        for u in m:
            u = u.strip().strip('"').strip("'")
            out.append(norm_url(u))
    return out

def main():
    data = json.load(open(SRC))
    structured = []
    all_attachments = set()
    for item in data:
        h = item.get("content_html") or ""
        secs = extract_sections(h)
        imgs = collect_all_images(h)
        for u in imgs:
            if is_wp_attachment(u):
                all_attachments.add(u)
        cover = norm_url(item.get("cover_image") or "")
        if cover and is_wp_attachment(cover):
            all_attachments.add(cover)
        og = norm_url(item.get("og_image") or "")
        if og and is_wp_attachment(og):
            all_attachments.add(og)

        plain = " ".join(p for s in secs for p in s["paragraphs"])
        excerpt = item.get("excerpt") or (plain[:240] + ("…" if len(plain) > 240 else ""))

        structured.append({
            "post_type": item["post_type"],
            "slug": item["slug"],
            "title": item["title"],
            "excerpt": excerpt,
            "cover_image": cover,
            "category": item.get("category"),
            "order_index": item.get("order_index", 0),
            "seo_title": item.get("seo_title") or item["title"],
            "seo_description": item.get("seo_description") or excerpt[:160],
            "og_image": og or cover,
            "published": item.get("published", True),
            "date": item.get("_date"),
            "tags": item.get("_tags") or [],
            "sections": secs,
            "all_images": [norm_url(u) for u in imgs if u],
        })

    json.dump(structured, open(OUT, "w"), indent=2, ensure_ascii=False)
    json.dump(sorted(all_attachments), open(ATT, "w"), indent=2)
    print(f"wrote {OUT}: {len(structured)} items")
    print(f"wrote {ATT}: {len(all_attachments)} unique attachments")

if __name__ == "__main__":
    main()
