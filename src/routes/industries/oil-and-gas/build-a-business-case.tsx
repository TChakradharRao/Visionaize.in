import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { api } from "@/lib/api";

export const Route = createFileRoute(
  "/industries/oil-and-gas/build-a-business-case"
)({
  head: () => ({
    meta: [
      { title: "Build a Business Case — Oil & Gas — Visionaize" },
      {
        name: "description",
        content:
          "Zero in on your expected return on investment. Learn from a Digital Twin expert how 3D Digital Twins can provide a return on investment for your downstream oil & gas facility.",
      },
      { property: "og:title", content: "Build a Business Case — Visionaize" },
      {
        property: "og:description",
        content:
          "Zero in on your expected return on investment. Learn from a Digital Twin expert how 3D Digital Twins can provide a return on investment for your downstream oil & gas facility.",
      },
    ],
  }),
  component: BuildBusinessCasePage,
});

const OTHER_USE_CASES_MAX_LEN = 500;

const USE_CASES = [
  "Improve Inspections",
  "Improve Maintenance Productivity & Quality",
  "Improve Operations",
  "Improve Unplanned Downtime",
  "Improve Turnaround back-to-service",
];

const OUTCOMES = [
  "Less downtime",
  "Increased productivity",
  "Reduced carbon footprint",
  "Improved worker safety",
];

function BuildBusinessCasePage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [targetCapacity, setTargetCapacity] = useState("");
  const [actualOutput, setActualOutput] = useState("");
  const [plannedDowntime, setPlannedDowntime] = useState("");
  const [unplannedDowntime, setUnplannedDowntime] = useState("");
  const [useCases, setUseCases] = useState<string[]>([]);
  const [otherUseCases, setOtherUseCases] = useState("");

  // Measures the form's real rendered height (including validation/success
  // messages that change its height) so we can reserve exactly that much
  // space on the wrapper below. This guarantees the absolutely-positioned
  // form — even though it visually spans across both the gradient hero and
  // the image/outcomes section — can never extend far enough to cover the
  // Footer.
  //
  // The form itself sits `lg:top-6` (24px) down from the top of the
  // wrapper, so that offset must be added to the reserved height too —
  // otherwise the wrapper is reserved ~24px short of the form's true
  // bottom edge. FORM_BOTTOM_GAP adds a little extra breathing room so the
  // form's bottom edge doesn't sit flush against the next section/Footer.
  const FORM_TOP_OFFSET = 24; // px, matches `lg:top-6` on the form
  const FORM_BOTTOM_GAP = 32; // px, extra clearance below the form

  const formRef = useRef<HTMLFormElement>(null);
  const [formHeight, setFormHeight] = useState(0);

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setFormHeight(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reservedWrapperHeight = formHeight
    ? formHeight + FORM_TOP_OFFSET + FORM_BOTTOM_GAP
    : 0;

  const toggleUseCase = (value: string) => {
    setUseCases((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);

    if (useCases.length === 0) {
      setStatus("err");
      setErrorMsg("Please select at least one use case.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");
    try {
      await api.submitBusinessCase({
        name: `${f.get("first_name") || ""} ${f.get("last_name") || ""}`.trim(),
        email: String(f.get("email") || ""),
        company: String(f.get("company") || ""),
        target_capacity_bpd: targetCapacity,
        actual_output_bpd: actualOutput,
        location: String(f.get("location") || ""),
        planned_downtime_yearly: plannedDowntime,
        unplanned_downtime_yearly: unplannedDowntime,
        implementation_schedule: String(f.get("implementation_schedule") || ""),
        time_spent_on_data_pct: String(f.get("time_spent_pct") || ""),
        use_cases: useCases,
        other_use_cases: otherUseCases || undefined,
        source_page: "/industries/oil-and-gas/build-a-business-case/",
      });
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
      setTargetCapacity("");
      setActualOutput("");
      setPlannedDowntime("");
      setUnplannedDowntime("");
      setUseCases([]);
      setOtherUseCases("");
    } catch (err) {
      setStatus("err");
      setErrorMsg(
        err instanceof Error ? err.message : "Unable to submit. Please try again."
      );
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/*
          This outer wrapper holds BOTH the gradient hero and the
          image/outcomes section, and is the positioning context for the
          form. On large screens the form is absolutely positioned so it
          visually overlaps the boundary between the two sections.

          `lg:min-h-[var(--form-h)]` reserves exactly the form's measured
          height on this wrapper, so no matter how tall the form is, the
          wrapper (and therefore everything after it, including the
          Footer) is always pushed down far enough to clear it. The form
          can overlay the two sections above it, but never the Footer.
        */}
        <div
          className="relative overflow-visible lg:min-h-[var(--form-h)]"
          style={{ ["--form-h" as string]: `${reservedWrapperHeight}px` }}
        >
          {/* Gradient hero */}
          <section className="relative px-8 pb-10 pt-10 md:pb-10 md:pt-10">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-60 md:h-75"
              style={{
                background:
                  "linear-gradient(120deg, #A6E04A 0%, #7FC46B 25%, #5BAE7E 50%, #2E8FB1 75%, #1E7EC8 100%)",
              }}
            />
            <div className="relative z-10 mx-auto max-w-7xl">
              <div className="text-brand-navy max-w-lg">
                <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                  Zero in on your expected return on investment
                </h1>
                <p className="mt-5 text-base leading-relaxed text-brand-navy/90">
                  Learn from a Digital Twin expert on how 3D Digital Twins can
                  provide a return on investment in 3D Digital Twin technology.
                </p>
              </div>
            </div>
          </section>

          {/* Form: static/in-flow on mobile (sits right under the hero
              text); absolutely positioned on large screens so it overlays
              both the hero above and the image/outcomes section below. */}
          <div className="relative z-20 px-6 lg:absolute lg:inset-0 lg:px-0">
            <div className="mx-auto max-w-7xl lg:relative lg:h-full lg:px-6">
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="mt-14 w-full rounded-2xl bg-white p-6 shadow-2xl lg:absolute lg:right-6 lg:top-6 lg:mt-0 lg:w-[460px]"
              >
                <h2 className="text-xl font-semibold text-brand-navy">
                  Build your business case
                </h2>

                <SectionLabel>Your Information</SectionLabel>
                <div className="mt-2 space-y-2">
                  <Input name="first_name" placeholder="First Name" required />
                  <Input name="last_name" placeholder="Last Name" required />
                  <Input name="company" placeholder="Company Name" required />
                  <Input
                    name="email"
                    placeholder="Business Email Address"
                    type="email"
                    required
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                    title="Please enter a valid email address containing @"
                  />
                </div>

                <FieldLabel>
                  Your Downstream Oil &amp; Gas Target Facility Capacity
                  (Barrels/Day)*
                </FieldLabel>
                <Input
                  name="target_capacity"
                  placeholder="e.g. 250,000"
                  required
                  inputMode="numeric"
                  value={targetCapacity}
                  onChange={(e) => setTargetCapacity(e.target.value)}
                />

                <FieldLabel>Actual Output (Barrels/Day)*</FieldLabel>
                <Input
                  name="actual_output"
                  placeholder="e.g. 250,000"
                  required
                  inputMode="numeric"
                  value={actualOutput}
                  onChange={(e) => setActualOutput(e.target.value)}
                />

                <FieldLabel>Location*</FieldLabel>
                <Select name="location" required defaultValue="">
                  <option value="" disabled>
                    —Please choose an option—
                  </option>
                  <option>North America</option>
                  <option>South America</option>
                  <option>Europe</option>
                  <option>Middle East</option>
                  <option>Africa</option>
                  <option>Asia Pacific</option>
                </Select>

                <SectionLabel>Operating Parameters</SectionLabel>
                <FieldLabel>Planned Downtime/yearly*</FieldLabel>
                <Input
                  name="planned_downtime"
                  placeholder="e.g. 10 days"
                  required
                  value={plannedDowntime}
                  onChange={(e) => setPlannedDowntime(e.target.value)}
                />

                <FieldLabel>Unplanned Downtime/yearly*</FieldLabel>
                <Input
                  name="unplanned_downtime"
                  placeholder="e.g. 10 days"
                  required
                  value={unplannedDowntime}
                  onChange={(e) => setUnplannedDowntime(e.target.value)}
                />

                <SectionLabel>Timing</SectionLabel>
                <FieldLabel>Implementation Schedule*</FieldLabel>
                <Select name="implementation_schedule" required defaultValue="">
                  <option value="" disabled>
                    —Please choose an option—
                  </option>
                  <option>Immediately</option>
                  <option>Within 3 months</option>
                  <option>3–6 months</option>
                  <option>6–12 months</option>
                  <option>12+ months</option>
                </Select>

                <SectionLabel>
                  Current Productivity for Maintenance, Inspection, and
                  Operations
                </SectionLabel>
                <FieldLabel>
                  What is the Percentage of Time Spent Looking for data,
                  Interacting with Systems as a Percentage of Total Work Time?*
                </FieldLabel>
                <Select name="time_spent_pct" required defaultValue="">
                  <option value="" disabled>
                    —Please choose an option—
                  </option>
                  <option>Less than 10%</option>
                  <option>10–25%</option>
                  <option>25–50%</option>
                  <option>50–75%</option>
                  <option>More than 75%</option>
                </Select>

                <FieldLabel>
                  Check the top Use Cases you are most interested in solving*
                </FieldLabel>
                <div className="mt-1.5 space-y-1.5">
                  {USE_CASES.map((uc) => (
                    <label
                      key={uc}
                      className="flex items-center gap-2 text-[13px] font-medium text-brand-navy"
                    >
                      <input
                        type="checkbox"
                        checked={useCases.includes(uc)}
                        onChange={() => toggleUseCase(uc)}
                        className="h-3.5 w-3.5 rounded border-gray-700 text-brand-blue focus:ring-brand-blue"
                      />
                      {uc}
                    </label>
                  ))}
                </div>

                <FieldLabel>Other use cases (please describe)</FieldLabel>
                <Input
                  name="other_use_cases"
                  placeholder="(optional)"
                  maxLength={OTHER_USE_CASES_MAX_LEN}
                  value={otherUseCases}
                  onChange={(e) => setOtherUseCases(e.target.value)}
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-sm font-semibold text-white shadow-lg transition-opacity disabled:opacity-60"
                  style={{
                    background:
                      "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #1E7EC8 100%)",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Submit"}
                </button>
                {status === "ok" && (
                  <p className="mt-4 text-center text-sm text-green-600">
                    Thanks — we received your submission and will be in touch
                    shortly.
                  </p>
                )}
                {status === "err" && (
                  <p className="mt-4 text-center text-sm text-red-600">
                    {errorMsg}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Image / outcomes section — the form (on large screens) overlaps
              down onto this section's top-right area. */}
          <section className="bg-[#F5F7FA] pb-24 pt-14 md:pb-28 md:pt-25">
            <div className="mx-auto max-w-7xl px-6">
              <div className="max-w-2xl">
                <img
                  src="https://visionaize.in/wp-content/uploads/2023/08/download-2048x1132.jpg"
                  alt="3D Digital Twin of an oil and gas facility"
                  className="w-full  object-cover shadow-md"
                />
                <h2 className="mt-8 text-2xl font-semibold leading-tight text-brand-navy md:text-3xl">
                  Together we can Visionaize a<br /> better world
                </h2>
                <ul className="mt-8 grid grid-cols-1 gap-4">
                  {OUTCOMES.map((o) => (
                    <li
                      key={o}
                      className="flex items-center gap-4 text-base text-brand-ink"
                    >
                      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#A6E04A] to-[#1E7EC8] text-white">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[12px] font-semibold uppercase tracking-wide text-brand-navy/70">
      {children}
    </p>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 mb-1 text-[13px] font-medium text-brand-navy">
      {children}
    </p>
  );
}

function Select({
  name,
  required,
  defaultValue,
  children,
}: {
  name: string;
  required?: boolean;
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      required={required}
      className="block h-[36px] w-full rounded-lg border border-gray-700 bg-white px-3 text-[14px] font-medium text-brand-navy focus:border-brand-blue focus:outline-none"
    >
      {children}
    </select>
  );
}

function Input({
  name,
  placeholder,
  type = "text",
  required = false,
  pattern,
  title,
  maxLength,
  inputMode,
  value,
  onChange,
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  pattern?: string;
  title?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      pattern={pattern}
      title={title}
      maxLength={maxLength}
      inputMode={inputMode}
      placeholder={placeholder}
      {...(value !== undefined ? { value, onChange } : {})}
      className="block h-[36px] w-full rounded-lg border border-gray-700 bg-white px-3 text-[14px] font-medium text-brand-navy placeholder:text-brand-navy focus:border-brand-blue focus:outline-none"
    />
  );
}