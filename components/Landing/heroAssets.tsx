"use client"

import { motion, useReducedMotion } from "motion/react"
import { useEffect, useState, type CSSProperties, type ReactNode } from "react"
import { tk } from "./theme"

/** true only after the first client render — used to keep decorative,
 *  animated-on-mount layers out of SSR so they don't hydration-mismatch. */
function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

/** quantise a coordinate so server + client SVG markup match to the digit */
const q = (n: number) => Math.round(n * 100) / 100

/**
 * Original SVG jewellery + hand + atmosphere assets for the cinematic hero.
 * Nothing here is traced from a reference — these are built from primitives so
 * they can be lit, blurred and animated per scene.
 */

/* Shared gradients + filters, mounted once. Assets reference them by id. */
export function HeroDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="h-skin" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#f4ddc6" />
          <stop offset="45%" stopColor="#e3bd9c" />
          <stop offset="100%" stopColor="#b98a68" />
        </linearGradient>
        <linearGradient id="h-skin2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7e4d2" />
          <stop offset="50%" stopColor="#e6c3a6" />
          <stop offset="100%" stopColor="#c0906d" />
        </linearGradient>
        <linearGradient id="h-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9ead0" />
          <stop offset="45%" stopColor={tk.accent} />
          <stop offset="100%" stopColor={tk.accentDeep} />
        </linearGradient>
        <linearGradient id="h-gem" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#e9f4f2" />
          <stop offset="100%" stopColor="#a9c4bf" />
        </linearGradient>
        <radialGradient id="h-gem-core" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f2f8f6" />
          <stop offset="100%" stopColor="#9fb9b3" />
        </radialGradient>
        <filter id="h-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Diamond — round-brilliant seen from the table                      */
/* ------------------------------------------------------------------ */

export function Diamond({
  size = 80,
  className,
  style,
}: {
  size?: number
  className?: string
  style?: CSSProperties
}) {
  // unit shape in a -50..50 box, scaled by size
  const outer = "M0,-46 L20,-38 L38,-20 L46,0 L38,20 L20,38 L0,46 L-20,38 L-38,20 L-46,0 L-38,-20 L-20,-38 Z"
  const table = "M0,-20 L14,-14 L20,0 L14,14 L0,20 L-14,14 L-20,0 L-14,-14 Z"
  const spokes = [
    "M0,-46 L0,-20", "M38,-20 L14,-14", "M46,0 L20,0", "M38,20 L14,14",
    "M0,46 L0,20", "M-38,20 L-14,14", "M-46,0 L-20,0", "M-38,-20 L-14,-14",
    "M20,-38 L14,-14", "M20,38 L14,14", "M-20,38 L-14,14", "M-20,-38 L-14,-14",
  ].join(" ")
  return (
    <svg viewBox="-52 -52 104 104" width={size} height={size} className={className} style={style}>
      <polygon
        points="0,-46 20,-38 38,-20 46,0 38,20 20,38 0,46 -20,38 -38,20 -46,0 -38,-20 -20,-38"
        fill="url(#h-gem)"
      />
      <path d={outer} fill="none" stroke="#7fa39c" strokeOpacity="0.4" strokeWidth="0.8" />
      <path d={spokes} fill="none" stroke="#5f817b" strokeOpacity="0.35" strokeWidth="0.7" />
      <path d={table} fill="url(#h-gem-core)" />
      <path d={table} fill="none" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="0.7" />
      {/* crown highlight */}
      <path d="M-10,-24 L4,-30 L8,-18 Z" fill="#ffffff" opacity="0.6" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Necklace — draped chain with graduated stones + pendant            */
/* ------------------------------------------------------------------ */

export function Necklace({
  width = 460,
  className,
  style,
}: {
  width?: number
  className?: string
  style?: CSSProperties
}) {
  const stones = Array.from({ length: 15 }, (_, i) => {
    const t = i / 14
    const x = q(-190 + t * 380)
    const rx = x / 190
    // catenary-ish drape (v*v, not Math.pow, so SSR + client agree exactly)
    const y = q(-60 + rx * rx * 150)
    const s = q(3 + (1 - Math.abs(x) / 190) * 6)
    return { x, y, s }
  })
  return (
    <svg viewBox="-230 -90 460 260" width={width} className={className} style={style}>
      <path
        d="M-190,-60 C -120,110 120,110 190,-60"
        fill="none"
        stroke="url(#h-gold)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {stones.map((st, i) => (
        <g key={i} transform={`translate(${st.x} ${st.y})`}>
          <circle r={st.s + 1.6} fill="url(#h-gold)" opacity="0.9" />
          <circle r={st.s} fill="url(#h-gem)" />
          <circle r={st.s} fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="0.5" />
        </g>
      ))}
      {/* pendant */}
      <g transform="translate(0 92)">
        <line x1="0" y1="-4" x2="0" y2="8" stroke="url(#h-gold)" strokeWidth="2.5" />
        <g transform="translate(0 20)">
          <Teardrop />
        </g>
      </g>
    </svg>
  )
}

function Teardrop() {
  return (
    <>
      <path d="M0,-20 C 14,-6 14,10 0,22 C -14,10 -14,-6 0,-20 Z" fill="url(#h-gem)" />
      <path d="M0,-20 C 14,-6 14,10 0,22 C -14,10 -14,-6 0,-20 Z" fill="none" stroke="#7fa39c" strokeOpacity="0.4" strokeWidth="0.7" />
      <path d="M0,-14 L6,-2 L0,16 L-6,-2 Z" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="0.6" />
      <ellipse cx="-3" cy="-8" rx="3" ry="5" fill="#ffffff" opacity="0.6" />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Bracelet — tennis line of diamonds on a wrist band                 */
/* ------------------------------------------------------------------ */

export function Bracelet({
  width = 300,
  className,
  style,
}: {
  width?: number
  className?: string
  style?: CSSProperties
}) {
  const stones = Array.from({ length: 18 }, (_, i) => {
    const a = Math.PI * (0.08 + (i / 17) * 0.84) // lower arc
    // round trig output: Node and the browser's V8 differ in the last ULP,
    // which would otherwise cause an SSR hydration mismatch.
    const x = q(Math.cos(a) * 120)
    const y = q(Math.sin(a) * 70)
    return { x, y }
  })
  return (
    <svg viewBox="-140 -90 280 190" width={width} className={className} style={style}>
      <ellipse cx="0" cy="0" rx="120" ry="70" fill="none" stroke="url(#h-gold)" strokeWidth="8" strokeOpacity="0.5" />
      <ellipse cx="0" cy="0" rx="120" ry="70" fill="none" stroke="url(#h-gold)" strokeWidth="3" />
      {stones.map((s, i) => (
        <g key={i} transform={`translate(${s.x} ${s.y})`}>
          <rect x="-4" y="-4" width="8" height="8" rx="1.5" fill="url(#h-gold)" />
          <rect x="-2.6" y="-2.6" width="5.2" height="5.2" rx="1" fill="url(#h-gem)" />
        </g>
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Ring + Earring                                                     */
/* ------------------------------------------------------------------ */

export function Ring({ size = 120, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="-70 -70 140 150" width={size} className={className} style={style}>
      <ellipse cx="0" cy="24" rx="42" ry="46" fill="none" stroke="url(#h-gold)" strokeWidth="10" />
      <ellipse cx="0" cy="24" rx="42" ry="46" fill="none" stroke="#6b5326" strokeOpacity="0.2" strokeWidth="10" />
      <path d="M-14,-22 L14,-22 L10,-46 L-10,-46 Z" fill="url(#h-gold)" opacity="0.8" />
      <g transform="translate(0 -44)">
        <Diamond size={44} style={{ overflow: "visible" }} />
      </g>
    </svg>
  )
}

export function Earring({ size = 90, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="-40 -40 80 130" width={size} className={className} style={style}>
      <circle cx="0" cy="-24" r="6" fill="url(#h-gem)" stroke="url(#h-gold)" strokeWidth="2" />
      <line x1="0" y1="-18" x2="0" y2="4" stroke="url(#h-gold)" strokeWidth="2" />
      <g transform="translate(0 24)">
        <Teardrop />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Hand — stylised editorial silhouette                               */
/* ------------------------------------------------------------------ */

export function Hand({
  gradient = "h-skin",
  className,
  style,
}: {
  gradient?: "h-skin" | "h-skin2"
  className?: string
  style?: CSSProperties
}) {
  // slender fingers fanned from a palm+wrist, wrist at the bottom
  const fingers = [
    { x: 96, top: 150, w: 30 },
    { x: 138, top: 96, w: 32 },
    { x: 182, top: 78, w: 32 },
    { x: 224, top: 122, w: 30 },
  ]
  return (
    <svg viewBox="0 0 320 480" className={className} style={style}>
      {/* wrist + palm */}
      <path
        d="M104,470 C 96,360 92,300 100,250 C 108,205 210,205 220,250 C 228,300 224,360 216,470 Z"
        fill={`url(#${gradient})`}
      />
      {/* fingers */}
      {fingers.map((f, i) => (
        <rect
          key={i}
          x={f.x - f.w / 2}
          y={f.top}
          width={f.w}
          height={270 - f.top}
          rx={f.w / 2}
          fill={`url(#${gradient})`}
        />
      ))}
      {/* thumb */}
      <g transform="rotate(28 96 300)">
        <rect x="60" y="250" width="30" height="120" rx="15" fill={`url(#${gradient})`} />
      </g>
      {/* soft shading down one side for form */}
      <path
        d="M170,220 C 210,225 224,300 216,470 L188,470 C 196,340 190,270 170,230 Z"
        fill="#00000022"
      />
      {/* top-light rim */}
      <path
        d="M100,250 C 108,210 200,210 214,246 C 200,236 116,236 104,254 Z"
        fill="#ffffff"
        opacity="0.18"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Atmosphere — floating dust + sparkle particles                     */
/* ------------------------------------------------------------------ */

// deterministic pseudo-random so SSR + client match (no Math.random at module load)
function seeded(i: number, salt: number) {
  const v = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453
  return v - Math.floor(v)
}

export function DustField({ count = 26, className }: { count?: number; className?: string }) {
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const dots = Array.from({ length: count }, (_, i) => ({
    left: `${seeded(i, 1) * 100}%`,
    top: `${seeded(i, 2) * 100}%`,
    size: 1 + seeded(i, 3) * 2.5,
    dur: 8 + seeded(i, 4) * 12,
    delay: seeded(i, 5) * 6,
    drift: 10 + seeded(i, 6) * 30,
  }))
  if (!mounted) return null
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: tk.accent,
            opacity: 0.35,
            filter: "blur(0.5px)",
          }}
          animate={reduce ? undefined : { y: [0, -d.drift, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}

export function SparkleField({ count = 10, className }: { count?: number; className?: string }) {
  const reduce = useReducedMotion()
  const mounted = useMounted()
  const stars = Array.from({ length: count }, (_, i) => ({
    left: `${8 + seeded(i, 7) * 84}%`,
    top: `${8 + seeded(i, 8) * 84}%`,
    size: 6 + seeded(i, 9) * 10,
    delay: seeded(i, 10) * 3,
    dur: 1.6 + seeded(i, 11) * 1.8,
  }))
  if (!mounted) return null
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className ?? ""}`}>
      {stars.map((s, i) => (
        <motion.svg
          key={i}
          viewBox="-10 -10 20 20"
          className="absolute"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={reduce ? { opacity: 0.6 } : { opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 45, 0] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M0,-9 L2,-2 L9,0 L2,2 L0,9 L-2,2 L-9,0 L-2,-2 Z" fill="#fff7e6" />
        </motion.svg>
      ))}
    </div>
  )
}

/** A light bar that sweeps across whatever it's placed over. */
export function LightSweep({
  active,
  delay = 0,
  className,
}: {
  active?: boolean
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 48%, transparent 60%)",
        mixBlendMode: "screen",
      }}
      initial={{ x: "-120%" }}
      animate={active ? { x: "120%" } : { x: "-120%" }}
      transition={{ duration: 1.8, delay, ease: [0.4, 0, 0.2, 1] }}
    />
  )
}

export function StageWrap({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={style}>
      {children}
    </div>
  )
}
