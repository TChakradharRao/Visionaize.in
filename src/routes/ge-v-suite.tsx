/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingInput, FloatingTextarea } from "@/components/ui/floating-field";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/lib/api";

export const Route = createFileRoute("/ge-v-suite")({
  head: () => ({
    meta: [
      { title: "GE V-Suite — Visionaize" },
      {
        name: "description",
        content:
          "Leverage GE Digital APM with Visionaize's 3D Digital Twin visualization for powerful asset performance management and operational intelligence.",
      },
      { property: "og:title", content: "GE V-Suite — Visionaize" },
      {
        property: "og:description",
        content:
          "A powerful 1-2 punch: APM + 3D visualization. Make smarter and faster decisions by providing 3D contextualization to your data.",
      },
    ],
  }),
  component: GEVSuite,
});

const PILLARS = [
  {
    icon: "/solutions/Vector-6.svg",
    title: "Reduce downtime",
    body: "Be more productive by minimizing planned and unplanned downtime",
  },
  {
    icon: "/solutions/Group-3.svg",
    title: "Boost productivity",
    body: "Train and learn faster, plan better, work more efficiently",
  },
  {
    icon: "/solutions/Group-4.svg",
    title: "Plan more clearly",
    body: "Enables teams to contextualize rich data, anytime, from anywhere",
  },
];

const FORM_TOPICS = [
  "How 3D visualization can extend the power of GE Digital APM",
  "Keep processes running smoothly",
  '"Experience" data to ease decision making',
  "Keep teams safe and operationally compliant",
];

function GEVSuite() {
  return (
    <div className="min-h-screen bg-white text-[#0F1B2D]">
      <Header />
      <Hero />
      <Pillars />
      <Intro />
      <Quote />
      <TalkDigitalTwins />
      <Whitepaper />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative h-[640px] w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('/main-banner-image-ge-v-suite.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center px-6">
        <div className="w-full max-w-[550px] bg-white p-12 shadow-sm">
          <h1
            className="text-[42px] font-light leading-[1.05] tracking-tight bg-clip-text"
            style={{
              background: "linear-gradient(111.34deg, #94C11F 8.76%, #078ED1 84.29%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            APM + 3D Visualization
          </h1>
          <p className="mt-6 text-[18px] leading-relaxed text-[#7a7a7a]">
            Make smarter and faster decisions by providing 3D contextualization to your data
          </p>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-[#0F1B2D] py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 md:grid-cols-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="flex flex-col items-center text-center">
            <img src={p.icon} alt="" className="h-20 w-20" loading="lazy" />
            <h3 className="mt-6 text-[24px] font-semibold text-white">{p.title}</h3>
            <p className="mt-4 max-w-[280px] text-[15px] leading-relaxed text-white/99">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  const [showVideo, setShowVideo] = useState(false);

  return (
 <section className="bg-white py-32">
  <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
    <div>
      <h2 className="text-[46px] font-semibold leading-tight text-brand-navy pr-14">
        A powerful 1-2 punch: APM + 3D visualization
      </h2>
      <p className="mt-8 max-w-[500px] text-[18px] leading-relaxed text-[#0F1B2D]/80">
        As owners and operators of complex industrial facilities embark on a digital transformation journey, it is important to add spatial context against available data sets.
      </p>

      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogTrigger asChild>
          <button
            className="mt-8 inline-flex items-center rounded-full px-8 py-3.5 text-base font-semibold text-white transition hover:shadow-lg cursor-pointer"
            style={{
              background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
            }}
          >
            Watch Video
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-0 sm:p-0">
          <div className="relative h-0 overflow-hidden rounded-2xl pt-[56.25%]">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/GE-Digital-Visionaize-1-1-1.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              controls
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>

    <div
      className="relative aspect-video overflow-hidden rounded-lg bg-brand-navy shadow-xl cursor-pointer group"
      onClick={() => setShowVideo(true)}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition group-hover:bg-black/40 z-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white group-hover:scale-110 transition">
          <svg className="h-8 w-8 text-brand-navy" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <img
        src="/option-1.png"
        alt="GE Digital APM Video"
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  </div>
</section>
  );
}

function Quote() {
  return (
    <section className="relative overflow-hidden bg-white py-20 pt-0">
      <div className="mx-auto max-w-[1280px] px-6 my-12">
        <div className="relative">
          {/* Background image in place of the decorative curve lines */}
          <img
            src="/oil-and-gas/home-quote-min.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-3/4 hidden w-[520px] -translate-y-1/2 lg:block"
          />

          <blockquote className="relative max-w-[900px] text-[36px] font-medium leading-[1.3] text-[#0F1B2D]">
            Our partnership with Visionaize brings an enhanced scalable templated capability to APM that accelerates implementation and simplifies replication across sites and reduces implementation costs
          </blockquote>
          <p className="relative mt-6 text-lg font-semibold tracking-wider text-[#3a4658]">
            Linda Rae, General Manager of GE Digital’s Power Generation and Oil & Gas business
          </p>
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
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleTopicChange = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const firstName = String(form.get("first_name") ?? "").trim();
    const lastName = String(form.get("last_name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();

    if (!firstName || !lastName || !email || !phone) {
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
        message: `Topics: ${selectedTopics.join(", ")}\n\n${message}`,
        source_page: "/ge-v-suite",
      });
      setStatus("ok");
      setPhone("");
      setMessage("");
      setSelectedTopics([]);
      formElement.reset();
    } catch (err) {
      setStatus("err");
      setErrorMsg(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    }
  };

  return (
    <section className="bg-[#EFF0F1] py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid gap-26 lg:grid-cols-2">
          <div className="max-w-3xl">
            <h2 className="text-[49px] font-semibold leading-tight text-brand-navy pb-8">
              Let's talk digital twins
            </h2>
            <p className="mt-6 text-[18px] leading-relaxed text-black pb-8">
              Leverage the combined power of GE Digital APM and Visionaize's V-Plant 3D visualization solutions for Digital Twins.
            </p>
            <div className="mt-10 space-y-6">
              <h3 className="text-[28px] font-semibold text-brand-navy pb-5">Example topics we may explore in a call:</h3>
              {FORM_TOPICS.map((topic) => (
                <label key={topic} className="flex items-start gap-4 group">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <circle cx="15" cy="15" r="15" fill="url(#paint0_linear_523_2918)" />
                      <path d="M10 15C11.1716 16.3234 11.8284 17.0654 13 18.3889" stroke="black" strokeWidth="2" strokeLinecap="round" />
                      <path d="M13 18.3887C15.7337 15.5031 17.2663 13.8853 20 10.9998" stroke="black" strokeWidth="2" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="paint0_linear_523_2918" x1="2.58398" y1="2.73586" x2="29.9235" y2="13.4189" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#94C11F" />
                          <stop offset="1" stopColor="#078ED1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="text-[19px] leading-relaxed text-black group-hover:text-brand-blue transition">
                    {topic}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-white p-10 max-w-md">
            <h3 className="text-[24px] font-semibold text-black">Talk to an expert</h3>
            <form className="mt-6 grid grid-cols-1 gap-3 space-y-1" onSubmit={onSubmit}>
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
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              />
              <FloatingTextarea
                name="message"
                label="Message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-4 inline-flex items-center justify-center w-full rounded-full px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-60"
                style={{
                  background: "linear-gradient(90deg, #A6E04A 0%, #5BAE7E 50%, #2E8DC5 100%)",
                }}
              >
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
              <p className="text-center text-xs text-[#64748B]">
                We generally respond within 24 hours
              </p>
              {status === "ok" && (
                <p className="text-center text-sm text-green-600">
                  Thanks — we received your message and will respond shortly.
                </p>
              )}
              {status === "err" && (
                <p className="text-center text-sm text-red-600">{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Whitepaper() {
  return (
    <section className="bg-white pb-20 pt-6">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
        <div className="flex justify-center">
          <img
            src="/ge-whitepapaer.png"
            alt="The Industrial Metaverse whitepaper"
            className="w-full max-w-[460px] "
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-[44px] font-semibold leading-tight">
            Experience data in The Industrial Metaverse
          </h2>
          <p className="mt-6 text-[18px] leading-[1.8] text-[#3a4658]">
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
