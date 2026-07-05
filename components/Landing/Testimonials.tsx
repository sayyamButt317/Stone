"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"
import { useRef } from "react"
import { Star } from "lucide-react"
import { notoSerif, tk } from "./theme"
import { WordsReveal } from "./primitives"

const QUOTES = [
  {
    quote:
      "I described a colour I remembered from my grandmother's ring. An hour later I was looking at it, finished.",
    name: "Amara O.",
    role: "Designed an emerald solitaire",
    initial: "A",
  },
  {
    quote:
      "No showroom, no six-week wait, no compromise. I changed the setting four times and never lost my nerve.",
    name: "Julien R.",
    role: "Designed a platinum band",
    initial: "J",
  },
  {
    quote:
      "It felt like sketching, except the sketch was real. My wife still can't believe I made it.",
    name: "Devan S.",
    role: "Designed a sapphire pendant",
    initial: "D",
  },
]

const MARQUEE = [
  "VOGUE",
  "GIA CERTIFIED",
  "ROBB REPORT",
  "RECYCLED GOLD",
  "MONOCLE",
  "CONFLICT-FREE",
  "TATLER",
  "PLATINUM GUILD",
]

export default function Testimonials() {
  return (
    <section
      id="chapter-6"
      className="relative overflow-hidden py-28 sm:py-40"
      style={{ backgroundColor: tk.surfaceDeep, color: tk.on }}
    >
      <div className="relative mx-auto max-w-6xl px-6 sm:px-12">
        <div className="mb-16 max-w-2xl">
          <p
            className="mb-6 text-[11px] uppercase tracking-[0.3em]"
            style={{ color: tk.accent }}
          >
            Chapter VI — In their words
          </p>
          <h2
            className={`${notoSerif.className} text-3xl leading-[1.1] tracking-tight sm:text-5xl`}
          >
            <WordsReveal text="Pieces that could only belong to one person." />
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <QuoteCard key={q.name} data={q} index={i} />
          ))}
        </div>
      </div>

      {/* continuous, subtle logo marquee */}
      <div className="relative mt-24 flex overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: `linear-gradient(to right, ${tk.surfaceDeep}, transparent)` }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: `linear-gradient(to left, ${tk.surfaceDeep}, transparent)` }}
        />
        <Marquee />
      </div>
    </section>
  )
}

function QuoteCard({
  data,
  index,
}: {
  data: (typeof QUOTES)[number]
  index: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [8, -8]), {
    stiffness: 140,
    damping: 14,
  })
  const ry = useSpring(useTransform(px, [0, 1], [-8, 8]), {
    stiffness: 140,
    damping: 14,
  })

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
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX: reduce ? 0 : rx,
        rotateY: reduce ? 0 : ry,
        transformPerspective: 1000,
      }}
      className="relative flex flex-col justify-between rounded-3xl border p-8 backdrop-blur-2xl"
    >
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl"
        style={{ backgroundColor: tk.surfaceRaised, border: `1px solid ${tk.border}` }}
      />
      <div className="relative" style={{ transform: "translateZ(40px)" }}>
        <div className="mb-5 flex gap-1">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="size-4" style={{ color: tk.accent }} fill={tk.accent} strokeWidth={0} />
          ))}
        </div>
        <blockquote className={`${notoSerif.className} text-lg leading-relaxed tracking-tight`}>
          <WordsReveal text={`“${data.quote}”`} stagger={0.035} />
        </blockquote>
      </div>

      <div className="relative mt-8 flex items-center gap-3" style={{ transform: "translateZ(30px)" }}>
        <motion.div
          animate={reduce ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
          className={`${notoSerif.className} flex size-11 items-center justify-center rounded-full border text-lg`}
          style={{ borderColor: tk.borderStrong, color: tk.accent, backgroundColor: tk.surface }}
        >
          {data.initial}
        </motion.div>
        <div>
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-xs font-light" style={{ color: tk.onVar }}>
            {data.role}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function Marquee() {
  const reduce = useReducedMotion()
  const items = [...MARQUEE, ...MARQUEE]
  return (
    <motion.div
      className="flex shrink-0 items-center gap-16 whitespace-nowrap pr-16"
      animate={reduce ? undefined : { x: ["0%", "-50%"] }}
      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
    >
      {items.map((label, i) => (
        <span
          key={i}
          className="text-sm font-medium uppercase tracking-[0.28em]"
          style={{ color: tk.onFaint }}
        >
          {label}
        </span>
      ))}
    </motion.div>
  )
}
