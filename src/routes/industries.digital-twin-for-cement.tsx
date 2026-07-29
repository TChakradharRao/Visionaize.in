import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
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
          "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp",
      },
    ],
  }),
  component: CementPage,
});

const seedItem = getSeedContentItem("page", "digital-twin-for-cement");
const seedSections = seedItem?.content_json?.sections ?? [];
const heroSection = seedSections[0];
const heroParagraphs = heroSection?.paragraphs?.length ? heroSection.paragraphs : ["Stabilize the kiln, lift OEE and accelerate decarbonization with cutting-edge 3D Digital Twin technology for cement plants."];
const heroImage = seedSections.flatMap((section) => section.images ?? []).find((image) => !image.src.endsWith(".svg"))?.src ?? "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp";
const introSection = seedSections.find((section) => section.heading?.toLowerCase() === "run a stabler kiln, with fewer surprises");
const introParagraphs = introSection?.paragraphs?.length ? introSection.paragraphs : [
  "Combine AI, AR and VR with 3D data visualization to give CCR operators, reliability engineers and plant leadership a single real-time view of the pyro-process, mills and packing lines.",
  "Connect with a Digital Twin expert to learn how Visionaize is helping cement producers improve OEE, reduce energy intensity and hit decarbonization targets.",
];

const PILLARS = [
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Vector-6.svg",
    title: "Stabilize the Kiln",
    body: "Predict upsets early and keep the kiln line running at design throughput",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/05/Group-3.svg",
    title: "Lift OEE",
    body: "Reduce unplanned downtime across crushers, mills, kilns and packing",
  },
  {
    icon: "https://visionaize.com/wp-content/uploads/2022/07/Group.png",
    title: "Cut CO2 &amp; Energy",
    body: "Lower specific thermal and electrical energy and reduce scope 1 emissions",
  },
];

const CASE_STUDIES = [
  {
    eyebrow: "CASE STUDY",
    title: "Integrated Cement Plant: Stabilizing Kiln Operations with AI",
    tabs: {
      Challenge:
        "A large integrated cement producer was experiencing recurring kiln upsets — coating, ring formation and free-lime excursions — that forced de-rates and stoppages, hurting clinker quality and increasing specific energy consumption.",
      Solution:
        "Visionaize deployed a hybrid first-principles + AI model across the pyro-process, ingesting fuel, raw-meal, gas-analyzer and process data, and surfacing early warnings and prescriptive setpoints to the central control room.",
      Results:
        "Kiln stoppages dropped, clinker quality stabilized, and specific thermal energy consumption fell measurably within the first quarter of deployment.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1182152185.webp",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Vertical Roller Mill: Predictive Maintenance & Throughput",
    tabs: {
      Challenge:
        "Frequent unplanned shutdowns on a raw-meal vertical roller mill were driving overtime maintenance and clinker shortfalls. Maintenance was largely reactive, with limited visibility into bearing, gearbox and hydraulic health.",
      Solution:
        "Visionaize built a predictive maintenance digital twin combining vibration, lube oil and process data — flagging bearing and gearbox degradation weeks ahead of failure with prescriptive maintenance windows.",
      Results:
        "Unplanned downtime dropped sharply, throughput climbed back toward nameplate, and the plant moved most VRM maintenance into planned outages.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-502120934.webp",
  },
  {
    eyebrow: "CASE STUDY",
    title: "Cement Major: Decarbonization Roadmap with Digital Twin",
    tabs: {
      Challenge:
        "A global cement major needed a credible, measurable path to its net-zero commitments — including alternative fuels, clinker factor reduction and energy-efficiency programs across dozens of plants.",
      Solution:
        "Visionaize delivered DecarbAI on top of the V-Suite digital twin, baselining scope 1, 2 and 3 emissions per plant and modeling alt-fuel substitution, clinker-factor and waste-heat-recovery scenarios with real-time tracking.",
      Results:
        "Plants ran higher alternative-fuel rates safely, the group consolidated reporting in one place, and the decarbonization roadmap became operationally tracked, not just a slideware target.",
    },
    img: "https://visionaize.com/wp-content/uploads/2023/11/iStock-1202781474.webp",
  },
];

const FORM_TOPICS = [
  "Stabilize kiln operations and clinker quality",
  "Reduce unplanned downtime on mills and crushers",
  "Cut specific energy consumption and CO2 emissions",
  "Track decarbonization targets across every plant",
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
      <TalkDigitalTwins />
      <Whitepaper />
      <LetsConnect />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative flex min-h-[420px] w-full items-center bg-cover bg-center sm:min-h-[520px] md:min-h-[600px] lg:min-h-[640px]"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center px-4 py-10 sm:px-6 sm:py-14 md:py-0">
        <div className="w-full max-w-full bg-white p-6 sm:max-w-[440px] sm:p-8 md:max-w-[500px] md:p-10 lg:max-w-[520px] lg:p-12">
          <h1
            className="text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
            style={{
              background:
                "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Cement
          </h1>
          {heroParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-5 text-base leading-relaxed text-[#0F1B2D] sm:mt-6 sm:text-lg md:text-[19px]">
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
            <h3 className="mt-5 text-xl font-semibold text-white sm:mt-6 sm:text-2xl md:text-[26px]" dangerouslySetInnerHTML={{ __html: p.title }} />
            <p className="mt-4 max-w-[280px] text-base leading-relaxed text-white/80 sm:text-[17px]">{p.body}</p>
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
            Run a stabler kiln, with fewer surprises
          </h2>
          {introParagraphs.map((paragraph, index) => (
            <p key={index} className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 sm:mt-10">
            <a
              href="#talk-to-an-expert"
              className="inline-flex items-center rounded-full px-6 py-3 text-base font-semibold text-white shadow-md transition hover:shadow-lg sm:px-7 sm:py-3.5"
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
            alt="Visionaize 3D Digital Twin for cement"
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
  const cs = CASE_STUDIES[idx];
  const next = () => {
    setIdx((i) => (i + 1) % CASE_STUDIES.length);
    setTab("Challenge");
  };
  const prev = () => {
    setIdx((i) => (i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
    setTab("Challenge");
  };
  return (
    <section className="bg-white pb-10 sm:pb-12 md:pb-16 lg:pb-20">
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
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

        <div className="grid grid-cols-1 items-center gap-8 px-7 sm:gap-10 sm:px-9 md:px-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#A6E04A] sm:text-sm">{cs.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl md:text-[36px]">{cs.title}</h3>

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
              <p className="text-base leading-relaxed text-[#3a4658] sm:text-[17px] sm:leading-[1.8]">{cs.tabs[tab]}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <img src={cs.img} alt={cs.title} className="w-full max-w-[560px] rounded shadow-lg" loading="lazy" />
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
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
    <section className="bg-white pb-10 pt-4 sm:pb-12 sm:pt-6 md:pb-16 md:pt-8 lg:pb-20 lg:pt-10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[40px] lg:text-[46px]">
          Cement plants, reimagined
        </h2>
        <div className="mt-6 max-w-[920px] space-y-5 text-base leading-relaxed text-[#3a4658] sm:mt-8 sm:space-y-6 sm:text-lg sm:leading-[1.8]">
          <p>
            From the quarry to the packing plant, the cement value chain runs
            on a handful of high-energy, high-temperature processes. Visionaize
            unifies them into a single 3D digital twin so plant managers,
            control room operators and reliability engineers work off the same
            real-time picture.
          </p>
          <p>
            Advanced AI, AR and VR combine with supercharged remote operations
            to stabilize the kiln, lift OEE across mills and crushers, and
            unlock alternative-fuel and clinker-factor savings safely.
          </p>
          <p>
            Connect with a Digital Twin expert to learn how Visionaize is
            helping cement producers hit reliability, cost and sustainability
            targets faster.
          </p>
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
    "w-full rounded border px-4 py-3 text-base text-[#3a4658] placeholder:text-[#94A3B8]",
    "focus:outline-none focus:ring-1",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400"
      : "border-[#CBD5E1] focus:border-[#2E8DC5] focus:ring-[#2E8DC5]",
  ].join(" ");
}

function FieldError({ message }: { message: string }) {
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
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
        source_page: "/industries/digital-twin-for-cement/",
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
    <section id="talk-to-an-expert" className="bg-[#F1F5F9] py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 sm:px-6 sm:gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[40px] lg:text-[46px]">Let's talk digital twins</h2>
          <p className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
            V-Suite turns your cement plant into a connected digital metaverse.
            Visualize operations through a real-time, up-to-date 3-D digital
            twin. Connect with us to learn how it works.
          </p>
          <h3 className="mt-8 text-xl font-semibold sm:mt-10 sm:text-2xl">Visionaize a better world</h3>
          <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
            {FORM_TOPICS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-base text-[#0F1B2D] sm:text-lg">
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

        <div className="rounded-lg bg-white p-6 shadow-md sm:p-8">
          <h3 className="text-xl font-semibold text-[#2E8DC5] sm:text-2xl md:text-[26px]">Talk to an expert</h3>
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
              className="w-full rounded border border-[#CBD5E1] px-4 py-3 text-base text-[#3a4658] focus:border-[#2E8DC5] focus:outline-none"
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
                <span className="text-sm text-[#64748B]">
                  {form.message.length}/{MESSAGE_MAX_LENGTH}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60"
              style={{
                background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
              }}
            >
              {status === "submitting" ? "Sending…" : "Send request"}
            </button>

            {status === "success" && (
              <p className="text-center text-base text-green-600">
                Thanks! A Digital Twin expert will be in touch shortly.
              </p>
            )}
            {status === "error" && errorMessage && (
              <p className="text-center text-base text-red-600">{errorMessage}</p>
            )}

            <p className="text-center text-sm text-[#64748B]">We generally respond within 24 hours</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Whitepaper() {
  return (
    <section className="bg-white py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 sm:px-6 sm:gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex justify-center">
          <img
            src="https://visionaize.com/wp-content/uploads/2022/07/Rectangle-425-6.png"
            alt="The Industrial Metaverse whitepaper"
            className="w-full max-w-[380px] shadow-xl sm:max-w-[460px]"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-[40px] lg:text-[46px]">
            Experience data in The Industrial Metaverse
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#3a4658] sm:mt-6 sm:text-lg sm:leading-[1.8]">
            With the emergence of Industry 4.0 and IIoT sensors, data overload
            is a common challenge. Explore how 3D digital twin technology can
            turn the data deluge into a competitive advantage.
          </p>
          <a
            href="/theindustrialmetaverse"
             rel="noopener noreferrer"
            className="mt-7 inline-flex items-center rounded-full border border-[#0F1B2D] px-6 py-3 text-base font-semibold text-[#0F1B2D] transition hover:bg-[#0F1B2D] hover:text-white sm:mt-8 sm:px-7"
          >
            Explore how
          </a>
        </div>
      </div>
    </section>
  );
}

function LetsConnect() {
  return (
    <section className="relative overflow-hidden bg-[#0F1B2D] py-10 sm:py-12 md:py-16 lg:py-20">
      <svg
        className="pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-50"
        viewBox="0 0 800 400"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M-100 400 C 200 100, 600 100, 900 400" stroke="url(#cmg)" strokeWidth="1.5" fill="none" />
        <path d="M-100 380 C 250 120, 650 120, 900 380" stroke="url(#cmg)" strokeWidth="1.5" fill="none" />
        <defs>
          <linearGradient id="cmg" x1="0" y1="0" x2="800" y2="400">
            <stop offset="0%" stopColor="#A6E04A" />
            <stop offset="100%" stopColor="#2E8DC5" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <h2 className="text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[68px]">Let's Connect</h2>
        <p className="mt-5 max-w-[520px] text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg md:text-xl">
          Learn how Visionaize can stabilize the kiln and accelerate cement decarbonization
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-md transition hover:shadow-lg sm:mt-10 sm:px-8"
          style={{
            background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
          }}
        >
          Talk to an expert
        </Link>
      </div>
    </section>
  );
}