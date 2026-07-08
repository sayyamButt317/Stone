"use client"

import Image from "next/image"
import { Calendar } from "lucide-react"
import { BRAND, IMAGES } from "./content"
import { useGsapReveal } from "./hooks/useGsap"
import { LuxuryButton } from "./ui"
import { cormorant, tk } from "./theme"

interface AppointmentBannerProps {
  onBook?: () => void
}

export default function AppointmentBanner({ onBook }: AppointmentBannerProps) {
  const ref = useGsapReveal<HTMLElement>({ y: 36, duration: 1 })
  const { appointment } = BRAND

  return (
    <section
      id="appointment"
      ref={ref}
      className="relative px-6 py-16 lg:px-10 lg:py-20"
    >
      <div
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 overflow-hidden rounded-2xl border px-8 py-12 sm:px-12 lg:flex-row lg:justify-between lg:py-14"
        style={{
          borderColor: tk.borderStrong,
          background: `linear-gradient(135deg, ${tk.green} 0%, ${tk.surface} 50%, ${tk.green} 100%)`,
        }}
      >
        <div className="relative z-10 max-w-md text-center lg:text-left">
          <h2
            className={`${cormorant.className} mb-3 text-3xl sm:text-4xl`}
            style={{ color: tk.on }}
          >
            {appointment.title}
          </h2>
          <p className="text-sm font-light leading-relaxed" style={{ color: tk.onVar }}>
            {appointment.description}
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <LuxuryButton
            variant="primary"
            size="lg"
            icon={Calendar}
            iconPosition="left"
            onClick={onBook}
            href="#contact"
          >
            {appointment.cta}
          </LuxuryButton>
        </div>

        {/* Lifestyle image — clipped on the right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 bottom-0 top-0 hidden w-[38%] lg:block"
        >
          <div className="relative h-full w-full">
            <Image
              src={IMAGES.appointment.primary}
              alt=""
              fill
              className="object-cover object-left"
              sizes="400px"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${tk.green} 0%, transparent 45%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
