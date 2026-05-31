"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface StackBasketProps {
  position: { x: number; y: number }
  rotation: number
  delay: number
}

const techIcons = [
  { name: "python", url: "https://cdn.simpleicons.org/python" },
  { name: "react", url: "https://cdn.simpleicons.org/react" },
  { name: "nextdotjs", url: "https://cdn.simpleicons.org/nextdotjs" },
  { name: "fastapi", url: "https://cdn.simpleicons.org/fastapi" },
  { name: "mongodb", url: "https://cdn.simpleicons.org/mongodb" },
  { name: "typescript", url: "https://cdn.simpleicons.org/typescript" },
  { name: "figma", url: "https://cdn.simpleicons.org/figma" },
  { name: "tailwindcss", url: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "langchain", url: "https://cdn.simpleicons.org/langchain" },
]

export function StackBasket({ position, rotation, delay }: StackBasketProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <motion.div
        className="flex flex-col items-center gap-1 relative"
        style={{ rotate: rotation }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ scale: 1.08 }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        onHoverStart={() => !isDragging && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Tech stack icons that float above basket in an arc */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1">
          <AnimatePresence>
            {isHovered &&
              techIcons.map((tech, index) => {
                // Arc positioning: spread icons across a slight curve
                const total = techIcons.length
                const arcOffset = (index - (total - 1) / 2) * 0.8
                const yArc = -Math.abs(arcOffset) * 2
                return (
                  <motion.div
                    key={tech.name}
                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md flex-shrink-0"
                    style={{ marginTop: yArc }}
                    initial={{ y: 20, opacity: 0, scale: 0.5 }}
                    animate={{ y: yArc, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: index * 0.08,
                    }}
                    whileHover={{ scale: 1.3, y: yArc - 4 }}
                  >
                    <img
                      src={tech.url}
                      alt={tech.name}
                      className="w-4 h-4 object-contain"
                      draggable={false}
                    />
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </div>

        {/* Basket SVG — light blue, rectangular with grid/lattice pattern, top-down perspective */}
        <div className="drop-shadow-lg">
          <svg viewBox="0 0 120 88" className="w-[110px] h-[80px]">
            <defs>
              <linearGradient id="basketBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A8D4E6" />
                <stop offset="100%" stopColor="#7BB8D0" />
              </linearGradient>
              <linearGradient id="basketInner" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c8e8f4" />
                <stop offset="100%" stopColor="#a0ccde" />
              </linearGradient>
              <linearGradient id="basketFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#93C5D7" />
                <stop offset="100%" stopColor="#6AAFC5" />
              </linearGradient>
              <linearGradient id="basketEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b8dce8" />
                <stop offset="100%" stopColor="#8ec4d8" />
              </linearGradient>
            </defs>

            {/* Outer basket body — perspective view */}
            {/* Back wall (lighter) */}
            <rect x="8" y="6" width="104" height="56" rx="4" fill="url(#basketEdge)" stroke="#6AAFC5" strokeWidth="1"/>

            {/* Front face / main face */}
            <rect x="4" y="18" width="112" height="66" rx="5" fill="url(#basketFront)" stroke="#5A9BB0" strokeWidth="1.2"/>

            {/* Inner floor area */}
            <rect x="10" y="26" width="100" height="52" rx="3" fill="url(#basketInner)" />

            {/* Grid pattern on front face — rows of small rounded squares */}
            {Array.from({ length: 5 }, (_, row) =>
              Array.from({ length: 10 }, (_, col) => (
                <rect
                  key={`grid-${row}-${col}`}
                  x={10 + col * 10.2}
                  y={27 + row * 10.2}
                  width={8.5}
                  height={8.5}
                  rx={1.5}
                  fill="rgba(255,255,255,0.35)"
                  stroke="rgba(90,155,176,0.3)"
                  strokeWidth="0.5"
                />
              ))
            )}

            {/* Side wall grid — left */}
            <rect x="4" y="18" width="6" height="66" rx="3" fill="#7BBDD2" />
            {Array.from({ length: 5 }, (_, row) => (
              <rect
                key={`ls-${row}`}
                x={5}
                y={27 + row * 10.2}
                width={4}
                height={8.5}
                rx={1}
                fill="rgba(255,255,255,0.25)"
                stroke="rgba(90,155,176,0.2)"
                strokeWidth="0.4"
              />
            ))}

            {/* Side wall grid — right */}
            <rect x="110" y="18" width="6" height="66" rx="3" fill="#7BBDD2" />
            {Array.from({ length: 5 }, (_, row) => (
              <rect
                key={`rs-${row}`}
                x={111}
                y={27 + row * 10.2}
                width={4}
                height={8.5}
                rx={1}
                fill="rgba(255,255,255,0.25)"
                stroke="rgba(90,155,176,0.2)"
                strokeWidth="0.4"
              />
            ))}

            {/* Top rim */}
            <rect x="4" y="16" width="112" height="6" rx="3" fill="#A0CEDF" stroke="#5A9BB0" strokeWidth="0.8"/>

            {/* Left handle clip */}
            <rect x="16" y="10" width="18" height="10" rx="3" fill="#7BBDD2" stroke="#5A9BB0" strokeWidth="1"/>
            <rect x="19" y="12" width="12" height="6" rx="2" fill="#93C5D7" />
            <rect x="21" y="13.5" width="8" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />

            {/* Right handle clip */}
            <rect x="86" y="10" width="18" height="10" rx="3" fill="#7BBDD2" stroke="#5A9BB0" strokeWidth="1"/>
            <rect x="89" y="12" width="12" height="6" rx="2" fill="#93C5D7" />
            <rect x="91" y="13.5" width="8" height="3" rx="1.5" fill="rgba(255,255,255,0.5)" />

            {/* Bottom feet — small clips */}
            <rect x="18" y="78" width="12" height="6" rx="2" fill="#7BBDD2" stroke="#5A9BB0" strokeWidth="0.8"/>
            <rect x="90" y="78" width="12" height="6" rx="2" fill="#7BBDD2" stroke="#5A9BB0" strokeWidth="0.8"/>

            {/* Silver/chrome rim highlight */}
            <rect x="4" y="16" width="112" height="2" rx="1" fill="rgba(255,255,255,0.6)" />
          </svg>
        </div>

        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          stack/
        </span>
      </motion.div>
    </motion.div>
  )
}
