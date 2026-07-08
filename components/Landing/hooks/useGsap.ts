"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "motion/react"
import type { GsapRevealOptions } from "../types"

let registered = false

function ensureGsap() {
  if (typeof window === "undefined" || registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

/**
 * Scroll-triggered reveal for a single element ref.
 * Respects prefers-reduced-motion by skipping animation.
 */
export function useGsapReveal<T extends HTMLElement>(
  options: GsapRevealOptions = {},
) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()
  const {
    y = 40,
    opacity = 0,
    duration = 1,
    delay = 0,
    start = "top 85%",
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    ensureGsap()

    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity,
        y,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: "play none none none",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [reduce, y, opacity, duration, delay, start, once])

  return ref
}

/**
 * Staggered reveal for children matching `[data-reveal]` inside a container.
 */
export function useGsapStagger<T extends HTMLElement>(
  options: GsapRevealOptions = {},
) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()
  const {
    y = 32,
    opacity = 0,
    duration = 0.85,
    delay = 0,
    stagger = 0.1,
    start = "top 82%",
    once = true,
  } = options

  useEffect(() => {
    const container = ref.current
    if (!container) return
    ensureGsap()

    const targets = container.querySelectorAll("[data-reveal]")
    if (!targets.length) return

    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity,
        y,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start,
          once,
          toggleActions: "play none none none",
        },
      })
    }, container)

    return () => ctx.revert()
  }, [reduce, y, opacity, duration, delay, stagger, start, once])

  return ref
}

/**
 * Hero entrance timeline — runs once on mount.
 */
export function useGsapHeroTimeline(
  containerRef: React.RefObject<HTMLElement | null>,
  selectors: {
    eyebrow?: string
    title?: string
    description?: string
    actions?: string
    badges?: string
    media?: string
  },
) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    ensureGsap()

    if (reduce) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      if (selectors.eyebrow) {
        tl.from(selectors.eyebrow, { opacity: 0, y: 20, duration: 0.7 }, 0.2)
      }
      if (selectors.title) {
        tl.from(
          `${selectors.title} [data-char]`,
          { opacity: 0, y: "110%", duration: 0.8, stagger: 0.025 },
          0.35,
        )
      }
      if (selectors.description) {
        tl.from(selectors.description, { opacity: 0, y: 24, duration: 0.8 }, 0.75)
      }
      if (selectors.actions) {
        tl.from(selectors.actions, { opacity: 0, y: 20, duration: 0.7 }, 0.95)
      }
      if (selectors.badges) {
        tl.from(
          `${selectors.badges} [data-badge]`,
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 },
          1.1,
        )
      }
      if (selectors.media) {
        tl.from(selectors.media, { opacity: 0, scale: 1.08, duration: 1.4 }, 0.3)
      }
    }, container)

    return () => ctx.revert()
    // selectors are stable string literals from the caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, reduce])
}

/**
 * Parallax on scroll for hero imagery.
 */
export function useGsapParallax<T extends HTMLElement>(
  speed = 40,
  start = "top bottom",
  end = "bottom top",
) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce) return
    ensureGsap()

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [speed, start, end, reduce])

  return ref
}

/**
 * Count-up animation driven by ScrollTrigger.
 */
export function useGsapCounter(
  ref: React.RefObject<HTMLElement | null>,
  to: number,
  options: { duration?: number; decimals?: number; suffix?: string; prefix?: string } = {},
) {
  const reduce = useReducedMotion()
  const { duration = 2, decimals = 0, suffix = "", prefix = "" } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    ensureGsap()

    if (reduce) {
      el.textContent = `${prefix}${to.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`
      return
    }

    const counter = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.val.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })}${suffix}`
        },
      })
    }, el)

    return () => ctx.revert()
  }, [ref, to, duration, decimals, suffix, prefix, reduce])
}
