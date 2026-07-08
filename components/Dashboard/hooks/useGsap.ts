"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "motion/react"

let registered = false

function ensureGsap() {
  if (typeof window === "undefined" || registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export function useDashReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()

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
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [delay, reduce])

  return ref
}

export function useDashStagger<T extends HTMLElement>(stagger = 0.08) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const container = ref.current
    if (!container) return
    ensureGsap()
    const items = container.querySelectorAll("[data-dash-item]")
    if (!items.length) return
    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: container, start: "top 88%", once: true },
      })
    }, container)
    return () => ctx.revert()
  }, [stagger, reduce])

  return ref
}

export function usePathDraw(ref: React.RefObject<SVGPathElement | null>, delay = 0.3) {
  const reduce = useReducedMotion()

  useEffect(() => {
    const path = ref.current
    if (!path) return
    ensureGsap()
    if (reduce) {
      gsap.set(path, { strokeDashoffset: 0 })
      return
    }
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.8,
      delay,
      ease: "power2.out",
    })
  }, [ref, delay, reduce])
}

export function useMountFade<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduce) return
    gsap.from(el, { opacity: 0, y: 16, duration: 0.7, delay, ease: "power3.out" })
  }, [delay, reduce])

  return ref
}
