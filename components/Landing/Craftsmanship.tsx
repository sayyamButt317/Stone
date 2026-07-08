"use client"

import { useRef } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { BRAND, CRAFT_FEATURES, IMAGES } from "./content"
import { useGsapReveal } from "./hooks/useGsap"
import { BackgroundLayers, LuxuryButton, SectionHeader } from "./ui"
import { tk } from "./theme"

export default function Craftsmanship() {
  const mediaRef = useGsapReveal<HTMLDivElement>({ y: 48, duration: 1.1 })
  const contentRef = useGsapReveal<HTMLDivElement>({ y: 40, duration: 1, delay: 0.15 })
  const { craftsmanship } = BRAND

  return (
    <section id="craftsmanship" className="relative overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
      <BackgroundLayers variant="section" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Video / image */}
        <div ref={mediaRef} className="relative">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border"
            style={{ borderColor: tk.borderStrong }}
          >
            <Image
              src={IMAGES.craftsmanship.primary}
              alt={IMAGES.craftsmanship.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "rgba(5,8,7,0.25)" }}
            />
            <button
              type="button"
              aria-label="Play craftsmanship video"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span
                className="flex size-16 items-center justify-center rounded-full border backdrop-blur-sm transition-transform hover:scale-105"
                style={{
                  borderColor: tk.borderStrong,
                  backgroundColor: "rgba(10,15,14,0.6)",
                }}
              >
                <span
                  className="flex size-12 items-center justify-center rounded-full"
                  style={{ background: tk.accent, color: tk.surfaceDeep }}
                >
                  <Play className="ml-0.5 size-5 fill-current" strokeWidth={0} />
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Copy + features */}
        <div ref={contentRef}>
          <SectionHeader
            eyebrow={craftsmanship.eyebrow}
            title={craftsmanship.title}
            titleAccent={craftsmanship.titleAccent}
            description={craftsmanship.description}
            align="left"
            className="mb-8"
          />

          <LuxuryButton variant="outline" href="#about" className="mb-10">
            {craftsmanship.cta}
          </LuxuryButton>

          <ul className="space-y-6">
            {CRAFT_FEATURES.map((feature) => {
              const Icon = feature.icon
              return (
                <li key={feature.title} className="flex gap-4">
                  <div
                    className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      borderColor: tk.borderStrong,
                      backgroundColor: "rgba(197,160,89,0.08)",
                    }}
                  >
                    <Icon className="size-5" style={{ color: tk.accent }} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: tk.on }}>
                      {feature.title}
                    </h4>
                    <p className="text-sm font-light leading-relaxed" style={{ color: tk.onVar }}>
                      {feature.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
