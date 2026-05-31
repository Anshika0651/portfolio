"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface BinderClipNoteProps {
  position: { x: number; y: number }
  rotation: number
  delay: number
}

export function BinderClipNote({ position, rotation, delay }: BinderClipNoteProps) {
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
        {/* Binder clip note PNG with text overlay on hover */}
        <motion.div
          className="drop-shadow-lg relative"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative w-[160px] h-auto">
            <img
              src="/🌟🧊Realistic_Blue_Sticky_Note_&_Black_Binder_Clip_,_Free_PNG_File_for_Your_Creative_Project🧊🌟.jpg"
              alt="note"
              className="w-[160px] h-auto object-contain"
              draggable={false}
            />

            {/* Text overlay on paper area — positioned to avoid binder clip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 flex items-start justify-start pointer-events-none overflow-hidden"
                  style={{ paddingTop: "45px", paddingLeft: "14px", paddingRight: "14px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="text-left leading-[1.4]">
                    <p className="font-mono text-[8px] text-espresso whitespace-normal break-words">
                      open to internships &amp; full
                    </p>
                    <p className="font-mono text-[8px] text-espresso whitespace-normal break-words">
                      time roles
                    </p>
                    <p className="font-mono text-[8px] text-espresso/70 whitespace-normal break-words mt-0.5">
                      (actively looking 👀)
                    </p>
                    <p className="font-mono text-[8px] text-espresso whitespace-normal break-words mt-0.5">
                      remote / hybrid / anywhere
                    </p>
                    <p className="font-mono text-[8px] text-espresso whitespace-normal break-words">
                      interesting
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          note.txt
        </span>
      </motion.div>
    </motion.div>
  )
}
