"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useRef } from "react"
import { notoSerif, tk } from "./theme"

/**
 * A pinned, scroll-driven film of a single jewel being made — inspired by
 * cinematic luxury-jewellery product videos. Everything is original SVG so the
 * frames genuinely morph into one another as you scroll: a rough stone is cut,
 * set in gold, and turned to catch the light. One image, four moments.
 */

const CAPTIONS = [
  { k: "01", title: "A rough stone.", body: "Chosen for its fire, not its finish." },
  { k: "02", title: "Cut to hold the light.", body: "Facet by facet, until it answers." },
  { k: "03", title: "Set by hand, in your gold.", body: "The frame built around your choice." },
  { k: "04", title: "Yours, and no one else's.", body: "Turned to the light, and finished." },
]

export default function MakingSequence() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const still = useMotionValue(1) // drives the finished frame for reduced motion

  if (reduce) {
    return (
      <section
        className="relative overflow-hidden py-24"
        style={{ backgroundColor: tk.surfaceDeep, color: tk.on }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 sm:px-12 md:grid-cols-2">
          <div className="flex justify-center">
            <JewelStage p={still} />
          </div>
          <div>
            <p className="mb-6 text-[11px] uppercase tracking-[0.3em]" style={{ color: tk.accent }}>
              The making
            </p>
            <ul className="space-y-6">
              {CAPTIONS.map((c) => (
                <li key={c.k}>
                  <h3 className={`${notoSerif.className} text-2xl tracking-tight`}>{c.title}</h3>
                  <p className="mt-1 text-sm font-light" style={{ color: tk.onVar }}>
                    {c.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: "440vh", backgroundColor: tk.surfaceDeep, color: tk.on }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <p
          className="absolute left-6 top-10 text-[11px] uppercase tracking-[0.3em] sm:left-12"
          style={{ color: tk.accent }}
        >
          The making — watch one come to life
        </p>

        {/* the jewel, centre stage */}
        <div className="relative flex items-center justify-center">
          <JewelStage p={scrollYProgress} />
        </div>

        {/* crossfading caption beneath the jewel */}
        <div className="relative mt-4 h-24 w-full max-w-md px-6 text-center">
          {CAPTIONS.map((c, i) => (
            <Caption key={c.k} data={c} index={i} total={CAPTIONS.length} p={scrollYProgress} />
          ))}
        </div>

        {/* stage dots */}
        <div className="absolute bottom-10 flex items-center gap-3">
          {CAPTIONS.map((_, i) => (
            <StageDot key={i} index={i} total={CAPTIONS.length} p={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  The jewel — a single SVG that evolves across the scroll             */
/* ------------------------------------------------------------------ */

const ROUGH = "M -30,-34 L 6,-46 L 34,-30 L 40,6 L 24,40 L -12,46 L -40,20 L -34,-14 Z"
const GEM_OUTLINE =
  "M -22,-46 L 22,-46 L 30,-30 L 30,26 L 22,42 L -22,42 L -30,26 L -30,-30 Z"
const GEM_TABLE =
  "M -13,-37 L 13,-37 L 21,-25 L 21,22 L 13,33 L -13,33 L -21,22 L -21,-25 Z"
// all facet strokes bundled so one pathLength draws them together
const GEM_FACETS = [
  "M -22,-46 L -13,-37",
  "M 22,-46 L 13,-37",
  "M 30,-30 L 21,-25",
  "M 30,26 L 21,22",
  "M 22,42 L 13,33",
  "M -22,42 L -13,33",
  "M -30,26 L -21,22",
  "M -30,-30 L -21,-25",
  "M -21,-8 L 21,-8",
  "M -21,10 L 21,10",
].join(" ")

function JewelStage({ p }: { p: MotionValue<number> }) {
  const reduce = useReducedMotion()

  // overall
  const glow = useTransform(p, [0, 0.3, 1], [0.12, 0.35, 0.7])
  const breathe = useTransform(p, [0, 1], [0.92, 1.05])
  const assemblyRotate = useTransform(p, [0.78, 1], [0, 20])

  // stage A -> B : rough stone dissolves as the cut gem resolves
  const roughOpacity = useTransform(p, [0, 0.2, 0.32], [1, 1, 0])
  const roughSpin = useTransform(p, [0, 0.32], [0, -14])
  const cutOpacity = useTransform(p, [0.22, 0.36], [0, 1])
  const facetDraw = useTransform(p, [0.3, 0.54], [0, 1])
  const sparkOnCut = useTransform(p, [0.36, 0.5], [0, 1])

  // stage C : gold rises and draws itself in
  const goldOpacity = useTransform(p, [0.5, 0.64], [0, 1])
  const goldScale = useTransform(p, [0.5, 0.66], [0.55, 1])
  const metalDraw = useTransform(p, [0.54, 0.78], [0, 1])

  // stage D : finished sparkle
  const sparkleOpacity = useTransform(p, [0.78, 0.88], [0, 1])

  return (
    <div className="relative size-[300px] sm:size-[380px]">
      {/* ambient light behind */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ opacity: glow, background: `radial-gradient(circle, ${tk.accent}44, ${tk.green}22 55%, transparent 72%)` }}
      />
      {/* slowly rotating light ring for that product-film shimmer */}
      <motion.div
        aria-hidden
        className="absolute inset-6 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${tk.accent}44, transparent 55%)`,
          maskImage: "radial-gradient(transparent 67%, black 68%, black 70%, transparent 71%)",
          WebkitMaskImage: "radial-gradient(transparent 67%, black 68%, black 70%, transparent 71%)",
          opacity: 0.7,
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      />

      <motion.svg
        viewBox="-110 -85 220 210"
        className="relative h-full w-full overflow-visible"
        style={{ scale: breathe }}
      >
        <defs>
          <linearGradient id="ms-rough" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c8d2ce" />
            <stop offset="100%" stopColor="#6c7a74" />
          </linearGradient>
          <linearGradient id="ms-gem" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#fbf4e4" />
            <stop offset="45%" stopColor={tk.accent} />
            <stop offset="100%" stopColor={tk.accentDeep} />
          </linearGradient>
          <linearGradient id="ms-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f6e2b4" />
            <stop offset="50%" stopColor={tk.accent} />
            <stop offset="100%" stopColor={tk.accentDeep} />
          </linearGradient>
          <clipPath id="ms-gem-clip">
            <path d={GEM_OUTLINE} />
          </clipPath>
        </defs>

        <motion.g style={{ rotate: assemblyRotate }}>
          {/* --- gold setting (drawn beneath the gem) --- */}
          <motion.g style={{ opacity: goldOpacity, scale: goldScale, originX: "50%", originY: "50%" }}>
            {/* the band / shank */}
            <motion.circle
              cx="0"
              cy="72"
              r="44"
              fill="none"
              stroke="url(#ms-gold)"
              strokeWidth="11"
              strokeLinecap="round"
              style={{ pathLength: metalDraw }}
            />
            <circle cx="0" cy="72" r="44" fill="none" stroke="#6b5326" strokeWidth="11" opacity="0.18" />
            {/* prongs cradling the stone */}
            <motion.path
              d="M -18,40 L -14,58 M 0,46 L 0,62 M 18,40 L 14,58"
              stroke="url(#ms-gold)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: metalDraw }}
            />
          </motion.g>

          {/* --- rough stone (stage A) --- */}
          <motion.path
            d={ROUGH}
            fill="url(#ms-rough)"
            stroke="#e9efec"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            style={{ opacity: roughOpacity, rotate: roughSpin, originX: "50%", originY: "50%" }}
          />

          {/* --- cut gem (stage B onward) --- */}
          <motion.g style={{ opacity: cutOpacity }}>
            <path d={GEM_OUTLINE} fill="url(#ms-gem)" />
            <path d={GEM_TABLE} fill="#fff" opacity="0.14" />
            {/* facets draw themselves */}
            <motion.path
              d={GEM_FACETS}
              fill="none"
              stroke="#3a2f1c"
              strokeOpacity="0.35"
              strokeWidth="1"
              style={{ pathLength: facetDraw }}
            />
            <motion.path
              d={GEM_TABLE}
              fill="none"
              stroke="#fff8e8"
              strokeOpacity="0.5"
              strokeWidth="1"
              style={{ pathLength: facetDraw }}
            />
            {/* travelling light sweep across the gem */}
            {!reduce && (
              <g clipPath="url(#ms-gem-clip)">
                <motion.rect
                  x="-70"
                  y="-60"
                  width="26"
                  height="120"
                  fill="#ffffff"
                  opacity="0.35"
                  style={{ opacity: sparkOnCut }}
                  animate={{ x: [-70, 70] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                  transform="skewX(-18)"
                />
              </g>
            )}
          </motion.g>

          {/* --- sparkle stars (stage D) --- */}
          <motion.g style={{ opacity: sparkleOpacity }}>
            {[
              { x: 34, y: -40, s: 1 },
              { x: -40, y: -8, s: 0.7 },
              { x: 22, y: 10, s: 0.55 },
            ].map((st, i) => (
              <motion.path
                key={i}
                d="M 0,-8 L 1.6,-1.6 L 8,0 L 1.6,1.6 L 0,8 L -1.6,1.6 L -8,0 L -1.6,-1.6 Z"
                fill="#fff7e6"
                transform={`translate(${st.x} ${st.y}) scale(${st.s})`}
                animate={reduce ? undefined : { opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
            ))}
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Captions + stage dots                                              */
/* ------------------------------------------------------------------ */

function windowFor(index: number, total: number) {
  const slot = 1 / total
  const start = index * slot
  return {
    enterStart: start + slot * 0.08,
    enterEnd: start + slot * 0.3,
    exitStart: start + slot * 0.72,
    exitEnd: start + slot * 0.95,
    isLast: index === total - 1,
  }
}

function Caption({
  data,
  index,
  total,
  p,
}: {
  data: (typeof CAPTIONS)[number]
  index: number
  total: number
  p: MotionValue<number>
}) {
  const { enterStart, enterEnd, exitStart, exitEnd, isLast } = windowFor(index, total)
  const opacity = useTransform(
    p,
    [enterStart, enterEnd, exitStart, exitEnd],
    isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  )
  const y = useTransform(p, [enterStart, enterEnd, exitStart, exitEnd], [24, 0, 0, -24])

  return (
    <motion.div className="absolute inset-x-0 top-0" style={{ opacity, y }}>
      <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: tk.accent }}>
        {data.k}
      </span>
      <h3 className={`${notoSerif.className} mt-2 text-2xl tracking-tight sm:text-3xl`}>
        {data.title}
      </h3>
      <p className="mt-2 text-sm font-light" style={{ color: tk.onVar }}>
        {data.body}
      </p>
    </motion.div>
  )
}

function StageDot({
  index,
  total,
  p,
}: {
  index: number
  total: number
  p: MotionValue<number>
}) {
  const { enterStart, enterEnd, exitEnd, isLast } = windowFor(index, total)
  const active = useTransform(
    p,
    [enterStart - 0.02, enterEnd, exitEnd],
    isLast ? [0.35, 1, 1] : [0.35, 1, 0.35]
  )
  const width = useTransform(active, [0.35, 1], [8, 26])
  const bg = useTransform(active, [0.35, 1], [tk.border, tk.accent])
  return (
    <motion.span
      className="h-2 rounded-full"
      style={{ width, backgroundColor: bg, opacity: active }}
    />
  )
}
