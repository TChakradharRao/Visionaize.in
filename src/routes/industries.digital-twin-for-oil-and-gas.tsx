import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";
import { api } from "@/lib/api";

export const Route = createFileRoute("/industries/digital-twin-for-oil-and-gas")({
  head: () => ({
    meta: [
      { title: "Digital Twin for Oil & Gas — Visionaize" },
      {
        name: "description",
        content:
          "Reduce downtime and maximize the productivity of your oil & gas infrastructure with Visionaize's 3D Digital Twin platform.",
      },
      { property: "og:title", content: "Digital Twin for Oil & Gas — Visionaize" },
      {
        property: "og:description",
        content:
          "A 3D Digital Twin that stays connected and in sync through the operations of complex oil & gas assets.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2022/07/offshore-oil-platform-iStock-636032898-1.png",
      },
    ],
  }),
  component: OilAndGasPage,
});

/* ---------------- data ---------------- */

const seedItem = getSeedContentItem("page", "digital-twin-for-oil-and-gas");
const seedSections = seedItem?.content_json?.sections ?? [];

const FALLBACK_HERO_IMAGE =
  "https://visionaize.com/wp-content/uploads/2022/07/offshore-oil-platform-iStock-636032898-1.png";

// Hero section — matches the actual banner heading ("Oil & Gas")
const heroSection = seedSections.find(
  (section) => section.heading?.toLowerCase() === "oil & gas"
);

const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : ["Reduce downtime and maximize the productivity of your oil & gas infrastructure."];

// Only use heroSection's own image — never fall back to a random image
// scraped from an unrelated section further down the page.
const heroImage = heroSection?.images?.[0]?.src ?? FALLBACK_HERO_IMAGE;

// Intro/"Plan More Clearly" section
const introSection = seedSections.find(
  (section) => section.heading?.toLowerCase() === "plan more clearly"
);

const introParagraphs = introSection?.paragraphs?.length
  ? introSection.paragraphs
  : [
      "Oil & Gas infrastructure that yields greater productivity and profitability, with less downtime and safer working conditions can be realized with a 3D Digital Twin that is designed to stay connected and in sync through the operations of complex assets.",
      "Learn more from a product demo or an RoI exploration with a 3D Digital Twin expert.",
    ];
const PILLARS = [
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Vector-6.svg",
    title: "Reduce downtime",
    body: "Be more productive by minimizing planned and unplanned downtime",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-3.svg",
    title: "Boost productivity",
    body: "Train and learn faster, plan better, work more efficiently",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-4.svg",
    title: "Plan more clearly",
    body: "Enables teams to contextualize rich data, anytime, from anywhere",
  },
];

// Case studies — Challenge/Solution transcribed verbatim from source screenshots,
// with the highlighted phrase called out separately so it can be rendered in
// blue/bold. Results is a bullet list matching the green-arrow markers shown
// in the reference images.
const CASE_STUDIES = [
  {
    eyebrow: "CASE STUDY",
    title: "Refinery Precision: Quick Returns Through Operational Efficiency",
    tabs: {
      Challenge: {
        text: "In the complex world of a petroleum refinery, the company grappled with significant challenges like elevating the plant-wide Mechanical Integrity (MI) program, implementing Risk-Based Inspection (RBI), and overcoming the limitations of legacy systems emerged as formidable hurdles.",
        highlight: "elevating the plant-wide Mechanical Integrity (MI) program,",
      },
      Solution: {
        text: "In overcoming these challenges, the company partnered with Visionaize. Leveraging Visionaize V-Suite software, MI & RBI solutions were successfully implemented, deploying PCMS at the site. The integration of the V-Suite 3DBI Active Model with visual inspection software became a game changer, ensuring effective management and resolution.",
        highlight:
          "integration of the V-Suite 3DBI Active Model with visual inspection software",
      },
      Results: [
        "Realized an impressive IRR of 132%",
        "Achieved a swift 13-month payback period",
        "Substantial reduction in carbon emissions",
      ],
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-469895003-copy@0.5x-1.png",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Optimizing OEE with Predictive Maintenance and AI Solutions",
    tabs: {
      Challenge: {
        text: "One of the world's largest oil producer's in the world was plagued with a data silo issue with data from 15 different enterprise applications sealed off from one another. Besides the data not being integrated into the same system, the teams managing these different applications were not collaborating to the extent that they should have been.",
        highlight:
          "plagued with a data silo issue with data from 15 different enterprise applications",
      },
      Solution: {
        text: "Visionaize developed integrated, role-based 3D applications for Operations, Turnaround, Inspection, Maintenance and Safety teams. This allows workers to zero in on what matters most to them, while still being able to all experience the same data in the same system, overall. This spurred more opportunities to collaborate and develop more cross-team cohesion.",
        highlight:
          "more opportunities to collaborate and develop more cross-team cohesion.",
      },
      Results: [
        "Broke down silos across 6 functional teams",
        "Efficiencies drove 5-year savings of $15.3MM",
      ],
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/steel-service-platform-and-stairs-equipment-refinery-SBI-300930077-scaled-1.jpg",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Transforming Operations: Lessons from a Petrochemical Journey",
    tabs: {
      Challenge: {
        text: "In the vast landscape of a Large Petrochemical complex, the company encountered a significant hurdle in developing a cost-effective Risk-Based Inspection (RBI) program, focused on corrosion. Balancing rising inspection costs while needing to mitigate risks proved challenging, and configuring operational data added to the complexity.",
        highlight:
          "developing a cost-effective Risk-Based Inspection (RBI) program,",
      },
      Solution: {
        text: "In addressing the challenges, the company successfully deployed Visionaize's V-Suite software. This solution facilitated the creation of 3D ISOs and efficient placement of TMLs, streamlined inspection management for 79,000 TMLs, and seamlessly loaded asset information into systems of record. Visionaize's expertise proved instrumental in resolving the complexities faced by the company.",
        highlight:
          "creation of 3D ISOs and efficient placement of TMLs, streamlined inspection management for 79,000 TMLs, and seamlessly loaded asset information into systems of record.",
      },
      Results: [
        "Reduced downtime and improved worker safety",
        "Achieved an outstanding 287% IRR",
        "Rapid payback period of just 4 months",
      ],
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/oil-refinery-equipment-for-primary-oil-refining-SBI-300925954-1.jpg",
  },
];

const FORM_TOPICS = [
  "Plan, optimize and execute critical work",
  "Keep processes running smoothly",
  '"Experience" data to ease decision making',
  "Keep teams safe and operationally compliant",
];

/* ---------------- component ---------------- */

function OilAndGasPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />

      <Hero />
      <Pillars />
      <Intro />
      <CaseStudyCarousel />
      <Wellhead />
      <Quote />
      <TalkDigitalTwins />
      <Whitepaper />
      <Footer />
    </div>
  );
}

/* ---------------- sections ---------------- */

function Hero() {
  return (
    <section
      className="relative flex min-h-[420px] w-full items-center bg-cover bg-center sm:min-h-[520px] md:min-h-[600px] lg:min-h-[640px]"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center px-4 py-10 sm:px-6 sm:py-14 md:py-0">
        <div className="w-full max-w-full bg-white p-6 shadow-sm sm:max-w-[440px] sm:p-8 md:max-w-[500px] md:p-10 lg:max-w-[520px] lg:p-12">
          <h1
            className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
            style={{
              background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Oil &amp; Gas
          </h1>
          {heroParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mt-5 text-base leading-relaxed text-[#0F1B2D] sm:mt-6 sm:text-lg md:text-[19px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-[#0F1B2D] py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-3 md:gap-12">
        {PILLARS.map((p) => (
          <div key={p.title} className="flex flex-col items-center text-center">
            <img src={p.icon} alt="" className="h-16 w-16 sm:h-20 sm:w-20" loading="lazy" />
            <h3 className="mt-5 text-xl font-semibold text-white sm:mt-6 sm:text-2xl md:text-[26px]">{p.title}</h3>
            <p className="mt-4 max-w-[280px] text-base leading-relaxed text-white/80 sm:text-[17px]">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-white py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 sm:px-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[40px] lg:text-[46px]">
            Oil &amp; Gas, Visionaized
          </h2>
          {introParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
              {index === 1 ? (
                <>
                  {paragraph.split("RoI exploration")[0]}
                  
                   <a href="#talk-to-an-expert"
                    className="font-semibold text-[#2E8DC5] underline-offset-4 hover:underline"
                  >
                    RoI exploration
                  </a>
                  {paragraph.split("RoI exploration")[1]}
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            
             <a href="#talk-to-an-expert"
              className="inline-flex items-center rounded-full px-6 py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg sm:px-7 sm:py-3.5"
              style={{
                background:
                  "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              Talk to an expert
            </a>
            <Link
              to="/industries/oil-and-gas/build-a-business-case"
              className="inline-flex items-center rounded-full border border-[#0F1B2D] px-6 py-3 text-base font-semibold text-[#0F1B2D] transition hover:bg-[#0F1B2D] hover:text-white sm:px-7 sm:py-3.5"
            >
              Explore the RoI
            </Link>
          </div>
        </div>
        <div className="flex justify-center bg-[#E6F0F7] p-6 sm:p-8">
          <img
            src="https://visionaize.com/wp-content/uploads/2022/07/Group-523.png"
            alt="Visionaize 3D Digital Twin on laptop and tablet"
            className="w-full max-w-[600px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

// Renders body copy with one highlighted (bold + blue) phrase in the middle.
function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <>{text}</>;

  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);

  return (
    <>
      {before}
      <span className="font-semibold text-[#2E8DC5]">{highlight}</span>
      {after}
    </>
  );
}

// Renders the Results tab as a bulleted list with the green arrow marker.
function ResultsList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className="mt-2 shrink-0"
            aria-hidden="true"
          >
            <path d="M1 0 L9 5 L1 10 Z" fill="#A6E04A" />
          </svg>
          <span className="text-base leading-relaxed text-[#3a4658] sm:text-[17px] sm:leading-[1.8]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CaseStudyCarousel() {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<"Challenge" | "Solution" | "Results">("Challenge");
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const cs = CASE_STUDIES[idx];

  const AUTO_SCROLL_MS = 6000;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = () => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setDirection("next");
      setIdx((i) => (i + 1) % CASE_STUDIES.length);
      setTab("Challenge");
    }, AUTO_SCROLL_MS);
  };

  useEffect(() => {
    startTimer();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const next = () => {
    setDirection("next");
    setIdx((i) => (i + 1) % CASE_STUDIES.length);
    setTab("Challenge");
    startTimer();
  };
  const prev = () => {
    setDirection("prev");
    setIdx((i) => (i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
    setTab("Challenge");
    startTimer();
  };
  const goTo = (i: number) => {
    setDirection(i > idx ? "next" : "prev");
    setIdx(i);
    setTab("Challenge");
    startTimer();
  };

  return (
    <section className="bg-white pb-10 sm:pb-12 md:pb-16 lg:pb-20">
      <style>{`
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .cs-slide-next { animation: slideFromRight 0.4s ease forwards; }
        .cs-slide-prev { animation: slideFromLeft 0.4s ease forwards; }
      `}</style>

      <div className="relative mx-auto max-w-[1280px] overflow-hidden px-4 sm:px-6">
        <button
          aria-label="Previous case study"
          onClick={prev}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-[#2E8DC5] hover:text-[#A6E04A]"
        >
          <svg width="20" height="40" viewBox="0 0 28 56" fill="none" className="sm:h-[48px] sm:w-[24px] md:h-[56px] md:w-[28px]">
            <path d="M22 4L6 28L22 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          aria-label="Next case study"
          onClick={next}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-[#2E8DC5] hover:text-[#A6E04A]"
        >
          <svg width="20" height="40" viewBox="0 0 28 56" fill="none" className="sm:h-[48px] sm:w-[24px] md:h-[56px] md:w-[28px]">
            <path d="M6 4L22 28L6 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div
          key={idx}
          className={`grid grid-cols-1 items-center gap-8 px-7 sm:gap-10 sm:px-9 md:px-10 lg:grid-cols-2 ${
            direction === "next" ? "cs-slide-next" : "cs-slide-prev"
          }`}
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#A6E04A] sm:text-sm">
              {cs.eyebrow}
            </p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl md:text-[36px]">
              {cs.title}
            </h3>

            <div className="mt-6 flex gap-5 overflow-x-auto border-b border-[#E2E8F0] sm:mt-8 sm:gap-6">
              {(["Challenge", "Solution", "Results"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`whitespace-nowrap pb-3 text-sm font-semibold transition sm:text-base ${
                    tab === t
                      ? "border-b-2 border-[#2E8DC5] text-[#2E8DC5]"
                      : "text-[#64748B] hover:text-[#0F1B2D]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded border border-[#E2E8F0] p-5 sm:p-6">
              {tab === "Results" ? (
                <ResultsList items={cs.tabs.Results} />
              ) : (
                <p className="text-base leading-relaxed text-[#3a4658] sm:text-[17px] sm:leading-[1.8]">
                  <HighlightedText
                    text={cs.tabs[tab].text}
                    highlight={cs.tabs[tab].highlight}
                  />
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={cs.img}
              alt={cs.title}
              className="w-full max-w-[560px] rounded shadow-lg"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {CASE_STUDIES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 bg-[#2E8DC5]" : "w-2 bg-[#CBD5E1]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Wellhead() {
  return (
    <section className="bg-white pb-10 pt-2 sm:pb-12 md:pb-16 lg:pb-20">
      <div className="grid grid-cols-1 items-start lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+24px))] lg:pr-12">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[38px] lg:text-[42px]">
            Better wellhead production and refinery performance
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
            Through advanced predictive maintenance capabilities and the most
            immersive 3D data experiences, Visionaize is built from the ground
            up to maximize operational efficiencies and keep complex assets
            running smoothly. The end result is greater resiliency,
            sustainability and efficiency.
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
            With advanced work packages and a combination of AI, AR and VR
            technologies, operations teams can proactively resolve a myriad of
            issues before they have a chance to cause downtime. Powerful remote
            infrastructure management capabilities mean fewer trips into the
            field. And when in the field, workers come more prepared to get the
            job done faster and more safely.
          </p>
          <p className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
            Experience contextualized data like never before, and take your Oil
            &amp; Gas operations to new heights.
          </p>
        </div>

        <div className="relative h-[220px] self-center sm:h-[300px] lg:h-[460px]">
          <img
            src="https://visionaize.in/wp-content/uploads/2022/07/Rectangle-425-3.png"
            alt="3D digital twin of a refinery"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <section className="relative overflow-hidden bg-white pb-10 pt-0 sm:pb-12 md:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="relative">
          {/* Background image in place of the decorative curve lines */}
          <img
            src="https://visionaize.in/wp-content/uploads/2022/05/home-quote-min.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 top-1/2 hidden w-[420px] -translate-y-1/2 lg:block lg:w-[480px] xl:w-[520px]"
          />

          <blockquote className="relative max-w-[830px] text-xl font-medium leading-snug text-[#0F1B2D] sm:text-2xl md:text-[26px] lg:text-[30px] lg:leading-[1.3]">
            During the early stages of an implementation, V-Suite helped the
            inspection team find and solve a corrosion problem in 2 days. A
            similar exercise required 2 weeks using a competitor's product"
          </blockquote>
          <p className="relative mt-5 text-sm font-semibold tracking-wider text-[#3a4658] sm:mt-6">
            NCRA/CHS
          </p>
        </div>
      </div>
    </section>
  );
}

function TalkDigitalTwins() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    source: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Business email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.source) {
      newErrors.source = "Please select an option";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage(null);

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");

    try {
      // Same fields the OilAndGasContactSubmission type in lib/api.ts expects.
      // The server route behind this call (/api/public/contact) is what's
      // actually responsible for sending the admin-notification and
      // user-facing "thanks" emails — that logic lives outside this file.
    await api.submitOilAndGasContact({
  first_name: formData.firstName.trim(),
  last_name: formData.lastName.trim(),
  company_name: formData.companyName.trim(),
  business_email: formData.email.trim(),
  phone_number: formData.phone.trim(),
  hear_about_us: formData.source,
  message: formData.message.trim() || undefined,
  source_page: "/industries/digital-twin-for-oil-and-gas",
  company: formData.companyName.trim(),   // add this
  email: formData.email.trim(),           // add this
});
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        phone: "",
        source: "",
        message: "",
      });
      setErrors({});
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your request. Please try again."
      );
    }
  };

  return (
    <section id="talk-to-an-expert" className="bg-[#F1F5F9] py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1250px] grid-cols-1 gap-10 px-4 sm:px-6 sm:gap-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[40px] lg:text-[46px]">
            Let’s talk digital twins
          </h2>

          <p className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
            Enable your operations center and field teams to optimize wellhead
            production and refinery performance, by delivering digital insights
            within The Industrial Metaverse.
          </p>

          <h3 className="mt-8 text-xl font-semibold sm:mt-10 sm:text-2xl">
            Example topics we may explore in a call:
          </h3>

          <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
            {FORM_TOPICS.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 text-base text-[#0F1B2D] sm:text-lg"
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #A6E04A 0%, #2E8DC5 100%)",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-md sm:p-6">
          <h3 className="text-xl font-semibold text-[#2E8DC5] sm:text-2xl md:text-[26px]">
            Talk to an expert
          </h3>

          <form
            className="mt-6 grid grid-cols-1 gap-3"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* First Name */}
            <div>
              <Input
                name="firstName"
                placeholder="First name*"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Input
                name="lastName"
                placeholder="Last name*"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <Input
                name="companyName"
                placeholder="Company name*"
                value={formData.companyName}
                onChange={handleChange}
                required
              />

              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Input
                name="email"
                placeholder="Business Email*"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Input
                name="phone"
                placeholder="Phone number*"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* How did you hear about us */}
            <div>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
                className={`w-full rounded border px-4 py-3 text-base text-[#3a4658] focus:border-[#2E8DC5] focus:outline-none ${
                  errors.source
                    ? "border-red-500"
                    : "border-[#CBD5E1]"
                }`}
              >
                <option value="">
                  How did you first hear about us?*
                </option>
                <option value="Web Search">Web Search</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Industry Event">Industry Event</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>

              {errors.source && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.source}
                </p>
              )}
            </div>

            {/* Message - Optional */}
            <textarea
              name="message"
              rows={3}
              placeholder="Message (Optional)"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded border border-[#CBD5E1] px-4 py-3 text-base text-[#3a4658] placeholder:text-[#94A3B8] focus:border-[#2E8DC5] focus:outline-none"
            />

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              {status === "submitting" ? "Sending…" : "Send request"}
            </button>

            {status === "success" && (
              <p className="text-center text-sm font-medium text-green-600">
                Thanks! We&apos;ll be in touch within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm font-medium text-red-600">
                {errorMessage ?? "Something went wrong. Please try again or email us directly."}
              </p>
            )}

            <p className="text-center text-sm text-[#64748B]">
              We generally respond within 24 hours
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="w-full rounded border border-[#CBD5E1] px-4 py-3 text-base text-[#3a4658] placeholder:text-[#94A3B8] focus:border-[#2E8DC5] focus:outline-none"
    />
  );
}

function Whitepaper() {
  return (
    <section className="bg-white py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 sm:px-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex justify-center">
          <img
            src="https://visionaize.com/wp-content/uploads/2024/10/caa1b2e0de661dece3de9db3994b2f91.png"
            alt="Reinventing Turnarounds in the Metaverse whitepaper"
            className="w-full max-w-[380px] shadow-xl sm:max-w-[460px]"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[40px] lg:text-[46px]">
            Reinventing Turnarounds in the Metaverse.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
            Explore how a metaverse-enabled digital twin could help plant
            operators reduce cost and risk.
          </p>
          <p className="mt-3 text-base leading-relaxed text-[#3a4658] sm:mt-4 sm:text-lg sm:leading-[1.8]">
            <strong>Reinventing Turnarounds in the Metaverse</strong> is a joint
            collaboration between Visionaize and PwC.
          </p>
          <a
            href="/re-inventing-turnarounds-in-the-metaverse/"
            
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center rounded-full border border-[#0F1B2D] px-6 py-3 text-base font-semibold text-[#0F1B2D] transition hover:bg-[#0F1B2D] hover:text-white sm:mt-8 sm:px-7"
          >
            Read the Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
}