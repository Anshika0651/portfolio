"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

interface DesktopIconProps {
  icon: "folder" | "document" | "pdf" | "image"
  label: string
  href: string
  position: { x: number; y: number }
  rotation: number
  delay: number
  onNavigate: (href: string) => void
}

export function DesktopIcon({ 
  icon, 
  label, 
  href, 
  position, 
  rotation, 
  delay,
  onNavigate 
}: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const constraintsRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (!isDragging) {
      onNavigate(href)
    }
  }

  const iconVariants = {
    idle: {
      y: [0, -3, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    },
    hover: {
      scale: 1.08,
      transition: { duration: 0.2 },
    },
  }

  const renderIcon = () => {
    switch (icon) {
      case "folder":
        return (
          <svg viewBox="0 0 80 64" className="w-16 h-14 drop-shadow-lg">
            <defs>
              <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8FBDD3" />
                <stop offset="100%" stopColor="#6FA3C4" />
              </linearGradient>
              <linearGradient id="folderTabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7AB5CF" />
                <stop offset="100%" stopColor="#5E95B5" />
              </linearGradient>
            </defs>
            <path d="M4 16 L4 58 Q4 62 8 62 L72 62 Q76 62 76 58 L76 16 Z" fill="url(#folderGrad)" />
            <path d="M4 12 L28 12 L34 18 L76 18 Q76 12 72 12 L36 12 L30 6 Q28 4 24 4 L8 4 Q4 4 4 8 Z" fill="url(#folderTabGrad)" />
            <rect x="4" y="16" width="72" height="4" fill="rgba(255,255,255,0.2)" />
          </svg>
        )
      case "document":
        return (
          <svg viewBox="0 0 64 80" className="w-14 h-16 drop-shadow-lg">
            <defs>
              <linearGradient id="docGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f0" />
              </linearGradient>
            </defs>
            <path d="M8 4 L40 4 L56 20 L56 76 Q56 78 54 78 L10 78 Q8 78 8 76 Z" fill="url(#docGrad)" stroke="#d0d0d0" strokeWidth="1" />
            <path d="M40 4 L40 20 L56 20 Z" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="1" />
            <line x1="16" y1="32" x2="48" y2="32" stroke="#c0c0c0" strokeWidth="2" />
            <line x1="16" y1="42" x2="48" y2="42" stroke="#c0c0c0" strokeWidth="2" />
            <line x1="16" y1="52" x2="40" y2="52" stroke="#c0c0c0" strokeWidth="2" />
            <line x1="16" y1="62" x2="44" y2="62" stroke="#c0c0c0" strokeWidth="2" />
          </svg>
        )
      case "pdf":
        return (
          <svg viewBox="0 0 64 80" className="w-14 h-16 drop-shadow-lg">
            <defs>
              <linearGradient id="pdfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f5f5f5" />
              </linearGradient>
            </defs>
            <path d="M8 4 L40 4 L56 20 L56 76 Q56 78 54 78 L10 78 Q8 78 8 76 Z" fill="url(#pdfGrad)" stroke="#d0d0d0" strokeWidth="1" />
            <path d="M40 4 L40 20 L56 20 Z" fill="#e8e8e8" stroke="#d0d0d0" strokeWidth="1" />
            <rect x="14" y="50" width="36" height="18" rx="2" fill="#E74C3C" />
            <text x="32" y="63" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">PDF</text>
          </svg>
        )
      case "image":
        return (
          <svg viewBox="0 0 64 80" className="w-14 h-16 drop-shadow-lg">
            <defs>
              <linearGradient id="imgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f0f0f0" />
              </linearGradient>
            </defs>
            <rect x="8" y="4" width="48" height="72" rx="4" fill="url(#imgGrad)" stroke="#d0d0d0" strokeWidth="1" />
            <rect x="14" y="10" width="36" height="50" fill="#6FA3C4" />
            <circle cx="24" cy="24" r="6" fill="#FFD93D" />
            <path d="M14 50 L26 35 L38 48 L46 38 L50 50 Z" fill="#4A8CAF" />
            <path d="M14 50 L26 38 L38 50 Z" fill="#5E9FC0" />
          </svg>
        )
    }
  }

  return (
    <motion.div
      className="absolute cursor-pointer select-none"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        x: dragPosition.x,
        y: dragPosition.y,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <motion.div
        className="flex flex-col items-center gap-1"
        style={{ rotate: rotation }}
        variants={iconVariants}
        animate="idle"
        whileHover="hover"
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setTimeout(() => setIsDragging(false), 100)
        }}
        onClick={handleClick}
      >
        <div className="transition-all duration-200 hover:drop-shadow-xl">
          {renderIcon()}
        </div>
        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </motion.div>
  )
}
