import { createFileRoute, Link } from '@tanstack/react-router'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'

export const Route = createFileRoute('/solutions/')({
  component: RouteComponent,
})

const benefits = [
  {
    icon: '/solutions/Vector-6.svg',
    label: 'Reduced downtime',
  },
  {
    icon: '/solutions/Group-3.svg',
    label: 'Increased productivity',
  },
  {
    icon: '/solutions/Group-4.svg',
    label: 'Improved worker safety',
  },
  {
    icon: '/solutions/Group-544.svg',
    label: 'A more sustainable future',
  },
]

const features = [
  {
    icon: '/solutions/Group-2.svg',
    title: 'Intelligent Model Management',
    description:
      'The most advanced Model Management of Change (MMOC) and connectivity to maintain your twin 24/7/365.',
  },
  {
    icon: '/solutions/Vector-3.svg',
    title: 'Advanced Work Packages',
    description:
      'Plan maintenance proactively with the most dynamic 3D knowledge views for planning, execution and analysis.',
  },
  {
    icon: '/solutions/Vector-4.svg',
    title: 'Mobile, AR & VR',
    description:
      'Experience your infrastructure asset data when, where and how you want, through mobile apps and advanced AR & VR simulations.',
  },
  {
    icon: '/solutions/Vector-5.svg',
    title: 'Efficient Work Collaboration',
    description:
      'Bring the facility to the fingertips of teams in a collaborative, dynamic and integrated digital 3D environment.',
  },
]

const caseStudies = [
  {
    image: '/solutions/Group-598.png',
    title: 'Saudi Kayan – SABIC Affiliate',
    subtitle: 'Large Petrochemical Complex in Saudi Arabia',
    tags: [
      'Reduced downtime',
      'Improved worker safety',
      'Gas down/carbon emissions',
    ],
    stats: [
      { value: '287%', label: 'Internal Rate of Return' },
      { value: '4 mo', label: 'payback period' },
    ],
    challenges: [
      'Create risk-based corrosion inspection (RBI) program cost effectively',
      'Lower on-going inspection costs with no increase in risk',
      'Operational data was not populated / configured',
    ],
    solutions: [
      'Tapped V-Suite EAM software to create 3D 100’s of piloting TMLs',
      'V-Suite software provided inspection management for the 19,000 TMLs',
      'Used V-Suite to load asset information into systems of record',
    ],
    imagePosition: 'left' as const,
  },
  {
    image: '/solutions/Group-598-2.png',
    title: 'CHS',
    subtitle: 'Approximately 100K bbd Refinery McPherson, KS',
    tags: [
      'Reduced downtime',
      'Improved worker safety',
      'Gas down/carbon emissions',
    ],
    stats: [
      { value: '132%', label: 'Internal Rate of Return' },
      { value: '13 mo', label: 'payback period' },
    ],
    challenges: [
      'Increase plant-wide Mechanical Integrity (MI) program',
      'Implement Risk-Based Inspection (RBI) software',
      'Improve on legacy systems limitations',
    ],
    solutions: [
      'Populated and implemented MI & RBI software (PCMS) deployed at this site',
      'Integrated V-Suite 3DXi Active Model with visual inspection software system of record',
    ],
    imagePosition: 'right' as const,
  },
]

// Shared button classes so the three CTAs stay visually consistent
const primaryBtnClasses =
  'inline-block rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-white font-medium text-sm sm:text-base shadow-sm transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 text-center'

const secondaryBtnClasses =
  'inline-block rounded-full px-6 sm:px-8 py-3 sm:py-3.5 bg-white border border-gray-900 text-gray-900 font-semibold text-sm sm:text-base shadow-sm transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 text-center'

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="w-full bg-white">
          {/* Mobile-only hero (below sm) — dedicated heading, image, copy, and CTA */}
          <div className="sm:hidden flex flex-col items-center text-center px-4 py-8">
            <h1 className="text-xl font-semibold leading-[1.2] text-gray-900 max-w-2xl">
              3D digital twin solutions for enterprise asset management
            </h1>

            <div className="mt-6 w-full max-w-sm">
              <img
                src="/solutions/Group-583.png"
                alt="3D digital twin solutions for enterprise asset management"
                className="w-full h-auto object-contain"
              />
            </div>

            <p className="mt-6 text-sm text-gray-600 max-w-xl leading-relaxed">
              Reduce downtime and operational risk by leveraging data like never before
            </p>

            <div className="mt-6">
              <Link
                to="/contact"
                className={primaryBtnClasses}
                style={{
                  background:
                    'linear-gradient(90deg, #22c55e 0%, #0ea5e9 100%)',
                }}
              >
                Learn how
              </Link>
            </div>
          </div>

          {/* Tablet & desktop hero (sm and up) */}
          <div className="hidden sm:grid sm:grid-cols-1 lg:grid-cols-[3fr_2fr] min-h-0 lg:min-h-[480px] xl:min-h-[550px]">
            {/* Left: copy */}
            <div className="flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-10 xl:py-0 order-2 lg:order-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold leading-[1.2] text-gray-900 max-w-2xl">
                Industrial AI and Digital Twin Technology of Tomorrow –{' '}
                <span className="italic font-normal">Available Now</span>
              </h1>

              <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
                Some vendors blow smoke and talk about roadmap visions. Our
                technology is being leveraged <em>today</em> by teams that are
                managing some of the largest industrial facilities in the
                world. Learn how by connecting with a Visionaize product
                expert.
              </p>

              <div className="mt-6 sm:mt-8 md:mt-10">
                <Link
                  to="/contact"
                  className={primaryBtnClasses}
                  style={{
                    background:
                      'linear-gradient(90deg, #22c55e 0%, #0ea5e9 100%)',
                  }}
                >
                  Learn how
                </Link>
              </div>
            </div>

            {/* Right: image, scaled to match the content column's height/width */}
            <div className="relative w-full h-[200px] xs:h-[240px] sm:h-[320px] md:h-[420px] lg:h-full lg:min-h-[480px] xl:min-h-[560px] flex items-center justify-center p-2 lg:p-4 overflow-hidden order-1 lg:order-2">
              <img
                src="/solutions/monitor2-copy.png"
                alt="Visionaize digital twin monitoring interface showing an industrial piping model with step-by-step maintenance annotations"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full bg-[#132337]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-14 md:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-3 sm:gap-y-10 sm:gap-x-4 md:gap-y-12 md:gap-x-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.label}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={benefit.icon}
                    alt={benefit.label}
                    className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain mb-3 sm:mb-4 md:mb-6"
                  />
                  <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white font-medium leading-snug max-w-[180px] sm:max-w-[220px]">
                    {benefit.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Remote infrastructure management */}
        <section
          className="w-full bg-gray-100 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/solutions/solutions-hero2-desktop.png')",
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-28 text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-[1.25] text-gray-900">
              The future of remote infrastructure management is here
            </h2>

            <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              V-Suite asset visualization software allows remote operations
              and predictive maintenance teams to get in front of problems
              before they happen, resulting in less downtime and greater
              productivity. See how V-Suite can benefit your operations.
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10">
              <Link to="/contact" className={secondaryBtnClasses}>
                Connect with an expert
              </Link>
            </div>
          </div>
        </section>

       {/* Testimonial quote */}
        <section className="w-full  bg-no-repeat bg-right-bottom bg-cover" style={{ backgroundImage: "url('/solutions/Group-516.png')" }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 sm:py-28 ">
            <blockquote className="max-w-4xl">
              <p className="text-lg sm:text-3xl md:text-4xl leading-[1.35] text-gray-900">“The Digital Twin is a living learning model that allows you to deliver business value by constantly making sure that Twin is a replica of the asset so you can get insight into that asset and take action...”</p>

              <footer className="mt-8 text-base text-gray-700">GE Digital, a Visionaize Partner</footer>
            </blockquote>
          </div>
        </section>
        {/* Features */}
        <section className="w-full bg-[#132337]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-10 sm:py-14 md:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 sm:gap-y-12 sm:gap-x-8 md:gap-y-14">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain mb-4 sm:mb-5 md:mb-6"
                  />
                  <h3 className="text-base sm:text-lg md:text-2xl text-white font-semibold leading-snug max-w-[260px]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-[260px]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-6 xl:px-4 py-10 sm:py-14 md:py-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 sm:mb-10 md:mb-12 text-center">
              Case studies
            </h2>

            <div className="flex flex-col gap-8 sm:gap-10 md:gap-14 lg:gap-10 xl:gap-6">
              {caseStudies.map((study) => (
                <div
                  key={study.title}
                  className={`grid grid-cols-1 gap-6 sm:gap-8 lg:gap-8 items-center ${
                    study.imagePosition === 'right'
                      ? 'lg:grid-cols-[1fr_1.5fr]'
                      : 'lg:grid-cols-[1.5fr_1fr]'
                  }`}
                >
                  {/* Image — aspect-ratio box + object-cover so it fills its
                      box edge-to-edge at every size instead of letterboxing
                      (object-contain) inside a bleed margin, which is what
                      broke the layout specifically at the lg breakpoint. */}
                  <div
                    className={`relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[360px] xl:h-[440px] overflow-hidden rounded-xl lg:rounded-none ${
                      study.imagePosition === 'right'
                        ? 'lg:order-2 lg:-mr-4 xl:-mr-10 2xl:-mr-16'
                        : 'lg:-ml-4 xl:-ml-10 2xl:-ml-16'
                    }`}
                  >
                    <img
                      src={study.image}
                      alt={study.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
                      {study.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-700 font-medium">
                      {study.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs sm:text-sm text-gray-700">
                      {study.tags.map((tag, i) => (
                        <span key={tag} className="flex items-center gap-2 sm:gap-3">
                          {tag}
                          {i < study.tags.length - 1 && (
                            <span className="w-px h-4 bg-gray-300" />
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-4 sm:mt-5 flex flex-wrap gap-x-8 sm:gap-x-10 md:gap-x-12 lg:gap-x-8 xl:gap-x-12 gap-y-3 sm:gap-y-4">
                      {study.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-xl sm:text-2xl md:text-4xl lg:text-3xl xl:text-4xl font-semibold text-emerald-500">
                            {stat.value}
                          </div>
                          <div className="mt-1 text-xs sm:text-sm text-gray-500">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Challenges / Solutions */}
                    <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          Challenges
                        </h4>
                        <ul className="mt-2 sm:mt-3 space-y-2">
                          {study.challenges.map((item) => (
                            <li
                              key={item}
                              className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wide">
                          Solutions
                        </h4>
                        <ul className="mt-2 sm:mt-3 space-y-2">
                          {study.solutions.map((item) => (
                            <li
                              key={item}
                              className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial quote */}
        <section
          className="w-full bg-no-repeat bg-right-bottom bg-cover"
          style={{
            backgroundImage:
              "url('/solutions/Group-516.png')",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-14 sm:py-20 md:py-28">
            <blockquote className="max-w-4xl">
              <p className="text-base sm:text-lg md:text-3xl lg:text-4xl leading-[1.35] text-gray-900">
                “Creating isometric drawings for inspections drove the initial
                justification. Now, applying (V-Suite) to other areas creates
                clear financial benefits.”
              </p>

              <footer className="mt-5 sm:mt-8 text-sm sm:text-base text-gray-700">
                CHS Inc.
              </footer>
            </blockquote>
          </div>
        </section>

        {/* 3D digital twin experts */}
        <section className="w-full bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-10 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-6 items-center">
              {/* Left: copy */}
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-semibold leading-[1.25] text-gray-900">
                  3D digital twin experts with deep domain knowledge
                </h2>

                <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-lg md:text-2xl lg:text-xl xl:text-2xl text-gray-900 leading-relaxed">
                  Tap our rich experience in turning complex data sets into
                  competitive advantages
                </p>

                <p className="mt-5 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  The Visionaize team has been at the forefront of Digital Laser
                  Scanning and 3D conversion services for over 20 years and has an
                  enviable history of producing the most accurate 3D Models of
                  engineering quality tolerances. With over 6,000 linear miles of
                  completed scans for some of the largest and most complex
                  industrial plants in the world, Visionaize stands alone for plant
                  knowledge, accuracy, speed, and value.
                </p>

                <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  Visionaize provides a full range of services to create and
                  maintain a facility Digital Twin in the form of a 3D model that
                  accurately and precisely represents the plant’s “as-built”
                  conditions. Integrating Visionaize V-Suite asset visualization
                  software with facility systems of record, and a robust management
                  of change capability, provides the most complete and
                  interoperable asset management platform for your Digital Plant.
                </p>
              </div>

              {/* Right: image */}
              <div className="w-full flex items-center justify-center">
                <img
                  src="/solutions/Group-584-1.png"
                  alt="Mobile AR view of a digital twin showing an annotated industrial piping model"
                  className="w-full max-w-[220px] sm:max-w-xs md:max-w-sm lg:max-w-[280px] xl:max-w-sm h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}