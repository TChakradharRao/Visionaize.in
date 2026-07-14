import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

type InsightSection = {
  title: string;
  body: string;
  bullets?: string[];
  image?: string;
  reverse?: boolean;
};

type InsightCard = {
  title: string;
  description: string;
  href: string;
  eyebrow?: string;
};

type InsightPageProps = {
  title: string;
  eyebrow?: string;
  intro: string;
  heroImage?: string;
  stats?: Array<{ label: string; value: string }>;
  sections?: InsightSection[];
  cards?: InsightCard[];
  cta?: { label: string; href: string; secondaryLabel?: string; secondaryHref?: string };
  children?: ReactNode;
};

export function InsightPage({
  title,
  eyebrow = "Insights",
  intro,
  heroImage,
  stats,
  sections = [],
  cards = [],
  cta,
  children,
}: InsightPageProps) {
  return (
    <>
      <Header />
      <main className="bg-white text-brand-ink">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#163b56] to-brand-blue text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-lime">{eyebrow}</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl text-white">{title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
              {cta && (
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to={cta.href}
                    className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand-navy transition hover:bg-white/90"
                  >
                    {cta.label}
                  </Link>
                  {cta.secondaryLabel && cta.secondaryHref && (
                    <Link
                      to={cta.secondaryHref}
                      className="inline-flex items-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      {cta.secondaryLabel}
                    </Link>
                  )}
                </div>
              )}
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur">
              {heroImage ? (
                <img src={heroImage} alt={title} className="h-64 w-full rounded-2xl object-cover" loading="eager" />
              ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/30 bg-white/5 text-center text-sm text-white/80">
                  A modern industrial experience built around digital twins and AI.
                </div>
              )}
              {stats && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/20 bg-black/10 p-4">
                      <p className="text-2xl font-semibold">{stat.value}</p>
                      <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {children}

        {sections.length > 0 && (
          <section className="mx-auto max-w-7xl space-y-10 px-6 py-20">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className={`grid items-center gap-10 rounded-[2rem] border border-border bg-[#f8fbfd] p-8 lg:grid-cols-2 lg:p-12 ${
                  section.reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-blue">
                    Section {index + 1}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-brand-navy">{section.title}</h2>
                  <p className="mt-5 whitespace-pre-line text-base leading-8 text-brand-ink/80">{section.body}</p>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-brand-ink/80">
                          <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-lime" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {section.image ? (
                  <img src={section.image} alt={section.title} className="w-full rounded-2xl object-cover" loading="lazy" />
                ) : (
                  <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-brand-blue/20 bg-white text-center text-sm text-brand-ink/60">
                    A content-driven section designed to mirror the original Visionaize page structure.
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {cards.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 pb-20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <Link
                  key={card.title}
                  to={card.href}
                  className="group rounded-[1.5rem] border border-border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {card.eyebrow && <p className="text-sm uppercase tracking-[0.25em] text-brand-blue">{card.eyebrow}</p>}
                  <h3 className="mt-3 text-xl font-semibold text-brand-navy">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-ink/75">{card.description}</p>
                  <span className="mt-6 inline-flex text-sm font-semibold text-brand-blue">Read more →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
