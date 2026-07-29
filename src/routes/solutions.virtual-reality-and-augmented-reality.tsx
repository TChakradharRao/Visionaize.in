import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/solutions/virtual-reality-and-augmented-reality")({
  head: () => ({
    meta: [
      { title: "Virtual Reality & Augmented Reality — Visionaize" },
      {
        name: "description",
        content:
          "VR for training, onboarding and planning. AR for executing critical tasks faster, with real-time data overlays.",
      },
    ],
  }),
  component: VRARPage,
});

const VR_IMG = "https://visionaize.com/wp-content/uploads/2022/11/iStock-1148243718-1-1024x683.jpg";
const AR_IMG = "https://visionaize.in/wp-content/uploads/2022/11/iStock-1282632037.jpg";
const QUOTE_AVATAR = "	https://visionaize.in/wp-content/uploads/2023/08/judha2.jpg";
const WHITEPAPER_IMG = "https://visionaize.com/wp-content/uploads/2022/07/setmore-whitepaper-1-2.png";

const VR_BULLETS = [
  "Remote support",
  "Virtual demonstration",
  "Design reviews",
  "Safety & compliance",
  "Operator and contractor site orientation",
  "Training & simulation",
];

const AR_BULLETS = [
  "Locating and identifying assets",
  "Providing step-by-step instructions for inspection and maintenance activities",
  "Accessing real-time and historical data, including sensor data, during site walkthroughs",
  "Referencing important documents like isometric diagrams, operation manuals, training videos, and many others",
];

function GradientPill({ children, href = "#" }: { children: React.ReactNode; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:opacity-90"
      style={{
        background: "linear-gradient(90deg,#A6E04A 0%,#5BAE7E 45%,#2BA8C7 100%)",
      }}
    >
      {children}
    </a>
  );
}

function Bullets({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className="mt-4 sm:mt-5 md:mt-6 space-y-2 sm:space-y-3">
      {items.map((b) => (
        <li
          key={b}
          className={`flex items-start leading-6 sm:leading-7 text-slate-700 ${className ?? "text-sm"}`}
        >
          <span className="mt-2 mr-3 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-700" />
          {b}
        </li>
      ))}
    </ul>
  );
}

function VRARPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* VR SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 sm:pt-10 md:pt-14 pb-10 sm:pb-14 md:pb-20">
        <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.15] text-slate-900">
              Virtual Reality that speeds up learning &amp; planning
            </h1>
           <p className="mt-3 sm:mt-4 md:mt-6 text-base sm:text-lg md:text-[24px] font-extrabold text-black">
  VR for training, onboarding, planning
</p>
            <Bullets items={VR_BULLETS} className="text-sm sm:text-base md:text-lg" />
            <div className="mt-6 sm:mt-8">
              <GradientPill href="/vr-tour-request/">Experience a VR Tour</GradientPill>
            </div>
          </div>
          <div>
            <img src={VR_IMG} alt="Worker using VR headset" className="w-full rounded-md shadow-xl" />
          </div>
        </div>
      </section>

      {/* AR SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-24">
        <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <img
              src={AR_IMG}
              alt="Worker using AR on a tablet"
              className="w-full rounded-md shadow-xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] text-slate-900">
              Execute critical tasks with Augmented Reality
            </h2>
            <p className="mt-3 sm:mt-4 md:mt-6 text-base sm:text-lg md:text-[24px] font-semibold  text-black">
  Get more done in less time with AR
</p>
            <Bullets items={AR_BULLETS} className="text-sm sm:text-base md:text-lg" />
          </div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <section
        className="bg-[#3F5E1E] py-10 sm:py-14 md:py-20 text-white relative overflow-hidden bg-no-repeat bg-right-bottom"
        style={{
          backgroundImage:
            "url('https://visionaize.in/wp-content/uploads/2022/05/quotes-ico-min.png')",
          backgroundSize: "160px auto",
        }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 md:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr]">
          <img
            src={QUOTE_AVATAR}
            alt="Martin Stook"
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-50 lg:w-50 rounded-full object-cover ring-4 ring-white/10 mx-auto md:mx-0"
          />
          <div className="text-center md:text-left">
            <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold leading-snug">
              "We are relentlessly focused on making data from disparate sources easy to
              understand, and technologies like VR and AR provide additional ways for
              workers to experience data in a spatially contextual manner."
            </blockquote>
            <div className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base font-semibold">Martin Stook</div>
            <div className="text-xs sm:text-sm text-white/80">Head of Product, Visionaize</div>
          </div>
        </div>
      </section>

      {/* INDUSTRIAL METAVERSE */}
    <section className="mx-auto max-w-[90rem] px-4 sm:px-6 py-12 sm:py-16 md:py-24">
  <div className="grid items-center gap-3 sm:gap-4 md:grid-cols-[2fr_3fr] md:gap-4">
    <div className="flex justify-center md:justify-end md:pr-2">
      <img
        src={WHITEPAPER_IMG}
        alt="The Industrial Metaverse whitepaper"
        className="max-w-[220px] sm:max-w-xs md:max-w-sm rotate-[-6deg] drop-shadow-2xl"
      />
    </div>
    <div className="md:pl-2">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] text-slate-900">
        Experience data in The Industrial Metaverse
      </h2>
      <p className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-[18px] leading-relaxed sm:leading-7 text-slate-800">
        With the emergence of Industry 4.0 and IIoT sensors, data overload is a
        common challenge. Explore how 3D digital twin technology can turn the data
        deluge into a competitive advantage.
      </p>
      <div className="mt-6 sm:mt-8">
        <Link
          to="/theindustrialmetaverse"
          className="inline-flex items-center rounded-full border border-slate-900 bg-white px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-bold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          Explore how
        </Link>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </div>
  );
}