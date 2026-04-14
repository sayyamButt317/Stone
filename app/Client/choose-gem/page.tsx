"use client"

import { useMemo, useState } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import useJewelleryStore from "@/app/store/jewellery-store"
import Stepper from "@/components/Client/stepper"
import { GemChoice } from "@/app/types/gem-type"
import { GEMS } from "@/app/constant/gem"
import Image from 'next/image'
import { FLOW_ROUTES } from "../flow-routes"
import { useRouter } from "next/navigation"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
})

const ACCENT = "#e2c196"
const SURFACE = "#111413"
const ON_SURFACE = "#e1e3e1"
const ON_SURFACE_VARIANT = "#c1c8c5"

type Props = {
  step?: number
  totalSteps?: number
  onBack?: () => void
  onContinue?: (gem: GemChoice) => void
}

export default function ChooseGem({
  step = 3,
  totalSteps = 7,
  onBack,
}: Props) {

  const [selectedGem, setSelectedGem] = useState<GemChoice>("emerald")
  const router = useRouter();

  const selectedGemData = useMemo(
    () => GEMS.find((gem) => gem.id === selectedGem) ?? GEMS[0],
    [selectedGem]
  )

  const { setGemType } = useJewelleryStore()

  const handleBack = () => {
    if (onBack) {
      onBack()
    }
  }

  const handleContinue = (() => {
    if (!selectedGem) return
    router.push(FLOW_ROUTES.chooseMetal)
  })

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 flex-col overflow-hidden",
        "selection:bg-[#e2c196] selection:text-[#111413]",
        manrope.className
      )}
      style={{ color: ON_SURFACE, backgroundColor: SURFACE }}
    >
      <h1 className="sr-only">Select your gemstone for custom creation.</h1>

      {/* NAV */}
      <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-[#111413]/80 px-8 backdrop-blur-xl">
        <div
          className={cn("text-xl font-light italic tracking-tight", notoSerif.className)}
          style={{ color: ACCENT }}
        >
          The Midnight Atelier
        </div>
      </nav>

      {/* MAIN */}
      <main className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-32 pb-40 md:px-8">

        <div className="mx-auto mb-12 w-full max-w-md">
          <Stepper step={step} totalSteps={totalSteps} label="Gemstone Selection" />
        </div>

        {/* HEADER */}
        <header className="mb-16 text-center">
          <h1 className={cn("mb-4 text-4xl font-light italic md:text-6xl", notoSerif.className)}>
            Select your gemstone
          </h1>
          <p
            className="mx-auto max-w-lg text-sm opacity-80 md:text-base"
            style={{ color: ON_SURFACE_VARIANT }}
          >
            Choose a stone that defines your piece, reflecting your personal narrative through its eternal hue.
          </p>
        </header>


        <section className="relative w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pt-4 pb-12">
            {GEMS.map((gem) => {
              const isSelected = gem.id === selectedGem
              return (
                <button
                  key={gem.id}
                  type="button"
                  onClick={() => {
                    setSelectedGem(gem.id)
                    setGemType(gem.id)
                  }}
                  className={cn(
                    "group rounded-xl",
                    "focus-visible:ring-2 focus-visible:ring-[#e2c196]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111413] focus-visible:outline-none"
                  )}
                >
                  <div
                    className={cn(
                      "w-full rounded-xl border p-8 text-center transition-all duration-500 flex flex-col items-center",
                      "bg-[rgba(25,28,27,0.6)] backdrop-blur-3xl",
                      isSelected
                        ? "translate-y-[-8px] border-[#e2c196]/60 shadow-[0_0_30px_rgba(226,193,150,0.2)]"
                        : "border-[#414846]/15 hover:-translate-y-2 hover:border-[#e2c196]/40"
                    )}
                  >
                    <div className="relative mb-8 flex size-40 items-center justify-center">
                      <div
                        className={cn(
                          "absolute inset-0 rounded-full blur-3xl transition-transform duration-700",
                          gem.glowClassName,
                          isSelected ? "scale-110" : "scale-75 group-hover:scale-100"
                        )}
                      />
                      <Image
                        src={gem.imageUrl}
                        alt={gem.name}
                        width={100}
                        height={100}
                        className={cn(
                          "z-10 rounded-full object-cover shadow-2xl transition-transform duration-500",
                          isSelected
                            ? "size-36 scale-110"
                            : "size-32 group-hover:scale-110"
                        )}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 rounded-full border-2 border-[#e2c196]/30" />
                      )}
                    </div>

                    <h3 className={cn("mb-2 text-2xl", notoSerif.className)}>
                      {gem.name}
                    </h3>

                    <p className="text-xs tracking-widest uppercase opacity-70">
                      {gem.subtitle}
                    </p>

                    {isSelected && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="size-1 animate-pulse rounded-full bg-[#e2c196]" />
                        <span className="text-[10px] tracking-widest text-[#e2c196] uppercase">
                          Selected Choice
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Optional arrows (kept for UI consistency) */}
          <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 opacity-20">
            <ChevronLeft />
          </div>
          <div className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 opacity-20">
            <ChevronRight />
          </div>
        </section>

        {/* INFO */}
        <section className="mx-auto mt-12 w-full max-w-3xl rounded-xl border border-dashed border-[#414846]/30 bg-[rgba(25,28,27,0.6)] p-8 backdrop-blur-3xl">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex size-16 items-center justify-center rounded-full border border-[#e2c196]/20 bg-[#282b29] text-[#e2c196]">
              <Sparkles className="size-7" />
            </div>
            <div>
              <h4 className={cn("mb-2 text-xl", notoSerif.className)}>
                {selectedGemData.name} Heritage Selection
              </h4>
              <p className="text-sm opacity-80" style={{ color: ON_SURFACE_VARIANT }}>
                The {selectedGemData.name} is curated for exceptional beauty and responsible sourcing.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={cn("fixed bottom-8 left-1/2 z-50 flex w-auto min-w-[320px] -translate-x-1/2 items-center justify-between gap-4 rounded-full border p-2 md:min-w-[500px]", "border-[#414846]/15 bg-[#191c1b]/60 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl")} >
        <button type="button"
          onClick={handleBack}
          className="flex items-center gap-2 px-8 py-3 text-[#e1e3e1] transition-all duration-500 hover:scale-105 active:scale-95" > <ArrowLeft className="size-[18px]" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase"> Back </span>
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="group flex items-center gap-3 rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-10 py-3 text-[#111413] shadow-[0_0_20px_rgba(226,193,150,0.3)] transition-all duration-500 hover:scale-105 active:scale-95" >
          <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase"> Proceed to Metal Selection </span> <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-1" />
        </button>
      </footer>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-teal-300/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[50%] w-[50%] rounded-full bg-[#e2c196]/5 blur-[100px]" />
      </div>
    </div>
  )
}