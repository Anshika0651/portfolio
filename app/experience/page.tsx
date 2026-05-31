"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { FinderLayout } from "@/components/finder-layout"

const experiences = [
  {
    role: "Product Intern · 9 months",
    company: "Niramaya",
    tag: "healthtech startup",
    description:
      "Started in UX — redesigning the website and app. Moved into product over time — figuring out features, expanding product scope, working on investor pitch decks, and thinking about where the product should go next.",
  },
  {
    role: "Consultant · 5-6 months",
    company: "180 Degrees Consulting",
    tag: "the world's largest university-based consultancy for nonprofits and socially conscious organisations",
    description:
      "Worked in teams on real consulting projects for nonprofit clients — problem framing, research, and strategy. The kind of work where you figure out what the actual problem is before trying to solve it.",
  },
  {
    role: "Creatives Associate",
    company: "Microsoft Learn Student Ambassadors",
    tag: "Microsoft's global student community program, present across college campuses",
    description: "Part of the campus chapter's creatives team.",
  },
  {
    role: "Associate, Norman Lab",
    company: "NextTechLab",
    tag: "a student-led research lab spanning multiple domains",
    description: "Worked within the Norman Lab, focusing on software and creatives.",
  },
]

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof experiences)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([observed]) => {
        if (observed.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="relative pb-[60px] last:pb-0"
      style={{ paddingLeft: 75 }}
      initial={{ opacity: 0, x: -30 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -30,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: isVisible ? index * 0.15 : 0,
      }}
    >
      <div
        className="absolute top-1.5 w-[10px] h-[10px] rounded-full bg-[#2C1810]"
        style={{ left: 35 }}
        aria-hidden
      />

      <div>
        <p className="font-mono text-[12px] text-[#2C1810]/70 mb-1">{entry.role}</p>
        <h2 className="font-sans font-bold text-[22px] text-[#2C1810] mb-1">
          {entry.company}
        </h2>
        <p className="font-sans italic text-[11px] text-[#2C1810]/50 mb-3">{entry.tag}</p>
        <p className="font-sans text-[13px] text-[#2C1810]/80 leading-[1.7] max-w-xl">
          {entry.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ExperiencePage() {
  return (
    <FinderLayout title="experience.pdf" activeSection="experience">
      <div className="relative min-h-full py-10">
        <div
          className="absolute top-0 bottom-0 w-px bg-[#2C1810]/20"
          style={{ left: 40 }}
          aria-hidden
        />

        <div className="pr-10">
          {experiences.map((entry, index) => (
            <TimelineEntry key={entry.company} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </FinderLayout>
  )
}
