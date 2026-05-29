"use client"

import { FinderLayout } from "@/components/finder-layout"

const workHistory = [
  {
    company: "Acme Corp",
    role: "Senior Product Designer",
    period: "2023 — Present",
    description: "Leading design for AI-powered productivity tools. Shipping features used by millions of users daily.",
  },
  {
    company: "Startup Studio",
    role: "Design Engineer",
    period: "2021 — 2023",
    description: "Built and shipped three products from 0 to 1. Combined design and engineering to move fast.",
  },
  {
    company: "Tech Giant",
    role: "Product Designer",
    period: "2019 — 2021",
    description: "Designed core features for the flagship mobile app. Collaborated with cross-functional teams of 20+.",
  },
  {
    company: "Agency X",
    role: "UI/UX Designer",
    period: "2017 — 2019",
    description: "Crafted digital experiences for Fortune 500 clients across fintech, healthcare, and e-commerce.",
  },
]

export default function WorkPage() {
  return (
    <FinderLayout title="work" activeSection="work">
      <div className="p-8 md:p-12">
        <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-8">
          Work History
        </h1>

        <div className="grid gap-4">
          {workHistory.map((job, index) => (
            <div 
              key={index}
              className="border-2 border-espresso/20 p-6 hover:border-espresso/40 transition-colors bg-white/50"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                <h2 className="font-serif text-2xl text-espresso font-semibold">
                  {job.company}
                </h2>
                <span className="font-mono text-xs text-espresso/50">
                  {job.period}
                </span>
              </div>
              <p className="font-mono text-sm text-[#6FA3C4] mb-3">
                {job.role}
              </p>
              <p className="text-espresso/70 text-sm leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </FinderLayout>
  )
}
