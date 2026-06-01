"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DesktopIcon } from "@/components/desktop-icon"
import { SocialsBag } from "@/components/socials-bag"
import { KeyboardIcon } from "@/components/keyboard-icon"
import { StackBasket } from "@/components/stack-basket"
import { TerminalWindow } from "@/components/terminal-window"

const desktopIcons = [
  { icon: "folder" as const, label: "about.exe", href: "/about", position: { x: 8, y: 8 }, rotation: -2 },
  { icon: "image" as const, label: "contact.jpeg", href: "/contact", position: { x: 48, y: 12 }, rotation: 4 },
  { icon: "document" as const, label: "stack.txt", href: "/stack", position: { x: 18, y: 40 }, rotation: 2 },
  { icon: "folder" as const, label: "projects/", href: "/projects", position: { x: 82, y: 68 }, rotation: -1 },
  { icon: "pdf" as const, label: "experience.pdf", href: "/experience", position: { x: 88, y: 78 }, rotation: -3 },
]

export default function DesktopPage() {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [clickedIcon, setClickedIcon] = useState<string | null>(null)

  const handleNavigate = (href: string) => {
    setClickedIcon(href)
    setIsNavigating(true)
    setTimeout(() => {
      router.push(href)
    }, 400)
  }

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Corner labels */}
      <motion.div
        className="absolute top-4 left-4 font-mono text-xs text-espresso/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        portfolio/
      </motion.div>
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-xs text-espresso/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Anshika Singh
      </motion.div>
      <motion.div
        className="absolute top-4 right-4 font-mono text-xs text-espresso/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        2025
      </motion.div>

      {/* Hero Typography - bottom left corner */}
      <motion.div
        className="absolute bottom-10 left-10 pointer-events-none z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isNavigating ? 0 : 1, y: isNavigating ? -20 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.p
          className="font-mono italic text-espresso/60 text-[16px] leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          sudo open portfolio.exe
        </motion.p>
        <motion.h1
          className="font-sans font-extrabold text-[72px] text-espresso leading-none tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          hello, world.
        </motion.h1>
        <motion.p
          className="font-mono italic text-espresso/60 text-[16px] leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          (poke around.)
        </motion.p>
      </motion.div>

      {/* Desktop Icons */}
      <AnimatePresence>
        {!isNavigating && desktopIcons.map((iconData, index) => (
          <motion.div
            key={iconData.href}
            exit={{
              opacity: clickedIcon === iconData.href ? 1 : 0,
              scale: clickedIcon === iconData.href ? 1.5 : 0.8,
              transition: { duration: 0.3 }
            }}
          >
            <DesktopIcon
              icon={iconData.icon}
              label={iconData.label}
              href={iconData.href}
              position={iconData.position}
              rotation={iconData.rotation}
              delay={index}
              onNavigate={handleNavigate}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Stack Basket */}
      <AnimatePresence>
        {!isNavigating && (
          <motion.div
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
          >
            <StackBasket
              position={{ x: 6, y: 38 }}
              rotation={-3}
              delay={7}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Socials Tote Bag */}
      <AnimatePresence>
        {!isNavigating && (
          <motion.div
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
          >
            <SocialsBag
              position={{ x: 48, y: 45 }}
              rotation={-2}
              delay={8}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard Icon */}
      <AnimatePresence>
        {!isNavigating && (
          <motion.div
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
          >
            <KeyboardIcon
              position={{ x: 65, y: 45 }}
              rotation={2}
              delay={9}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Icon */}
      <AnimatePresence>
        {!isNavigating && (
          <motion.div
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
          >
            <TerminalWindow
              position={{ x: 82, y: 45 }}
              rotation={0}
              delay={10}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
