import { createFileRoute, Link } from '@tanstack/react-router'
// import { useEffect, useState } from 'react'
import { Play, X, MapPin, Check } from 'lucide-react'
import { Header } from '../components/site/Header'
import { Footer } from '../components/site/Footer'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { api } from '../lib/api'
import { FloatingInput, FloatingTextarea } from '../components/ui/floating-field'

export const Route = createFileRoute('/company')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  // close on Escape + lock body scroll while modal is open
  useEffect(() => {
    if (!isVideoOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isVideoOpen])

  return (
    <>
      <Header />

      <div className="w-full overflow-x-hidden bg-white text-[#141821]">
        {/* ============ HERO ============ */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 pt-10 pb-6 sm:gap-10 sm:pt-16 sm:pb-6 md:gap-8 md:pt-24 md:pb-8 md:grid-cols-2 lg:px-10">
          {/* Left: copy */}
          <div className="order-2 md:order-1">
            <h1 className="text-3xl font-normal leading-[1.2] tracking-tight text-[#141821] sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              A pioneering leader in digital twins for the Industrial sector
            </h1>

            <p className="mt-5 sm:mt-7 max-w-lg text-base sm:text-lg leading-relaxed text-[#3c4250]">
              Visionaize is transforming how companies in the industrial
              sector accelerate decarbonization, improve worker safety and
              drive operational efficiencies.
            </p>

            <p className="mt-2 max-w-lg text-base sm:text-lg leading-relaxed text-[#3c4250]">
              Connect with an expert to learn how.
            </p>

            <Link
              to="/Talk-to-an-expert"
              className="mt-6 sm:mt-9 inline-flex items-center rounded-full bg-gradient-to-r from-[#6FCF57] to-[#2E8EEB] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.03] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2E8EEB]"
            >
              Talk to an expert
            </Link>
          </div>

          {/* Right: hero image */}
          <div className="order-1 md:order-2">
            <img
              src="/company/Group-633.png"
              alt="Field technician in a hard hat and hi-vis jacket inspecting industrial piping while holding a tablet"
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </section>

        {/* ============ BRINGING THE FUTURE TO LIFE ============ */}
  <section
  className="relative mx-auto max-w-7xl bg-no-repeat bg-right bg-contain px-4 sm:px-6 pt-10 pb-20 sm:pt-14 sm:pb-28 md:pt-20 md:pb-32 lg:px-10 lg:pt-24 lg:pb-36"
  style={{
    backgroundImage:
      "url('/company/Footer-BG-1.png')",
    backgroundSize: '90% auto', // increased from 60% — bump higher for even wider
  }}

>
  <h2 className="relative text-3xl font-normal tracking-tight text-[#141821] sm:text-4xl md:text-5xl">
    Bringing the future to life
  </h2>

  <div className="relative mt-8 sm:mt-12 grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 md:gap-16">
    <p className="text-lg sm:text-xl leading-relaxed text-[#3c4250]">
      Our immersive approach to Enterprise Asset Management (EAM)
      contextualizes relevant information to improve plant
      productivity,{' '}
      
     <a   href="/how-does-a-digital-twin-help-improve-worker-safety/"
        className="text-[#2E8EEB] hover:underline"
      >
        safety
      </a>
      , and decision-making cycles by visualizing data from
      enterprise systems of record within intuitive 3D models.
    </p>

    <p className="text-lg sm:text-xl leading-relaxed text-[#3c4250]">
      Industry leaders and trusted partners in the{' '}
      
      <a  href="/industries/digital-twin-for-oil-and-gas/"
        className="text-[#2E8EEB] hover:underline"
      >
        Oil &amp; Gas
      </a>
      ,{' '}
      <a
        href="/industries/digital-twin-for-power-and-energy/"
        className="text-[#2E8EEB] hover:underline"
      >
        Power &amp; Energy
      </a>{' '}
      and Industrial{' '}
      
      <a  href="/industries/digital-twin-for-manufacturing/"
        className="text-[#2E8EEB] hover:underline"
      >
        Manufacturing
      </a>{' '}
      sectors rely on our innovative solutions to help them reduce
      downtime and drive significant improvements in asset
      reliability and worker safety.
    </p>
  </div>
</section>

        {/* ============ FUTURE OF INDUSTRIAL AI ============ */}
        <section className="bg-[#F5F5F4]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 py-12 sm:gap-10 sm:py-16 md:grid-cols-2 md:gap-12 md:py-24 lg:px-10">
            {/* Left: copy */}
            <div>
              <h2 className="text-3xl font-normal leading-[1.2] tracking-tight text-[#141821] sm:text-4xl md:text-5xl">
                The future of Industrial AI is here
              </h2>

              <p className="mt-4 sm:mt-6 max-w-md text-base sm:text-lg leading-relaxed text-[#3c4250]">
                AI-powered Digital Twin technology of tomorrow is being used
                by leading operators around the globe <em>today</em>.
                Explore the powerful benefits of Visionaize in this 2-minute
                video.
              </p>

              <button
                type="button"
                onClick={() => setIsVideoOpen(true)}
                className="mt-6 sm:mt-9 inline-flex items-center gap-2 rounded-full border border-[#141821] bg-white px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-[#141821] transition-colors duration-200 hover:bg-[#141821] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#141821]"
              >
                Watch video
                <Play className="h-4 w-4 fill-current" />
              </button>
            </div>

            {/* Right: video thumbnail */}
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="group relative block overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#141821]"
              aria-label="Play video: The future of Industrial AI is here"
            >
              <img
                src="/company/AI-powered-3D-visualization-solutions-2048x1113.png"
                alt="Digital twin 3D visualization of an industrial plant with piping and equipment"
                className="h-full w-full object-cover"
              />
              {/* play button overlay */}
              <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors duration-200 group-hover:bg-black/25">
                <span className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-110">
                  <Play className="ml-1 h-5 w-5 sm:h-6 sm:w-6 fill-[#141821] text-[#141821]" />
                </span>
              </span>
            </button>
          </div>
        </section>

        {/* ============ VIDEO MODAL ============ */}
        {isVideoOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8"
            onClick={() => setIsVideoOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                aria-label="Close video"
                className="absolute -top-10 sm:-top-12 right-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className="overflow-hidden rounded-xl bg-black shadow-2xl">
                <video
                  src="/company/Visionaize-April-2024.mp4"
                  controls
                  autoPlay
                  className="h-full w-full"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}

        {/* ============ CERTIFICATIONS & COMPLIANCE ============ */}
        <section className="bg-[#F5F5F4] px-4 sm:px-6 pt-8 pb-12 sm:pb-16 lg:px-10 lg:pt-10 lg:pb-28" id="certifications">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-normal tracking-tight text-[#141821] sm:text-4xl md:text-5xl">
              Certifications &amp; Compliance
            </h2>

            <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-center text-base sm:text-lg leading-relaxed text-[#3c4250]">
              Visionaize Technologies adheres to globally recognized
              standards to ensure quality, security, and operational
              excellence across all our solutions.
            </p>

            {/* Standards cards */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-5 sm:p-8 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-[#141821]">
                  ISO 9001: Quality Management
                </h3>
                <p className="mt-4 sm:mt-5 font-semibold text-[#2E8EEB]">
                  What it means for clients:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm sm:text-base text-[#3c4250]">
                  <li>Consistent delivery</li>
                  <li>Process-driven execution</li>
                  <li>Continuous improvement</li>
                </ul>
              </div>

              <div className="rounded-xl bg-white p-5 sm:p-8 shadow-sm">
                <h3 className="text-base sm:text-lg font-bold text-[#141821]">
                  ISO 27001: Information Security
                </h3>
                <p className="mt-4 sm:mt-5 font-semibold text-[#2E8EEB]">
                  What it means:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm sm:text-base text-[#3c4250]">
                  <li>Data protection</li>
                  <li>Secure systems</li>
                  <li>Risk management</li>
                </ul>
              </div>
            </div>

            {/* Certificate images */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2">
              <img
                src="/company/VISIONAIZE-TECHNOLOGIES-PRIVATE-LIMITED-qms-01-1085x1536.png"
                alt="ISO 9001:2015 Quality Management System certificate for Visionaize Technologies Private Limited"
                className="mx-auto w-full max-w-[260px] sm:max-w-sm rounded-lg shadow-md"
              />
              <img
                src="/company/VISIONAIZE-TECHNOLOGIES-PRIVATE-LIMITED-27001-1-01-1085x1536.png"
                alt="ISO/IEC 27001:2022 Information Security Management System certificate for Visionaize Technologies Private Limited"
                className="mx-auto w-full max-w-[260px] sm:max-w-sm rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

     {/* ============ MEET THE TEAM ============ */}
<section className="bg-white px-4 sm:px-6 py-12 sm:py-16 lg:px-10 lg:py-26" id="team">
  <div className="mx-auto max-w-6xl">
    <h2 className="text-center text-3xl font-normal tracking-tight text-[#141821] sm:text-4xl md:text-5xl">
      Meet the team
    </h2>

    <div className="mt-8 sm:mt-14 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-4 md:gap-x-8">
      {[
        {
          name: 'Vikas Agrawal',
          role: 'CEO',
          image:
            '/company/image-44-2.png',
          linkedin: 'https://www.linkedin.com/in/vikasagraw/',
        },
        {
          name: 'Subhash Sachdeva',
          role: 'CFO',
          image:
            '/company/Subhash.png',
          linkedin: 'https://www.linkedin.com/in/subhash07/',
        },
        {
          name: 'Sumanta Basu',
          role: 'Head of Industrial Innovation',
          image:
            '/company/image-11.png',
          linkedin: 'https://www.linkedin.com/in/sumanta-basu-1413035b/',
        },
        {
          name: 'Ramon Kirpalaney',
          role: 'Director',
          image:
            '/company/image-1-10.png',
          linkedin: 'http://www.linkedin.com/in/ramon-kirpalaney-b81296a/',
        },
        {
          name: 'Smita Choudhary',
          role: 'Associate Director - Business Development',
          image:
            '/company/profile-image.jpg',
          linkedin: 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEOPsb2b5p_EAAAAZuYGWYAjGF5FGHMPjmtbhUeEKbWxH56EQuDQr2GR9vV8Xe5cbtpLPjwzhuVvLQsQuhFDLyqpWqoZ8OO-mnc99wKmH7ocoZCzQJWLhOECaA1kc6IfoQiJNE=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fsmita-choudhary%3Flipi%3Durn%253Ali%253Apage%253Ad_flagship3_profile_view_base_contact_details%253ByZS2u0P7QCungK4X5SW4aQ%253D%253D',
        },
        {
          name: 'Jit Senmazumdar',
          role: 'Advisor',
          image:
            '/company/judha2.jpg',
          linkedin: 'https://www.linkedin.com/in/jit-senmazumdar-8694245/',
        },
        {
          name: 'Raghu Yabaluri',
          role: 'Advisor and Strategy',
          image:
            '/company/20944621799-1.png',
          linkedin: 'https://www.linkedin.com/in/yabaluri?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app&original_referer=',
        },
        {
          name: 'Partha Dasgupta',
          role: 'Advisor',
          image:
            '/company/image-2-1.png',
          linkedin: 'http://www.linkedin.com/in/partha-dasgupta-68088720/',
        },
      ].map((member) => (
        <div key={member.name} className="text-center">
          <img
            src={member.image}
            alt={`${member.name}, ${member.role} at Visionaize`}
            className="mx-auto h-20 w-20 sm:h-24 sm:w-24 md:h-30 md:w-30 rounded-full object-cover"
          />

          <h3 className="mt-3 sm:mt-4 text-base sm:text-xl font-bold text-[#141821]">
            {member.name}
          </h3>
          <p className="mt-1 text-sm sm:text-lg text-[#3c4250]">{member.role}</p>

          
         <a   href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 sm:mt-3 inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#2E8EEB] no-underline hover:no-underline"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect width="24" height="24" rx="4" fill="#0A66C2" />
              <path
                fill="#fff"
                d="M7.2 9.6h2.6v8.4H7.2V9.6zM8.5 8.4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM11.4 9.6h2.5v1.15h.03c.35-.63 1.2-1.3 2.47-1.3 2.64 0 3.13 1.66 3.13 3.83v4.72h-2.6v-4.19c0-1 0-2.28-1.4-2.28-1.4 0-1.61 1.06-1.61 2.2v4.27h-2.6V9.6z"
              />
            </svg>
            Connect with me
          </a>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* ============ OFFICE LOCATIONS ============ */}
        <section className="bg-white px-4 sm:px-6 py-12 sm:py-16 lg:px-10 lg:py-28" id="office">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-normal tracking-tight text-[#141821] sm:text-4xl md:text-5xl">
              Office Locations
            </h2>

            <div className="mt-8 sm:mt-16 grid grid-cols-1 gap-8 sm:gap-14 md:grid-cols-3 md:gap-8">
              {[
                {
                  city: 'Delhi, India (Headquarters)',
                  lines: ['PKT-2/3-D-2, Vasant Kunj,', 'Delhi, India 110070'],
                },
                {
                  city: 'San Jose, CA',
                  lines: [
                    '2150 N 1st Street, Ste. 427',
                    'San Jose, CA 95131',
                    'United States',
                  ],
                },
                {
                  city: 'Saudi Arabia (EMEA Office)',
                  lines: [
                    'Al-Sharq Tower, 4th Fl.',
                    'King Abdulaziz Road, Prince Muteb St.,',
                    'Al-Khobar 31492, Saudi Arabia',
                  ],
                },
              ].map((office) => (
                <div key={office.city} className="text-center">
                  <p className="inline-flex items-center gap-2 text-base sm:text-xl font-normal text-[#141821]">
                    <MapPin
                      className="h-5 w-5 flex-shrink-0 text-[#8DC63F]"
                      fill="#8DC63F"
                    />
                    {office.city}
                  </p>

                  <div className="mt-3 sm:mt-4 space-y-1.5">
                    {office.lines.map((line, i) => (
                      <p key={i} className="text-sm sm:text-base text-[#3c4250]">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CONTACT / LEAD FORM ============ */}
  {/* ============ CONTACT / LEAD FORM ============ */}
<section className="relative overflow-hidden bg-white" id="contact">
  {/* Single continuous gradient band, full width */}
  <div className="bg-gradient-to-br from-[#8DC63F] to-[#2E8EEB] px-4 sm:px-6 py-10 sm:py-16 lg:px-16 lg:py-20">
    <div className="max-w-4xl lg:pr-[480px]">
      <h2 className="text-2xl font-normal leading-tight tracking-tight text-[#141821] sm:text-3xl md:text-4xl">
        Let&apos;s talk Digital Twins &amp; Immersive Industrial AI + Gen AI
      </h2>
      <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#1c2431]">
        Connect with us to learn how leading industrial companies around
        the globe are leveraging cutting edge AI, Gen AI, and Digital
        Twin technology to unlock hidden and lost value.
      </p>
    </div>
  </div>

  {/* Gray band below, full width */}
  <div className="bg-[#F5F5F4] px-4 sm:px-6 py-10 sm:py-16 lg:px-16 lg:py-16">
    <div className="max-w-4xl lg:pr-[480px]">
      <h3 className="text-2xl font-normal leading-tight tracking-tight text-[#141821] sm:text-3xl md:text-4xl">
        The outcomes we focus on each and every day
      </h3>

      <ul className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        {[
          'More productivity',
          'Reduced downtime',
          'Accelerated sustainability',
          'Improved worker safety',
        ].map((outcome) => (
          <li key={outcome} className="flex items-center gap-3 sm:gap-4">
            <span className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8DC63F] to-[#2E8EEB]">
              <Check className="h-4 w-4 text-white" strokeWidth={3} />
            </span>
            <span className="text-base sm:text-lg text-[#3c4250]">{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Floating form card — normal flow on mobile, absolute overlay on desktop */}
  <div className="px-4 sm:px-6 py-8 sm:py-10 lg:hidden">
    <div className="mx-auto max-w-md rounded-2xl bg-white p-5 sm:p-8 shadow-2xl">
      <h3 className="text-2xl sm:text-3xl font-normal tracking-tight text-[#141821]">
        Connect with us
      </h3>
      <ContactForm />
      <p className="mt-4 sm:mt-6 text-center text-base text-[#3c4250]">
        We generally respond within 24 hours
      </p>
    </div>
  </div>

  <div className="hidden lg:absolute lg:right-8 xl:right-16 lg:top-10 lg:block lg:w-[440px] xl:w-[480px]">
    <div className="rounded-2xl bg-white p-10 shadow-2xl">
      <h3 className="text-4xl font-normal tracking-tight text-[#141821]">
        Connect with us
      </h3>
      <ContactForm />
      <p className="mt-6 text-center text-base text-[#3c4250]">
        We generally respond within 24 hours
      </p>
    </div>
  </div>
</section>

      </div>

      <Footer />
    </>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    hearAboutUs: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target

    // phone: allow digits only, cap at 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10)
      setFormData((prev) => ({ ...prev, phone: digitsOnly }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const next: Record<string, string> = {}

    if (!formData.firstName.trim()) next.firstName = 'First name is required'
    if (!formData.lastName.trim()) next.lastName = 'Last name is required'
    if (!formData.companyName.trim())
      next.companyName = 'Company name is required'

    if (!formData.email.trim()) {
      next.email = 'Business email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = 'Enter a valid email address'
    }

    if (!formData.phone.trim()) {
      next.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      next.phone = 'Enter a valid 10-digit phone number'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('idle')

    if (!validate()) return

    setIsSubmitting(true)

    try {
      await api.submitCompanyLeadForm({
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_name: formData.companyName,
        business_email: formData.email,
        phone_number: formData.phone,
        hear_about_us: formData.hearAboutUs || undefined,
        message: formData.message || undefined,
        source_page: 'company',
      })

      setStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        phone: '',
        hearAboutUs: '',
        message: '',
      })
      setErrors({})
    } catch (err) {
      console.error(err)
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const baseInputClass =
    'w-full rounded-lg border px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-[#141821] placeholder:text-[#8a90a0] focus:outline-none focus:ring-1'

  const fieldClass = (field: string) =>
    errors[field]
      ? `${baseInputClass} border-red-400 focus:border-red-400 focus:ring-red-400`
      : `${baseInputClass} border-[#D8DCE2] focus:border-[#2E8EEB] focus:ring-[#2E8EEB]`

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
      <div>
        <FloatingInput
          label="First name*"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={fieldClass('firstName')}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
        )}
      </div>

      <div>
        <FloatingInput
          label="Last name*"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={fieldClass('lastName')}
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
        )}
      </div>

      <div>
        <FloatingInput
          label="Company name*"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={fieldClass('companyName')}
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
        )}
      </div>

      <div>
        <FloatingInput
          label="Business Email*"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={fieldClass('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <FloatingInput
          label="Phone number*"
          type="tel"
          name="phone"
          inputMode="numeric"
          maxLength={10}
          value={formData.phone}
          onChange={handleChange}
          className={fieldClass('phone')}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      <select
        name="hearAboutUs"
        value={formData.hearAboutUs}
        onChange={handleChange}
        className={`${baseInputClass} border-[#D8DCE2] text-[#8a90a0] focus:border-[#2E8EEB] focus:ring-[#2E8EEB]`}
      >
        <option value="">How did you first hear about us?</option>
        <option value="search">Search engine</option>
        <option value="social">Social media</option>
        <option value="referral">Referral</option>
        <option value="event">Event / conference</option>
        <option value="other">Other</option>
      </select>

      <FloatingTextarea
        label="Message"
        name="message"
        rows={4}
        value={formData.message}
        onChange={handleChange}
        className={`${baseInputClass} border-[#D8DCE2] focus:border-[#2E8EEB] focus:ring-[#2E8EEB]`}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-full bg-gradient-to-r from-[#6FCF57] to-[#2E8EEB] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2E8EEB] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Sending...' : 'Send request'}
      </button>

      {status === 'success' && (
        <p className="text-center text-sm font-medium text-green-600">
          Thanks! We&apos;ll be in touch within 24 hours.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-sm font-medium text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  )
}