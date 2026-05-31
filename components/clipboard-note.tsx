"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface ClipboardNoteProps {
  position: { x: number; y: number }
  rotation: number
  delay: number
}

export function ClipboardNote({ position, rotation, delay }: ClipboardNoteProps) {
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
        {/* Clipboard with text overlay on hover */}
        <motion.div
          className="drop-shadow-lg relative"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 70 110" className="w-[70px] h-[110px]">
            <defs>
              <linearGradient id="clipboardBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#96AEBB" />
                <stop offset="100%" stopColor="#7A9BAA" />
              </linearGradient>
              <linearGradient id="clipMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d0d4d8" />
                <stop offset="50%" stopColor="#b8bdc2" />
                <stop offset="100%" stopColor="#c8cdd2" />
              </linearGradient>
              <linearGradient id="clipMetalTop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e0e4e8" />
                <stop offset="100%" stopColor="#b0b5ba" />
              </linearGradient>
            </defs>

            {/* Clipboard body — slate blue/grey with rounded corners */}
            <rect x="2" y="4" width="66" height="102" rx="5" fill="url(#clipboardBody)" stroke="#6A8A98" strokeWidth="0.8"/>

            {/* White paper area — larger, below the clip */}
            <rect x="6" y="20" width="58" height="80" rx="2" fill="#f0f2f4" stroke="rgba(106,138,152,0.3)" strokeWidth="0.5"/>

            {/* Paper subtle lines */}
            <line x1="10" y1="32" x2="60" y2="32" stroke="rgba(106,138,152,0.15)" strokeWidth="0.5"/>
            <line x1="10" y1="40" x2="60" y2="40" stroke="rgba(106,138,152,0.15)" strokeWidth="0.5"/>
            <line x1="10" y1="48" x2="60" y2="48" stroke="rgba(106,138,152,0.15)" strokeWidth="0.5"/>
            <line x1="10" y1="56" x2="60" y2="56" stroke="rgba(106,138,152,0.15)" strokeWidth="0.5"/>
            <line x1="10" y1="64" x2="60" y2="64" stroke="rgba(106,138,152,0.15)" strokeWidth="0.5"/>
            <line x1="10" y1="72" x2="60" y2="72" stroke="rgba(106,138,152,0.15)" strokeWidth="0.5"/>
            <line x1="10" y1="80" x2="60" y2="80" stroke="rgba(106,138,152,0.15)" strokeWidth="0.5"/>
            <line x1="10" y1="88" x2="60" y2="88" stroke="rgba(106,138,152,0.15)" strokeWidth="0.5"/>

            {/* Metal clip base plate */}
            <rect x="18" y="2" width="34" height="14" rx="3" fill="url(#clipMetal)" stroke="#a0a8b0" strokeWidth="0.8"/>

            {/* Clip top bar (the spring part) */}
            <rect x="14" y="1" width="42" height="7" rx="3" fill="url(#clipMetalTop)" stroke="#9098a0" strokeWidth="0.8"/>

            {/* Clip highlight */}
            <rect x="14" y="1" width="42" height="2.5" rx="1.5" fill="rgba(255,255,255,0.6)" />

            {/* Clip tab (the little press-down lever) */}
            <rect x="30" y="8" width="10" height="6" rx="2" fill="url(#clipMetal)" stroke="#9098a0" strokeWidth="0.7"/>
            <rect x="31" y="9" width="8" height="2" rx="1" fill="rgba(255,255,255,0.4)" />

            {/* Clip screws */}
            <circle cx="22" cy="8" r="2" fill="#c0c5ca" stroke="#9098a0" strokeWidth="0.5"/>
            <circle cx="22" cy="8" r="0.8" fill="#a0a8b0"/>
            <circle cx="48" cy="8" r="2" fill="#c0c5ca" stroke="#9098a0" strokeWidth="0.5"/>
            <circle cx="48" cy="8" r="0.8" fill="#a0a8b0"/>
          </svg>

          {/* Hover text content — positioned within white paper area */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-start justify-start pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ paddingTop: "24px", paddingLeft: "10px", paddingRight: "8px" }}
              >
                <div className="text-left leading-relaxed">
                  <p className="font-mono text-[9px] text-espresso/85 whitespace-normal">
                    open to internships
                  </p>
                  <p className="font-mono text-[9px] text-espresso/85 whitespace-normal">
                    &amp; full time roles
                  </p>
                  <p className="font-mono text-[9px] text-espresso/70 whitespace-normal mt-1">
                    (actively looking 👀)
                  </p>
                  <p className="font-mono text-[9px] text-espresso/85 whitespace-normal mt-1">
                    remote / hybrid /
                  </p>
                  <p className="font-mono text-[9px] text-espresso/85 whitespace-normal">
                    anywhere interesting
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          note.txt
        </span>
      </motion.div>
    </motion.div>
  )
}
