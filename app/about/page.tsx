"use client"

import { FinderLayout } from "@/components/finder-layout"

export default function AboutPage() {
  return (
    <FinderLayout title="about" activeSection="about">
      <div className="p-8 md:p-12">
        <div className="max-w-2xl">
          {/* Avatar placeholder */}
          <div className="float-right ml-6 mb-4">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-[#6FA3C4]/20 border-2 border-espresso/10 flex items-center justify-center">
              <span className="font-mono text-xs text-espresso/40">avatar.png</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-espresso mb-6">
            Hello, I&apos;m Your Name
          </h1>

          <div className="space-y-4 text-espresso/80 leading-relaxed">
            <p>
              I&apos;m a designer and developer passionate about building products at the intersection of artificial intelligence, thoughtful design, and clean code. With a background spanning product development, engineering, and creative direction, I bring a unique perspective to every project I touch.
            </p>

            <p>
              Currently, I&apos;m focused on exploring how AI can augment human creativity and productivity. I believe the best tools are invisible — they get out of your way and let you do your best work. This philosophy guides everything I build.
            </p>

            <p>
              When I&apos;m not shipping products, you&apos;ll find me experimenting with new frameworks, reading about cognitive science, or obsessing over typography and interface details. I&apos;m always open to conversations about interesting problems worth solving.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-espresso/10">
            <p className="font-mono text-xs text-espresso/50">
              Based in San Francisco · Open to collaborations
            </p>
          </div>
        </div>
      </div>
    </FinderLayout>
  )
}
