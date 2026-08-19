import { createFileRoute, Link } from "@tanstack/react-router";
import { InsightPage } from "@/components/site/InsightPage";
import { useState, type ReactNode } from "react";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/digital-twin-faq")({
  head: () => ({
    meta: [
      { title: "Digital Twin FAQ — Visionaize" },
      { name: "description", content: "Answers to common questions about digital twins, their applications, and the value they create across complex industrial environments." },
    ],
  }),
  component: DigitalTwinFaqPage,
});

// --- Accordion primitives ---

type AccordionItem = {
  question: string;
  answer: ReactNode;
};

type AccordionGroup = {
  title: string;
  items: AccordionItem[];
};

function AccordionRow({
  item,
  open,
  onToggle,
}: {
  item: AccordionItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 py-4 text-left"
      >
        <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center text-gray-700">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </span>
        <span className="text-lg font-semibold text-gray-900 sm:text-xl">{item.question}</span>
      </button>
      {open && (
        <div className="pb-6 pl-9 pr-2 text-base leading-relaxed text-gray-600 sm:text-lg sm:leading-8">
          {item.answer}
        </div>
      )}
    </div>
  );
}

function AccordionSection({ group }: { group: AccordionGroup }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-6xl py-8">
      <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{group.title}</h2>
      <div>
        {group.items.map((item, index) => (
          <AccordionRow
            key={item.question}
            item={item}
            open={openIndex === index}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          />
        ))}
      </div>
    </section>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-blue-600  hover:decoration-blue-600"
    >
      {children}
    </a>
  );
}

const accordionGroups: AccordionGroup[] = [
  {
    title: "How does a Digital Twin work?",
    items: [
      {
        question: "What is a Digital Twin?",
        answer: (
          <>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                A <InlineLink href="/platform/v-plant">digital twin</InlineLink> is a 3D
                virtual replica of a physical object or system. In terms of{" "}
                <InlineLink href="">industrial businesses</InlineLink> this
                could be oil &amp; gas refineries, manufacturing facilities, or utility power plants. A digital
                twin is a form of enterprise asset management software that allows for remote operations and
                predictive maintenance of these facilities.
              </li>
            </ul>
            <p className="mt-4">
              The purpose of a digital twin is to provide an accurate and real-time representation of a physical
              object or system. This can be extremely beneficial for industrial businesses, as it allows them to
              detect faults and potential problems with their products before they become an issue, resulting in
              less downtime and greater productivity. It also allows companies to optimize their processes and
              improve product quality.
            </p>
          </>
        ),
      },
      {
        question: "How does a Digital Twin work?",
        answer: (
          <>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                A digital twin works by using an initial 3D scan of the object or structure. IoT sensors are added
                to the asset to collect data about a physical object or system.
              
                This data is then used to create a virtual replica of the object or system. Sensors then relay the
                physical object's performance to the digital twin. Such data points can include energy output,
                weather conditions, or uptime and downtime.
              </li>
            </ul>
            <p>
              The digital twin can then be used to monitor the object or system in real time, and it can also be
              used to run simulations to predict how the object or system will behave under different
              conditions. This helps businesses optimize their processes and avoid potential problems.
            </p>
          </>
        ),
      },
      {
        question: "What is the difference between a Digital Twin and a simulation?",
        answer:
          "Digital Twins and simulations are similar, but the most important difference is that a Digital Twin is built on live and real data whereas a simulation is based off data generated by AI. Digital Twins can also take into consideration profitability, management, and safety in addition to forecasting.",
      },
      {
        question: "How to design a Digital Twin?",
        answer: (
          <ul className="list-disc space-y-2 pl-5">
            <li>
              When developing digital twins, the thing to remember is that they aren't simply computer simulations
              of a real-world location.
           
            They are directly linked to their structures and exchange data in real time.
            
              Digital twins can even take care of integrated building systems such as telecom networks, content
              storage platforms, and other commercial applications.
            
              In a nutshell, digital twins are appendages of an environment instead of static replicas. Designers
              who keep this in mind will be able to create connections more efficiently.
            </li>
          </ul>
        ),
      },
    ],
  },
  {
    title: "What is a Digital Twin used for?",
    items: [
      {
        question: "What can a Digital Twin be used for?",
        answer: (
          <>
            <p>
              A digital twin can be used for a variety of {""}
              <Link to="/solutions" className="text-blue-600 hover:decoration-blue-600">solutions</Link>, from monitoring and managing complex systems
              to training AI models. Some of the most common use cases for digital twins include:
           
           
                <span className="font-semibold text-gray-800">Managing industrial processes:</span> Digital twins
                can be used to monitor and optimize industrial processes in real time. For example, a digital
                twin of a manufacturing plant could be used to track production KPIs and identify bottlenecks.
           
           
                <span className="font-semibold text-gray-800">Monitoring infrastructure:</span> Digital twins can
                be used to monitor the performance of critical infrastructure, such as power plants and
                transportation networks. For example, a digital twin of a power grid could be used to predict
                demand peaks and prevent blackouts.
             
                <span className="font-semibold text-gray-800">Training AI models:</span> Digital twins can be used
                to train AI models in a simulated environment before they are deployed in the real world. For
                example, a digital twin of a city could be used to train autonomous vehicles.
             
                <span className="font-semibold text-gray-800">Managing construction projects:</span> Digital twins
                can be used to manage construction projects from start to finish. For example, a digital twin of
                a building could be used to track the progress of construction, identify potential risks, and
                optimize the use of resources.
           
               Digital twins are a versatile tool that can be used for a wide range of applications. The key is to
              choose the right solution  for your specific needs.
              
             
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "History of Digital Twins",
    items: [
      {
        question: "History of Digital Twins",
        answer:
          "The concept of digital twins can be traced back to the early days of computing. One of the first examples of a digital twin was SAGE, a massive computer system that was used to track aircraft during the Cold War. In the 1970s, NASA used digital twins to design and test spacecraft. Today, digital twins are used in a variety of industries, from manufacturing to healthcare.",
      },
      {
        question: "Who invented Digital Twins?",
        answer:
          "Conceptually, the first digital twin was used by NASA during the Apollo 13 mission, but the term \"digital twin\" was first coined by Dr. Michael Grieves of the University of Michigan in 2002. Grieves defined a digital twin as \"a dynamic software model that mirrors the physical characteristics and operational performance of a manufactured product or system.\" Since then, the concept of digital twins has evolved, and the term is now used to refer to any digital representation of a physical object or system.",
      },
      {
        question: "What is the future of Digital Twins?",
        answer: (
          <>
            <p>
              Digital twins are becoming increasingly popular because they offer a wide range of benefits to
              businesses. As the technology continues to evolve, digital twins are expected to become even more
              widespread and play a key role across a variety of industries.
            </p>
            <p className="mt-4">
              One potential future application of digital twins is in the healthcare industry. They could be used
              to create virtual models of patients, allowing medical professionals to test different treatment
              options before applying them. This would enable more personalized, accurate, and effective
              treatment plans.
            </p>
            <p className="mt-4">
              Digital twins could also transform the construction industry. Since construction projects are often
              complex and require coordination across multiple teams, digital twins can help companies plan,
              monitor, and manage projects more efficiently. This can lead to shorter project timelines, reduced
              costs, and improved overall project outcomes.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Benefits of a Digital Twin",
    items: [
      {
        question: "What are the benefits of a Digital Twin?",
        answer: (
          <>
            <p>
              There are many advantages of using a digital twin for industrial businesses. One of the main
              advantages is that it can help businesses understand and predict how the asset will behave under
              different conditions. This helps businesses to improve their decision-making and to reduce costs.
            </p>
            <p className="mt-4">
              Some additional benefits a digital twin can provide for an industrial business include:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5">
              <li>Reducing downtime by identifying potential problems before they occur</li>
              <li>Improving quality control by monitoring products throughout the manufacturing process</li>
              <li>
                Reducing costs by optimizing processes and reducing waste. Remote operations also allow
                industrial businesses to reduce the amount of resources to monitor the asset.
              </li>
              <li>Increasing customer satisfaction by providing a personalized experience</li>
              <li>Improving safety by identifying hazards and risks through preventive maintenance</li>
              <li>
                Reducing carbon emissions with fewer trips to the facility, since the fuller scope of what needs
                to be looked at can be better and more proactively coordinated through the use of a digital twin.
              </li>
            </ol>
          </>
        ),
      },
    ],
  },
  {
    title: "Digital Twin industries",
    items: [
      {
        question: "What industries can a Digital Twin be used for?",
        answer: (
          <>
            <p>
              Digital twins are being used across a variety of industries to solve complex problems and optimize
              performance. Some of the most popular industries for digital twins include:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <span className="font-semibold text-gray-800">Manufacturing:</span> Digital twins are being used
                in manufacturing to optimize production processes and improve quality control.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Healthcare:</span> Digital twins are being used in
                healthcare to improve patient care and treatment.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Retail:</span> Digital twins are being used in
                retail to improve customer experience and store operations.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Transportation:</span> Digital twins are being used
                in transportation to optimize routes and manage traffic congestion.
              </li>
              <li>
                <span className="font-semibold text-gray-800">Construction:</span> Digital twins are being used in
                construction to improve project management and mitigate risks.
              </li>
            </ul>
            <p className="mt-4">
              Digital twins offer a unique opportunity to improve performance across a variety of industries. The
              key is to find the right use case for your specific needs.
            </p>
          </>
        ),
      },
      {
        question: "Digital Twins & Manufacturing",
        answer: (
          <>
            <p>
              Visualize your manufacturing operations through a real-time, up-to-date 3-D digital twin. Imagine
              your Factory Manager, your Shift Supervisors, and your Maintenance engineers being able to
              visualize the analytics arrayed and overlaid on a digital twin of your plant assets in 3-D. The
              vast array of data, analytics, and insights relevant to your operations team can be better
              understood because it can be displayed within a high fidelity visual likeness of the factory. This
              visual digital twin allows your operations team to really understand, verify, and carefully plan
              their actions, whether they are:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>Responding to a critical factory alert that needs to be addressed</li>
              <li>Planning a plant maintenance operation; or
              Carrying out required inspections on the factory floor.{"  "}
            
              <Link
                to="/industries/digital-twin-for-manufacturing"
                className="text-blue-600  hover:decoration-blue-600"
              >
                Learn more about Digital Twins for Manufacturing.
              </Link>
            </li>
            </ul>
          </>
        ),
      },
      {
        question: "Digital Twins & Power and Energy",
        answer: (
          <>
            <p>
              Visualize your power generation, transmission and distribution assets in an intelligent, 3D Digital
              Twin – the Power Utility Metaverse. Utilities have a vast array of data, analytics, and insights
              that must be analyzed dynamically and in real time. These insights need to be understood and
              consumed before making decisions and taking action, particularly in planning their maintenance and
              inspection programs in power stations and sub-stations.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                V-Suite creates a 3D visual view of your power grid or generation plans–your Power Utility
                Metaverse.
              </li>
              <li>
                Imagine your Planning and Construction team, your Engineering team, your Electric Operations
                team, and your Substation Directors and Operators all being able to visualize and interact with
                stations and sub-stations assets and layout to plan changes to, and monitor operations through a
                real-time, up-to-date 3-D digital twin, without having to be there on site!
              </li>
              <li>
                The analytics your organization is producing can be arrayed and overlaid on a digital twin of the
                operation in 3-D. The vast array of data, analytics, and insights can be really understood
                because it can be displayed within a high fidelity visual likeness of the sites.
              </li>
              <li>
                As a part of the central operations display, or on mobile displays at field sites, the visual
                digital twin allows your operations team to really understand, verify, and carefully plan their
                actions, whether they are carrying out routine maintenance or inspections, or planning major
                overhauls, or responding in real time to operations alerts.
              </li>
            </ul>
          </>
        ),
      },
      {
        question: "Digital Twins & Oil and Gas",
        answer: (
          <>
            <p>
              Enable your Operations Center and Field teams to optimize wellhead production and refinery
              performance delivering digital insights within the industrial metaverse, to allow them to plan,
              optimize and execute important work, while keeping teams safe, operations compliant, and processes
              running to plan. How do you balance it all? By placing data-driven insights within an intelligent
              3D digital twin your team can visualize and verify the actions they need to take. The plan is laid
              out in a richly annotated, high-resolution simulation of the operation.Learn more about {""}
          
              <Link
                to="/industries/oil-and-gas"
                className="text-blue-600  hover:decoration-blue-600"
              >
                 Digital Twins for Oil &amp; Gas.
              </Link>
            </p>
          </>
        ),
      },
    ],
  },
];

function DigitalTwinFaqPage() {
  return (
    <InsightPage
      title="Digital Twin FAQ"
      eyebrow="Knowledge Center"
      intro="Learn all about Digital Twins and their various benefits for asset intensive industries."
      heroVariant="centered"
      sections={[]}
      // cards={[
      //   { title: "Blog", description: "Read articles on AI, industrial transformation, and digital twin strategy.", href: "/blog", eyebrow: "Insights" },
      //   { title: "The Industrial Metaverse", description: "See how immersive industrial environments connect people, data, and operations.", href: "/theindustrialmetaverse", eyebrow: "Concept" },
      //   { title: "Pharmaceutical Manufacturing", description: "Discover how digital twins and smart apps improve monitoring and optimization in regulated environments.", href: "/ai-in-pharmaceutical-manufacturing", eyebrow: "Use case" },
      // ]}
     
    >
      <div className="px-6">
        {accordionGroups.map((group) => (
          <AccordionSection key={group.title} group={group} />
        ))}
      </div>
    </InsightPage>
  );
}