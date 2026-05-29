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
        setShowCursor(prev => !prev)
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
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
      }}
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
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
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

        {/* Magic Keyboard SVG */}
        <div className="transition-all duration-200 drop-shadow-lg hover:drop-shadow-xl">
          <svg viewBox="0 0 140 50" className="w-28 h-auto">
            <defs>
              <linearGradient id="keyboardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5f5f7" />
                <stop offset="100%" stopColor="#e8e8ed" />
              </linearGradient>
              <linearGradient id="keyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f2" />
              </linearGradient>
              <filter id="keyboardShadow" x="-10%" y="-10%" width="120%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
              </filter>
            </defs>
            
            {/* Keyboard body with perspective */}
            <g transform="skewX(-2)">
              {/* Main body */}
              <rect x="5" y="8" width="130" height="38" rx="4" fill="url(#keyboardGrad)" filter="url(#keyboardShadow)" />
              
              {/* Top edge highlight */}
              <rect x="5" y="8" width="130" height="2" rx="1" fill="rgba(255,255,255,0.8)" />
              
              {/* Key rows */}
              {/* Row 1 */}
              {[...Array(13)].map((_, i) => (
                <rect key={`r1-${i}`} x={10 + i * 9.5} y="12" width="8" height="6" rx="1" fill="url(#keyGrad)" stroke="#d1d1d6" strokeWidth="0.5" />
              ))}
              
              {/* Row 2 */}
              {[...Array(12)].map((_, i) => (
                <rect key={`r2-${i}`} x={12 + i * 9.5} y="20" width="8" height="6" rx="1" fill="url(#keyGrad)" stroke="#d1d1d6" strokeWidth="0.5" />
              ))}
              
              {/* Row 3 */}
              {[...Array(11)].map((_, i) => (
                <rect key={`r3-${i}`} x={15 + i * 9.5} y="28" width="8" height="6" rx="1" fill="url(#keyGrad)" stroke="#d1d1d6" strokeWidth="0.5" />
              ))}
              
              {/* Space bar row */}
              <rect x="12" y="36" width="14" height="6" rx="1" fill="url(#keyGrad)" stroke="#d1d1d6" strokeWidth="0.5" />
              <rect x="28" y="36" width="14" height="6" rx="1" fill="url(#keyGrad)" stroke="#d1d1d6" strokeWidth="0.5" />
              <rect x="44" y="36" width="50" height="6" rx="1" fill="url(#keyGrad)" stroke="#d1d1d6" strokeWidth="0.5" />
              <rect x="96" y="36" width="14" height="6" rx="1" fill="url(#keyGrad)" stroke="#d1d1d6" strokeWidth="0.5" />
              <rect x="112" y="36" width="14" height="6" rx="1" fill="url(#keyGrad)" stroke="#d1d1d6" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
        
        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          keyboard.exe
        </span>
      </motion.div>
    </motion.div>
  )
}
