"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useRef } from "react"
import { Gem, Palette, Layers, Sparkles, Eye } from "lucide-react"
import { notoSerif, tk } from "./theme"

const STEPS = [
  {
    Icon: Gem,
    kicker: "The canvas",
    title: "Choose what you're making.",
    body: "Ring, necklace, bracelet or earrings. Every path opens its own set of choices, tuned to the form.",
    tint: "#0F2A26",
  },
  {
    Icon: Palette,
    kicker: "The stone",
    title: "Set the heart of the piece.",
    body: "Pick the gem, its colour and its cut. This is the decision everything else is built around.",
    tint: "#1a1410",
  },
  {
    Icon: Layers,
    kicker: "The metal",
    title: "Choose what holds it.",
    body: "Yellow, white or rose — gold, platinum, the karat weight. The frame that carries the light.",
    tint: "#161a17",
  },
  {
    Icon: Sparkles,
    kicker: "The setting",
    title: "Shape the silhouette.",
    body: "Solitaire, halo, pavé, bezel. The setting decides how the stone meets the world.",
    tint: "#12100c",
  },
  {
    Icon: Eye,
    kicker: "The reveal",
    title: "See it, then make it yours.",
    body: "Your piece renders as you go. When it's right, one tap sends it to the bench — crafted, insured, delivered.",
    tint: "#0f1a18",
  },
]

export default function HowItWorks() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const N = STEPS.length

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // horizontal travel across the filmstrip
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(N - 1) * 100}vw`]
  )
  const progressScale = useTransform(scrollYProgress, [0, 1], [1 / N, 1])

  return (
    <section
      id="chapter-4"
      ref={ref}
      className="relative"
      style={{ height: `${N * 100}vh`, backgroundColor: tk.surfaceDeep }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* section title, fixed over the strip */}
        <div className="pointer-events-none absolute left-6 top-10 z-20 sm:left-12">
          <p
            className="text-[11px] uppercase tracking-[0.3em]"
            style={{ color: tk.accent }}
          >
            Chapter IV — How it works
          </p>
          <p
            className={`${notoSerif.className} mt-1 text-lg tracking-tight`}
            style={{ color: tk.on }}
          >
            Five choices, one piece.
          </p>
        </div>

        {reduce ? (
          <div className="flex h-full flex-col divide-y overflow-y-auto" style={{ borderColor: tk.border }}>
            {STEPS.map((s, i) => (
              <StaticStep key={i} step={s} index={i} total={N} />
            ))}
          </div>
        ) : (
          <motion.div style={{ x }} className="flex h-full" >
            {STEPS.map((step, i) => (
              <Panel
                key={i}
                step={step}
                index={i}
                total={N}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        )}

        {/* progress indicator */}
        <div className="absolute inset-x-0 bottom-9 z-20 flex justify-center px-12">
          <div className="flex w-full max-w-md items-center gap-4">
            <span
              className="text-[11px] tabular-nums tracking-[0.2em]"
              style={{ color: tk.onVar }}
            >
              01
            </span>
            <div
              className="relative h-px flex-1 overflow-hidden"
              style={{ backgroundColor: tk.border }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left"
                style={{
                  scaleX: progressScale,
                  background: `linear-gradient(to right, ${tk.accentDeep}, ${tk.accent})`,
                }}
              />
            </div>
            <span
              className="text-[11px] tabular-nums tracking-[0.2em]"
              style={{ color: tk.onVar }}
            >
              0{N}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Panel({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof STEPS)[number]
  index: number
  total: number
  progress: MotionValue<number>
}) {
  // per-panel life window as it crosses the viewport centre
  const center = index / (total - 1)
  const span = 1 / (total - 1)
  const local = useTransform(
    progress,
    [center - span, center, center + span],
    [0, 1, 0]
  )
  const illoScale = useTransform(local, [0, 1], [0.86, 1])
  const illoRotate = useTransform(local, [0, 1], [-8, 0])
  const textX = useTransform(local, [0, 1], [40, 0])
  const textOpacity = useTransform(local, [0, 1], [0.2, 1])

  return (
    <div
      className="relative flex h-full w-screen shrink-0 items-center"
      style={{
        background: `radial-gradient(70% 60% at 30% 40%, ${step.tint} 0%, ${tk.surfaceDeep} 65%)`,
      }}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:px-12 md:grid-cols-2 md:gap-16">
        {/* illustration */}
        <motion.div
          style={{ scale: illoScale, rotate: illoRotate }}
          className="order-2 flex justify-center md:order-1"
        >
          <Illustration Icon={step.Icon} />
        </motion.div>

        {/* copy */}
        <motion.div
          style={{ x: textX, opacity: textOpacity }}
          className="order-1 md:order-2"
        >
          <span
            className={`${notoSerif.className} block text-7xl leading-none opacity-20 sm:text-8xl`}
            style={{ color: tk.accent }}
          >
            0{index + 1}
          </span>
          <span
            className="mt-4 block text-[10px] uppercase tracking-[0.3em]"
            style={{ color: tk.accent }}
          >
            {step.kicker}
          </span>
          <h3
            className={`${notoSerif.className} mt-3 max-w-md text-3xl leading-tight tracking-tight sm:text-5xl`}
            style={{ color: tk.on }}
          >
            {step.title}
          </h3>
          <p
            className="mt-5 max-w-sm text-base font-light leading-relaxed sm:text-lg"
            style={{ color: tk.onVar }}
          >
            {step.body}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function Illustration({ Icon }: { Icon: (typeof STEPS)[number]["Icon"] }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative flex size-64 items-center justify-center sm:size-80">
      {/* rotating gradient ring */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${tk.accent}55, transparent 60%)`,
          maskImage: "radial-gradient(transparent 60%, black 61%, black 63%, transparent 64%)",
          WebkitMaskImage:
            "radial-gradient(transparent 60%, black 61%, black 63%, transparent 64%)",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      {/* soft glow */}
      <div
        aria-hidden
        className="absolute inset-8 rounded-full blur-2xl"
        style={{ backgroundColor: `${tk.accent}12` }}
      />
      {/* floating icon */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex size-32 items-center justify-center rounded-3xl border backdrop-blur-xl sm:size-40"
        style={{ borderColor: tk.borderStrong, backgroundColor: tk.surfaceRaised }}
      >
        <Icon
          className="size-14 sm:size-16"
          style={{ color: tk.accent }}
          strokeWidth={1}
        />
      </motion.div>
    </div>
  )
}

function StaticStep({
  step,
  index,
  total,
}: {
  step: (typeof STEPS)[number]
  index: number
  total: number
}) {
  return (
    <div className="flex shrink-0 items-center gap-6 px-8 py-8">
      <span
        className={`${notoSerif.className} text-4xl opacity-30`}
        style={{ color: tk.accent }}
      >
        0{index + 1}
      </span>
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border" style={{ borderColor: tk.borderStrong }}>
        <step.Icon className="size-6" style={{ color: tk.accent }} strokeWidth={1.2} />
      </div>
      <div>
        <h3 className={`${notoSerif.className} text-xl`} style={{ color: tk.on }}>
          {step.title}
        </h3>
        <p className="mt-1 text-sm font-light" style={{ color: tk.onVar }}>
          {step.body}
        </p>
      </div>
    </div>
  )
}
