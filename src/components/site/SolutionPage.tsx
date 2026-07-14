import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export interface SolutionPageProps {
  title: string;
  heroParagraphs: string[];
  heroImage: string;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  problems: { title: string; body: string }[];
  introBand: {
    heading: string;
    paragraphs: string[];
  };
  benefits: {
    heading: ReactNode;
    image: string;
    bullets: string[];
  };
  caseStudy?: {
    title: string;
    image: string;
    tabs: { key: string; paragraphs: string[] }[];
  };
  faqHeading: string;
  faqs: { q: string; a: string[] }[];
  faqCtaLabel?: string;
}

function GradientPill({ children, href = "#" }: { children: ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
      style={{
        background: "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 45%,#2BA8C7 100%)",
      }}
    >
      {children}
    </a>
  );
}

export function SolutionPage(props: SolutionPageProps) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pt-14 pb-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1
              className="text-5xl md:text-6xl font-light leading-[1.1] tracking-tight bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 50%,#2BA8C7 100%)",
              }}
            >
              {props.title}
            </h1>
            <div className="mt-8 space-y-5 text-[15px] leading-7 text-slate-700">
              {props.heroParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <GradientPill href={props.heroCtaHref ?? "/contact"}>
                {props.heroCtaLabel ?? "Request a demo"}
              </GradientPill>
            </div>
          </div>
          <div>
            <img src={props.heroImage} alt="" className="w-full rounded-md shadow-xl" />
          </div>
        </div>
      </section>

      <div
        className="h-2 w-full"
        style={{ background: "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 50%,#2BA8C7 100%)" }}
      />

      {/* COMMON PROBLEMS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-4xl md:text-5xl font-light text-slate-900">
          Common Problems, Unique Solutions
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-4">
          {props.problems.map((p) => (
            <div key={p.title} className="text-center">
              <h3 className="text-2xl font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO BAND */}
      <section className="bg-[#D8F3FB]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
            {props.introBand.heading}
          </h2>
          <div className="mt-6 space-y-5 text-[15px] leading-7 text-slate-700">
            {props.introBand.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <img src={props.benefits.image} alt="" className="w-full rounded-md shadow-2xl" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900">
              {props.benefits.heading}
            </h2>
            <ul className="mt-8 space-y-3">
              {props.benefits.bullets.map((b) => (
                <li key={b} className="flex items-start text-[15px] leading-7 text-slate-700">
                  <span className="mt-2 mr-3 inline-block h-1.5 w-1.5 rounded-full bg-slate-700" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      {props.caseStudy && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-xs font-bold tracking-widest text-[#A6E04A]">CASE STUDY</div>
          <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl font-semibold text-slate-900">
            {props.caseStudy.title}
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <div className="flex gap-8 border-b border-slate-200">
                {props.caseStudy.tabs.map((t, i) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(i)}
                    className={`pb-3 text-lg ${
                      tab === i
                        ? "border-b-2 border-[#2BA8C7] font-semibold text-slate-900"
                        : "text-slate-500"
                    }`}
                  >
                    {t.key}
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-5 rounded-md border border-slate-200 p-6 text-[15px] leading-7 text-slate-700">
                {props.caseStudy.tabs[tab].paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-md shadow-xl">
              <img
                src={props.caseStudy.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* GREEN CTA BAND */}
      <section
        className="py-14"
        style={{ background: "linear-gradient(90deg,#A6E04A 0%,#9ED84F 100%)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 px-6 md:flex-row">
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Connect with a Solution Specialist
          </h3>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-50"
          >
            Connect with us
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
          {props.faqHeading}
        </h2>
        <div className="mt-10 divide-y divide-slate-200 border-t border-b border-slate-200">
          {props.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="flex items-center gap-3 text-lg font-semibold text-slate-900">
                    <span
                      className="inline-flex h-6 w-6 items-center justify-center text-2xl leading-none text-[#A6E04A]"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                    {f.q}
                  </span>
                </button>
                {isOpen && (
                  <div className="space-y-4 pb-6 pl-9 pr-4 text-[15px] leading-7 text-slate-700">
                    {f.a.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <GradientPill href="/contact">{props.faqCtaLabel ?? "Learn More"}</GradientPill>
        </div>
      </section>

      <Footer />
    </div>
  );
}
