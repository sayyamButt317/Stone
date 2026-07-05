"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useReducedMotion } from "motion/react"
import { manrope, notoSerif, tk } from "./theme"
import {
  CursorGlow,
  GrainOverlay,
  ScrollProgressBar,
} from "./primitives"
import Hero from "./Hero"
import VideoSlider from "./VideoSlider"
import Problem from "./Problem"
import Solution from "./Solution"
import MakingSequence from "./MakingSequence"
import HowItWorks from "./HowItWorks"
import Features from "./Features"
import Testimonials from "./Testimonials"
import Stats from "./Stats"
import FinalCTA from "./FinalCTA"

export default function LandingJourney() {
  const router = useRouter()
  const reduce = useReducedMotion()

  // The whole journey funnels into the existing design flow.
  const begin = useCallback(() => {
    router.push("/Client/choose-type")
  }, [router])

  // Smooth anchor scrolling, unless the visitor prefers reduced motion.
  useEffect(() => {
    if (reduce) return
    const prev = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = prev
    }
  }, [reduce])

  return (
    <main
      className={`${manrope.variable} ${notoSerif.variable} ${manrope.className} relative selection:bg-[#e2c196] selection:text-[#111413]`}
      style={{ backgroundColor: tk.surface, color: tk.on }}
    >
      {/* ambient global layers */}
      <ScrollProgressBar />
      <CursorGlow />
      <GrainOverlay />

      {/* the story, chapter by chapter */}
      <Hero onBegin={begin} />
      <VideoSlider />
      <Problem />
      <Solution />
      <MakingSequence />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Stats />
      <FinalCTA onBegin={begin} />
    </main>
  )
}
