"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

interface TerminalWindowProps {
  position: { x: number; y: number }
  rotation: number
  delay: number
}

const terminalLines = [
  "> open to internships & full time roles",
  "> actively looking 👀",
  "> remote / hybrid / anywhere interesting"
]

export function TerminalWindow({ position, rotation, delay }: TerminalWindowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [displayLines, setDisplayLines] = useState<string[]>(["", "", ""])
  const [showCursor, setShowCursor] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const typingRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isHovered) {
      setDisplayLines(["", "", ""])
      setCurrentLine(0)
      setShowCursor(true)
      let charIndex = 0

      const typeCharacter = () => {
        if (currentLine < terminalLines.length) {
          const currentText = terminalLines[currentLine]

          if (charIndex < currentText.length) {
            setDisplayLines((prev) => {
              const updated = [...prev]
              updated[currentLine] = currentText.slice(0, charIndex + 1)
              return updated
            })
            charIndex++
            typingRef.current = setTimeout(typeCharacter, 40)
          } else {
            // Move to next line after line completes
            charIndex = 0
            setCurrentLine((prev) => prev + 1)
            typingRef.current = setTimeout(typeCharacter, 200)
          }
        } else {
          // All lines typed, show cursor on last line
          setShowCursor(true)
        }
      }

      typingRef.current = setTimeout(typeCharacter, 40)

      cursorRef.current = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 530)
    } else {
      setDisplayLines(["", "", ""])
      setCurrentLine(0)
      setShowCursor(false)
      if (typingRef.current) clearTimeout(typingRef.current)
      if (cursorRef.current) clearInterval(cursorRef.current)
    }

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current)
      if (cursorRef.current) clearInterval(cursorRef.current)
    }
  }, [isHovered, currentLine])

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
        whileHover={{ scale: 1.05 }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        onHoverStart={() => !isDragging && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* macOS Terminal window */}
        <motion.div
          className="drop-shadow-lg"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-[180px] h-[100px] bg-[#1E1E1E] rounded-lg overflow-hidden border border-black/30 flex flex-col">
            {/* Top bar with traffic lights */}
            <div className="h-7 bg-[#323232] border-b border-black/40 flex items-center px-3 gap-2">
              {/* Red light */}
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm" />
              {/* Yellow light */}
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm" />
              {/* Green light */}
              <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm" />
            </div>

            {/* Terminal content area */}
            <div className="flex-1 overflow-hidden p-2.5 font-mono text-[9px] text-[#00FF41] leading-tight flex flex-col justify-start">
              {displayLines.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap break-words">
                  {line}
                  {idx === currentLine && showCursor && (
                    <span className="inline-block w-[1.5px] h-3.5 bg-[#00FF41] ml-0.5 align-text-top animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          terminal.txt
        </span>
      </motion.div>
    </motion.div>
  )
}
