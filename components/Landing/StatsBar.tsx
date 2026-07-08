"use client"

import { useRef } from "react"
import { STATS } from "./content"
import { useGsapCounter, useGsapReveal } from "./hooks/useGsap"
import { GoldDivider } from "./ui"
import { cormorant, tk } from "./theme"
import type { StatItem } from "./types"

export default function StatsBar() {
  const ref = useGsapReveal<HTMLElement>({ y: 24, duration: 0.9 })

  return (
    <section ref={ref} aria-label="Company statistics" className="relative z-10 -mt-6 px-6 pb-4 lg:-mt-10 lg:px-10">
      <div
        className="mx-auto max-w-6xl rounded-lg border px-6 py-7 sm:px-10 sm:py-9"
        style={{
          borderColor: tk.borderStrong,
          background: "linear-gradient(90deg, #000808 0%, #000707 50%, #010C0D 100%)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
        }}
      >
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="relative flex flex-col items-center text-center md:px-6">
              {i > 0 && (
                <div
                  aria-hidden
                  className="absolute -left-px top-1/2 hidden h-12 w-px -translate-y-1/2 md:block"
                  style={{ backgroundColor: tk.borderStrong }}
                />
              )}
              <StatCell stat={stat} />
            </div>
          ))}
        </div>
      </div>
      <GoldDivider className="mx-auto mt-0 max-w-6xl opacity-0" />
    </section>
  )
}

function StatCell({ stat }: { stat: StatItem }) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const Icon = stat.icon

  useGsapCounter(valueRef, stat.value, {
    suffix: stat.suffix ?? "",
    prefix: stat.prefix ?? "",
    decimals: stat.decimals ?? 0,
    duration: 2.2,
  })

  return (
    <>
      <Icon className="mb-3 size-5" style={{ color: tk.accent }} strokeWidth={1.5} aria-hidden />
      <span
        ref={valueRef}
        className={`${cormorant.className} text-3xl leading-none sm:text-4xl`}
        style={{ color: tk.on }}
      >
        0{stat.suffix ?? ""}
      </span>
      <span
        className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em]"
        style={{ color: tk.onVar }}
      >
        {stat.label}
      </span>
    </>
  )
}
