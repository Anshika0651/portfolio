"use client"

import { motion } from "framer-motion"
import { useRouter, usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight, LayoutGrid, List } from "lucide-react"

const navItems = [
  { id: "desktop", label: "desktop", icon: "🖥", href: "/" },
  { id: "about", label: "about", icon: "👤", href: "/about" },
  { id: "work", label: "work", icon: "💼", href: "/work" },
  { id: "projects", label: "projects", icon: "🗂", href: "/projects" },
  { id: "experience", label: "experience", icon: "📋", href: "/experience" },
  { id: "contact", label: "contact", icon: "📬", href: "/contact" },
]

interface FinderLayoutProps {
  children: React.ReactNode
  title: string
  activeSection: string
}

export function FinderLayout({ children, title, activeSection }: FinderLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()

  const currentIndex = navItems.findIndex(item => item.id === activeSection)
  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < navItems.length - 1

  const handleBack = () => {
    if (canGoBack) {
      router.push(navItems[currentIndex - 1].href)
    }
  }

  const handleForward = () => {
    if (canGoForward) {
      router.push(navItems[currentIndex + 1].href)
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-desktop flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-[95vw] h-[92vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Top Bar */}
        <div className="bg-gradient-to-b from-[#f6f6f6] to-[#e8e8e8] border-b border-[#c0c0c0] px-4 py-2.5 flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/")}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all"
              aria-label="Close"
            />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-1 ml-4">
            <button
              onClick={handleBack}
              disabled={!canGoBack}
              className={`p-1 rounded transition-colors ${canGoBack ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-300'}`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleForward}
              disabled={!canGoForward}
              className={`p-1 rounded transition-colors ${canGoForward ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-300'}`}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 ml-4 font-mono text-xs text-zinc-500">
            <span className="hover:text-zinc-700 cursor-pointer" onClick={() => router.push("/")}>desktop</span>
            <span className="text-zinc-400">&gt;</span>
            <span className="text-zinc-700">{title}</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* View toggles (visual only) */}
          <div className="flex items-center gap-1 mr-2">
            <button className="p-1.5 rounded bg-zinc-200 text-zinc-600">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-48 bg-[#F0EFED] border-r border-zinc-200 py-4 flex-shrink-0">
            <div className="px-4 mb-3">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Navigate</span>
            </div>
            <nav className="space-y-0.5 px-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all ${
                    activeSection === item.id
                      ? 'bg-[#6FA3C4] text-white'
                      : 'text-zinc-600 hover:bg-zinc-200/50'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-mono text-xs">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 bg-[#EDE8DF] overflow-auto">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
