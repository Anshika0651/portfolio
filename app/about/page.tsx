"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef, useCallback } from "react"
import { FinderLayout } from "@/components/finder-layout"

// macOS cursor SVG
function MacOSCursor({ x, y, visible }: { x: number; y: number; visible: boolean }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.3))" }}
      >
        <path
          d="M5.5 3L5.5 20L9.5 16L13 22L15 21L11.5 15L17 15L5.5 3Z"
          fill="#1a1a1a"
          stroke="white"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  )
}

// Selection highlight with handles
function SelectionHighlight({ 
  color, 
  isSelecting,
  isComplete,
}: { 
  color: string
  isSelecting: boolean
  isComplete: boolean
}) {
  return (
    <motion.span
      className="absolute inset-0 -mx-1 -my-0.5 px-1 py-0.5 rounded-sm"
      style={{ backgroundColor: color }}
      initial={{ scaleX: 0, transformOrigin: "left" }}
      animate={{ 
        scaleX: isSelecting || isComplete ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Top-left handle */}
      <motion.span
        className="absolute -top-1 -left-1 w-2 h-2 rounded-full"
        style={{ backgroundColor: color.replace("0.35", "0.8") }}
        initial={{ scale: 0 }}
        animate={{ scale: isComplete ? 1 : 0 }}
        transition={{ duration: 0.15, delay: 0.1 }}
      />
      {/* Bottom-right handle */}
      <motion.span
        className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full"
        style={{ backgroundColor: color.replace("0.35", "0.8") }}
        initial={{ scale: 0 }}
        animate={{ scale: isComplete ? 1 : 0 }}
        transition={{ duration: 0.15, delay: 0.1 }}
      />
    </motion.span>
  )
}

const fullText = `i'm anshika, a computer science student. i like AI, i like products, and i like when the two actually talk to each other.

i've spent my degree trying different things — writing code, building products, designing interfaces, pitching to freelance clients — not because i was lost, but because i wanted to understand how it all connects.

currently: building. always: curious.`

const highlightConfig = [
  { word: "anshika", color: "rgba(192, 132, 252, 0.35)" },
  { word: "AI", color: "rgba(249, 115, 22, 0.35)" },
  { word: "products", color: "rgba(111, 163, 196, 0.35)" },
  { word: "writing code", color: "rgba(34, 197, 94, 0.35)" },
  { word: "building products", color: "rgba(251, 191, 36, 0.35)" },
  { word: "designing interfaces", color: "rgba(244, 114, 182, 0.35)" },
  { word: "pitching to freelance clients", color: "rgba(192, 132, 252, 0.35)" },
]

export default function AboutPage() {
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(-1)
  const [selectingIndex, setSelectingIndex] = useState(-1)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [completedHighlights, setCompletedHighlights] = useState<number[]>([])
  
  const wordRefs = useRef<Map<string, HTMLSpanElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  // Register word ref
  const setWordRef = useCallback((word: string, el: HTMLSpanElement | null) => {
    if (el) {
      wordRefs.current.set(word, el)
    }
  }, [])

  // Phase 1: Typing effect
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setTypingComplete(true)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [])

  // Phase 2: Cursor selection effect
  useEffect(() => {
    if (!typingComplete) return

    // Wait 400ms after typing finishes
    const startDelay = setTimeout(() => {
      setCursorVisible(true)
      
      // Process each highlight sequentially
      highlightConfig.forEach((config, index) => {
        // Calculate timing for this highlight
        // Each highlight: 300ms cursor move + 200ms selection + 400ms wait = 900ms total
        const baseDelay = index * 900

        // Move cursor to word
        setTimeout(() => {
          const el = wordRefs.current.get(config.word)
          if (el && containerRef.current) {
            const rect = el.getBoundingClientRect()
            setCursorPos({ x: rect.left - 5, y: rect.top - 5 })
          }
        }, baseDelay)

        // Start selection (after cursor arrives)
        setTimeout(() => {
          setSelectingIndex(index)
        }, baseDelay + 300)

        // Complete selection
        setTimeout(() => {
          setSelectingIndex(-1)
          setCompletedHighlights(prev => [...prev, index])
          setCurrentHighlightIndex(index)
        }, baseDelay + 500)
      })

      // Hide cursor after all highlights complete
      const totalTime = highlightConfig.length * 900 + 200
      setTimeout(() => {
        setCursorVisible(false)
      }, totalTime)

    }, 400)

    return () => clearTimeout(startDelay)
  }, [typingComplete])

  // Render text with highlight spans
  const renderText = () => {
    if (!displayedText) return null

    // Build segments: plain text and highlighted words
    interface Segment {
      type: "text" | "highlight"
      content: string
      index?: number
      color?: string
    }
    
    const segments: Segment[] = []
    let remaining = displayedText
    let lastIndex = 0

    // Find all highlight positions
    const positions: { start: number; end: number; word: string; index: number; color: string }[] = []
    
    highlightConfig.forEach((config, idx) => {
      let searchText = displayedText.toLowerCase()
      let wordLower = config.word.toLowerCase()
      let pos = searchText.indexOf(wordLower)
      
      if (pos !== -1) {
        positions.push({
          start: pos,
          end: pos + config.word.length,
          word: config.word,
          index: idx,
          color: config.color,
        })
      }
    })

    // Sort by position
    positions.sort((a, b) => a.start - b.start)

    // Build segments
    let currentPos = 0
    for (const pos of positions) {
      if (pos.start > currentPos) {
        segments.push({ type: "text", content: displayedText.slice(currentPos, pos.start) })
      }
      segments.push({ 
        type: "highlight", 
        content: displayedText.slice(pos.start, pos.end),
        index: pos.index,
        color: pos.color,
      })
      currentPos = pos.end
    }
    if (currentPos < displayedText.length) {
      segments.push({ type: "text", content: displayedText.slice(currentPos) })
    }

    return segments.map((segment, i) => {
      if (segment.type === "text") {
        // Preserve line breaks
        const parts = segment.content.split('\n')
        return parts.map((part, j) => (
          <span key={`${i}-${j}`}>
            {part}
            {j < parts.length - 1 && <br />}
          </span>
        ))
      } else {
        const isSelecting = selectingIndex === segment.index
        const isComplete = completedHighlights.includes(segment.index!)
        
        return (
          <span
            key={i}
            ref={(el) => setWordRef(segment.content, el)}
            className="relative inline"
          >
            <SelectionHighlight 
              color={segment.color!} 
              isSelecting={isSelecting}
              isComplete={isComplete}
            />
            <span className="relative">{segment.content}</span>
          </span>
        )
      }
    })
  }

  return (
    <FinderLayout title="about.exe" activeSection="about">
      <div 
        ref={containerRef}
        className="p-10 h-full"
      >
        <div 
          className="text-[15px] leading-[1.8] text-[#2C1810] max-w-2xl"
          style={{ fontVariant: "small-caps" }}
        >
          {renderText()}
          {!typingComplete && (
            <motion.span
              className="inline-block w-[2px] h-[18px] bg-[#2C1810] ml-[1px] align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </div>
      </div>
      
      {/* macOS Cursor */}
      <MacOSCursor x={cursorPos.x} y={cursorPos.y} visible={cursorVisible} />
    </FinderLayout>
  )
}
