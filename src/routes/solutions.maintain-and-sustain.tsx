/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/solutions/maintain-and-sustain")({
  head: () => ({
    meta: [
      { title: "Maintain & sustain with an operational Digital Twin | Visionaize" },
      {
        name: "description",
        content:
          "As a truly operational digital twin solution, V-Suite maintains and sustains the as-built representation of its twin in the field, enabling maintenance and operations teams to trust the data.",
      },
    ],
  }),
  component: MaintainAndSustain,
});

function MaintainAndSustain() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="pt-16 md:pt-20">
        <div className="mt-6 md:mt-8 mx-auto max-w-7xl px-4 sm:px-6 grid gap-10 md:gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy md:text-5xl pb-5 md:pb-7">
              Maintain &amp; sustain with an operational Digital Twin
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-black/80">
              As a truly operational digital twin solution, V-Suite maintains and sustains the as-built or as-is representation of its twin in the field. This ability to stay in sync enables a myriad of benefits and allows maintenance and operations teams to have continuous trust in the data.
            </p>
            <p className="mt-3 md:mt-2 text-base sm:text-lg text-black/80">
              Connect with an expert to see how our Model Management of Change (MMOC) process sustains and maintains complex assets over the course of their full lifecycle.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                    to="/contact"
                    className="gradient-cta inline-block rounded-full px-6 sm:px-7 py-2.5 sm:py-3 text-base font-semibold transition-transform hover:scale-[1.02]"
                >
                Talk to an expert
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="inline-flex items-center gap-3 rounded-full border border-brand-navy bg-white px-5 sm:px-7 py-3 sm:py-4 text-base font-semibold text-brand-navy shadow-sm transition hover:bg-brand-navy hover:text-white">
                      Watch video
                      <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white">
                        ▶
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-4xl p-0 sm:p-0">
                    <div className="relative h-0 overflow-hidden rounded-2xl pt-[56.25%]">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://visionaize.com/wp-content/uploads/2022/10/Untitled-4.mp4"
                        autoPlay
                        playsInline
                        preload="auto"
                        controlsList="nodownload"
                        controls
                      />
                    </div>
                  </DialogContent>
                </Dialog>
            </div>
          </div>

          <div>
            <img
              src="https://visionaize.com/wp-content/uploads/2022/10/image_2022_10_10T09_15_39_508Z.png"
              alt="Maintain & Sustain a Digital Twin"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        <div className="my-12 md:my-20 max-w-7xl mx-auto px-4 sm:px-6">
          <img
            className="lazy entered loaded w-full rounded-lg"
            decoding="async"
            src="https://visionaize.com/wp-content/uploads/2022/10/MMOC-4.gif"
            data-src="https://visionaize.com/wp-content/uploads/2022/10/MMOC-4.gif"
            alt="Model Management of Change process"
          />
        </div>

        <section className="px-4 sm:px-6 py-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-3xl sm:text-4xl font-semibold text-brand-navy md:text-5xl">
              Benefits of an Operational Digital Twin
            </h2>
            <div className="mt-10 md:mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://visionaize.com/wp-content/uploads/2022/05/Group-598.png"
                  alt="Operational Digital Twin"
                  className="w-full rounded-2xl sm:rounded-[30px]"
                  loading="lazy"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-xl sm:text-2xl md:text-4xl font-semibold pb-3">
                  The Operational Difference
                </p>
                <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-brand-navy">
                  Why being truly operational is so important
                </h3>
                <ul className="mt-8 space-y-4 list-disc pl-6 text-base sm:text-lg leading-6 sm:leading-5 text-black/75">
                  <li>Data and processes that workers can trust over time</li>
                  <li>Reduced operational costs with data-driven efficiencies</li>
                  <li>Top line revenue gains through reduced outages and downtime</li>
                  <li>Improved safety and reduced risk</li>
                  <li>Efficiencies that accelerate progress towards sustainability goals</li>
                  <li>Easier compliance with regulatory requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-[#334920] py-16 md:py-24 text-white bg-[length:160px_auto] sm:bg-[length:220px_auto] md:bg-[length:280px_auto]"
          style={{
            backgroundImage:
              "url('https://visionaize.in/wp-content/uploads/2022/05/quotes-ico-min.png')",
            backgroundPosition: "right bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="grid max-w-7xl mx-auto gap-8 md:gap-10 px-4 sm:px-6 md:grid-cols-[200px_1fr] md:items-center">
            <div className="flex items-center justify-center">
              <img
                src="https://visionaize.com/wp-content/uploads/2022/05/image-45-2-150x150.png"
                alt="David Reinhart"
                className="h-28 w-28 sm:h-40 sm:w-40 rounded-full border-4 border-white/20 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <blockquote className="text-xl sm:text-2xl font-semibold leading-snug md:text-4xl">
                One of the things that is really important about an operational Digital Twin, is that it must have the tools to very easily and efficiently stay current with the facility changes.
              </blockquote>
              <p className="mt-6 md:mt-8 text-lg sm:text-xl font-semibold text-white">David Reinhart</p>
              <p className="text-sm text-white/80">EVP, Digital Twin – Visionaize</p>
            </div>
          </div>
        </section>

        <section className="bg-white pb-16 md:pb-20 pt-6">
            <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
                <div className="flex justify-center">
                <img
                    src="https://visionaize.com/wp-content/uploads/2022/07/setmore-whitepaper-1-2.png"
                    alt="The Industrial Metaverse whitepaper"
                    className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px]"
                    loading="lazy"
                />
                </div>
                <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[44px] font-semibold leading-tight">
                    Experience data in The Industrial Metaverse
                </h2>
                <p className="mt-4 sm:mt-6 text-base sm:text-[18px] leading-[1.7] sm:leading-[1.8] text-[#3a4658]">
                    With the emergence of Industry 4.0 and IIoT sensors, data overload
                    is a common challenge. Explore how 3D digital twin technology can
                    turn the data deluge into a competitive advantage.
                </p>

                <a href="/theindustrialmetaverse/"
                    rel="noopener noreferrer"
                    className="mt-6 sm:mt-8 inline-flex items-center rounded-full border border-[#0F1B2D] px-6 sm:px-7 py-3 text-sm font-semibold text-[#0F1B2D] transition hover:bg-[#0F1B2D] hover:text-white"
                >
                    Explore how
                </a>
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MaintainAndSustain;