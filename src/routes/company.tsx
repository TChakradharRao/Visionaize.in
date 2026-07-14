import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const TEAM = [
  { name: "Vikas Agrawal", title: "CEO", linkedin: "https://www.linkedin.com/in/vikasagraw/", image: "https://visionaize.com/wp-content/uploads/2022/05/image-44-2-150x150.png" },
  { name: "David Reinhart", title: "COO & EVP, Digital Twins", linkedin: "https://www.linkedin.com/in/davidreinhart/", image: "https://visionaize.com/wp-content/uploads/2022/05/image-45-2-150x150.png" },
  { name: "Jaime Seagraves", title: "Chief Revenue Officer", linkedin: "https://www.linkedin.com/in/jaime-seagraves-a493353/", image: "https://visionaize.com/wp-content/uploads/2023/10/JaimeSeagraves-copy@0.5x.png" },
  { name: "Nikhil Chauhan", title: "Chief Innovation & Strategy Officer", linkedin: "https://www.linkedin.com/in/nikhilchauhan/", image: "https://visionaize.com/wp-content/uploads/2024/04/Nikhil-Chauhan-1-150x150.png" },
  { name: "Brian Hall", title: "Global Alliances", linkedin: "https://www.linkedin.com/in/brian-hall-2008/", image: "https://visionaize.com/wp-content/uploads/2022/05/image-46-150x150.png" },
  { name: "Greg Moore", title: "Global Alliances", linkedin: "https://www.linkedin.com/in/cgregorymoore/", image: "https://visionaize.com/wp-content/uploads/2024/10/image-3-3.png" },
  { name: "Jennifer Coutinho", title: "Director of Workforce Partnership", linkedin: "https://www.linkedin.com/in/jennifer-coutinho-24546730/?original_referer=", image: "https://visionaize.com/wp-content/uploads/2025/11/Jennifer-768x768.jpeg" },
  { name: "Sumanta Basu", title: "Power & Energy (India)", linkedin: "https://www.linkedin.com/in/sumanta-basu-1413035b/", image: "https://visionaize.com/wp-content/uploads/2024/04/image-11-150x150.png" },
  { name: "Martin Stook", title: "Product Engineering", linkedin: "https://www.linkedin.com/in/martin-stook-b960a235/", image: "https://visionaize.com/wp-content/uploads/2022/05/image-48-2.png" },
  { name: "Ormin Soediono", title: "Professional Services", linkedin: "https://www.linkedin.com/in/orminsoediono/", image: "https://visionaize.com/wp-content/uploads/2022/05/image-49-1-150x150.png" },
  { name: "Catherine Reinhart", title: "Human Resources", linkedin: "https://www.linkedin.com/in/catherinereinhart/", image: "https://visionaize.com/wp-content/uploads/2022/06/Catherine_Reinhart.jpeg" },
  { name: "Gavin Pulford", title: "VP, Finance", linkedin: "https://www.linkedin.com/in/gavin-pulford-10353517/", image: "https://visionaize.com/wp-content/uploads/2022/08/Gavin_Pulford.jpeg" },
  { name: "Jit Senmazumdar", title: "Advisor", linkedin: "https://www.linkedin.com/in/jit-senmazumdar-8694245/", image: "https://visionaize.com/wp-content/uploads/2023/08/judha2.jpg" },
  { name: "Raghu Yabaluri", title: "Advisor and Strategy", linkedin: "https://www.linkedin.com/in/yabaluri?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app&original_referer=", image: "https://visionaize.com/wp-content/uploads/2025/02/20944621799-1-150x150.png" },
  { name: "Ramon Kirpalaney", title: "Director (India)", linkedin: "http://www.linkedin.com/in/ramon-kirpalaney-b81296a/", image: "https://visionaize.com/wp-content/uploads/2024/10/image-1-10.png" },
  { name: "Partha Dasgupta", title: "Advisor", linkedin: "http://www.linkedin.com/in/partha-dasgupta-68088720/", image: "https://visionaize.com/wp-content/uploads/2024/10/image-2-1-150x150.png" },
];

const LOCATIONS = [
  { city: "San Jose, CA (Headquarters)", address: ["2150 N 1st Street, Ste. 427", "San Jose, CA 95131", "United States"] },
  { city: "Houston", address: ["4201 Main St, Suite 200", "Houston, TX 77002", "United States"] },
  { city: "Irvine, CA", address: ["7700 Irvine Center Dr Suite 800", "Irvine, CA 92618", "United States"] },
  { city: "Calgary, AB Canada", address: ["Calgary, AB T3M 0G1", "Canada"] },
  { city: "Saudi Arabia (EMEA Office)", address: ["Al-Sharq Tower, 4th Fl.", "King Abdulaziz Road, Prince Muteb St.,", "Al-Khobar 31492, Saudi Arabia"] },
  { city: "Delhi, India", address: ["PKT-2/3-D-2, Vasant Kunj,", "Delhi, India 110070"] },
];


const OUTCOMES = ["More productivity", "Reduced downtime", "Accelerated sustainability", "Improved worker safety"];

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company — Visionaize" },
      {
        name: "description",
        content: "Visionaize is a pioneering leader in digital twins for the industrial sector, helping companies improve safety, reliability, and decarbonization outcomes.",
      },
    ],
  }),
  component: CompanyPage,
});

export function CompanyPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-brand-ink">
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#163b56] to-brand-blue text-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-lime">Company</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-5xl text-white">
              A pioneering leader in digital twins for the Industrial sector
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              Visionaize is transforming how companies in the industrial sector accelerate decarbonization, improve worker safety, and drive operational efficiencies through immersive digital twin technology and industrial AI.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-brand-navy transition hover:bg-white/90">
                Talk to an expert
              </Link>
              <a href="#office-locations" className="inline-flex items-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                See our offices
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-blue">About Visionaize</p>
              <h2 className="mt-3 text-3xl font-semibold text-brand-navy">Bringing the future to life</h2>
              <p className="mt-5 text-lg leading-8 text-brand-ink/80">
                Our immersive approach to Enterprise Asset Management (EAM) contextualizes relevant information to improve plant productivity, safety, and decision-making cycles by visualizing data from enterprise systems of record within intuitive 3D models.
              </p>
              <p className="mt-5 text-lg leading-8 text-brand-ink/80">
                Industry leaders and trusted partners in the Oil &amp; Gas, Power &amp; Energy, and Industrial Manufacturing sectors rely on our innovative solutions to help them reduce downtime and drive significant improvements in asset reliability and worker safety.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-[#f8fbfd] p-8 shadow-sm">
              <div className="rounded-2xl border border-brand-blue/20 bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">What we do</p>
                <ul className="mt-5 space-y-4 text-brand-ink/80">
                  <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-lime" />Build immersive 3D digital twins for industrial operations</li>
                  <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-lime" />Connect process, asset, and enterprise data into one operational view</li>
                  <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-lime" />Enable remote monitoring, predictive maintenance, and AI-powered insights</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-[#f8fbfd]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="rounded-[2rem] border border-border bg-white p-8 shadow-sm">
                <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-brand-blue/25 bg-gradient-to-br from-brand-blue/10 to-brand-lime/20 text-center text-sm font-medium text-brand-ink/70">
                  Video preview for Visionaize industrial AI and digital twin experiences
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-blue">Industrial AI</p>
                <h2 className="mt-3 text-3xl font-semibold text-brand-navy">The future of Industrial AI is here</h2>
                <p className="mt-5 text-lg leading-8 text-brand-ink/80">
                  AI-powered Digital Twin technology of tomorrow is being used by leading operators around the globe today. Explore the powerful benefits of Visionaize in this short video and see how connected intelligence is accelerating operational performance.
                </p>
                <a href="https://www.youtube.com/channel/UCYUh54m1vPWfoqC7VhkdNHA" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-blue">
                  Watch video
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-blue">Leadership team</p>
            <h2 className="mt-3 text-3xl font-semibold text-brand-navy">Meet the team</h2>
            <p className="mt-5 text-lg leading-8 text-brand-ink/80">
              Visionaize brings together leaders in software engineering, industrial operations, product strategy, and global partnerships to help customers turn complex industrial data into practical action.
            </p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TEAM.map((person) => (
              <div key={person.name} className="flex flex-col items-center text-center">
                <div className="h-40 w-40 overflow-hidden rounded-full bg-[#e8ecef]">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-brand-navy">{person.name}</h3>
                <p className="mt-1 text-base text-brand-ink/80">{person.title}</p>
                <a href={person.linkedin} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-navy">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-[#0A66C2] text-[10px] font-bold text-white">in</span>
                  Connect with me
                </a>
              </div>
            ))}
          </div>

        </section>

        <section id="office-locations" className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
            <h2 className="text-center text-4xl font-semibold text-brand-navy md:text-5xl">Office Locations</h2>
            <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-3">
              {LOCATIONS.map((location) => (
                <div key={location.city} className="text-center">
                  <div className="flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#B8D93A" className="h-7 w-7">
                      <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
                    </svg>
                    <h3 className="text-2xl font-semibold text-brand-navy">{location.city}</h3>

                  </div>
                  <div className="mt-4 space-y-2 text-lg text-brand-ink/80">
                    {location.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="contact-us" className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="relative grid gap-10 overflow-hidden rounded-[2rem] border border-white/10 p-8 text-white shadow-xl lg:grid-cols-[1.1fr_0.9fr] lg:p-12 bg-[linear-gradient(120deg,#0F2740_0%,#0A78B9_45%,#34A2A5_78%,#A5CE39_100%)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-lime">Contact us</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Let&apos;s talk Digital Twins &amp; Immersive Industrial AI + Gen AI</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                Connect with us to learn how leading industrial companies around the globe are leveraging cutting-edge AI, Gen AI, and Digital Twin technology to unlock hidden and lost value.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/20 bg-white/10 p-8 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-lime">The outcomes we focus on each and every day</p>
              <ul className="mt-6 space-y-4">
                {OUTCOMES.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/90">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-semibold">✓</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-white/90">
                Connect with an expert
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
