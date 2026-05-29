"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface FinderWindowProps {
  title: string
  children: React.ReactNode
}

export function FinderWindow({ title, children }: FinderWindowProps) {
  const router = useRouter()

  return (
    <motion.div
      className="min-h-screen bg-desktop p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-card rounded-lg shadow-2xl overflow-hidden border border-border"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Window Title Bar */}
        <div className="bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] border-b border-[#c0c0c0] px-4 py-3 flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/")}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4444] transition-colors group relative"
              aria-label="Close window"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] text-[#4d0000] opacity-0 group-hover:opacity-100">×</span>
            </button>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          
          {/* Back button and title */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-espresso/70 hover:text-espresso transition-colors ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex-1 text-center">
            <span className="font-mono text-sm text-espresso/80">{title}</span>
          </div>
          
          {/* Spacer for symmetry */}
          <div className="w-20" />
        </div>

        {/* Window Content */}
        <div className="p-6 md:p-10 bg-card min-h-[70vh]">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
