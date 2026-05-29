"use client"

import { FinderLayout } from "@/components/finder-layout"

export default function ContactPage() {
  return (
    <FinderLayout title="contact" activeSection="contact">
      <div className="p-8 md:p-12 min-h-[60vh] flex flex-col justify-center">
        <div className="space-y-8">
          <h1 className="font-serif text-4xl md:text-5xl text-espresso">
            Get in touch
          </h1>

          <div className="space-y-6">
            <a 
              href="mailto:hello@yourname.com"
              className="block font-sans text-2xl md:text-4xl text-espresso hover:text-[#6FA3C4] transition-colors"
            >
              hello@yourname.com
            </a>

            <div className="flex gap-6">
              <a 
                href="https://twitter.com/yourname"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-espresso/60 hover:text-espresso transition-colors underline underline-offset-4"
              >
                Twitter
              </a>
              <a 
                href="https://linkedin.com/in/yourname"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-espresso/60 hover:text-espresso transition-colors underline underline-offset-4"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/yourname"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-espresso/60 hover:text-espresso transition-colors underline underline-offset-4"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-espresso/10">
            <p className="text-espresso/60 text-sm leading-relaxed max-w-md">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Drop me a line and let&apos;s create something amazing together.
            </p>
          </div>

          {/* Decorative image preview block */}
          <div className="mt-8 p-4 bg-[#6FA3C4]/10 border border-[#6FA3C4]/20 inline-block">
            <div className="w-48 h-32 bg-gradient-to-br from-[#6FA3C4]/30 to-[#6FA3C4]/10 flex items-center justify-center">
              <span className="font-mono text-xs text-espresso/40">preview.jpg</span>
            </div>
          </div>
        </div>
      </div>
    </FinderLayout>
  )
}
