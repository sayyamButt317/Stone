"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useReducedMotion } from "motion/react"
import { cormorant, manrope, tk } from "./theme"
import { CursorGlow, GrainOverlay, ScrollProgressBar } from "./primitives"
import Header from "./Header"
import StoneHero from "./StoneHero"
import StatsBar from "./StatsBar"
import Collections from "./Collections"
import Craftsmanship from "./Craftsmanship"
import AppointmentBanner from "./AppointmentBanner"
import Footer from "./Footer"

export default function LandingJourney() {
  const router = useRouter()
  const reduce = useReducedMotion()

  const beginDesign = useCallback(() => {
    router.push("/Client/choose-type")
  }, [router])

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
      className={`${manrope.variable} ${cormorant.variable} ${manrope.className} relative min-h-screen`}
      style={{ backgroundColor: "#000000", color: tk.on }}
    >
      <ScrollProgressBar />
      <CursorGlow />
      <GrainOverlay opacity={0.04} />

      <Header onBook={beginDesign} />
      <StoneHero onExplore={beginDesign} />
      <StatsBar />
      <Collections />
      <Craftsmanship />
      <AppointmentBanner onBook={beginDesign} />
      <Footer />
    </main>
  )
}
