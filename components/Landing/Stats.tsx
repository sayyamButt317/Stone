"use client"

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import { useRef } from "react"
import { notoSerif, tk } from "./theme"
import { Counter, Reveal } from "./primitives"

const STATS = [
  { to: 12400, suffix: "+", label: "pieces designed" },
  { to: 40, suffix: "", label: "countries shipped to" },
  { to: 4.9, decimals: 1, suffix: "/5", label: "average rating" },
  { to: 98, suffix: "%", label: "would design again" },
]

// a gentle growth curve for the self-drawing chart (0..100 space)
const CHART = "M0,52 L14,50 L28,44 L42,46 L56,34 L70,30 L84,18 L100,8"

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section
      id="chapter-7"
      ref={ref}
      className="relative overflow-hidden py-28 sm:py-40"
      style={{ backgroundColor: tk.surface, color: tk.on }}
    >
      {/* background reacts to scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          y: bgY,
          background:
            "radial-gradient(60% 50% at 80% 20%, rgba(15,42,38,0.5) 0%, transparent 60%), radial-gradient(50% 40% at 10% 90%, rgba(226,193,150,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.1fr_1fr] md:items-center">
          {/* the numbers */}
          <div>
            <p
              className="mb-8 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: tk.accent }}
            >
              Chapter VII — The record so far
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div>
                    <div
                      className={`${notoSerif.className} text-5xl leading-none tracking-tight sm:text-6xl`}
                      style={{ color: tk.accent }}
                    >
                      <Counter
                        to={s.to}
                        decimals={s.decimals ?? 0}
                        suffix={s.suffix}
                      />
                    </div>
                    <p
                      className="mt-3 text-sm font-light uppercase tracking-[0.15em]"
                      style={{ color: tk.onVar }}
                    >
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* the self-drawing chart */}
          <GrowthChart />
        </div>
      </div>
    </section>
  )
}

function GrowthChart() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })

  return (
    <div
      ref={ref}
      className="relative rounded-3xl border p-8 backdrop-blur-2xl"
      style={{ borderColor: tk.border, backgroundColor: tk.surfaceRaised }}
    >
      <div className="mb-6 flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: tk.onVar }}>
          Designs created
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: tk.accent }}>
          ▲ live
        </span>
      </div>

      <svg viewBox="0 0 100 60" className="h-40 w-full overflow-visible" preserveAspectRatio="none">
        {/* gridlines */}
        {[15, 30, 45].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={tk.border} strokeWidth="0.4" />
        ))}
        {/* area fill */}
        <motion.path
          d={`${CHART} L100,60 L0,60 Z`}
          fill="url(#atelier-area)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
        />
        {/* drawing line */}
        <motion.path
          d={CHART}
          fill="none"
          stroke={tk.accent}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="atelier-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tk.accent} stopOpacity="0.22" />
            <stop offset="100%" stopColor={tk.accent} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* animated bars beneath */}
      <div className="mt-6 flex items-end gap-2">
        {[40, 62, 48, 78, 66, 92, 84].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            style={{ backgroundColor: `${tk.accent}${i % 2 ? "55" : "33"}` }}
            initial={reduce ? { height: h * 0.6 } : { height: 0 }}
            animate={inView ? { height: h * 0.6 } : {}}
            transition={{ duration: 0.9, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  )
}
