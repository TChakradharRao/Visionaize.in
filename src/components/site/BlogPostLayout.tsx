import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import type { BlogPost, ContentBlock } from "@/lib/blogData";

// Re-exported so existing imports of `StaticBlogPost` / `ContentBlock` from
// this file keep working; the real source of truth now lives in blogData.ts.
export type { ContentBlock };
export type StaticBlogPost = BlogPost;

function optimized(url: string): string {
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=1200&output=webp&q=85`;
}

function Block({ block, i }: { block: ContentBlock; i: number }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-12 text-2xl md:text-3xl font-bold text-brand-navy first:mt-0">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="mt-8 text-xl font-bold text-brand-navy">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="mt-4 text-lg leading-relaxed text-brand-ink/80">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mt-4 space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 text-lg leading-relaxed text-brand-ink/80">
              <span
                aria-hidden
                className="mt-3 inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-lime"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={i} className="mt-6 overflow-x-auto rounded-xl border border-brand-navy/10">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-brand-mist/60">
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    className="px-5 py-3 text-sm font-semibold uppercase tracking-wide text-brand-navy"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className={r % 2 === 1 ? "bg-brand-mist/20" : undefined}>
                  {row.map((cell, c) => (
                    <td key={c} className="px-5 py-3 text-brand-ink/80 border-t border-brand-navy/10">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

function ShareSidebar({ title, url }: { title: string; url: string }) {
  const shareLinks = [
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      bg: "bg-[#1877F2] hover:bg-[#1877F2]/90",
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      bg: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      bg: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
      bg: "bg-brand-ink/60 hover:bg-brand-ink/80",
    },
  ];

  return (
    <div className="hidden lg:flex fixed left-6 top-32 z-30 flex-col items-center gap-3">
      <span className="mb-1 text-sm font-medium text-brand-ink/60">Share</span>
      {shareLinks.map(({ label, icon: Icon, href, bg }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${label}`}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-white shadow-sm transition ${bg}`}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

function ShareRowMobile({ title, url }: { title: string; url: string }) {
  const shareLinks = [
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="mt-12 flex items-center gap-3 border-t border-brand-navy/10 pt-8 lg:hidden">
      <span className="text-sm font-medium text-brand-ink/60">Share:</span>
      {shareLinks.map(({ label, icon: Icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${label}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy transition hover:bg-brand-navy hover:text-white"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export function BlogPostLayout({ post }: { post: BlogPost }) {
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pt-4 pb-8 md:pt-6 md:pb-10">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-brand-navy">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-col gap-2 text-sm text-brand-ink/60">
          <div>
            {post.author && <span>{post.author}</span>}
            {post.author && post.published_at && <span> · </span>}
            {post.published_at &&
              new Date(post.published_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            {post.reading_time && <span> · {post.reading_time} read</span>}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {post.category && (
              <span className="rounded-full bg-brand-mist/60 px-3 py-1 text-xs font-medium text-brand-navy">
                {post.category}
              </span>
            )}
            {post.tags?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-brand-navy/10 px-3 py-1 text-xs text-brand-ink/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Body content */}
        {post.cover_image && (
          <div className="mt-8">
            <img
              src={optimized(post.cover_image)}
              alt={post.title}
              className="w-full rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        )}

        {post.excerpt && (
          <p className="mt-6 text-xl text-brand-ink/80">{post.excerpt}</p>
        )}

        <div className="mt-8">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} i={i} />
          ))}
        </div>

        <ShareRowMobile title={post.title} url={url} />
      </div>

      <ShareSidebar title={post.title} url={url} />
    </article>
  );
}