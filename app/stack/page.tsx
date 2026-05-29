"use client"

import { FinderLayout } from "@/components/finder-layout"
import { motion } from "framer-motion"

const tools = [
  "Python", "Next.js", "React", "Figma", "SQL", "Claude API", "Framer", "Notion",
  "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Redis", "Vercel", "Git", "VS Code"
]

const toolCategories = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Rust"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    category: "AI / ML",
    items: ["OpenAI API", "Claude API", "LangChain", "Hugging Face"],
  },
  {
    category: "Design",
    items: ["Figma", "Framer", "Adobe Suite", "Spline"],
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Notion", "Linear"],
  },
]

export default function StackPage() {
  return (
    <FinderLayout title="stack" activeSection="stack">
      <div className="p-8 md:p-12">
        <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-4">
          Tech Stack
        </h1>

        {/* Marquee */}
        <div className="overflow-hidden border-y-2 border-espresso/10 py-4 -mx-8 md:-mx-12 px-8 md:px-12 mb-8">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...tools, ...tools].map((tool, index) => (
              <span 
                key={index} 
                className="font-mono text-lg text-espresso/70"
              >
                {tool} ·
              </span>
            ))}
          </motion.div>
        </div>

        {/* Grid of categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category, index) => (
            <div key={index} className="space-y-3">
              <h2 className="font-mono text-xs text-[#6FA3C4] uppercase tracking-wider">
                {category.category}
              </h2>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="text-espresso/80 text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#6FA3C4]/50 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-espresso/10 mt-8">
          <p className="font-mono text-xs text-espresso/50">
            Always learning · Currently exploring: WebGPU, Edge Functions, Local LLMs
          </p>
        </div>
      </div>
    </FinderLayout>
  )
}
