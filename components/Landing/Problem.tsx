"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useRef } from "react"
import { notoSerif, tk } from "./theme"

type Beat = {
  value: number
  unit: string
  headline: string
  body: string
}

const BEATS: Beat[] = [
  {
    value: 73,
    unit: "%",
    headline: "The piece in the case was made for a shelf.",
    body: "Nearly three in four people wish their jewellery felt like it was actually theirs — not one of a thousand identical copies.",
  },
  {
    value: 12,
    unit: " weeks",
    headline: "Going custom means the long way round.",
    body: "The traditional commission is months of emails, rough sketches and quiet guesswork before anything is cast.",
  },
  {
    value: 0,
    unit: "",
    headline: "And you never see it until it's real.",
    body: "No preview, no certainty. So most people stop dreaming, settle for what's in stock, and wear the compromise forever.",
  },
]

export default function Problem() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // background darkens subtly as the problem sinks in
  const bgLift = useTransform(scrollYProgress, [0, 1], [0.35, 0])

  return (
    <section
      id="chapter-2"
      ref={ref}
      className="relative"
      style={{ height: "340vh", backgroundColor: tk.surfaceDeep, color: tk.on }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* atmospheric floor light that recedes */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: bgLift,
            background:
              "radial-gradient(90% 60% at 50% 115%, rgba(15,42,38,0.5) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 sm:px-12 md:grid-cols-[auto_1fr] md:gap-20">
          {/* progress rail */}
          <div className="hidden md:block">
            <div className="sticky top-1/2 flex h-64 -translate-y-1/2 flex-col items-center">
              <div className="relative h-full w-px" style={{ backgroundColor: tk.border }}>
                <motion.div
                  className="absolute inset-x-0 top-0 w-px origin-top"
                  style={{
                    height: "100%",
                    scaleY: scrollYProgress,
                    background: `linear-gradient(${tk.accent}, ${tk.accentDeep})`,
                  }}
                />
                {BEATS.map((_, i) => (
                  <RailDot key={i} progress={scrollYProgress} index={i} total={BEATS.length} />
                ))}
              </div>
            </div>
          </div>

          {/* header + stacked beats */}
          <div className="relative">
            <p
              className="mb-10 text-[11px] uppercase tracking-[0.3em]"
              style={{ color: tk.accent }}
            >
              Chapter II — The problem
            </p>

            <div className="relative min-h-[22rem]">
              {BEATS.map((beat, i) => (
                <TimelineBeat
                  key={i}
                  beat={beat}
                  index={i}
                  total={BEATS.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* window helper: each beat owns a slice of the scroll and enters/exits within it */
function windowFor(index: number, total: number) {
  const slot = 1 / total
  const start = index * slot
  const enterStart = start + slot * 0.06
  const enterEnd = start + slot * 0.32
  const exitStart = start + slot * 0.72
  const exitEnd = start + slot * 0.98
  const isLast = index === total - 1
  return { enterStart, enterEnd, exitStart, exitEnd, isLast }
}

function RailDot({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>
  index: number
  total: number
}) {
  const { enterStart, enterEnd } = windowFor(index, total)
  const top = `${(index / (total - 1)) * 100}%`
  const scale = useTransform(progress, [enterStart - 0.02, enterEnd], [0.7, 1.35])
  const bg = useTransform(
    progress,
    [enterStart - 0.02, enterEnd],
    [tk.border, tk.accent]
  )
  return (
    <motion.span
      className="absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full"
      style={{ top, scale, backgroundColor: bg, marginTop: -5 }}
    />
  )
}

function TimelineBeat({
  beat,
  index,
  total,
  progress,
}: {
  beat: Beat
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const reduce = useReducedMotion()
  const { enterStart, enterEnd, exitStart, exitEnd, isLast } = windowFor(index, total)

  const opacity = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  )
  const y = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [50, 0, 0, -50]
  )
  const blur = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    isLast ? [8, 0, 0, 0] : [8, 0, 0, 8]
  )
  const filter = useTransform(blur, (b) => `blur(${b}px)`)

  // count the figure up as the beat enters
  const counted = useTransform(progress, [enterStart, enterEnd], [0, beat.value])
  const display = useTransform(counted, (v) =>
    Math.round(v).toLocaleString("en-US")
  )

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={reduce ? { opacity: index === 0 ? 1 : 0.35 } : { opacity, y, filter }}
    >
      <div className="flex items-baseline gap-4">
        <span
          className={`${notoSerif.className} text-6xl leading-none tracking-tight sm:text-8xl`}
          style={{ color: tk.accent }}
        >
          <motion.span>{reduce ? beat.value : display}</motion.span>
          <span className="text-3xl sm:text-4xl">{beat.unit}</span>
        </span>
      </div>
      <h2
        className={`${notoSerif.className} mt-7 max-w-2xl text-2xl leading-snug tracking-tight sm:text-4xl`}
      >
        {beat.headline}
      </h2>
      <p
        className="mt-5 max-w-xl text-base font-light leading-relaxed sm:text-lg"
        style={{ color: tk.onVar }}
      >
        {beat.body}
      </p>
    </motion.div>
  )
}
