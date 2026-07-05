"use client"

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { notoSerif, goldGradient } from "./theme"
import { CharReveal, MagneticButton } from "./primitives"
import { LightSweep } from "./heroAssets"
import { HERO_SCENES, type CameraPreset, type HeroScene } from "./heroConfig"

/* light-editorial palette, tuned to the beige studio photography */
const CREAM = "#d9d0c6"
const INK = "#2a2621"
const INK_SOFT = "#6d645a"
const GOLD = "#9c7b41"
const HAIRLINE = "rgba(42,38,33,0.16)"

const SCENES = HERO_SCENES.length
const SLOT = 1 / SCENES
const FADE = 0.05
const win = (i: number) => ({ s: i * SLOT, e: (i + 1) * SLOT })

/** Scene opacity; breakpoints kept inside [0,1] (framer accelerates
 *  scroll-linked opacity via WAAPI, whose offsets must stay in range). */
function useSceneOpacity(p: MotionValue<number>, i: number) {
  const { s, e } = win(i)
  const first = i === 0
  const last = i === SCENES - 1
  const input = first
    ? [0, e, Math.min(1, e + FADE)]
    : last
      ? [Math.max(0, s - FADE), s, 1]
      : [s - FADE, s, e, e + FADE]
  const output = first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]
  return useTransform(p, input, output)
}
function useLocal(p: MotionValue<number>, i: number) {
  const { s, e } = win(i)
  return useTransform(p, [s, e], [0, 1])
}

const CAMERA: Record<CameraPreset, { sf: number; st: number; xf: number; xt: number; yf: number; yt: number; rf: number; rt: number }> = {
  reveal: { sf: 1.12, st: 1.0, xf: 0, xt: 0, yf: 0, yt: -10, rf: 0, rt: 0 },
  descend: { sf: 1.14, st: 1.04, xf: 0, xt: 0, yf: -34, yt: 20, rf: 0, rt: 0 },
  push: { sf: 1.02, st: 1.3, xf: 0, xt: 0, yf: 14, yt: -18, rf: 0, rt: 0 },
  enterRight: { sf: 1.14, st: 1.04, xf: 140, xt: 0, yf: 0, yt: 0, rf: 2, rt: 0 },
  zoomBlur: { sf: 0.98, st: 1.35, xf: 0, xt: 0, yf: 12, yt: -14, rf: 0, rt: 0 },
  macro: { sf: 1.4, st: 2.1, xf: 0, xt: 0, yf: 0, yt: 0, rf: -4, rt: 6 },
  pullback: { sf: 1.32, st: 1.0, xf: 0, xt: 0, yf: 0, yt: 0, rf: 0, rt: 0 },
}

export default function Hero({ onBegin }: { onBegin: () => void }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const cx = useMotionValue(50)
  const cy = useMotionValue(40)
  const scx = useSpring(cx, { stiffness: 70, damping: 20 })
  const scy = useSpring(cy, { stiffness: 70, damping: 20 })
  const cursorLight = useMotionTemplate`radial-gradient(520px circle at ${scx}% ${scy}%, rgba(255,255,255,0.28), transparent 60%)`

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    cx.set(((e.clientX - r.left) / r.width) * 100)
    cy.set(((e.clientY - r.top) / r.height) * 100)
  }

  return (
    <section ref={ref} onPointerMove={onMove} className="relative" style={{ height: "300vh", backgroundColor: CREAM }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ backgroundColor: CREAM, color: INK }}>
        {HERO_SCENES.map((scene, i) => (
          <Scene key={scene.id} scene={scene} i={i} p={p} onBegin={onBegin} />
        ))}

        {/* soft cursor light + gentle warm vignette */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[24] mix-blend-soft-light" style={{ background: cursorLight }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[24]" style={{ boxShadow: "inset 0 0 160px 50px rgba(80,66,48,0.12)" }} />
        {/* bottom grounding + hand-off toward the darker sections below */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[16vh]" style={{ background: "linear-gradient(to bottom, transparent, rgba(120,108,92,0.28))" }} />

        {/* nav */}
        <header className="absolute inset-x-0 top-0 z-40 flex h-24 items-center justify-between px-6 sm:px-12">
          <span className={`text-xl tracking-[0.3em] sm:text-2xl ${notoSerif.className}`} style={{ color: INK }}>
            L&apos;ATELIER
          </span>
          <button
            onClick={onBegin}
            className="rounded-full border px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors"
            style={{ borderColor: HAIRLINE, color: INK }}
          >
            Start designing
          </button>
        </header>

        <ScrollCue p={p} reduce={reduce} />
      </div>
    </section>
  )
}

/* ================================================================== */
/*  One scene = one real photo + camera choreography                   */
/* ================================================================== */

function Scene({ scene, i, p, onBegin }: { scene: HeroScene; i: number; p: MotionValue<number>; onBegin: () => void }) {
  const opacity = useSceneOpacity(p, i)
  const local = useLocal(p, i)
  const cam = CAMERA[scene.camera]

  const scale = useTransform(local, [0, 1], [cam.sf, cam.st])
  const x = useTransform(local, [0, 1], [cam.xf, cam.xt])
  const y = useTransform(local, [0, 1], [cam.yf, cam.yt])
  const rotate = useTransform(local, [0, 1], [cam.rf, cam.rt])

  const visible = useMotionSwitch(opacity, 0.2)
  const sweepDrive = useTransform(local, [0.3, 0.4], [0, 1])
  const sweepOn = useMotionSwitch(sweepDrive, 0.5)

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.div className="absolute inset-0" style={{ scale, x, y, rotate }}>
        <SceneMedia scene={scene} active={visible} />
      </motion.div>

      {scene.sweep && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <LightSweep active={sweepOn} />
        </div>
      )}

      <Caption scene={scene} local={local} first={i === 0} />
      {scene.cta && <SceneCTA local={local} onBegin={onBegin} />}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Media: blurred ambient fill + sharp contained subject              */
/* ------------------------------------------------------------------ */

function SceneMedia({ scene, active }: { scene: HeroScene; active: boolean }) {
  const [imgFailed, setImgFailed] = useState(false)
  const [vidFailed, setVidFailed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active) v.play().catch(() => {})
    else v.pause()
  }, [active])

  const showVideo = scene.video && !vidFailed
  const showImage = scene.image && !imgFailed
  if (!showVideo && !showImage) return <Placeholder scene={scene} />

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: CREAM }}>
      {/* ambient fill: same image, blurred + scaled, so edges read as studio air */}
      {showImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img aria-hidden src={scene.image} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ transform: "scale(1.3)", filter: "blur(48px) saturate(1.06)", opacity: 0.95 }} />
      )}
      {/* sharp subject */}
      {showVideo ? (
        <video
          ref={videoRef}
          className="relative h-full w-full object-contain"
          style={{ objectPosition: scene.focus ?? "center" }}
          src={scene.video}
          poster={scene.image}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVidFailed(true)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="relative h-full w-full object-contain"
          style={{ objectPosition: scene.focus ?? "center" }}
          src={scene.image}
          alt=""
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  )
}

function Placeholder({ scene }: { scene: HeroScene }) {
  const path = scene.video ?? scene.image ?? "public/assest/…"
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: CREAM }}>
      <div className="mx-6 flex max-w-md flex-col items-center gap-3 rounded-2xl border px-8 py-10 text-center" style={{ borderColor: HAIRLINE }}>
        <span className={`${notoSerif.className} text-5xl`} style={{ color: `${GOLD}88` }}>
          {String(HERO_SCENES.indexOf(scene) + 1).padStart(2, "0")}
        </span>
        <p className="text-sm font-light leading-relaxed" style={{ color: INK_SOFT }}>{scene.note}</p>
        <code className="mt-1 rounded-md px-2.5 py-1 text-[11px]" style={{ backgroundColor: "rgba(156,123,65,0.14)", color: GOLD }}>{path}</code>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Caption + CTA                                                      */
/* ------------------------------------------------------------------ */

function Caption({ scene, local, first }: { scene: HeroScene; local: MotionValue<number>; first: boolean }) {
  const reduce = useReducedMotion()
  const opacity = useTransform(local, [0.04, 0.16, 0.8, 0.96], [0, 1, 1, 0])
  const y = useTransform(local, [0, 1], [20, -20])
  const place = scene.align === "center" ? "inset-0 items-center" : "inset-x-0 bottom-[18vh] items-end"

  return (
    <motion.div className={`pointer-events-none absolute z-20 flex justify-center px-6 text-center ${place}`} style={{ opacity: first ? undefined : opacity, y: first ? undefined : y }}>
      <div
        className="rounded-2xl px-6 py-4"
        style={{ backgroundColor: "rgba(233,226,215,0.32)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
      >
        {scene.eyebrow && (
          <p className="mb-3 text-[10px] uppercase tracking-[0.34em]" style={{ color: GOLD }}>{scene.eyebrow}</p>
        )}
        <h1 className={`${notoSerif.className} mx-auto max-w-3xl text-4xl leading-[1.08] tracking-tight sm:text-6xl md:text-7xl`} style={{ color: INK }}>
          {first ? (
            <CharReveal text={scene.title} delay={0.5} />
          ) : (
            <>
              {scene.title}
              {scene.accent && (
                <>
                  {" "}
                  <span className="italic" style={{ color: GOLD }}>{scene.accent}</span>
                </>
              )}
            </>
          )}
        </h1>
        {scene.sub && (
          <motion.p
            className="mx-auto mt-4 max-w-md text-xs uppercase tracking-[0.28em] sm:text-sm"
            style={{ color: INK_SOFT }}
            initial={first && !reduce ? { opacity: 0, y: 12 } : false}
            animate={first ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {scene.sub}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

function SceneCTA({ local, onBegin }: { local: MotionValue<number>; onBegin: () => void }) {
  const opacity = useTransform(local, [0.4, 0.72], [0, 1])
  const y = useTransform(local, [0.4, 0.72], [26, 0])
  return (
    <motion.div className="absolute inset-x-0 bottom-[8vh] z-20 flex flex-col items-center gap-4 px-6 sm:flex-row sm:justify-center" style={{ opacity, y }}>
      <MagneticButton
        onClick={onBegin}
        ariaLabel="Begin crafting your piece"
        className="group relative flex items-center overflow-hidden rounded-full px-10 py-4 shadow-[0_14px_40px_rgba(120,95,45,0.28)]"
        style={{ background: goldGradient }}
      >
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#111413]">Begin crafting</span>
        <ArrowUpRight className="ml-1 size-4 text-[#111413] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
      </MagneticButton>
      <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: INK_SOFT }}>Free to design · pay only when you love it</span>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */

function useMotionSwitch(mv: MotionValue<number>, threshold = 0.5) {
  const [on, setOn] = useState(false)
  useMotionValueEvent(mv, "change", (v) => {
    if (v > threshold && !on) setOn(true)
    if (v <= threshold && on) setOn(false)
  })
  return on
}

function ScrollCue({ p, reduce }: { p: MotionValue<number>; reduce: boolean | null }) {
  const opacity = useTransform(p, [0, 0.06], [1, 0])
  return (
    <motion.div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-7 z-40 flex justify-center" style={{ opacity }}>
      <motion.div
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
        style={{ color: INK_SOFT }}
      >
        Scroll
        <span className="h-8 w-px" style={{ background: `linear-gradient(${GOLD}, transparent)` }} />
      </motion.div>
    </motion.div>
  )
}
