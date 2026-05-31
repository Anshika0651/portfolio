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
        {/* Typing text box — positioned above keyboard with 8px gap */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg border border-espresso/40 bg-amber-50/90 backdrop-blur-sm shadow-lg"
              style={{ bottom: "100%", marginBottom: "8px" }}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <p className="font-mono text-xs text-espresso/90 leading-relaxed whitespace-nowrap">
                {displayText}
                <span
                  className="inline-block w-[1px] h-3 bg-espresso/90 ml-0.5 align-middle"
                  style={{ opacity: showCursor ? 1 : 0 }}
                />
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard PNG image */}
        <div className="drop-shadow-lg">
          <img
            src="/453440adb9e7c6fe80ec034bbc79dd6a-removebg-preview.png"
            alt="keyboard"
            className="w-[170px] h-auto object-contain"
            draggable={false}
          />
        </div>

        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          keyboard.exe
        </span>
      </motion.div>
    </motion.div>
  )
}
