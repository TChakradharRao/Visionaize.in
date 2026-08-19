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
  "/v-smart-docx/P-and-I-D-document-digitized-2.png";
const USECASE1_IMG =
  "/v-smart-docx/side-by-side-desktop-left-copy-3.png";
const USECASE1_IMG_MOBILE =
  "/v-smart-docx/Group-598.png";
const USECASE2_IMG =
  "/v-smart-docx/side-by-side-desktop-right-1-copy.png";
const USECASE2_IMG_MOBILE =
  "/v-smart-docx/Group-598-1.png";

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
  <section className="relative overflow-hidden bg-white">
  <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 pb-14 pt-10 lg:grid-cols-[5fr_7fr] lg:gap-10 lg:pb-16 lg:pt-12">
    <div>
      <h1 className="text-[26px] font-normal leading-[1.35] tracking-tight lg:text-[34px]">
        <span className="bg-gradient-to-r from-[#8DC73F] to-[#21B8B0] bg-clip-text text-transparent">
          Get thousands of person hours back, by digitizing your P&amp;IDs
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-xl font-normal leading-relaxed text-brand-ink/80">
        Convert static P&amp;ID documents into AI-powered tools that speed up
        understanding of how the pieces and parts of the plant work together.
      </p>

      <p className="mt-4 max-w-xl text-xl font-normal leading-relaxed text-brand-ink/80">
        V-Smart DocX completely transforms how Operations and Maintenance
        teams work with P&amp;IDs, creating massive time efficiencies. Connect
        with us to see how V-Smart DocX makes Asset Performance Management
        more efficient.
      </p>

      <div className="mt-7">
        <Link
          to="/contact"
          className="inline-flex items-center rounded-full px-8 py-4 text-base font-semibold text-white shadow-md"
          style={{
            background:
              "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
          }}
        >
          Connect with a product expert
        </Link>
      </div>
    </div>

    <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 lg:-mr-10 lg:scale-105">
  <img
    src={HERO_IMG}
    alt="V-Smart DocX P&ID digitized in a laptop"
    width={1400}
    height={700}
    className="w-full h-auto"
    loading="eager"
  />
</div>
  </div>
</section>

      {/* KEY CAPABILITIES */}
     <section className="bg-[#DDEEF7] py-16">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="text-center text-[40px] font-semibold text-brand-navy lg:text-[40px]">
      Key Capabilities
    </h2>
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CAPABILITIES.map((c) => (
        <article
          key={c.title}
          className="rounded-md bg-[#EAF4FB] p-7"
        >
          <h3 className="text-xl font-bold leading-snug text-brand-navy">
            {c.title}
          </h3>
          <ul className="mt-5 space-y-3 border-l-4 pl-5" style={{
            borderImage: "linear-gradient(180deg, #8DC73F 0%, #2E8DC5 100%) 1",
          }}>
            {c.bullets.map((b) => (
              <li
                key={b}
                className="list-disc text-[20px] leading-relaxed text-brand-ink/80 marker:text-brand-ink/60"
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
<section className="py-16">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="text-center font-display text-[44px] font-semibold text-brand-navy lg:text-[56px]">
      Flexible Use Cases
    </h2>

    {/* Use case 1 */}
    <div className="mt-12 grid items-center gap-8 lg:gap-0 lg:grid-cols-2">
     <div
       className="w-full overflow-hidden rounded-2xl lg:aspect-[1440/1192]"
     >
  {/* Mobile / tablet only: dedicated image, hidden at lg and up */}
  <div className="lg:hidden">
    <img
      src={USECASE1_IMG_MOBILE}
      alt="Explore P&IDs with greater efficiency"
      className="w-full h-auto object-contain"
      loading="lazy"
    />
  </div>
  {/* Desktop (lg and up): same crop treatment as use case 2's image */}
  <div className="hidden h-full w-full lg:block">
    <img
      src={USECASE1_IMG}
      alt="Explore P&IDs with greater efficiency"
      className="h-full w-full object-cover object-left"
      loading="lazy"
    />
  </div>
</div>
      <div>
        <h3 className="font-display text-4xl font-semibold text-brand-navy lg:text-4xl">
          Explore P&amp;IDs with greater efficiency
        </h3>
        <p className="mt-5 text-xl font-semibold text-brand-ink">
          Use as a standalone product without dependencies on a 3D model
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6 text-xl leading-relaxed text-brand-ink/80 marker:text-brand-ink/60">
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
    <div className="mt-16 grid items-stretch gap-8 lg:gap-0 lg:grid-cols-2">
      <div className="lg:order-1 flex flex-col justify-center">
        <h3 className="font-display text-4xl font-semibold text-brand-navy lg:text-4xl">
          Integrate P&amp;IDs with
          <br />
          3D visualization
        </h3>
        <p className="mt-5 text-xl font-bold text-brand-ink">
          Move quickly from static 2D to immersive 3D
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6 text-xl leading-relaxed text-brand-ink/80 marker:text-brand-ink/60">
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
 <div
   className="w-full overflow-hidden rounded-2xl lg:order-2 lg:aspect-[1440/1192]"
 >
  {/* Mobile / tablet only: dedicated image, hidden at lg and up */}
  <div className="lg:hidden">
    <img
      src={USECASE2_IMG_MOBILE}
      alt="Integrate P&IDs with 3D visualization"
      className="w-full h-auto object-contain"
      loading="lazy"
    />
  </div>
  {/* Desktop (lg and up): same crop treatment as use case 1's image */}
  <div className="hidden h-full w-full lg:block">
    <img
      src={USECASE2_IMG}
      alt="Integrate P&IDs with 3D visualization"
      className="h-full w-full object-cover object-right"
      loading="lazy"
    />
  </div>
</div>
    </div>
  </div>
</section>
      {/* GREEN CTA BAND */}
      <section className="bg-[#A4D233]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 py-10 lg:flex-row lg:gap-8 lg:py-12">
          <p className="text-center font-display text-2xl font-semibold text-brand-navy lg:text-3xl">
            See V-Smart DocX in action!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[#088FD1] shadow transition hover:bg-white/90"
          >
            Request a Demo
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
  <div className="mx-auto max-w-7xl px-8 lg:px-10">

    {/* Heading */}
    <h2 className="mb-8 text-[28px] md:text-[34px] font-normal leading-tight tracking-[-0.02em] text-[#0B1220]">
      Learn More about V-Smart DocX
    </h2>

    {/* FAQ */}
    <FAQAccordion faqs={FAQS} />

    {/* Bottom CTA */}
    <div className="mt-14 flex flex-col items-center text-center">
      <p className="max-w-3xl text-[22px] leading-8 text-[#6B7280]">
        Curious about more details and use cases for V-Smart DocX?
      </p>

      <p className="mt-2 max-w-3xl text-[22px] leading-8 text-[#6B7280]">
        Reach out to our team to schedule a meeting.
      </p>

      <Link
        to="/contact"
        className="mt-8 inline-flex items-center justify-center rounded-full
                   bg-gradient-to-r
                   from-[#8DC73F]
                   via-[#21B8B0]
                   to-[#1F88C8]
                   px-10 py-4
                   text-lg
                   font-semibold
                   text-white
                   shadow-lg
                   transition-all
                   duration-300
                   hover:scale-105
                   hover:shadow-xl"
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
function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((f, i) => (
        <FAQItem
          key={f.q}
          item={f}
          open={openIndex === i}
          onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
        />
      ))}
    </div>
  );
}

function FAQItem({
  item,
  open,
  onToggle,
}: {
  item: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center gap-4 py-4 text-left ${
          open ? "border-b border-brand-ink/15" : ""
        }`}
        aria-expanded={open}
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center text-xl font-bold leading-none text-brand-ink"
          aria-hidden
        >
          {open ? "−" : "+"}
        </span>
        <span className="text-lg md:text-xl font-semibold text-[#0B1220]">
  {item.q}
</span>
      </button>
      {open && (
        <div className="py-5 pl-9 pr-4 text-lg md:text-xl leading-relaxed text-brand-ink/60">
          {item.a}
        </div>
      )}
    </div>
  );
}