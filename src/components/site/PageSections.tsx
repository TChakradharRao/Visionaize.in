import type { ContentItem, ContentSection } from "@/lib/api";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
import { groupSections, type Block } from "./sectionGrouping";

/** Strip absolute visionaize.com URLs / WP suffixes from internal hrefs. */
function normalizeHref(href: string): string {
  if (!href) return "#";
  try {
    if (href.startsWith("/")) return href;
    const u = new URL(href);
    if (/visionaize\.com$/.test(u.hostname)) {
      return u.pathname.replace(/\/$/, "") || "/";
    }
    return href;
  } catch {
    return href;
  }
}

function CTAButton({
  label,
  href,
  variant = "primary",
}: {
  label: string;
  href: string;
  variant?: "primary" | "ghost" | "dark";
}) {
  const base = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition";
  const cls =
    variant === "primary"
      ? `${base} bg-brand-lime text-brand-navy shadow-sm hover:brightness-95`
      : variant === "dark"
        ? `${base} bg-brand-navy text-white hover:bg-brand-navy/90`
        : `${base} border border-brand-navy/20 text-brand-navy hover:bg-brand-navy/5`;
  const internal = normalizeHref(href);
  const isInternal = internal.startsWith("/");
  if (isInternal) {
    return (
      <Link to={internal} className={cls}>
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {label} <ArrowRight className="h-4 w-4" />
    </a>
  );
}

/* ---------------- Hero ---------------- */

export function PageHero({ item, eyebrow }: { item: ContentItem; eyebrow?: string }) {
  const heroImage =
    item.cover_image ||
    item.content_json?.sections?.find((s) => s.images.length)?.images[0]?.src ||
    null;

  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      {/* Decorative gradient field */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 15% 20%, rgba(166,255,79,0.18), transparent 60%), radial-gradient(50% 40% at 85% 75%, rgba(80,160,255,0.25), transparent 60%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          {eyebrow && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-lime/40 bg-brand-lime/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            {item.title}
          </h1>
          {item.excerpt && (
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/75 md:text-xl">
              {item.excerpt.length > 220 ? item.excerpt.slice(0, 220).trim() + "…" : item.excerpt}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton label="Talk to an expert" href="/contact" />
            <CTAButton label="Explore platform" href="/products" variant="ghost" />
          </div>
        </div>
        {heroImage && (
          <div className="md:col-span-5">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-3xl bg-brand-lime/20 blur-2xl"
              />
              <img
                src={heroImage}
                alt={item.title}
                className="relative w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Block primitives ---------------- */

function TrioBlock({ sections }: { sections: ContentSection[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((s, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-brand-navy/10 bg-gradient-to-b from-white to-brand-mist/40 p-8 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-lime">
                <span className="text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-navy">{s.heading}</h3>
              {s.paragraphs[0] && (
                <p className="mt-3 text-brand-ink/75 leading-relaxed">{s.paragraphs[0]}</p>
              )}
              {s.images[0] && (
                <img
                  src={s.images[0].src}
                  alt={s.images[0].alt || s.heading || ""}
                  className="mt-6 h-40 w-full rounded-lg object-cover"
                  loading="lazy"
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ZigzagBlock({ section, index }: { section: ContentSection; index: number }) {
  const reverse = index % 2 === 1;
  const img = section.images[0];
  return (
    <section className={index % 2 === 1 ? "bg-brand-mist/40" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className={`grid items-center gap-12 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
          {img && (
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 rounded-3xl bg-brand-blue/10 blur-2xl" />
              <img
                src={img.src}
                alt={img.alt || section.heading || ""}
                className="relative w-full rounded-2xl object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          )}
          <div>
            {section.heading && (
              <h2 className="text-balance text-3xl font-bold text-brand-navy md:text-4xl">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.length > 0 && (
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-brand-ink/80">
                {section.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            {section.bullets.length > 0 && (
              <ul className="mt-6 space-y-3 text-brand-ink/80">
                {section.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-lime"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.ctas.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3">
                {section.ctas.map((c, i) => (
                  <CTAButton
                    key={i}
                    label={c.label}
                    href={c.href}
                    variant={i === 0 ? "primary" : "ghost"}
                  />
                ))}
              </div>
            )}
            {/* Extra images stacked below */}
            {section.images.length > 1 && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                {section.images.slice(1).map((im, i) => (
                  <img
                    key={i}
                    src={im.src}
                    alt={im.alt || ""}
                    className="w-full rounded-lg object-cover shadow-sm"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RichBlock({ section, index }: { section: ContentSection; index: number }) {
  return (
    <section className={index % 2 === 1 ? "bg-brand-mist/40" : "bg-white"}>
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        {section.heading && (
          <h2 className="text-balance text-3xl font-bold text-brand-navy md:text-4xl">
            {section.heading}
          </h2>
        )}
        {section.paragraphs.length > 0 && (
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-brand-ink/80">
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        {section.bullets.length > 0 && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {section.bullets.map((b, i) => (
              <li
                key={i}
                className="rounded-xl border border-brand-navy/10 bg-white p-4 text-brand-ink/85 shadow-sm"
              >
                <div className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-2 w-2 flex-none rounded-full bg-brand-lime"
                  />
                  <span>{b}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {section.ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {section.ctas.map((c, i) => (
              <CTAButton key={i} label={c.label} href={c.href} variant={i === 0 ? "primary" : "ghost"} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function PeopleBlock({ sections }: { sections: ContentSection[] }) {
  return (
    <section className="bg-brand-mist/40">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Leadership
          </p>
          <h2 className="text-3xl font-bold text-brand-navy md:text-4xl">Meet the team</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-xl"
            >
              {s.images[0] && (
                <div className="aspect-[4/5] overflow-hidden bg-brand-mist">
                  <img
                    src={s.images[0].src}
                    alt={s.images[0].alt || s.heading || ""}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-navy">{s.heading}</h3>
                {s.bullets[0] && (
                  <p className="mt-1 text-sm font-medium uppercase tracking-wide text-brand-blue">
                    {s.bullets[0]}
                  </p>
                )}
                {s.paragraphs[0] && (
                  <p className="mt-3 text-sm leading-relaxed text-brand-ink/75">
                    {s.paragraphs[0]}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteBlock({ section }: { section: ContentSection }) {
  const text = section.heading || section.paragraphs[0] || "";
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Quote className="mx-auto mb-6 h-10 w-10 text-brand-lime" />
        <blockquote className="text-balance text-2xl font-medium leading-relaxed md:text-3xl">
          {text.replace(/^["“”'']|["“”'']$/g, "")}
        </blockquote>
        {section.bullets[0] && (
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-brand-lime">
            — {section.bullets[0]}
          </p>
        )}
      </div>
    </section>
  );
}

function CTABlock({ section }: { section: ContentSection }) {
  return (
    <section className="text-white bg-[linear-gradient(120deg,#0F2740_0%,#0A78B9_45%,#34A2A5_78%,#A5CE39_100%)]">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-3xl font-bold md:text-4xl">
            {section.heading || section.paragraphs[0]}
          </h3>
          {section.heading && section.paragraphs[0] && (
            <p className="mt-2 text-white/75">{section.paragraphs[0]}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {section.ctas.map((c, i) => (
            <CTAButton
              key={i}
              label={c.label}
              href={c.href}
              variant={i === 0 ? "primary" : "ghost"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Orchestrator ---------------- */

export function RenderSections({ sections }: { sections: ContentSection[] }) {
  const blocks = groupSections(sections);
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "trio":
            return <TrioBlock key={i} sections={b.sections} />;
          case "people":
            return <PeopleBlock key={i} sections={b.sections} />;
          case "quote":
            return <QuoteBlock key={i} section={b.section} />;
          case "cta":
            return <CTABlock key={i} section={b.section} />;
          case "zigzag":
            return <ZigzagBlock key={i} section={b.section} index={i} />;
          case "rich":
            return <RichBlock key={i} section={b.section} index={i} />;
        }
        return null as never;
      })}
    </>
  );
}

/* ---------------- Backward-compatible exports ---------------- */

export function RichSection({ section, index }: { section: ContentSection; index: number }) {
  // Kept for any older callers — dispatch single section through grouper.
  return <RenderSections sections={[section]} />;
}

export function CTASection({ title, href = "/contact" }: { title?: string; href?: string }) {
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div>
          <h3 className="text-3xl font-bold md:text-4xl">
            {title ?? "Ready to see Visionaize in action?"}
          </h3>
          <p className="mt-2 text-white/70">
            Talk to our team about your industrial AI roadmap.
          </p>
        </div>
        <CTAButton label="Talk to an expert" href={href} />
      </div>
    </section>
  );
}

export { Block };
