import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/platform/v-smart-docx")({
  head: () => ({
    meta: [
      { title: "V-Smart DocX — AI-powered P&ID digitization | Visionaize" },
      {
        name: "description",
        content:
          "Convert static P&IDs into AI-powered, searchable, 3D-linked documents. V-Smart DocX accelerates Operations & Maintenance workflows.",
      },
      { property: "og:title", content: "V-Smart DocX — Visionaize" },
      {
        property: "og:description",
        content:
          "Get thousands of person-hours back, by digitizing your P&IDs with V-Smart DocX.",
      },
    ],
  }),
  component: VSmartDocXPage,
});

const HERO_IMG =
  "https://visionaize.com/wp-content/uploads/2024/05/P-and-I-D-document-digitized-2.png";
const USECASE1_IMG =
  "https://visionaize.com/wp-content/uploads/2024/05/side-by-side-desktop-left-copy-3.png";
const USECASE2_IMG =
  "https://visionaize.com/wp-content/uploads/2024/05/side-by-side-desktop-right-1-copy.png";

const CAPABILITIES = [
  {
    title: "AI-Driven Tag, Symbol & Metadata Extraction",
    bullets: [
      "Automated recognition and extraction of symbols and asset tags.",
      "Auto-correction ensures accuracy and data integrity.",
    ],
  },
  {
    title: "3D Model & Document Integration",
    bullets: [
      "Navigate P&IDs, Isos, and Drawings with 3D models.",
      "Toggle between diagrams and physical assets.",
    ],
  },
  {
    title: "Real-Time Collaboration & Workflow Efficiency",
    bullets: [
      "Multi-user document access for simultaneous operations.",
      "Markup and annotations to streamline approvals (in beta)",
    ],
  },
  {
    title: "Advanced Search & Data Management",
    bullets: [
      "Powerful search tools to filter and classify data effortlessly.",
      "Version control to manage document updates (in beta)",
    ],
  },
  {
    title: "API for Seamless System Integration",
    bullets: [
      "Connect with enterprise systems for holistic asset management.",
      "Support for continuous digital transformation with scalable API endpoints.",
    ],
  },
  {
    title: "Customization & User-Centric Design",
    bullets: [
      "Dashboards and tools tailored for various user roles.",
      "Interactive tag maps provide a visual guide to system connectivity.",
    ],
  },
];

const FAQS = [
  {
    q: "What is V-Smart DocX?",
    a: "V-Smart DocX is AI-powered platform that automatically converts P&ID PDF files into intelligent diagrams, extracting key asset tag information and providing a legend for quick searches.",
  },
  {
    q: "What are P&IDs?",
    a: "Piping and Instrumentation Diagrams (P&IDs) are schematic drawings that show the interconnection of process equipment, instrumentation, and control devices used to operate a process plant.",
  },
  {
    q: "Do I need a 3D model to work with V-Smart DocX?",
    a: "No. V-Smart DocX can be used as a standalone product to digitize and analyze P&IDs without any 3D model dependency, while still offering optional integration when a 3D model is available.",
  },
  {
    q: "What makes V-Smart DocX unique?",
    a: "It combines AI-driven symbol/tag extraction, deep search, version control, and bi-directional links between P&IDs and 3D assets in a single collaborative workspace.",
  },
  {
    q: "Can V-Smart DocX improve worker safety?",
    a: "Yes. Faster, more accurate access to up-to-date diagrams and asset information helps operators plan safer interventions and reduce errors during maintenance.",
  },
  {
    q: "Are there flexibile deployment options?",
    a: "V-Smart DocX supports both cloud-hosted and on-premise deployments to align with your security, performance and compliance requirements.",
  },
  {
    q: "How can I learn more about V-Smart DocX?",
    a: "Reach out via the Contact Sales button below and our team will set up a personalised demo focused on your assets and workflows.",
  },
];

function VSmartDocXPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-brand-ink">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <h1 className="font-display text-[44px] leading-[1.1] font-semibold lg:text-[56px]">
              <span className="bg-gradient-to-r from-[#8DC73F] to-[#21B8B0] bg-clip-text text-transparent">
                Get thousands of person hours back, by digitizing your P&amp;IDs
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-brand-ink/80">
              Convert static P&amp;ID documents into AI-powered tools that
              speed up understanding of how the pieces and parts of the plant
              work together.
            </p>
            <p className="mt-5 max-w-xl text-lg text-brand-ink/80">
              V-Smart DocX completely transforms how Operations and Maintenance
              teams work with P&amp;IDs, creating massive time efficiencies.
              Connect with us to see how V-Smart DocX makes Asset Performance
              Management more efficient.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#8DC73F] via-[#21B8B0] to-[#1F88C8] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-black/10 transition hover:opacity-95"
              >
                Connect with a product expert
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={HERO_IMG}
              alt="V-Smart DocX P&ID digitized in a laptop"
              className="w-full"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* KEY CAPABILITIES */}
      <section className="bg-[#DDEEF7] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-[44px] font-semibold text-brand-navy lg:text-[56px]">
            Key Capabilities
          </h2>
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <article
                key={c.title}
                className="rounded-2xl bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                <h3 className="font-display text-xl font-semibold text-brand-navy">
                  {c.title}
                </h3>
                <ul className="mt-6 space-y-3 border-l-4 border-[#8DC73F] pl-5">
                  {c.bullets.map((b) => (
                    <li
                      key={b}
                      className="list-disc text-[15px] leading-relaxed text-brand-ink/80 marker:text-brand-ink/60"
                      style={{ marginLeft: "1rem" }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FLEXIBLE USE CASES */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-display text-[44px] font-semibold text-brand-navy lg:text-[56px]">
            Flexible Use Cases
          </h2>

          {/* Use case 1 */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            <img
              src={USECASE1_IMG}
              alt="Explore P&IDs with greater efficiency"
              className="w-full"
              loading="lazy"
            />
            <div>
              <h3 className="font-display text-3xl font-semibold text-brand-navy lg:text-4xl">
                Explore P&amp;IDs with greater efficiency
              </h3>
              <p className="mt-6 font-semibold text-brand-ink">
                Use as a standalone product without dependencies on a 3D model
              </p>
              <ul className="mt-5 list-disc space-y-3 pl-6 text-[15px] leading-relaxed text-brand-ink/80 marker:text-brand-ink/60">
                <li>Extract metadata and tags and symbols from your P&amp;IDs.</li>
                <li>
                  Reduce operational risks by maintaining a high level of data
                  accuracy and integrity.
                </li>
                <li>
                  Lower costs by decreasing the need for manual data entry and
                  reducing errors that can lead to expensive corrective actions.
                </li>
                <li>
                  Enable engineers, operators, and project managers to
                  efficiently understand the entire system architecture and how
                  different components interact, with AI-powered logic.
                </li>
              </ul>
            </div>
          </div>

          {/* Use case 2 */}
          <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
            <div className="lg:order-1">
              <h3 className="font-display text-3xl font-semibold text-brand-navy lg:text-4xl">
                Integrate P&amp;IDs with
                <br />
                3D visualization
              </h3>
              <p className="mt-6 font-semibold text-brand-ink">
                Move quickly from static 2D to immersive 3D
              </p>
              <ul className="mt-5 list-disc space-y-3 pl-6 text-[15px] leading-relaxed text-brand-ink/80 marker:text-brand-ink/60">
                <li>Generate intelligence into 3D models from P&amp;IDs.</li>
                <li>Zero in on specific equipment with greater efficiency.</li>
                <li>Make quicker sense of the entire plant and interrelated parts.</li>
                <li>
                  Facilitates digital transformation in a manageable and
                  scalable way, adapting to the specific needs of complex
                  facilities.
                </li>
              </ul>
            </div>
            <img
              src={USECASE2_IMG}
              alt="Integrate P&IDs with 3D visualization"
              className="w-full lg:order-2"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* GREEN CTA BAND */}
      <section className="bg-[#A4D233]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6 py-14 sm:flex-row">
          <p className="font-display text-2xl font-semibold text-brand-navy lg:text-3xl">
            See V-Smart DocX in action!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-navy shadow transition hover:bg-white/90"
          >
            Request a Demo
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display text-3xl font-semibold text-brand-navy lg:text-4xl">
            Learn More about V-Smart DocX
          </h2>
          <div className="mt-10 space-y-4">
            {FAQS.map((f, i) => (
              <FAQItem key={f.q} item={f} defaultOpen={i === 0} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-brand-ink/80">
              Curious about more details and use cases for V-Smart DocX?
            </p>
            <p className="mt-2 text-lg text-brand-ink/80">
              Reach out to our team to schedule a meeting.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-[#8DC73F] via-[#21B8B0] to-[#1F88C8] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-black/10 transition hover:opacity-95"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}

function FAQItem({
  item,
  defaultOpen,
}: {
  item: { q: string; a: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-brand-ink/10 pb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-4 py-3 text-left"
        aria-expanded={open}
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xl font-semibold transition ${
            open ? "text-brand-navy" : "text-brand-navy"
          }`}
          aria-hidden
        >
          {open ? "−" : "+"}
        </span>
        <span className="flex-1 font-display text-lg font-semibold text-brand-navy">
          {item.q}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-brand-navy/60 transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pl-10 pr-4 pb-2 text-[15px] leading-relaxed text-brand-ink/80">
          {item.a}
        </div>
      )}
    </div>
  );
}
