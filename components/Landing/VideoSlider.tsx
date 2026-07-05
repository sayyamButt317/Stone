"use client"

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { notoSerif, tk } from "./theme"
import { LightSweep } from "./heroAssets"

/**
 * A luxury reel slider. Each slide can point at a real video via `src`
 * (drop files in /public/videos) — the active slide autoplays, muted and
 * looping. Until a src is supplied, an original composed poster stands in so
 * the slider looks finished on day one.
 */

type Reel = {
  id: string
  title: string
  tag: string
  src?: string // e.g. "/videos/loop.mp4" — drop the file, set this, done
  bg: string
}

const REELS: Reel[] = [
  {
    id: "loop",
    title: "Loop Capsule",
    tag: "Click into elegance",
    bg: "linear-gradient(160deg, #14100b 0%, #1e160d 55%, #0b0805 100%)",
  },
  {
    id: "baguette",
    title: "Baguette Gold",
    tag: "Cut to catch the room",
    bg: "linear-gradient(160deg, #0f130f 0%, #1a2019 55%, #070a08 100%)",
  },
  {
    id: "atelier",
    title: "Atelier Films",
    tag: "A line of pure light",
    bg: "linear-gradient(160deg, #120f0c 0%, #221a12 55%, #090705 100%)",
  },
  {
    id: "water",
    title: "In Water",
    tag: "Weightless, and cold",
    bg: "linear-gradient(160deg, #0b1113 0%, #12212a 55%, #050809 100%)",
  },
  {
    id: "setting",
    title: "The Setting",
    tag: "Held, never gripped",
    bg: "linear-gradient(160deg, #130f0c 0%, #1f1710 55%, #080605 100%)",
  },
]

const CARD = 340
const GAP = 28

export default function VideoSlider() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const go = useCallback(
    (dir: number) => {
      setActive((a) => Math.min(REELS.length - 1, Math.max(0, a + dir)))
    },
    []
  )

  // play only the active video; pause the rest
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active && playing) v.play().catch(() => {})
      else v.pause()
    })
  }, [active, playing])

  // keyboard arrows when the slider is focused
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1)
    if (e.key === "ArrowLeft") go(-1)
  }

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: tk.surface, color: tk.on }}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKey}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${tk.green}44` }}
      />

      <div className="relative mx-auto max-w-6xl px-6 sm:px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em]" style={{ color: tk.accent }}>
              The films
            </p>
            <h2 className={`${notoSerif.className} text-3xl leading-[1.1] tracking-tight sm:text-4xl`}>
              Watch the house in motion.
            </h2>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <SliderBtn onClick={() => go(-1)} disabled={active === 0} label="Previous film">
              <ChevronLeft className="size-5" />
            </SliderBtn>
            <SliderBtn onClick={() => go(1)} disabled={active === REELS.length - 1} label="Next film">
              <ChevronRight className="size-5" />
            </SliderBtn>
          </div>
        </div>
      </div>

      {/* track */}
      <div className="relative mt-14 h-[520px]">
        <motion.div
          className="absolute top-0 flex"
          style={{ left: "50%", gap: GAP }}
          animate={{ x: -(active * (CARD + GAP) + CARD / 2) }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 22, mass: 0.6 }}
        >
          {REELS.map((reel, i) => {
            const isActive = i === active
            return (
              <motion.button
                key={reel.id}
                onClick={() => setActive(i)}
                className="relative shrink-0 overflow-hidden rounded-[28px] border text-left"
                style={{ width: CARD, height: 500, borderColor: isActive ? tk.borderStrong : tk.border }}
                animate={{
                  scale: isActive ? 1 : 0.88,
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? "blur(0px)" : "blur(1.5px)",
                }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
                aria-label={`${reel.title} — ${reel.tag}`}
                aria-current={isActive}
              >
                {/* real video, if provided */}
                {reel.src && (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                    src={reel.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                )}
                {/* composed poster (also the video's backdrop while loading) */}
                {!reel.src && <Poster reel={reel} active={isActive} />}

                {/* gradient + caption overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 45%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: tk.accent }}>
                    {reel.tag}
                  </p>
                  <h3 className={`${notoSerif.className} mt-1 text-2xl tracking-tight`}>{reel.title}</h3>
                </div>

                {/* play state chip on the active card */}
                {isActive && (
                  <span
                    className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full backdrop-blur"
                    style={{ backgroundColor: "rgba(17,20,19,0.5)", border: `1px solid ${tk.border}` }}
                  >
                    {playing ? (
                      <Pause className="size-4" style={{ color: tk.accent }} />
                    ) : (
                      <Play className="size-4" style={{ color: tk.accent }} />
                    )}
                  </span>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* controls row */}
      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between px-6 sm:px-12">
        <div className="flex items-center gap-2">
          {REELS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to film ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === active ? 30 : 10,
                backgroundColor: i === active ? tk.accent : tk.border,
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-[#e2c196]"
          style={{ color: tk.onVar }}
        >
          {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  )
}

function SliderBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  label: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border transition-all hover:border-[#e2c196] hover:text-[#e2c196] disabled:pointer-events-none disabled:opacity-30"
      style={{ borderColor: tk.border, color: tk.onVar }}
    >
      {children}
    </button>
  )
}

function Poster({ reel, active }: { reel: Reel; active: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: reel.bg }}>
      {/* soft cinematic key light */}
      <div
        aria-hidden
        className="absolute -top-1/4 left-1/2 h-[70%] w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${tk.accent}1f, transparent 65%)` }}
      />
      {/* awaiting-asset label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
        <span
          className="flex size-12 items-center justify-center rounded-full border"
          style={{ borderColor: tk.border, color: tk.accent }}
        >
          <Play className="size-4" />
        </span>
        <code
          className="rounded-md px-2.5 py-1 text-[11px]"
          style={{ backgroundColor: "rgba(226,193,150,0.1)", color: tk.accent }}
        >
          /videos/{reel.id}.mp4
        </code>
      </div>
      <AnimatePresence>{active && <LightSweep active delay={0.2} />}</AnimatePresence>
    </div>
  )
}
