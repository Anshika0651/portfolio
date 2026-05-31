"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

interface KeyboardIconProps {
  position: { x: number; y: number }
  rotation: number
  delay: number
}

const typingText = "hi, i'm anshika. still figuring it out, but building anyway."

export function KeyboardIcon({ position, rotation, delay }: KeyboardIconProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const typingRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isHovered) {
      setDisplayText("")
      let index = 0

      typingRef.current = setInterval(() => {
        if (index < typingText.length) {
          setDisplayText(typingText.slice(0, index + 1))
          index++
        } else {
          if (typingRef.current) clearInterval(typingRef.current)
        }
      }, 50)

      cursorRef.current = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 530)
    } else {
      setDisplayText("")
      setShowCursor(true)
      if (typingRef.current) clearInterval(typingRef.current)
      if (cursorRef.current) clearInterval(cursorRef.current)
    }

    return () => {
      if (typingRef.current) clearInterval(typingRef.current)
      if (cursorRef.current) clearInterval(cursorRef.current)
    }
  }, [isHovered])

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
        {/* Typing text box */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 px-3 py-2 rounded-lg border border-espresso/30 bg-desktop/95 backdrop-blur-sm shadow-lg"
              style={{ borderRadius: "8px" }}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-mono text-xs text-espresso leading-relaxed">
                {displayText}
                <span
                  className="inline-block w-[1px] h-3 bg-espresso ml-0.5 align-middle"
                  style={{ opacity: showCursor ? 1 : 0 }}
                />
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard SVG — white/light grey, visible key squares, aluminium border */}
        <div className="drop-shadow-lg">
          <svg viewBox="0 0 160 62" className="w-[130px] h-[50px]">
            <defs>
              <linearGradient id="kbFrame" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e8e8ea" />
                <stop offset="100%" stopColor="#d8d8da" />
              </linearGradient>
              <linearGradient id="kbBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5f5f7" />
                <stop offset="100%" stopColor="#eaeaec" />
              </linearGradient>
              <linearGradient id="kbKey" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f2" />
              </linearGradient>
              <filter id="kbShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.12"/>
              </filter>
            </defs>

            {/* Aluminium/silver frame */}
            <rect x="1" y="1" width="158" height="60" rx="6" fill="url(#kbFrame)" stroke="#c8c8ca" strokeWidth="0.8" filter="url(#kbShadow)" />

            {/* White body inset */}
            <rect x="3" y="3" width="154" height="56" rx="5" fill="url(#kbBody)" />

            {/* Top edge highlight */}
            <rect x="3" y="3" width="154" height="3" rx="2" fill="rgba(255,255,255,0.7)" />

            {/* === Key rows === */}

            {/* Row 1 — function row (smaller keys) */}
            {Array.from({ length: 15 }, (_, i) => (
              <rect key={`f${i}`} x={6 + i * 10} y={7} width={8} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            ))}

            {/* Row 2 — number row */}
            {Array.from({ length: 14 }, (_, i) => (
              <rect key={`n${i}`} x={6 + i * 10.8} y={15} width={9.5} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            ))}
            {/* Backspace */}
            <rect x={158} y={15} width={0} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />

            {/* Row 3 — QWERTY */}
            {/* Tab key */}
            <rect x={6} y={25} width={14} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            {Array.from({ length: 13 }, (_, i) => (
              <rect key={`q${i}`} x={22 + i * 10.5} y={25} width={9} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            ))}

            {/* Row 4 — ASDF, with Caps Lock */}
            <rect x={6} y={35} width={17} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            {Array.from({ length: 11 }, (_, i) => (
              <rect key={`a${i}`} x={25 + i * 10.5} y={35} width={9} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            ))}
            {/* Enter key */}
            <rect x={140} y={25} width={16} height={17} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />

            {/* Row 5 — ZXCV, with Shift keys */}
            <rect x={6} y={45} width={22} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            {Array.from({ length: 10 }, (_, i) => (
              <rect key={`z${i}`} x={30 + i * 10.5} y={45} width={9} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            ))}
            {/* Right shift */}
            <rect x={135} y={45} width={21} height={7} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />

            {/* Bottom row — space bar etc */}
            <rect x={6} y={54} width={9} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            <rect x={17} y={54} width={9} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            <rect x={28} y={54} width={9} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            {/* Space bar */}
            <rect x={39} y={54} width={68} height={5} rx={1.5} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            <rect x={109} y={54} width={9} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            <rect x={120} y={54} width={9} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            <rect x={131} y={54} width={9} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            <rect x={142} y={54} width={7} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
            <rect x={151} y={54} width={6} height={5} rx={1.2} fill="url(#kbKey)" stroke="#d4d4d6" strokeWidth="0.5" />
          </svg>
        </div>

        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          keyboard.exe
        </span>
      </motion.div>
    </motion.div>
  )
}
