import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getSeedContentItem } from "@/lib/seed-content";
import { api } from "@/lib/api";

export const Route = createFileRoute("/industries/digital-twin-for-manufacturing")({
  head: () => ({
    meta: [
      { title: "Digital Twin for Manufacturing — Visionaize" },
      {
        name: "description",
        content:
          "Maximize plant productivity with cutting-edge 3D Digital Twin technology for the Manufacturing industry.",
      },
      { property: "og:title", content: "Digital Twin for Manufacturing — Visionaize" },
      {
        property: "og:description",
        content:
          "Reduce downtime, increase OEE, and reimagine factory operations with Visionaize.",
      },
      {
        property: "og:image",
        content:
          "https://visionaize.com/wp-content/uploads/2022/07/istockphoto-846859964-1024x1024-1-2.png",
      },
    ],
  }),
  component: ManufacturingPage,
});

/* ---------------- data ---------------- */

const seedItem = getSeedContentItem("page", "digital-twin-for-manufacturing");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length
  ? heroSection.paragraphs
  : [
      "Maximize your plant's productivity with cutting edge Digital Twin technology for the Manufacturing industry.",
    ];

const FALLBACK_HERO_IMAGE =
  "https://visionaize.in/wp-content/uploads/2026/05/ChatGPT-Image-May-14-2026-manufacturing.png"; // placeholder — replace with your actual fallback if you have one

const heroImage =
  seedSections
    .flatMap((section) => section.images ?? [])
    .find(
      (image) =>
        !image.src.endsWith(".svg") &&
        !image.src.includes("Group.png") &&
        !image.src.includes("Group-523-2.png")
    )?.src ?? FALLBACK_HERO_IMAGE;

const introSection = seedSections.find(
  (section) => section.heading?.toLowerCase() === "Reduce downtime and maximize plant output"
);
const introHeading = introSection?.heading ?? "Reduce downtime and maximize plant output";
const introParagraphs = introSection?.paragraphs?.length
  ? introSection.paragraphs
  : [
      "Get more out of your plant operations by experiencing data like never before. Combine AI, AR and VR technologies with advanced 3D data visualization capabilities.",
      "Connect with a Digital Twin expert to learn more about how this transformational technology can apply to your unique use case.",
    ];

const PILLARS = [
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Vector-6.svg",
    title: "Extend Asset Lifetime",
    body: "Better planning and data access extend your plant's life expectancy",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-3.svg",
    title: "Increase OEE",
    body: "Sustain operations with better foresight into overall equipment effectiveness",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/07/Group.png",
    title: "Reduce Consumption",
    body: "Run more energy-efficient operations that also consume less time and money",
  },
];

const CASE_STUDIES = [
  {
    eyebrow: "CASE STUDY (01 of 03)",
    title: "Optimizing Steel Manufacturing with Digital Twins and IIoT",
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-502120934.webp",
    tabs: {
      Challenge:
        "Steel manufacturers face fluctuating yields, unplanned equipment downtime, and fragmented visibility across rolling, casting, and finishing lines, making it hard to pinpoint the root cause of quality and throughput issues.",
      Solution:
        "Visionaize deployed an IIoT-connected digital twin across the plant floor, unifying sensor data from casters, rolling mills, and furnaces into a single real-time 3D view with AI-driven anomaly detection.",
      Results:
        "The plant gained faster root-cause diagnosis, improved yield consistency, and reduced unplanned downtime across critical steel production lines.",
    },
  },
  {
    eyebrow: "CASE STUDY (02 of 03)",
    title: "Optimizing OEE with Predictive Maintenance and AI Solutions",
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp",
    tabs: {
      Challenge:
        "Manual inspection schedules and reactive maintenance were driving down Overall Equipment Effectiveness (OEE), with unplanned stoppages disrupting production targets across the facility.",
      Solution:
        "An AI-based predictive maintenance model was layered onto existing plant sensors, continuously scoring equipment health and flagging early degradation before failures occurred.",
      Results:
        "The facility saw measurable OEE improvement, fewer unplanned stoppages, and maintenance teams shifted from reactive to planned, condition-based servicing.",
    },
  },
  {
    eyebrow: "CASE STUDY (03 of 03)",
    title: "Metal Manufacturer leans on Digital Twin tech to increase productivity",
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1202781474.webp",
    tabs: {
      Challenge:
        "A metal manufacturer struggled with siloed data across production lines, making it difficult for operators and engineers to get a unified view of plant performance and bottlenecks.",
      Solution:
        "Visionaize built a 3D digital twin of the facility that contextualizes production, quality, and asset data in one immersive environment, giving teams a shared operational picture.",
      Results:
        "The manufacturer achieved increased overall productivity, faster bottleneck identification, and better cross-team coordination between operations and engineering.",
    },
  },
];

const FORM_TOPICS = [
  "Respond better to critical factory alerts",
  "Optimize plant maintenance operations",
  "Improve inspections on the factory floor",
  "Reduce downtime and improve productivity",
];

/* ---------------- component ---------------- */

function ManufacturingPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
      <Intro />
      <CaseStudyCarousel />
      <FactoryReimagined />
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
      className="relative flex min-h-[420px] w-full items-center bg-cover bg-center py-10 sm:min-h-[500px] md:h-[640px] md:py-0"
      style={{
        backgroundImage:
          "url('https://visionaize.com/wp-content/uploads/2022/07/istockphoto-846859964-1024x1024-1-2.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center px-4 sm:px-6">
        <div className="w-full max-w-[640px] bg-white p-6 sm:p-10 md:p-14">
          <h1
            className="text-[36px] font-light leading-[1.05] tracking-tight sm:text-[44px] md:text-[56px]"
            style={{
              background:
                "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Manufacturing
          </h1>
          {heroParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-4 text-sm leading-relaxed text-[#0F1B2D] sm:mt-6 sm:text-base md:text-[18px]">
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
    <section className="bg-[#0F1B2D] py-14 md:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 sm:grid-cols-2 sm:gap-12 md:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="flex flex-col items-center text-center">
            <img src={p.icon} alt="" className="h-16 w-16 sm:h-20 sm:w-20" loading="lazy" />
            <h3 className="mt-6 text-xl font-semibold text-white sm:text-[24px]">{p.title}</h3>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-white/80 sm:text-[15px]">
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
    <section className="bg-white py-14 md:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 sm:px-6 md:gap-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-[40px]">
            {introHeading}
          </h2>
          {introParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-5 text-sm leading-[1.8] text-[#3a4658] sm:mt-6 sm:text-[16px]">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 sm:mt-10">
            
            <a  href="#talk-to-an-expert"
              className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
              style={{
                background:
                  "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              Connect with an expert
            </a>
          </div>
        </div>
        <div className="flex justify-center bg-[#E6F0F7] p-6 sm:p-8">
          <img
            src="https://visionaize.com/wp-content/uploads/2022/07/Group-523-2.png"
            alt="Visionaize 3D Digital Twin for manufacturing"
            className="w-full max-w-[600px]"
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
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const cs = CASE_STUDIES[idx];

  const goTo = (newIdx: number, dir: "left" | "right") => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setIdx(newIdx);
      setTab("Challenge");
      setIsAnimating(false);
    }, 250);
  };

  const next = () => goTo((idx + 1) % CASE_STUDIES.length, "right");
  const prev = () =>
    goTo((idx - 1 + CASE_STUDIES.length) % CASE_STUDIES.length, "left");

  return (
    <section className="bg-white pb-14 md:pb-20">
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <button
          aria-label="Previous case study"
          onClick={prev}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 text-[#2E8DC5] hover:text-[#A6E04A]"
        >
          <svg width="20" height="40" viewBox="0 0 28 56" fill="none" className="sm:h-[56px] sm:w-[28px]">
            <path d="M22 4L6 28L22 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          aria-label="Next case study"
          onClick={next}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 text-[#2E8DC5] hover:text-[#A6E04A]"
        >
          <svg width="20" height="40" viewBox="0 0 28 56" fill="none" className="sm:h-[56px] sm:w-[28px]">
            <path d="M6 4L22 28L6 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="overflow-hidden px-7 sm:px-10">
          <div
            className="grid grid-cols-1 items-center gap-8 transition-all duration-250 ease-out lg:grid-cols-2 lg:gap-10"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating
                ? `translateX(${direction === "right" ? "-24px" : "24px"})`
                : "translateX(0)",
            }}
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#A6E04A]">
                {cs.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-tight sm:text-2xl md:text-[34px]">
                {cs.title}
              </h3>

              <div className="mt-6 flex gap-4 overflow-x-auto border-b border-[#E2E8F0] sm:mt-8 sm:gap-6">
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

              <div className="mt-6 rounded border border-[#E2E8F0] p-5 sm:p-6">
                <p className="text-sm leading-[1.8] text-[#3a4658] sm:text-[15px]">{cs.tabs[tab]}</p>
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
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {CASE_STUDIES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i, i > idx ? "right" : "left")}
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

function FactoryReimagined() {
  return (
    <section className="bg-white pb-14 pt-2 md:pb-20">
      <div className="mx-auto max-w-[1290px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl md:text-[40px]">
              Factory operations reimagined
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-[1.8] text-[#3a4658] sm:mt-8 sm:space-y-6 sm:text-[16px]">
              <p>
                Imagine your factory manager, your shift supervisors, and your
                maintenance engineers being able to visualize rich,
                contextualized data and insights in an immersive 3D
                environment. Giving them the ability to see the future more
                clearly with advanced predictive maintenance and remote
                operations helps them get more done with less time and less
                risk.
              </p>
              <p>
                Visionaize provides the Manufacturing industry with cutting
                edge technology to succeed in The Industrial Metaverse.
                Advanced AI, AR and VR technologies, combined with
                supercharged remote operations capabilities maximize factory
                output.
              </p>
              <p>
                Connect with a Digital Twin expert to learn more about how
                Visionaize&rsquo;s manufacturing software can help you get the
                most out of your floor operations.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://visionaize.in/wp-content/uploads/2022/07/Rectangle-425-6.png"
              alt="Factory operations reimagined with 3D digital twin visualization"
              className="h-auto w-full max-w-[500px] rounded-lg object-cover shadow-lg sm:h-[380px] md:h-[490px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Talk to an Expert form ---------- */

type FormState = {
  firstName: string;
  lastName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  hearAboutUs: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const HEAR_ABOUT_US_OPTIONS = [
  "Web Search",
  "LinkedIn",
  "Industry Event",
  "Referral",
  "Other",
];

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  businessEmail: "",
  phoneNumber: "",
  hearAboutUs: "",
  message: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Exactly 10 digits — matches the backend's phone validation.
const PHONE_REGEX = /^\d{10}$/;
const MESSAGE_MAX_LENGTH = 1000;

// Common free/personal email providers — rejected for a "Business Email" field.
// Keep in sync with the FREE_EMAIL_DOMAINS set in routes/companyLeadForm.js.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mail.com",
  "protonmail.com",
  "proton.me",
  "yandex.com",
  "gmx.com",
  "zoho.com",
  "rediffmail.com",
]);

function isBusinessEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return !!domain && !FREE_EMAIL_DOMAINS.has(domain);
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  const firstName = form.firstName.trim();
  const lastName = form.lastName.trim();
  const companyName = form.companyName.trim();
  const businessEmail = form.businessEmail.trim();
  const phoneDigits = form.phoneNumber.replace(/\D/g, "");
  const message = form.message.trim();

  if (!firstName) {
    errors.firstName = "First name is required";
  } else if (firstName.length > 100) {
    errors.firstName = "First name is too long";
  }

  if (!lastName) {
    errors.lastName = "Last name is required";
  } else if (lastName.length > 100) {
    errors.lastName = "Last name is too long";
  }

  if (!companyName) {
    errors.companyName = "Company name is required";
  } else if (companyName.length > 150) {
    errors.companyName = "Company name is too long";
  }

  if (!businessEmail) {
    errors.businessEmail = "Business email is required";
  } else if (!EMAIL_REGEX.test(businessEmail)) {
    errors.businessEmail = "Enter a valid email address";
  } else if (!isBusinessEmail(businessEmail)) {
    errors.businessEmail =
      "Please use your business email address, not a personal one (e.g. Gmail, Yahoo)";
  }

  if (!form.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (!PHONE_REGEX.test(phoneDigits)) {
    errors.phoneNumber = "Enter a valid 10-digit phone number";
  }

  // hearAboutUs and message are optional.
  if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer`;
  }

  return errors;
}

function fieldClass(hasError: boolean) {
  return [
    "w-full rounded border px-4 py-3 text-sm text-[#3a4658] placeholder:text-[#94A3B8]",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-[#CBD5E1] focus:border-[#2E8DC5] focus:ring-[#2E8DC5]",
  ].join(" ");
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function TalkDigitalTwins() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, phoneNumber: digitsOnly }));
    setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      await api.submitCompanyLeadForm({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        company_name: form.companyName.trim(),
        business_email: form.businessEmail.trim(),
        phone_number: form.phoneNumber.replace(/\D/g, ""),
        hear_about_us: form.hearAboutUs.trim() || undefined,
        message: form.message.trim() || undefined,
        source_page: "/industries/digital-twin-for-manufacturing/",
      });

      setStatus("success");
      setForm(initialFormState);
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
    <section id="talk-to-an-expert" className="bg-[#F1F5F9] py-14 md:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[44px]">
            Let&rsquo;s talk digital twins
          </h2>
          <p className="mt-5 text-base leading-[1.8] text-[#3a4658] sm:mt-6 sm:text-[18px]">
            V-Suite turns your factory into your digital metaverse. Visualize
            your manufacturing operations through a real-time, up-to-date 3-D
            digital twin. Connect with us to learn how it works.
          </p>
          <h3 className="mt-8 text-lg font-semibold sm:mt-10 sm:text-[22px]">Visionaize a better world</h3>
          <ul className="mt-6 space-y-4">
            {FORM_TOPICS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm text-[#0F1B2D] sm:text-[16px]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #A6E04A 0%, #2E8DC5 100%)",
                  }}
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

        <div className="mx-auto flex w-full max-w-[420px] justify-center rounded-lg bg-white p-5 shadow-md sm:p-8">
          <div className="w-full max-w-[360px]">
            <h3 className="text-xl font-semibold text-[#2E8DC5] sm:text-[24px]">Talk to an expert</h3>
            <form onSubmit={handleSubmit} noValidate className="mt-6 grid grid-cols-1 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First name*"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  aria-invalid={!!errors.firstName}
                  maxLength={100}
                  className={fieldClass(!!errors.firstName)}
                />
                {errors.firstName && <FieldError message={errors.firstName} />}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last name*"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  aria-invalid={!!errors.lastName}
                  maxLength={100}
                  className={fieldClass(!!errors.lastName)}
                />
                {errors.lastName && <FieldError message={errors.lastName} />}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Company name*"
                  value={form.companyName}
                  onChange={handleChange("companyName")}
                  aria-invalid={!!errors.companyName}
                  maxLength={150}
                  className={fieldClass(!!errors.companyName)}
                />
                {errors.companyName && <FieldError message={errors.companyName} />}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Business Email*"
                  value={form.businessEmail}
                  onChange={handleChange("businessEmail")}
                  aria-invalid={!!errors.businessEmail}
                  className={fieldClass(!!errors.businessEmail)}
                />
                {errors.businessEmail && <FieldError message={errors.businessEmail} />}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone number*"
                  value={form.phoneNumber}
                  onChange={handlePhoneChange}
                  aria-invalid={!!errors.phoneNumber}
                  inputMode="numeric"
                  maxLength={10}
                  className={fieldClass(!!errors.phoneNumber)}
                />
                {errors.phoneNumber && <FieldError message={errors.phoneNumber} />}
              </div>

              <select
                value={form.hearAboutUs}
                onChange={handleChange("hearAboutUs")}
                className="w-full rounded border border-[#CBD5E1] px-4 py-3 text-sm text-[#3a4658] focus:border-[#2E8DC5] focus:outline-none"
              >
                <option value="">How did you first hear about us?</option>
                {HEAR_ABOUT_US_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange("message")}
                  aria-invalid={!!errors.message}
                  maxLength={MESSAGE_MAX_LENGTH}
                  className={fieldClass(!!errors.message)}
                />
                <div className="mt-1 flex items-center justify-between">
                  {errors.message ? <FieldError message={errors.message} /> : <span />}
                  <span className="text-xs text-[#64748B]">
                    {form.message.length}/{MESSAGE_MAX_LENGTH}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
                }}
              >
                {status === "submitting" ? "Sending…" : "Send request"}
              </button>

              {status === "success" && (
                <p className="text-center text-sm text-green-600">
                  Thanks! A Digital Twin expert will be in touch shortly.
                </p>
              )}
              {status === "error" && errorMessage && (
                <p className="text-center text-sm text-red-600">{errorMessage}</p>
              )}

              <p className="text-center text-xs text-[#64748B]">
                We generally respond within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Whitepaper() {
  return (
    <section className="bg-white pb-14 pt-6 md:pb-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-4 sm:px-6 md:gap-10 lg:grid-cols-2">
        <div className="flex justify-center">
          <img
            src="https://visionaize.in/wp-content/uploads/2026/05/Group-1171277152-1.png"
            alt="The Industrial Metaverse whitepaper"
            className="w-full max-w-[460px] "
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[44px]">
            Experience data in The Industrial Metaverse
          </h2>
          <p className="mt-5 text-base leading-[1.8] text-[#3a4658] sm:mt-6 sm:text-[18px]">
            With the emergence of Industry 4.0 and IIoT sensors, data overload
            is a common challenge. Explore how 3D digital twin technology can
            turn the data deluge into a competitive advantage.
          </p>

           <a href="/theindustrialmetaverse/"
              rel="noopener noreferrer"
            className="mt-8 inline-flex items-center rounded-full border border-[#0F1B2D] px-7 py-3 text-sm font-semibold text-[#0F1B2D] transition hover:bg-[#0F1B2D] hover:text-white"
          >
            Explore how
          </a>
        </div>
      </div>
    </section>
  );
}