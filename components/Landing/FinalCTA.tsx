"use client"

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"
import { useRef, useState } from "react"
import { ArrowUpRight, Check } from "lucide-react"
import { notoSerif, tk, goldGradient } from "./theme"
import { CharReveal, MagneticButton } from "./primitives"

export default function FinalCTA({ onBegin }: { onBegin: () => void }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [launching, setLaunching] = useState(false)

  // gold glow tracks the cursor across the panel
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const sgx = useSpring(gx, { stiffness: 80, damping: 20 })
  const sgy = useSpring(gy, { stiffness: 80, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(600px circle at ${sgx}% ${sgy}%, rgba(226,193,150,0.14), transparent 55%)`

  function move(e: React.MouseEvent) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    gx.set(((e.clientX - r.left) / r.width) * 100)
    gy.set(((e.clientY - r.top) / r.height) * 100)
  }

  function launch() {
    if (launching) return
    setLaunching(true)
    if (reduce) {
      onBegin()
      return
    }
    // let the success wipe play, then hand off to the design flow
    window.setTimeout(onBegin, 750)
  }

  return (
    <section
      id="chapter-8"
      ref={ref}
      onMouseMove={move}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-32"
      style={{ backgroundColor: tk.surfaceDeep, color: tk.on }}
    >
      {/* morphing background blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[720px] max-w-[720px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(circle, ${tk.green}aa 0%, transparent 60%)`,
          filter: "blur(50px)",
        }}
        animate={
          reduce
            ? undefined
            : {
                borderRadius: [
                  "42% 58% 63% 37% / 41% 44% 56% 59%",
                  "58% 42% 37% 63% / 56% 59% 41% 44%",
                  "42% 58% 63% 37% / 41% 44% 56% 59%",
                ],
                scale: [1, 1.08, 1],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="mb-8 text-[11px] uppercase tracking-[0.3em]" style={{ color: tk.accent }}>
          Chapter VIII — Your turn
        </p>
        <h2
          className={`${notoSerif.className} max-w-3xl text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl`}
        >
          <CharReveal text="Your jewel is one" trigger="view" className="block" />
          <span className="block italic" style={{ color: tk.accent }}>
            <CharReveal text="idea away." trigger="view" delay={0.3} />
          </span>
        </h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-7 max-w-lg text-base font-light leading-relaxed sm:text-lg"
          style={{ color: tk.onVar }}
        >
          No showroom. No waiting. Just the piece that's been yours all along —
          waiting for you to design it.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <MagneticButton
            onClick={launch}
            ariaLabel="Begin crafting your piece"
            strength={0.5}
            className="group relative flex items-center overflow-hidden rounded-full px-12 py-5 shadow-[0_0_60px_rgba(226,193,150,0.3)]"
            style={{ background: goldGradient }}
          >
            <span className="text-sm font-bold uppercase tracking-[0.24em] text-[#111413]">
              Begin crafting
            </span>
            <ArrowUpRight
              className="ml-1 size-4 text-[#111413] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
          </MagneticButton>
        </motion.div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.2em]" style={{ color: tk.onFaint }}>
          Free to design · Only pay when you love it
        </p>
      </div>

      {/* footer wordmark */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <span className={`${notoSerif.className} text-sm tracking-[0.35em]`} style={{ color: tk.onFaint }}>
          L&apos;ATELIER
        </span>
      </div>

      {/* success transition: gold wipe on launch */}
      <AnimatePresence>
        {launching && !reduce && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center"
            style={{ background: goldGradient }}
            initial={{ clipPath: "circle(0% at 50% 60%)" }}
            animate={{ clipPath: "circle(150% at 50% 60%)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3 text-[#111413]"
            >
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-[#111413]">
                <Check className="size-7" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em]">
                Opening the atelier
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
