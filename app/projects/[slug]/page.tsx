"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import { Mic, Plus, Smile, User } from "lucide-react"

type Message = {
  id: string
  sender: "user" | "project"
  text: string
}

type SuggestedReply = {
  id: string
  icon: string
  label: string
}

const projectsData: Record<string, {
  name: string
  color: string
  initialQuestion: string
  initialAnswer: string
  techStack: string
  linkUrl: string
}> = {
  "research-crew-ai": {
    name: "Research Crew AI",
    color: "#C084FC",
    initialQuestion: "what's Research Crew AI?",
    initialAnswer: "ok so you know how researching a competitor takes like half a day of googling? i built 3 AI agents that do it in minutes. one searches the web live, one pulls out competitive patterns, one writes the full report. you just type a company name and watch it happen in real time.",
    techStack: "Python, FastAPI, CrewAI, Llama 3.3 70B, Groq, Tavily, React, WebSockets",
    linkUrl: "github.com/yourname/research-crew-ai",
  },
  "fayr-ai": {
    name: "Fayr AI",
    color: "#F97316",
    initialQuestion: "what's Fayr AI?",
    initialAnswer: "ever signed a contract and had no idea if you were getting a good deal? fayr is an AI negotiator that handles it for you — price negotiation, contract duration, the whole thing. it also scans the actual contract doc with OCR and flags anything sketchy before you sign.",
    techStack: "AI negotiation logic, OCR, contract analysis, NLP",
    linkUrl: "github.com/yourname/fayr-ai",
  },
  "devmatch": {
    name: "DevMatch",
    color: "#22C55E",
    initialQuestion: "what's DevMatch?",
    initialAnswer: "finding a good hackathon teammate is genuinely painful. devmatch fixes that — you sign in with GitHub, it reads your actual repos and builds your skill profile automatically, then matches you with developers who have complementary skills. not the same skills, complementary ones. that's the whole insight.",
    techStack: "Next.js 16, TypeScript, MongoDB Atlas, NextAuth, GitHub OAuth, GitHub REST API, custom compatibility algorithm",
    linkUrl: "github.com/yourname/devmatch",
  },
}

const initialSuggestedReplies: SuggestedReply[] = [
  { id: "tech", icon: "🛠", label: "tech stack" },
  { id: "view", icon: "🔗", label: "view project" },
  { id: "case", icon: "📄", label: "case study" },
  { id: "collab", icon: "🤝", label: "let's collab" },
]

function TypingIndicator() {
  return (
    <div className="flex justify-end">
      <div className="bg-[#007AFF] text-white rounded-2xl rounded-br-md px-4 py-3">
        <div className="flex gap-1">
          <motion.span
            className="w-2 h-2 bg-white/60 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-2 h-2 bg-white/60 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-2 h-2 bg-white/60 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </div>
  )
}

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const project = projectsData[slug]

  const [messages, setMessages] = useState<Message[]>(() => {
    if (!project) return []
    return [
      { id: "q1", sender: "user", text: project.initialQuestion },
      { id: "a1", sender: "project", text: project.initialAnswer },
    ]
  })
  const [availableReplies, setAvailableReplies] = useState<SuggestedReply[]>(initialSuggestedReplies)
  const [isTyping, setIsTyping] = useState(false)

  const handleSuggestedReply = (reply: SuggestedReply) => {
    if (isTyping) return

    let userMessage = ""
    let projectReply = ""

    switch (reply.id) {
      case "tech":
        userMessage = "tech stack?"
        projectReply = project.techStack
        break
      case "view":
        userMessage = "can i see the project?"
        projectReply = `check it out → ${project.linkUrl}`
        break
      case "case":
        userMessage = "got a case study?"
        projectReply = "still cooking this one 👀 check back soon"
        break
      case "collab":
        userMessage = "want to collab?"
        projectReply = "DM me — hello@yourname.com 👋"
        break
    }

    // Remove the clicked chip immediately
    setAvailableReplies(prev => prev.filter(r => r.id !== reply.id))

    // Add user message (grey bubble - visitor asking)
    const userMsgId = `user-${Date.now()}`
    setMessages(prev => [
      ...prev,
      { id: userMsgId, sender: "user", text: userMessage },
    ])

    // Show typing indicator
    setIsTyping(true)

    // After delay, show reply (blue bubble - you answering)
    setTimeout(() => {
      setIsTyping(false)
      const replyMsgId = `reply-${Date.now()}`
      setMessages(prev => [
        ...prev,
        { id: replyMsgId, sender: "project", text: projectReply },
      ])
    }, 600)
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-espresso">Project not found</p>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Minimal back link */}
      <div className="p-4">
        <button
          onClick={() => router.push("/projects")}
          className="font-mono text-xs text-espresso/60 hover:text-espresso transition-colors"
        >
          ← projects/
        </button>
      </div>

      {/* Full-screen iMessage Window */}
      <div className="flex-1 flex items-center justify-center px-4 pb-4">
        <motion.div
          className="w-full max-w-4xl h-[85vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Window Chrome */}
          <div className="bg-zinc-100 border-b border-zinc-200 px-4 py-3 flex items-center">
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/projects")}
                className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 transition-all"
              />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            {/* Title */}
            <div className="flex-1 text-center">
              <span className="font-mono text-sm text-zinc-600">{project.name}</span>
            </div>
            <div className="w-14" />
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar with Avatar */}
            <div className="w-20 bg-zinc-50 border-r border-zinc-200 p-3 flex flex-col items-center">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: project.color }}
              >
                <User className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === "project" ? "justify-end" : "justify-start"}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      layout
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed ${
                          message.sender === "project"
                            ? "bg-[#007AFF] text-white rounded-br-md"
                            : "bg-zinc-200 text-zinc-900 rounded-bl-md"
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Typing indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Delivered indicator - only show after initial messages and when not typing */}
                {messages.length >= 2 && !isTyping && (
                  <motion.div 
                    className="flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-xs text-zinc-400 mr-1">Delivered</span>
                  </motion.div>
                )}
              </div>

              {/* Suggested Replies */}
              {availableReplies.length > 0 && (
                <div className="px-4 py-2 border-t border-zinc-100">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {availableReplies.map((reply) => (
                      <button
                        key={reply.id}
                        onClick={() => handleSuggestedReply(reply)}
                        disabled={isTyping}
                        className={`flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 rounded-full text-sm font-mono text-zinc-700 whitespace-nowrap transition-colors ${
                          isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-zinc-200'
                        }`}
                      >
                        <span>{reply.icon}</span>
                        <span>{reply.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input Bar */}
              <div className="px-4 py-3 border-t border-zinc-200 bg-zinc-50">
                <div className="flex items-center gap-3">
                  <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
                    <Plus className="w-6 h-6" />
                  </button>
                  <div className="flex-1 bg-white border border-zinc-300 rounded-full px-4 py-2 flex items-center">
                    <input
                      type="text"
                      placeholder="iMessage"
                      className="flex-1 bg-transparent text-sm text-zinc-600 placeholder:text-zinc-400 outline-none"
                      disabled
                    />
                    <button className="text-zinc-400 hover:text-zinc-600 transition-colors ml-2">
                      <Smile className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
                    <Mic className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
