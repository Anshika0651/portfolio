"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FinderLayout } from "@/components/finder-layout"

const projects = [
  { 
    slug: "research-crew-ai", 
    name: "Research Crew AI", 
    color: "#C084FC",
    rotation: -2
  },
  { 
    slug: "fayr-ai", 
    name: "Fayr AI", 
    color: "#F97316",
    rotation: 3
  },
  { 
    slug: "devmatch", 
    name: "DevMatch", 
    color: "#22C55E",
    rotation: -1
  },
]

function FolderIcon({ color, slug }: { color: string; slug: string }) {
  // Create lighter shade for top gradient
  const lighterColor = color

  return (
    <svg viewBox="0 0 140 110" className="w-[140px] h-[110px] drop-shadow-lg">
      <defs>
        <linearGradient id={`folderBody-${slug}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={lighterColor} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id={`folderTab-${slug}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.95" />
          <stop offset="100%" stopColor={color} stopOpacity="0.75" />
        </linearGradient>
        <filter id={`innerShadow-${slug}`} x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="3" />
          <feOffset dx="0" dy="3" result="offsetblur" />
          <feFlood floodColor="rgba(0,0,0,0.2)" result="color" />
          <feComposite in2="offsetblur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>
      
      {/* Folder body */}
      <path 
        d="M8 28 L8 98 Q8 106 16 106 L124 106 Q132 106 132 98 L132 28 Z" 
        fill={`url(#folderBody-${slug})`}
        filter={`url(#innerShadow-${slug})`}
      />
      
      {/* Bottom edge (darker) */}
      <path 
        d="M8 100 L8 98 Q8 106 16 106 L124 106 Q132 106 132 98 L132 100 Q132 108 124 108 L16 108 Q8 108 8 100 Z" 
        fill="rgba(0,0,0,0.15)"
      />
      
      {/* Folder tab */}
      <path 
        d="M8 22 L48 22 L58 32 L132 32 Q132 24 124 24 L62 24 L52 12 Q48 8 42 8 L16 8 Q8 8 8 16 Z" 
        fill={`url(#folderTab-${slug})`}
      />
      
      {/* Highlight on body */}
      <rect x="8" y="28" width="124" height="6" fill="rgba(255,255,255,0.25)" rx="0" />
    </svg>
  )
}

function ProjectFolder({ 
  project, 
  onNavigate,
  isClicked,
  isNavigating
}: { 
  project: typeof projects[0]
  onNavigate: (slug: string) => void
  isClicked: boolean
  isNavigating: boolean
}) {
  return (
    <motion.div
      className="cursor-pointer select-none flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isNavigating && !isClicked ? 0 : 1, 
        scale: isClicked ? 1.3 : 1,
        zIndex: isClicked ? 50 : 1
      }}
      exit={{ 
        opacity: isClicked ? 1 : 0,
        scale: isClicked ? 2 : 0.8,
      }}
      transition={{ duration: 0.4 }}
      style={{ rotate: project.rotation }}
      whileHover={{ scale: 1.08, rotate: 0 }}
      onClick={() => onNavigate(project.slug)}
    >
      <motion.div
        className="transition-all duration-200"
        whileHover={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.25))" }}
      >
        <FolderIcon color={project.color} slug={project.slug} />
      </motion.div>
      <span className="font-mono text-xs text-espresso whitespace-nowrap">
        {project.name}
      </span>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [clickedProject, setClickedProject] = useState<string | null>(null)

  const handleNavigate = (slug: string) => {
    setClickedProject(slug)
    setIsNavigating(true)
    setTimeout(() => {
      router.push(`/projects/${slug}`)
    }, 500)
  }

  return (
    <FinderLayout title="projects/" activeSection="projects">
      <div className="p-8 h-full relative">
        {/* Folder grid */}
        <div className="grid grid-cols-3 gap-12 justify-items-center pt-8">
          {projects.map((project) => (
            <ProjectFolder
              key={project.slug}
              project={project}
              onNavigate={handleNavigate}
              isClicked={clickedProject === project.slug}
              isNavigating={isNavigating}
            />
          ))}
        </div>

        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #2C1810 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>
    </FinderLayout>
  )
}
