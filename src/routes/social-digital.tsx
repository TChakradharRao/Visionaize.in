import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/social-digital")({
  component: SocialDigitalPage,
});

const SLIDES = [
  {
    image: "/social-digital/eco-bg-min.jpg",
    text: "Your Partner in Progress, Accelerating Progress Towards a Better Future",
  },
  {
    image: "/social-digital/Group-1-1-min-1-1.png",
    text: "Sustainability, digital trust and society's well-being",
  },
  {
    image: "/social-digital/plant-hands-ai-generated-min-4.jpg",
    text: "Agents of positive change, we partner to address complex challenges",
  },
];

const AUTOPLAY_MS = 6000;

const PILLARS = [
  {
    title: "We create social\nimpact",
    icon: "/social-digital/Mask-group-86.png",
  },
  {
    title: "We support\ndevelopmental\ninitiatives",
    icon: "/social-digital/Mask-group-87.png",
  },
  {
    title: "We enable\nsustainable action",
    icon: "/social-digital/Mask-group-88.png",
  },
];

const IMPACT_WORDS = ["Excellence", "Innovation", "Impact"];

const SERVICES = [
  {
    title: "Sustainability,\nClimate Change & ESG",
    icon: "/social-digital/Mask-group-89.png",
    backColor: "#1ea7e1",
    backText:
      "We provide advisory support in implementing sustainability and ESG best practices across businesses by way of analysing.",
  },
  {
    title: "Development Sector Advisory",
    icon: "/social-digital/Mask-group-90.png",
    backColor: "#8bc53f",
    backText:
      "We understand the development sector from within and our specialised advisory function supports businesses on the ground.",
  },
  {
    title: "Governance & Risk Advisory",
    icon: "/social-digital/Mask-group-91.png",
    backColor: "#8bc53f",
    backText:
      "We help clients to address various regulatory compliances and support them in their journey towards better governance.",
  },
  {
    title: "Business Support\nServices",
    icon: "/social-digital/Mask-group-94.png",
    backColor: "#1ea7e1",
    backText:
      "Provides strategic & operational solutions for market entry, public affairs, public policy & advocacy, strategic.",
  },
];

const FAQS = [
  {
    title: "Sustainability, Climate Change & ESG Advisory",
    content:
      "Integration of strategies for 'triple-bottom-line' sustainability and ESG into business including value chain; roadmap, implementation and communication; managing sustainability risks and leveraging on opportunities; effectively managing resource efficiency; climate change mitigation and adaptation.",
    bullets: [
      "Sustainability Risk Analysis, Strategy and Reporting",
      "Supply Chain Sustainability",
      "Climate Change Risk Analysis",
      "Strategy For Mitigation and Adaptation",
      "Low Carbon Transformation",
      "Circular Business Model, Waste and Water Management",
      "Climate Finance",
      "Assurance of Non-financial Report",
    ],
  },
  {
    title: "Human Resources Advisory",
    content:
      "End-to-end support including talent acquisition, employment law compliances, HR Strategy, design and implementation, HR process outsourcing, policies, compensation benchmarking, L&D initiatives, HR audits and OD interventions.",
    bullets: [
      "Talent Acquisition",
      "POSH Offerings",
      "Organization Development",
      "HR Processes and Policies",
      "Learning and Development",
      "HR Process Outsourcing",
      "HR Assessments and Due Diligence",
      "Diversity and Inclusion Strategy",
    ],
  },
  {
    title: "Governance & Risk Advisory",
    content:
      "Addresses compliance, supports oversight of the Board and management, addresses organisational compliance, including internal audit, as well as identifying sustainable growth opportunities, compliance oversight, including risk assessment, internal audit, and helping clients in solution improvement.",
    bullets: [
      "Risk Assessment Framework",
      "Compliance and Control",
      "IT and Cyber Security",
      "Internal Audit",
      "Agreed Upon Procedures",
      "Investigations and Forensics",
      "Financial Management and Accounting",
    ],
  },
  {
    title: "Development Sector Advisory",
    content:
      "Develop social development strategies, optimise value for investment in social projects, provide technical and managerial support and measure impact for development.",
      bullets:[
        "Strategy and Growth",
"Performance Improvement",
 "Project Management Life-cycle",
"Monitoring, Evaluation and Learning",
"Impact Assessment",
"Research and Documentation",
"Systems and Process Strengthening",
"Corporate Social Responsibility (CSR)",
"Health Advisory",
"Health Supply Chain and Procurement",
      ]
  },
  {
    title: "Business Support Services",
    content:
      "Provides strategic and operational solutions for market entry, public affairs, public policy and advocacy, Strategic Communication and Policy Advisory’ (stakeholder and crisis communications), knowledge partnerships, legal support, CFO services, virtual office facilities and help access funding (Seed and VCs).",
      bullets:[
      "Public Affairs Advisory",
"Business Set-up Services",
"Strategic Communications Advisory",
"Legal Support",
"Celebrity Social Cause Advisory",
"CFO Services"
 
      ]
  },
  {
    title: "CSR Advisory",
    content:
      "Provides the right tools to ensure more productive and successful contribution to the social sector. The last two decades have witnessed a paradigm shift in the corporate approach to social responsibility. Companies around the world are now looking to optimize resource efficiency and enhance social impact through strategic CSR.",
      bullets:[
       " Developing CSR strategies and operational plans",
"Implementing due diligence",
"Need assessment, baseline, and impact assessment studies.",
"Orienting and developing capacities of CSR staff",
"Designing monitoring frameworks and carrying out monitoring, evaluation and documentation of CSR project."
      ]
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-3xl font-extrabold text-[#0c1c2e] sm:text-4xl">
          Explore Our Advisory Services
        </h2>

        <div className="border-t border-gray-200">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.title} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className="flex h-6 w-6 flex-none items-center justify-center text-2xl font-light text-[#0c1c2e]">
                    {isOpen ? "\u2212" : "+"}
                  </span>
                  <span className="text-lg font-bold text-[#0c1c2e] sm:text-xl">
                    {faq.title}
                  </span>
                </button>

                <div
                  className="grid overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-3 pl-10 pr-4 text-base leading-relaxed text-gray-600 sm:text-medium">
                      {faq.content}
                    </p>
                    {faq.bullets && (
                      <ul className="list-disc space-y-1.5 pb-6 pl-14 pr-4 text-base leading-relaxed text-gray-600 sm:text-medium">
                        {faq.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SocialDigitalPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [active]);

  const goTo = (index: number) => setActive(index);
  const goPrev = () =>
    setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setActive((prev) => (prev + 1) % SLIDES.length);

  return (
    <>
      <Header />
      <main className="bg-white text-brand-ink">
        {/* HERO */}
        <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px]">
          <style>{`
            @keyframes heroRise {
              from { opacity: 0; transform: translateY(48px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .hero-rise-text {
              animation: heroRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
            }
            .hero-rise-btn {
              animation: heroRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
            }
          `}</style>

          {SLIDES.map((slide, index) => (
            <div
              key={slide.image}
              aria-hidden={index !== active}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                opacity: index === active ? 1 : 0,
                zIndex: index === active ? 1 : 0,
              }}
            />
          ))}

          <div className="absolute inset-0 z-[1] bg-black/10" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1
              key={active}
              className="hero-rise-text max-w-4xl text-3xl font-bold leading-tight text-white drop-shadow-md sm:text-4xl md:text-5xl"
            >
              {SLIDES[active].text}
            </h1>

            <a
              key={`btn-${active}`}
              href="/social-digital-contact"
              className="hero-rise-btn mt-10 rounded-full bg-gradient-to-r from-lime-400 to-sky-500 px-10 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Contact us
            </a>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-3xl leading-none text-white/80 transition-colors hover:text-white"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-3xl leading-none text-white/80 transition-colors hover:text-white"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {SLIDES.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === active ? "w-6 bg-white" : "w-2.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </section>

        {/* PILLARS */}
        <section className="relative mt-20 bg-[#0c1c2e] px-6 pb-10 pt-10 sm:px-12 sm:pt-20 lg:px-20 xl:px-28">
          <div className="-mt-24 grid max-w-3xl grid-cols-1 gap-6 sm:-mt-28 sm:grid-cols-3 sm:gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.icon}
                className="relative w-full max-w-[220px] bg-white px-5 pb-10 pt-10 text-center shadow-xl"
              >
                <div className="mb-4 flex justify-center">
                  <img
                    src={pillar.icon}
                    alt=""
                    className="h-16 w-16 object-contain"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="whitespace-pre-line text-sm font-bold uppercase tracking-wide text-[#0c1c2e]">
                  {pillar.title}
                </h3>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-lime-500 to-emerald-500" />
              </div>
            ))}
          </div>

          <div className="mx-auto mt-4 max-w-6xl space-y-4 text-base leading-relaxed text-white/90 sm:text-lg">
            <p>
              It is important to embed principles of sustainability into its
              current and future strategies. But it is required to imbibe the
              principles into the everyday work culture. We at{" "}
              <span className="font-semibold text-lime-400">Visionaize,</span>{" "}
              pride ourselves in converting IDEAS to IMPACT. Through our
              effective and sustainable business strategies and solutions, we
              aim to create an ecosystem of greater efficiency, social impact
              and change, where development can take place hand-in-hand with
              business goals.
            </p>
            <p>
              To achieve this, our experienced team of dedicated partners,
              consultants and global advisors bring their specialised
              experience, insights, data-driven analytical and practical
              skills and methodologies to all engagements. It ensures that
              one gets the best minds to traverse the path of green growth
              and sustainable development.
            </p>
          </div>
        </section>

        <div className="h-10 bg-white sm:h-14" />

        {/* IMPACT BANNER */}
        <section
          className="relative h-[400px] w-full bg-cover bg-center sm:h-[500px]"
          style={{
            backgroundImage:
              "url(/social-digital/big-rice-field-morning-thailand-min-scaled.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black/5" />

          <div className="relative flex h-full items-center justify-center px-6">
            <div className="w-full max-w-xs bg-gradient-to-br from-lime-500/80 to-sky-600/80 px-8 py-10 text-center sm:max-w-sm sm:px-10 sm:py-12">
              <h2 className="space-y-2 text-2xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-3xl md:text-4xl">
                {IMPACT_WORDS.map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          </div>
        </section>

        <div className="h-10 bg-white sm:h-14" />

        {/* SERVICES */}
        <section className="relative bg-gray-50 pb-16 pt-16 sm:pt-20">
          <style>{`
            .flip-card {
              perspective: 1200px;
            }
            .flip-card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              transition: transform 0.6s;
              transform-style: preserve-3d;
            }
            .flip-card:hover .flip-card-inner,
            .flip-card:focus-within .flip-card-inner {
              transform: rotateY(180deg);
            }
            .flip-card-front,
            .flip-card-back {
              position: absolute;
              inset: 0;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .flip-card-back {
              transform: rotateY(180deg);
            }
          `}</style>

          <h2 className="mb-12 text-center text-3xl font-extrabold text-[#0c1c2e] sm:text-4xl md:text-5xl">
            Our Services
          </h2>

          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative flex items-center bg-[#0c1c2e] px-8 py-16 md:-ml-[calc((100vw-100%)/2)] md:py-20 md:pl-[calc((100vw-100%)/2)] md:pr-16">
                <div className="max-w-md space-y-6 text-base leading-relaxed text-white/90 sm:text-lg">
                  <p>
                    Our transformative solutions focus on specific client
                    needs and cater to all sectors.
                  </p>
                  <p>
                    We apply a tri-sector approach that brings synergy
                    between the government, corporates and civil societies
                    for holistic sustainable development.
                  </p>
                </div>
              </div>

              <div className="relative z-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:-ml-24 md:mt-12 mb-12">
                {SERVICES.map((service) => (
                  <div key={service.icon} className="flip-card h-60">
                    <div className="flip-card-inner">
                      <div className="flip-card-front flex flex-col items-center justify-center bg-white px-6 py-10 text-center shadow-xl">
                        <img
                          src={service.icon}
                          alt=""
                          className="mx-auto mb-4 h-20 w-20 object-contain"
                          aria-hidden="true"
                        />
                        <h3 className="whitespace-pre-line text-base font-bold uppercase tracking-wide text-[#0c1c2e]">
                          {service.title}
                        </h3>
                      </div>

                      <div
                        className="flip-card-back flex items-center justify-center px-6 py-8 text-center shadow-xl"
                        style={{ backgroundColor: service.backColor }}
                      >
                        <p className="text-sm font-medium leading-relaxed text-white sm:text-base">
                          {service.backText}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="h-4 bg-white sm:h-6" />

        {/* ADVISORY DETAIL */}
        <section className="relative bg-[#dceefc] px-6 pb-16 pt-6 sm:pb-20 sm:pt-8">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative mx-auto w-full max-w-md md:max-w-none">
              <span className="absolute -left-4 -top-6 h-16 w-4/5  sm:-left-6 sm:-top-8" />
              <span
                className="absolute -left-5 bottom-6 h-2/3 w-3 sm:-left-6 sm:w-4"
               
              />
              <img
                src="/social-digital/Group-1000007609.png"
                alt="Solar panels in a green field"
                className="relative z-10 h-auto w-full shadow-xl"
              />
            </div>

            <div className="text-base font-medium leading-relaxed text-[#0c1c2e] sm:text-lg">
              <p>
                Advisory support for integration of strategies for
                &lsquo;triple-bottom-line&rsquo; sustainability &amp; ESG into
                business including value chain; roadmap, implementation &amp;
                communication; managing sustainability risks &amp; leveraging
                on opportunities; effectively managing resource efficiency;
                climate change mitigation &amp; adaptation. Sustainability
                risk analysis, strategy, reporting.
              </p>
            </div>
          </div>
        </section>

        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}