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
        className="flex flex-col items-center gap-1 relative w-[160px]"
        style={{ rotate: rotation }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
        whileHover={{ scale: isHovered ? 1.6 : 1.08 }}
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
        onHoverStart={() => !isDragging && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        transition={{ duration: 0.3 }}
      >
        {/* Basket PNG image */}
        <div className="drop-shadow-lg relative">
          <img
            src="/942d3a7555d16287e07d911a17087e16-removebg-preview.png"
            alt="stack basket"
            className="w-[160px] h-auto object-contain"
            draggable={false}
          />

          {/* Tech stack icons inside basket on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <div className="grid grid-cols-3 gap-3">
                  {techIcons.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md flex-shrink-0"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        delay: 0.3 + index * 0.06,
                      }}
                      whileHover={{ scale: 1.15 }}
                    >
                      <img
                        src={tech.url}
                        alt={tech.name}
                        className="w-3.5 h-3.5 object-contain"
                        draggable={false}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="font-mono text-xs text-espresso/90 bg-desktop/80 px-2 py-0.5 rounded whitespace-nowrap">
          stack/
        </span>
      </motion.div>
    </motion.div>
  )
}
