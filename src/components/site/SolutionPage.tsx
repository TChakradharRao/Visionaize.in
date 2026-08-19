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
  faqs: { q: string; a: ReactNode[] }[];
  faqCtaLabel?: string;
}

function CheckIcon() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ background: "linear-gradient(135deg, #7ED957 0%, #2E8DC5 100%)" }}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8.5l3 3 7-7" />
      </svg>
    </span>
  );
}

// Renders a single case-study paragraph. If it starts with "▶ " it gets the
// gradient checkmark icon plus any "   • ..." lines turned into a real nested list.
// Plain paragraphs (Challenge / Solution tabs) render as before.
function CaseStudyParagraph({ text }: { text: string }) {
  const isArrowItem = text.startsWith("▶ ");

  if (!isArrowItem) {
    return <p>{text}</p>;
  }

  const content = text.slice(2);
  const [mainLine, ...subLines] = content.split("\n");
  const bulletLines = subLines
    .map((line) => line.trim())
    .filter((line) => line.startsWith("•"))
    .map((line) => line.replace(/^•\s*/, ""));

  return (
    <div className="flex items-start gap-3">
      <CheckIcon />
      <div>
        <div>{mainLine}</div>
        {bulletLines.length > 0 && (
          <ul className="mt-2 space-y-1 pl-4">
            {bulletLines.map((line, i) => (
              <li key={i} className="list-disc marker:text-slate-400">
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function GradientPill({ children, href = "#" }: { children: ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 sm:pt-14 pb-14 sm:pb-20">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-12 md:grid-cols-2">
          <div>
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] sm:leading-[1.1] tracking-tight bg-clip-text text-transparent break-words"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 50%,#2BA8C7 100%)",
              }}
            >
              {props.title}
            </h1>
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-[15px] sm:text-[16px] md:text-[17px] leading-6 sm:leading-7 text-slate-700">
              {props.heroParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 sm:mt-8">
              <GradientPill href={props.heroCtaHref ?? "/request-a-demo"}>
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
        className="h-1.5 sm:h-2 w-full"
        style={{ background: "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 50%,#2BA8C7 100%)" }}
      />

      {/* COMMON PROBLEMS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-16 md:py-20">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900">
          Common Problems, Unique Solutions
        </h2>
        <div className="mt-10 sm:mt-12 md:mt-14 grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {props.problems.map((p) => (
            <div key={p.title} className="text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] md:text-[17px] leading-6 sm:leading-7 text-slate-700">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO BAND */}
      <section className="bg-[#D8F3FB]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-16 md:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
            {props.introBand.heading}
          </h2>
          <div className="mt-5 sm:mt-6 space-y-4 sm:space-y-5 text-[16px] sm:text-[17px] md:text-[18px] leading-6 sm:leading-7 text-slate-900">
            {props.introBand.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-16 md:py-20">
        <div className="grid items-center gap-8 sm:gap-10 md:gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <img src={props.benefits.image} alt="" className="w-full rounded-md shadow-2xl" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900">
              {props.benefits.heading}
            </h2>
            <ul className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3">
              {props.benefits.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start text-[15px] sm:text-[16px] md:text-[17px] leading-6 sm:leading-7 text-slate-800"
                >
                  <span className="mt-2 mr-3 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      {props.caseStudy && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-16 md:py-20">
          <div className="text-xs font-bold tracking-widest text-[#A6E04A]">CASE STUDY</div>
          <h2 className="mt-3 max-w-2xl text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
            {props.caseStudy.title}
          </h2>

          {/* Single column through tablet — the tab bar + content panel need
              real width to breathe, so they only sit side-by-side with the
              image once there's room for both at lg. */}
          <div className="mt-8 sm:mt-10 grid gap-8 sm:gap-10 lg:grid-cols-2">
            <div className="order-2 min-w-0 lg:order-1">
              <div className="flex gap-5 overflow-x-auto border-b border-slate-200 sm:gap-8">
                {props.caseStudy.tabs.map((t, i) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(i)}
                    className={`relative -mb-px shrink-0 whitespace-nowrap pb-3 text-sm font-semibold transition-colors sm:text-base md:text-lg ${
                      tab === i
                        ? "text-[#2BA8C7]"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {t.key}
                    {tab === i && (
                      <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#2BA8C7]" />
                    )}
                  </button>
                ))}
              </div>
              <div className="relative z-0 space-y-4 rounded-md border border-slate-200 p-4 text-[14px] leading-6 text-slate-700 sm:space-y-5 sm:p-6 sm:text-[15px] sm:leading-7 md:text-[16px]">
                {props.caseStudy.tabs[tab].paragraphs.map((p, i) => (
                  <CaseStudyParagraph key={i} text={p} />
                ))}
              </div>
            </div>
            <div className="order-1 aspect-[4/3] w-full overflow-hidden rounded-md shadow-xl lg:order-2 lg:h-full lg:aspect-auto">
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
        className="py-10 sm:py-12 md:py-14"
        style={{ background: "linear-gradient(90deg,#A6E04A 0%,#9ED84F 100%)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 text-center md:flex-row md:text-left">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900">
            Connect with a Solution Specialist
          </h3>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-white px-6 sm:px-7 py-2.5 sm:py-3 text-base sm:text-lg font-semibold text-slate-900 shadow hover:bg-slate-50"
          >
            Connect with us
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
          {props.faqHeading}
        </h2>
        <div className="mt-8 sm:mt-10 divide-y divide-slate-200 border-t border-b border-slate-200">
          {props.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between py-4 sm:py-5 text-left"
                >
                  <span className="flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base md:text-lg font-semibold text-slate-900">
                    <span
                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-2xl leading-none text-[#A6E04A]"
                      aria-hidden
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                    {f.q}
                  </span>
                </button>
                {isOpen && (
                  <div className="space-y-3 sm:space-y-4 pb-6 pl-8 sm:pl-9 pr-2 sm:pr-4 text-[15px] sm:text-[16px] md:text-[17px] leading-6 sm:leading-7 text-slate-700">
                    {f.a.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-8 sm:mt-10 flex justify-center">
          <GradientPill href="/request-a-demo">{props.faqCtaLabel ?? "Learn More"}</GradientPill>
        </div>
      </section>

      <Footer />
    </div>
  );
}