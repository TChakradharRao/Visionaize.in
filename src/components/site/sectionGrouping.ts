import type { ContentSection } from "@/lib/api";

export type Block =
  | { kind: "trio"; sections: ContentSection[] }
  | { kind: "people"; sections: ContentSection[] }
  | { kind: "quote"; section: ContentSection }
  | { kind: "zigzag"; section: ContentSection; index: number }
  | { kind: "rich"; section: ContentSection; index: number }
  | { kind: "cta"; section: ContentSection };

const QUOTE_RE = /^["“”'']/;

function isPerson(s: ContentSection): boolean {
  if (!s.heading) return false;
  const words = s.heading.trim().split(/\s+/);
  if (words.length < 2 || words.length > 4) return false;
  // Capitalized words (names)
  const looksName = words.every((w) => /^[A-Z][a-zA-Z.'-]+$/.test(w));
  return looksName && s.images.length === 1 && s.bullets.length <= 2 && s.paragraphs.length <= 1;
}

function isBenefit(s: ContentSection): boolean {
  if (!s.heading) return false;
  const words = s.heading.trim().split(/\s+/);
  if (words.length > 5) return false;
  if (s.bullets.length > 0) return false;
  if (s.paragraphs.length > 2) return false;
  if (s.images.length > 1) return false;
  return true;
}

function isQuote(s: ContentSection): boolean {
  if (s.heading && QUOTE_RE.test(s.heading.trim())) return true;
  if (s.paragraphs.length === 1 && QUOTE_RE.test(s.paragraphs[0].trim())) return true;
  return false;
}

function isCTA(s: ContentSection): boolean {
  return s.ctas.length > 0 && !s.images.length && s.paragraphs.length <= 1 && !s.bullets.length;
}

export function groupSections(sections: ContentSection[]): Block[] {
  // Filter empty
  const items = sections.filter(
    (s) => s.heading || s.paragraphs.length || s.bullets.length || s.images.length || s.ctas.length
  );
  const blocks: Block[] = [];
  let i = 0;
  while (i < items.length) {
    const s = items[i];

    // People grid (3+ consecutive)
    if (isPerson(s)) {
      let j = i;
      const run: ContentSection[] = [];
      while (j < items.length && isPerson(items[j])) {
        run.push(items[j]);
        j++;
      }
      if (run.length >= 3) {
        blocks.push({ kind: "people", sections: run });
        i = j;
        continue;
      }
    }

    // Benefit trio (3+ consecutive short-heading paragraph blocks)
    if (isBenefit(s)) {
      let j = i;
      const run: ContentSection[] = [];
      while (j < items.length && isBenefit(items[j])) {
        run.push(items[j]);
        j++;
      }
      if (run.length >= 3) {
        blocks.push({ kind: "trio", sections: run });
        i = j;
        continue;
      }
    }

    if (isQuote(s)) {
      blocks.push({ kind: "quote", section: s });
      i++;
      continue;
    }

    if (isCTA(s)) {
      blocks.push({ kind: "cta", section: s });
      i++;
      continue;
    }

    // Image + text → zigzag feature row
    if (s.images.length >= 1 && (s.paragraphs.length || s.bullets.length)) {
      blocks.push({ kind: "zigzag", section: s, index: blocks.length });
      i++;
      continue;
    }

    blocks.push({ kind: "rich", section: s, index: blocks.length });
    i++;
  }
  return blocks;
}
