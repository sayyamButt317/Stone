"use client"

import {
  motion,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
  type MotionValue,
  type Variants,
} from "motion/react"
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { tk } from "./theme"

/* ------------------------------------------------------------------ */
/*  Text reveals — everything enters through a mask, never a bare fade */
/* ------------------------------------------------------------------ */

type RevealTrigger = "mount" | "view"

/**
 * Character-by-character reveal for hero headlines. Each glyph rises out of
 * a clipped line, so the words feel assembled rather than faded in.
 */
export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.028,
  trigger = "mount",
  as: Tag = "span",
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  trigger?: RevealTrigger
  as?: "span" | "h1" | "h2" | "p"
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-12% 0px" })
  const words = text.split(" ")

  const active = reduce ? true : trigger === "mount" ? true : inView
  let charIndex = 0

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden
          className="inline-block whitespace-nowrap"
          style={{ overflow: "hidden", verticalAlign: "top" }}
        >
          {word.split("").map((char) => {
            const i = charIndex++
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? false : { y: "115%", opacity: 0 }}
                animate={
                  active ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }
                }
                transition={{
                  duration: 0.9,
                  delay: delay + i * stagger,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            )
          })}
          {/* preserve the space between words, but keep it outside the mask */}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}

/** Word-by-word reveal — used for cinematic quotes. */
export function WordsReveal({
  text,
  className,
  stagger = 0.06,
  delay = 0,
}: {
  text: string
  className?: string
  stagger?: number
  delay?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })
  const active = reduce ? true : inView
  const words = text.split(" ")

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={active ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && <>&nbsp;</>}
        </span>
      ))}
    </span>
  )
}

/** Generic on-scroll reveal wrapper. Rises + unblurs into place, once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  style,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  style?: CSSProperties
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ------------------------------------------------------------------ */
/*  Number that assembles when it enters view                          */
/* ------------------------------------------------------------------ */

export function Counter({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration = 2,
}: {
  to: number
  from?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20% 0px" })
  const [val, setVal] = useState(from)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, from, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Magnetic button with click ripple                                  */
/* ------------------------------------------------------------------ */

export function MagneticButton({
  children,
  onClick,
  className,
  style,
  strength = 0.4,
  ariaLabel,
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  style?: CSSProperties
  strength?: number
  ariaLabel?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 })
  const [ripples, setRipples] = useState<{ id: number; cx: number; cy: number }[]>(
    []
  )
  const rid = useRef(0)

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }
  function handleClick(e: React.MouseEvent) {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect()
      const id = rid.current++
      setRipples((p) => [...p, { id, cx: e.clientX - r.left, cy: e.clientY - r.top }])
      setTimeout(() => setRipples((p) => p.filter((rp) => rp.id !== id)), 750)
    }
    onClick?.()
  }

  return (
    <motion.button
      ref={ref}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
      style={{ x: sx, y: sy, ...style }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      <span className="pointer-events-none relative z-10 flex items-center gap-3">
        {children}
      </span>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: r.cx,
            top: r.cy,
            background: "rgba(17,20,19,0.35)",
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{ width: 520, height: 520, opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/*  Ambient layers: cursor glow, grain, scroll progress                */
/* ------------------------------------------------------------------ */

/** A large blurred gold light that trails the cursor. Desktop + motion only. */
export function CursorGlow() {
  const reduce = useReducedMotion()
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 90, damping: 20, mass: 0.6 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (reduce) return
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true)
    function move(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [reduce, x, y])

  if (!enabled) return null
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-30 h-[320px] w-[320px] rounded-full mix-blend-screen"
      style={{
        left: sx,
        top: sy,
        x: "-50%",
        y: "-50%",
        background: `radial-gradient(circle, ${tk.accent}18 0%, transparent 65%)`,
      }}
    />
  )
}

/** Fixed animated noise texture — the grain of a photographed jewel. */
export function GrainOverlay({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ opacity, mixBlendMode: "overlay" }}
    >
      <svg className="h-full w-full">
        <filter id="atelier-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#atelier-grain)" />
      </svg>
    </div>
  )
}

/** Slim scroll-progress meter pinned to the top of the viewport. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background: `linear-gradient(to right, ${tk.accentDeep}, ${tk.accent})`,
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Decorative: morphing blob + SVG path draw                          */
/* ------------------------------------------------------------------ */

/** Slowly drifting, blurred gradient orb for chapter atmosphere. */
export function Blob({
  color,
  className,
  size = 520,
  drift = 40,
}: {
  color: string
  className?: string
  size?: number
  drift?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
      animate={
        reduce
          ? undefined
          : { x: [0, drift, -drift * 0.6, 0], y: [0, -drift * 0.8, drift, 0] }
      }
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

/** A line that draws itself when scrolled into view. */
export function DrawLine({
  className,
  vertical = false,
  color = tk.accent,
}: {
  className?: string
  vertical?: boolean
  color?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  return (
    <svg
      ref={ref}
      className={className}
      viewBox={vertical ? "0 0 2 100" : "0 0 100 2"}
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.line
        x1={vertical ? 1 : 0}
        y1={vertical ? 0 : 1}
        x2={vertical ? 1 : 100}
        y2={vertical ? 100 : 1}
        stroke={color}
        strokeWidth={vertical ? 2 : 2}
        strokeOpacity={0.5}
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

/* small helper to expose parallax from a shared scroll value */
export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

export { useMotionTemplate }
