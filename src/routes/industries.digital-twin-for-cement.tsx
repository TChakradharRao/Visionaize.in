/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-field";
import { getSeedContentItem } from "@/lib/seed-content";
import { api } from "@/lib/api";

export const Route = createFileRoute("/industries/digital-twin-for-cement")({
  head: () => ({
    meta: [
      { title: "Digital Twin for Cement — Visionaize" },
      {
        name: "description",
        content:
          "Optimize kiln performance, reduce specific energy consumption and cut CO2 emissions with 3D Digital Twin technology for cement plants.",
      },
      { property: "og:title", content: "Digital Twin for Cement — Visionaize" },
      {
        property: "og:description",
        content:
          "Stabilize kiln operations, lift OEE and accelerate decarbonization across the cement value chain.",
      },
      {
        property: "og:image",
        content:
          "/digital-twin-for-cement/iStock-1182152185.webp",
      },
    ],
  }),
  component: CementPage,
});

const seedItem = getSeedContentItem("page", "digital-twin-for-cement");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length ? heroSection.paragraphs : ["Optimize kiln performance, cut energy costs, and ensure clinker quality with AI-powered Digital Twin solutions for the cement industry."];
const heroImage = seedSections.flatMap((section) => section.images ?? []).find((image) => !image.src.endsWith(".svg"))?.src ?? "/digital-twin-for-cement/Cementpic1.png";
const introSection = seedSections.find((section) => section.heading?.toLowerCase() === "run a stabler kiln, with fewer surprises");
const introParagraphs = introSection?.paragraphs?.length ? introSection.paragraphs : [
  "Transform your cement plant into an intelligent digital twin environment that connects mining, kiln, mills, and dispatch. Unlock higher efficiency, lower energy use, and consistent quality – all while reducing downtime and emissions.",
  "See how your operations can achieve more by experiencing data in real time with AI and Digital Twin technologies.",
];

const PILLARS = [
  {
    icon: "/digital-twin-for-cement/Group-1171277037.svg",
    title: "Optimize Kiln Performance",
    body: "Reduce fuel consumption and stabilize operations with real-time AI-driven insights.",
  },
  {
    icon: "/digital-twin-for-cement/Group-1171277036.svg",
    title: "Ensure Consistent Quality",
    body: "Predict clinker and cement quality parameters instantly, minimizing off-spec production",
  },
  {
    icon: "/digital-twin-for-cement/Group-1171277038.svg",
    title: "Cut Unplanned Downtime",
    body: "Anticipate equipment issues early and keep production running without costly interruptions.",
  },
];

const CASE_STUDIES = [
  {
    eyebrow: "CASE STUDY",
    title: "AI-Driven Kiln Optimization for Cement Efficiency",
    tabs: {
      Challenge:
        "A leading South Asian cement manufacturer struggled with kiln instability, fluctuating fuel quality, and high specific heat consumption (820 kcal/kg). Despite multiple process improvements, inconsistent burn-zone control and reduced refractory life impacted energy efficiency, production stability, and ESG compliance, prompting a shift toward AI-driven optimization.",
      Solution:
        "Visionaize implemented an AI-based kiln optimization platform that integrated 250+ process variables from DCS and SCADA. Within months, operators received real-time AI recommendations for air-fuel ratios and fan adjustments. The system evolved into semi-autonomous control, ensuring precise, faster interventions and stable operations, even under variable process conditions.",
      Results: [
        "Reduced SHC to 740 kcal/kg",
        "Cut kiln downtime by 60%",
        "Extended refractory life by 50%",
        "Saved USD $1.4M annually",
        "Lowered CO₂ emissions by 8,000 tons",
      ],
    },
    img: "/digital-twin-for-cement/case-study-1-cement-plant-AI-for-Klin-optimization.jpg",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Predictive Maintenance for Cement Plant Reliability",
    tabs: {
      Challenge:
        "A mid-sized Latin American cement manufacturer faced frequent equipment breakdowns across vertical roller mills, preheater fans, and gearboxes. Despite preventive maintenance efforts, unplanned downtime exceeded 40 hours per line each month, driving up labor costs and cutting into profitability. Leadership sought an AI-driven solution to enhance reliability and protect EBITDA margins.",
      Solution:
        "Visionaize deployed a Predictive Maintenance system integrating real-time vibration, temperature, and current data through edge devices. Machine learning models analyzed two years of fault logs to predict failures early. Linked with the CMMS, the system automatically generated maintenance work orders, transforming maintenance operations from reactive to predictive.",
      Results: [
        "Reduced unplanned downtime by 55%",
        "Cut emergency gearbox failures by 80%",
        "Lowered overtime labor costs by 45%",
        "Boosted overall equipment reliability and uptime",
      ],
    },
    img: "/digital-twin-for-cement/case-study-2-cement-plant-predictive-maintenance.jpeg",
  },
  {
    eyebrow: "CASE STUDY",
    title: "AI-Driven ESG Optimization for Cement Sustainability",
    tabs: {
      Challenge:
        "A reputed eco cement manufacturer faced growing regulatory pressure and investor scrutiny over carbon emissions. The clinker line emitted 850 kg of CO₂ per ton, with reporting delays of up to 90 days. Rising compliance costs and the lack of real-time visibility made ESG performance a strategic risk, threatening investor confidence and brand credibility.",
      Solution:
        "Visionaize implemented an AI-driven ESG optimization system integrated with kiln and calciner operations. Real-time data on feed chemistry, fuel mix, and combustion were analyzed to forecast CO₂ emissions and simulate process adjustments. Interactive dashboards provided live visibility for plant teams and executives, enabling proactive emission control and informed decision-making.",
      Results: [
        "Reduced CO₂ intensity by 9%",
        "Cut annual ETS costs by €200,000",
        "Enabled real-time ESG reporting — boosting investor confidence and sustainability performance",
      ],
    },
    img: "/digital-twin-for-cement/case-study-3-cement-plant-AI-for-ESG.jpg",
  },
];

const FORM_TOPICS = [
  "Optimize kiln fuel mix and reduce energy consumption",
  "Predict and prevent unplanned downtime across critical assets",
  "Ensure clinker and cement quality with real-time AI insights",
  "Monitor emissions and drive sustainability compliance across operations",
];

function CementPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
      <Intro />
      <CaseStudyCarousel />
      <PlantReimagined />
      <Testimonials />
      <TalkDigitalTwins />
      <Whitepaper />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative flex min-h-[460px] w-full items-center bg-cover bg-center py-10 sm:min-h-[560px] sm:py-14 lg:min-h-[640px] lg:py-0"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center px-4 sm:px-6">
        <div className="w-full max-w-[600px] bg-white p-6 sm:p-9 lg:p-12">
          <h1
            className="text-[34px] font-light leading-[1.1] tracking-tight sm:text-[42px] lg:text-[52px] lg:leading-[1.05]"
            style={{
              background:
                "linear-gradient(111.34deg, #94C11F 8.76%, #078ED1 84.29%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Cement Manufacturing, Redefined
          </h1>
          {heroParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-[16px] leading-relaxed text-[#0F1B2D] sm:mt-5 sm:text-[18px]">
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
    <section className="bg-[#0F1B2D] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:gap-6 sm:px-6 lg:grid-cols-3 lg:gap-10">
        {PILLARS.map((p) => (
          <div key={p.title} className="flex flex-col items-center text-center">
            <img src={p.icon} alt="" className="h-16 w-16 sm:h-[72px] sm:w-[72px]" loading="lazy" />
            <h3 className="mt-4 text-[21px] font-semibold text-white sm:mt-5 sm:text-[24px]" dangerouslySetInnerHTML={{ __html: p.title }} />
            <p className="mt-3 max-w-[280px] text-[16px] leading-relaxed text-white/80">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-[30px] font-semibold leading-tight sm:text-[36px] lg:text-[44px]">
            Cement Industry, Visionaized
          </h2>
          {introParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-[16px] leading-[1.75] text-[#3a4658] sm:mt-5 sm:text-[17px]">
              {paragraph}
            </p>
          ))}
          <div className="mt-7 sm:mt-8">
            <a href="#talk-to-an-expert"
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg sm:px-7 sm:text-base"
              style={{
                background:
                  "linear-gradient(90deg, #92C122 0%, #088FD1 100%)",
              }}
            >
              Talk to an expert
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/digital-twin-for-cement/Cementpic2.png"
            alt="Visionaize 3D Digital Twin for cement"
            className="h-auto w-full max-w-[600px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function CaseStudyCarousel() {
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<"Challenge" | "Solution" | "Results">("Challenge");
  const [isPaused, setIsPaused] = useState(false);
  const cs = CASE_STUDIES[idx];

  // Auto-advance the carousel, pausing while the user is interacting with it
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % CASE_STUDIES.length);
      setTab("Challenge");
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const renderCaseStudyContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-3 text-[16px] leading-[1.75] text-[#3a4658]">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
                style={{ background: "linear-gradient(135deg, #6FCB6F 0%, #1CB4E8 100%)" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return <p className="text-[16px] leading-[1.75] text-[#3a4658]">{content}</p>;
  };

  const next = () => {
    setIdx((i) => (i + 1) % CASE_STUDIES.length);
    setTab("Challenge");
  };
  const prev = () => {
    setIdx((i) => (i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
    setTab("Challenge");
  };
  return (
    <section
      className="bg-white py-12 sm:py-16 lg:py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <button
          aria-label="Previous case study"
          onClick={prev}
          className="absolute left-0 top-6 z-10 text-[#2E8DC5] hover:text-[#A6E04A] sm:top-1/2 sm:-translate-y-1/2"
        >
          <svg width="20" height="40" viewBox="0 0 28 56" fill="none" className="sm:h-14 sm:w-7">
            <path d="M22 4L6 28L22 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          aria-label="Next case study"
          onClick={next}
          className="absolute right-0 top-6 z-10 text-[#2E8DC5] hover:text-[#A6E04A] sm:top-1/2 sm:-translate-y-1/2"
        >
          <svg width="20" height="40" viewBox="0 0 28 56" fill="none" className="sm:h-14 sm:w-7">
            <path d="M6 4L22 28L6 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid grid-cols-1 items-center gap-8 px-7 sm:px-10 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#A6E04A]">{cs.eyebrow}</p>
            <h3 className="mt-3 text-[25px] font-semibold leading-tight sm:text-[29px] lg:text-[35px]">{cs.title}</h3>

            <div className="mt-5 flex gap-4 overflow-x-auto border-b border-[#E2E8F0] sm:mt-6 sm:gap-6">
              {(["Challenge", "Solution", "Results"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`shrink-0 pb-3 text-sm font-semibold transition ${
                    tab === t
                      ? "border-b-2 border-[#2E8DC5] text-[#2E8DC5]"
                      : "text-[#64748B] hover:text-[#0F1B2D]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded border border-[#E2E8F0] p-4 sm:p-6">
              {renderCaseStudyContent(cs.tabs[tab])}
            </div>
          </div>

          <div className="flex justify-center">
            <img src={cs.img} alt={cs.title} className="h-auto w-full max-w-[560px] rounded shadow-lg" loading="lazy" />
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {CASE_STUDIES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setIdx(i);
                setTab("Challenge");
              }}
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

function PlantReimagined() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4 text-[16px] leading-[1.75] text-[#3a4658] sm:space-y-5 sm:text-[17px]">
            <h2 className="text-[30px] font-semibold leading-tight sm:text-[36px] lg:text-[44px]">
              Smarter, More Sustainable Cement Operations
            </h2>
            <p>
             Cement plants run on complex processes – from mining and raw mix preparation to kiln operations, grinding, and dispatch. Each stage involves thousands of interdependent variables that impact fuel use, equipment life, and clinker quality. Visionaize’s 3D Digital Twin solutions bring all of this together into a single intelligent platform, helping operators see the bigger picture and act with precision.
            </p>
            <p>
              With advanced AI and predictive maintenance, plants can anticipate kiln instabilities, gear failures, and fan breakdowns before they occur. Real-time optimization stabilizes fuel mix, cuts power consumption in mills, and ensures consistent clinker quality. At the same time, emissions monitoring and sustainability analytics help plants stay compliant while lowering their carbon footprint.
            </p>
            <p>
              Through immersive 3D environments and AR-enabled SOPs, teams gain contextualized insights at their fingertips – enabling faster learning, safer operations, and higher productivity across the plant.
            </p>
            <p>
              Experience cement operations like never before, and take your plant towards higher efficiency, reliability, and sustainability.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img src="/digital-twin-for-cement/image-13.png" alt="Visionaize 3D Digital Twin for cement" className="h-auto w-full rounded shadow-lg" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TalkDigitalTwins() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const firstName = String(form.get("first_name") ?? "").trim();
    const lastName = String(form.get("last_name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const messageValue = String(form.get("message") ?? "").trim();

    if (!firstName || !lastName || !email || !phone || !messageValue) {
      setStatus("err");
      setErrorMsg("Please complete all required fields.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      await api.submitContact({
        name: `${firstName} ${lastName}`.trim(),
        email,
        company: company || undefined,
        phone,
        message: messageValue,
        source_page: "/industries/digital-twin-for-cement",
      });
      setStatus("ok");
      setPhone("");
      setMessage("");
      formElement.reset();
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    }
  };

  return (
    <section id="talk-to-an-expert" className="scroll-mt-24 bg-[#F1F5F9] py-12 sm:py-16 lg:scroll-mt-28 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-[30px] font-semibold leading-tight sm:text-[36px] lg:text-[44px]">Let's talk digital twins</h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-[#3a4658] sm:mt-5 sm:text-[17px]">
            Visionaize V-Plant transforms your cement plant into an intelligent digital twin environment – connecting mining, kiln, mills, and dispatch into one adaptive system. Experience real-time insights that help your teams run stable, efficient, and sustainable operations.
          </p>
          <h3 className="mt-7 text-[19px] font-semibold sm:mt-8 sm:text-[21px]">Learn how Visionaize can:</h3>
          <ul className="mt-4 space-y-3 sm:mt-5">
            {FORM_TOPICS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[16px] text-[#0F1B2D] sm:text-[17px]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: "linear-gradient(135deg, #A6E04A 0%, #2E8DC5 100%)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-full rounded-lg bg-white p-6 shadow-md sm:p-7 lg:max-w-md">
          <h3 className="text-[22px] font-semibold text-[#2E8DC5] sm:text-[24px]">Talk to an expert</h3>
          <form className="mt-5 grid grid-cols-1 gap-4" onSubmit={onSubmit}>
            <FloatingInput name="first_name" label="First name*" required />
            <FloatingInput name="last_name" label="Last name*" required />
            <FloatingInput name="company" label="Company name*" />
            <FloatingInput name="email" label="Business Email*" type="email" required />
            <FloatingInput
              name="phone"
              label="Phone number*"
              type="tel"
              required
              inputMode="numeric"
              pattern="\d{10}"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
            <select name="referral" className="w-full rounded border border-[#CBD5E1] px-4 py-3 text-sm text-[#3a4658] focus:border-[#2E8DC5] focus:outline-none" defaultValue="">
              <option value="" disabled>
                How did you first hear about us?
              </option>
              <option>Web Search</option>
              <option>LinkedIn</option>
              <option>Industry Event</option>
              <option>Referral</option>
              <option>Other</option>
            </select>
            <FloatingTextarea name="message" label="Message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60"
              style={{
                background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              {status === "sending" ? "Sending…" : "Send request"}
            </button>
            <p className="text-center text-xs text-[#64748B]">We generally respond within 24 hours</p>
            {status === "ok" && <p className="text-center text-sm text-green-600">Thanks — we received your message and will respond shortly.</p>}
            {status === "err" && <p className="text-center text-sm text-red-600">{errorMsg}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}



function Whitepaper() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 flex justify-center lg:order-1">
          <img
            src="/digital-twin-for-cement/Group-1171277152-1.svg"
            alt="The Industrial Metaverse whitepaper"
            className="h-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[460px]"
            loading="lazy"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-[30px] font-semibold leading-tight sm:text-[36px] lg:text-[44px]">
              Reimagining Cement Manufacturing with AI
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-[#3a4658] sm:mt-5 sm:text-[17px]">
            Energy-intensive processes, variable kiln operations, and sustainability pressures make cement one of the most challenging industries to optimize. Explore how AI-powered digital twin technology is redefining plant performance and resilience.
          </p>
          <h6 className="mt-4 text-[16px] font-medium sm:text-[17px]">Reimagining Cement Manufacturing: The Strategic Role of Artificial Intelligence</h6>
          <a
            href="/cement-industry-whitepaper/"
           
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center rounded-full border border-[#0F1B2D] px-7 py-3 text-sm font-semibold text-[#0F1B2D] transition hover:bg-[#0F1B2D] hover:text-white sm:mt-8"
          >
            Explore how
          </a>
        </div>
      </div>
    </section>
  );
}
function Testimonials() {
  const TESTIMONIALS = [
    {
      quote:
        "AI transformed our sustainability reporting from a compliance headache to a leadership tool. Instead of reacting to regulators, we now use data to engage investors with confidence.",
      author: "Eco Cement Manufacturer - CFO",
    },
    {
      quote:
        "The AI system didn’t just reduce our fuel bill—it stabilized our entire production rhythm. It has changed how we run the plant.",
      author: "South Asian Cement Manufacturer - Plant Director",
    },
    {
      quote:
        "AI helped us move from firefighting to foresight. We no longer wait for a failure—we see it coming and act smartly. That shift alone has changed how our teams view maintenance.",
      author: "Latin American Cement Manufacturer - Maintenance Head",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const next = () =>
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      className="relative overflow-hidden bg-[#1D2A39] py-12 sm:py-14 lg:py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-10">

        <h2
          className="mb-7 text-center text-[28px] font-normal sm:mb-9 sm:text-[36px] lg:text-[44px]"
          style={{
            background:
              "linear-gradient(90deg,#72D26C 0%,#1CB4E8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Client Testimonials
        </h2>

        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-1 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white sm:left-6"
        >
          <ChevronLeft size={24} className="sm:h-8 sm:w-8" />
        </button>

        <div className="mx-auto max-w-[920px] px-8 text-center sm:px-10">

          <p
            className="text-[18px] font-normal leading-[1.6] text-white sm:text-[21px] lg:text-[26px] lg:leading-[1.7]"
            style={{
              fontFamily: "Roboto, sans-serif",
            }}
          >
            “{TESTIMONIALS[current].quote}”
          </p>

<h6
  className="mt-4 text-[16px] sm:text-[18px]"
  style={{
    fontFamily: "Roboto",
    background: "linear-gradient(90deg,#72D26C,#1CB4E8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "300 !important",
  }}
>
  {TESTIMONIALS[current].author}
</h6>
        </div>

        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-white/70 transition hover:text-white sm:right-6"
        >
          <ChevronRight size={24} className="sm:h-8 sm:w-8" />
        </button>
      </div>
    </section>
  );
}