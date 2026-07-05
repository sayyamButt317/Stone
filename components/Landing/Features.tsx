"use client"

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef } from "react"
import {
  Eye,
  Award,
  Layers,
  Ruler,
  ShieldCheck,
  Repeat,
  type LucideIcon,
} from "lucide-react"
import { notoSerif, tk } from "./theme"
import { WordsReveal } from "./primitives"

type Feature = {
  Icon: LucideIcon
  title: string
  body: string
  span?: string
}

const FEATURES: Feature[] = [
  {
    Icon: Eye,
    title: "Live preview",
    body: "Watch your piece render in real time as you change the stone, the metal, the light.",
    span: "md:col-span-2",
  },
  {
    Icon: Award,
    title: "Certified stones",
    body: "Every gem is independently graded — cut, colour, clarity and carat, on record.",
  },
  {
    Icon: Layers,
    title: "Every metal & karat",
    body: "Yellow, white and rose gold, platinum, in the weight you choose.",
  },
  {
    Icon: Ruler,
    title: "Made to your size",
    body: "Precise to the millimetre, so it fits the day it arrives.",
  },
  {
    Icon: ShieldCheck,
    title: "Insured, worldwide",
    body: "Fully covered from the bench to your door, wherever that is.",
  },
  {
    Icon: Repeat,
    title: "Lifetime care",
    body: "Resizing, cleaning and restoration — for as long as you wear it.",
    span: "md:col-span-2",
  },
]

export default function Features() {
  return (
    <section
      id="chapter-5"
      className="relative overflow-hidden py-28 sm:py-40"
      style={{ backgroundColor: tk.surface, color: tk.on }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${tk.green}44` }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-12">
        <div className="mb-16 max-w-2xl">
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.3em]"
            style={{ color: tk.accent }}
          >
            Chapter V — What's under the glass
          </p>
          <h2
            className={`${notoSerif.className} text-3xl leading-[1.1] tracking-tight sm:text-5xl`}
          >
            <WordsReveal text="Everything a house offers, none of the waiting." />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureIsland key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureIsland({ feature, index }: { feature: Feature; index: number }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 150,
    damping: 15,
  })
  const ry = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 150,
    damping: 15,
  })
  const glowX = useTransform(px, [0, 1], ["0%", "100%"])
  const glowY = useTransform(py, [0, 1], ["0%", "100%"])
  const glow = useMotionTemplate`radial-gradient(240px circle at ${glowX} ${glowY}, ${tk.accent}18, transparent 60%)`

  function move(e: React.MouseEvent) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: reduce ? 0 : rx,
        rotateY: reduce ? 0 : ry,
        transformPerspective: 900,
      }}
      className={`group relative overflow-hidden rounded-3xl border p-8 backdrop-blur-2xl ${feature.span ?? ""}`}
    >
      {/* dynamic border + fill */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl"
        style={{ backgroundColor: tk.surfaceRaised, border: `1px solid ${tk.border}` }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className="relative">
        {/* idle-floating icon */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{
            duration: 4 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6 flex size-12 items-center justify-center rounded-2xl border"
          style={{ borderColor: tk.borderStrong, backgroundColor: tk.surface }}
        >
          <feature.Icon className="size-5" style={{ color: tk.accent }} strokeWidth={1.4} />
        </motion.div>

        <h3 className={`${notoSerif.className} text-xl tracking-tight`}>
          {feature.title}
        </h3>
        <p
          className="mt-2 max-w-sm text-sm font-light leading-relaxed"
          style={{ color: tk.onVar }}
        >
          {feature.body}
        </p>
      </div>
    </motion.div>
  )
}
