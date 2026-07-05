"use client"

import { motion, useReducedMotion } from "motion/react"
import { Lightbulb, SlidersHorizontal, Eye } from "lucide-react"
import { notoSerif, tk } from "./theme"
import { Reveal, WordsReveal, DrawLine } from "./primitives"

const STEPS = [
  {
    Icon: Lightbulb,
    label: "Imagine",
    title: "Start from a feeling.",
    body: "A colour, a memory, a shape you've never seen in a shop window. That's the brief — and the only one that matters is yours.",
  },
  {
    Icon: SlidersHorizontal,
    label: "Configure",
    title: "Shape every detail.",
    body: "Stone, cut, metal, karat, setting, size. Change one choice and the whole piece answers back, instantly.",
  },
  {
    Icon: Eye,
    label: "Preview",
    title: "See it before it's real.",
    body: "Your design renders as you build it — so you commission with certainty, not a leap of faith.",
  },
]

export default function Solution() {
  const reduce = useReducedMotion()

  return (
    <section
      id="chapter-3"
      className="relative overflow-hidden py-28 sm:py-40"
      style={{ backgroundColor: tk.surface, color: tk.on }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, rgba(226,193,150,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.3em]"
            style={{ color: tk.accent }}
          >
            Chapter III — The turning point
          </p>
          <h2
            className={`${notoSerif.className} text-3xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl`}
          >
            <WordsReveal text="So we brought the atelier to you." />
          </h2>
          <Reveal delay={0.15}>
            <p
              className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed sm:text-lg"
              style={{ color: tk.onVar }}
            >
              Not a catalogue. A studio in your hands — where imagining,
              designing and seeing your piece all happen in one connected motion.
            </p>
          </Reveal>
        </div>

        {/* connected sequence */}
        <div className="relative mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {/* drawing connective line behind the cards (desktop) */}
          <div
            aria-hidden
            className="absolute inset-x-[16%] top-[3.25rem] hidden md:block"
          >
            <DrawLine className="h-[2px] w-full" />
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 0.85,
                delay: i * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col items-start rounded-3xl border p-8 backdrop-blur-2xl"
              style={{ borderColor: tk.border, backgroundColor: tk.surfaceRaised }}
              whileHover={reduce ? undefined : { y: -6 }}
            >
              {/* index eyebrow */}
              <span
                className="absolute right-6 top-6 text-[11px] font-semibold tracking-[0.2em]"
                style={{ color: tk.onFaint }}
              >
                0{i + 1}
              </span>

              {/* node marker on the connective line */}
              <div className="relative z-10 mb-7">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl blur-lg"
                  style={{ backgroundColor: `${tk.accent}22` }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.18 + 0.3, duration: 0.6 }}
                />
                <div
                  className="relative flex size-[3.25rem] items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: tk.borderStrong,
                    backgroundColor: tk.surface,
                  }}
                >
                  <step.Icon
                    className="size-6 transition-transform duration-500 group-hover:scale-110"
                    style={{ color: tk.accent }}
                    strokeWidth={1.4}
                  />
                </div>
              </div>

              <span
                className="text-[10px] uppercase tracking-[0.28em]"
                style={{ color: tk.accent }}
              >
                {step.label}
              </span>
              <h3
                className={`${notoSerif.className} mt-3 text-2xl tracking-tight`}
              >
                {step.title}
              </h3>
              <p
                className="mt-3 text-sm font-light leading-relaxed"
                style={{ color: tk.onVar }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
