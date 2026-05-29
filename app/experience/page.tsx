"use client"

import { FinderLayout } from "@/components/finder-layout"

const experiences = [
  {
    year: "2023",
    role: "Senior Product Designer",
    company: "Acme Corp",
    highlights: [
      "Led redesign of core product, increasing user engagement by 40%",
      "Built and managed a team of 4 designers",
      "Introduced design system that reduced design-to-dev time by 60%",
    ],
  },
  {
    year: "2021",
    role: "Design Engineer",
    company: "Startup Studio",
    highlights: [
      "Shipped 3 products from concept to launch",
      "Wore multiple hats: design, frontend, user research",
      "Grew one product to 50K MAU in 6 months",
    ],
  },
  {
    year: "2019",
    role: "Product Designer",
    company: "Tech Giant",
    highlights: [
      "Designed features used by 100M+ users",
      "Collaborated with engineering and PM teams",
      "Received internal innovation award for AI feature concept",
    ],
  },
  {
    year: "2017",
    role: "UI/UX Designer",
    company: "Agency X",
    highlights: [
      "Worked with Fortune 500 clients across industries",
      "Developed expertise in user research and testing",
      "Promoted from Junior to Senior in 18 months",
    ],
  },
  {
    year: "2015",
    role: "Freelance Designer",
    company: "Self-employed",
    highlights: [
      "Built client base through word-of-mouth referrals",
      "Learned business fundamentals and client management",
      "Developed skills across brand, web, and product design",
    ],
  },
]

export default function ExperiencePage() {
  return (
    <FinderLayout title="experience" activeSection="experience">
      <div className="p-8 md:p-12">
        <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-8">
          Experience
        </h1>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-16 top-0 bottom-0 w-px bg-espresso/20" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-28">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-16 top-2 w-2 h-2 bg-[#6FA3C4] rounded-full -translate-x-1/2" />
                
                {/* Year */}
                <span className="absolute left-8 md:left-0 top-0 font-mono text-sm text-espresso/50 md:w-12 md:text-right">
                  {exp.year}
                </span>

                <div className="space-y-3">
                  <div>
                    <h2 className="font-serif text-xl text-espresso font-semibold">
                      {exp.role}
                    </h2>
                    <p className="font-mono text-sm text-[#6FA3C4]">
                      {exp.company}
                    </p>
                  </div>

                  <ul className="space-y-1.5">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li 
                        key={hIndex}
                        className="text-espresso/70 text-sm leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-espresso/30 mt-1">—</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-espresso/10 mt-12">
          <p className="font-mono text-xs text-espresso/50">
            Education: B.S. Computer Science · Minor in Design · 2015
          </p>
        </div>
      </div>
    </FinderLayout>
  )
}
