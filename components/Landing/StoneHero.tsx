"use client"

import { useRef } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { BRAND, IMAGES, TRUST_BADGES } from "./content"
import { useGsapHeroTimeline, useGsapParallax } from "./hooks/useGsap"
import { BackgroundLayers, LuxuryButton, SplitTitle, TrustBadge } from "./ui"
import { cormorant, tk } from "./theme"

interface StoneHeroProps {
  onExplore?: () => void
}

export default function StoneHero({ onExplore }: StoneHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useGsapParallax<HTMLDivElement>(24)

  useGsapHeroTimeline(sectionRef, {
    eyebrow: "[data-hero-eyebrow]",
    title: "[data-hero-title]",
    description: "[data-hero-description]",
    actions: "[data-hero-actions]",
    badges: "[data-hero-badges]",
    media: "[data-hero-media]",
  })

  const { hero } = BRAND

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pt-20"
      style={{ color: tk.on, backgroundColor: "#000000" }}
    >
      <BackgroundLayers variant="hero" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-6 lg:px-10 lg:py-16 xl:gap-10">
        {/* Copy — left column */}
        <div className="flex flex-col justify-center lg:py-8">
          <p
            data-hero-eyebrow
            className="mb-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em]"
            style={{ color: tk.accent }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0">
              <path d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8L7 0Z" fill={tk.accent} />
            </svg>
            {hero.eyebrow}
          </p>

          <h1
            data-hero-title
            className={`${cormorant.className} mb-5 text-[2.5rem] leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]`}
          >
            <SplitTitle text={hero.title} accent={hero.titleAccent} />
          </h1>

          <p
            data-hero-description
            className="mb-8 max-w-[420px] text-sm font-light leading-[1.75] sm:text-[15px]"
            style={{ color: tk.onVar }}
          >
            {hero.description}
          </p>

          <div data-hero-actions className="mb-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <LuxuryButton
              variant="primary"
              href={hero.primaryCta.href}
              icon={hero.primaryCta.icon}
              onClick={onExplore}
            >
              {hero.primaryCta.label}
            </LuxuryButton>
            <LuxuryButton
              variant="outline"
              href={hero.secondaryCta.href}
              icon={hero.secondaryCta.icon}
              iconPosition="left"
            >
              {hero.secondaryCta.label}
            </LuxuryButton>
          </div>

          <div
            data-hero-badges
            className="grid grid-cols-2 gap-x-4 gap-y-6 border-t pt-7 sm:grid-cols-4 sm:gap-x-2"
            style={{ borderColor: tk.border }}
          >
            {TRUST_BADGES.map((badge) => (
              <TrustBadge key={badge.label} icon={badge.icon} label={badge.label} stacked />
            ))}
          </div>
        </div>

        {/* Visual — right column, blends with pure-black PNG */}
        <div className="relative flex min-h-[420px] items-center justify-center sm:min-h-[520px] lg:min-h-[calc(100svh-8rem)]">
          {/* soft green glow behind necklace */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 65% 55% at 55% 42%, ${tk.greenGlow} 0%, transparent 68%)`,
            }}
          />

          <div
            data-hero-media
            ref={mediaRef}
            className="relative aspect-[3/4] w-full max-w-[520px] lg:max-w-none"
          >
            <Image
              src={IMAGES.hero.primary}
              alt={IMAGES.hero.alt}
              fill
              priority
              className="object-contain object-top"
              sizes="(max-width: 1024px) 90vw, 50vw"
            />
          </div>

          {/* Play pill — floats beside the necklace */}
          <button
            type="button"
            className="absolute bottom-[18%] right-0 z-10 flex items-center gap-3 rounded-full border px-4 py-2.5 backdrop-blur-md transition-transform hover:scale-[1.03] sm:bottom-[22%] sm:px-5 sm:py-3 lg:-right-2 xl:right-4"
            style={{
              borderColor: tk.borderStrong,
              backgroundColor: "rgba(8, 12, 11, 0.82)",
              color: tk.on,
            }}
            aria-label={hero.videoLabel}
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-full sm:size-9"
              style={{ background: tk.accent, color: tk.surfaceDeep }}
            >
              <Play className="ml-0.5 size-3.5 fill-current sm:size-4" strokeWidth={0} />
            </span>
            <span className="max-w-[120px] text-left text-[10px] font-medium uppercase leading-snug tracking-[0.1em] sm:max-w-[140px] sm:text-[11px]">
              {hero.videoLabel}
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
