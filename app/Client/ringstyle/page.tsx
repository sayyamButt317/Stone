"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Manrope, Noto_Serif } from "next/font/google"
import {
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FLOW_ROUTES } from "../flow-routes"
import { RING_STYLES, RingStyleType } from "@/app/types/ring-type"
import useJewelleryStore from "@/app/store/jewellery-store"
import Image from 'next/image'

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
})


export default function RingStylePage() {
  const router = useRouter()
  const [selectedStyle, setSelectedStyle] = useState<RingStyleType>("solitaire")
  const setRingStyleFamily = useJewelleryStore((s) => s.setRingStyleFamily)

  const selectedName = useMemo(
    () => RING_STYLES.find((style) => style.id === selectedStyle)?.name ?? "Solitaire",
    [selectedStyle]
  )

  return (
    <div
      className={cn(
        "min-h-screen bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196]/30",
        manrope.className
      )}
    >
      <header className="fixed top-0 z-50 flex h-20 w-full items-center border-b border-[#414846]/15 bg-[#111413]/80 px-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {/* <div className={cn("text-2xl font-light tracking-[0.2em]", notoSerif.className)}>
          L&apos;ATELIER
        </div> */}
        <button
          type="button"
          onClick={() => router.push(FLOW_ROUTES.chooseType)}
          className="rounded-full cursor-pointer border border-[#414846]/30 px-8 py-3 text-xs tracking-widest text-[#e1e3e1] uppercase transition-opacity hover:opacity-90"
        >
          <span className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Back
          </span>
        </button>
      </header>


      <main className="relative mx-auto max-w-7xl px-6 pt-32 pb-40 md:px-20">

        <div className="pointer-events-none fixed top-[-10%] right-[-10%] z-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_50%_50%,#0f2a26_0%,transparent_70%)] opacity-40" />
        <div className="pointer-events-none fixed bottom-[-10%] left-[-10%] z-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_50%_50%,#0f2a26_0%,transparent_70%)] opacity-40" />

        <section className="relative z-10 mb-16 text-center">
          <h1 className={cn("mb-4 text-4xl tracking-tight md:text-6xl", notoSerif.className)}>
            Select your ring style
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[#e1e3e1]/60">
            Choose a silhouette that speaks to your aesthetic
          </p>
        </section>

        <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {RING_STYLES.map(({ id, name, description, Icon }) => {
            const isSelected = selectedStyle === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSelectedStyle(id)
                  setRingStyleFamily(name)
                }}
                className={cn(
                  "flex flex-col items-center cursor-pointer rounded-lg p-8 text-center transition-all duration-500",
                  "border bg-[#191c1b]/30 backdrop-blur-sm",
                  isSelected
                    ? "scale-105 border-[#e2c196]/40 bg-[#1d201f]/40 shadow-[0_0_30px_rgba(226,193,150,0.2)]"
                    : "border-[#414846]/15 hover:border-[#e2c196]/30"
                )}
              >
                <div
                  className={cn(
                    "mb-6 transition-colors",
                    isSelected ? "text-[#e2c196]" : "text-[#e1e3e1]/60 group-hover:text-[#e2c196]"
                  )}
                >
                  <Icon className="size-10" strokeWidth={1.5} />
                </div>
                <h3 className={cn("mb-2 text-lg", notoSerif.className)}>{name}</h3>
                <p className="text-xs leading-relaxed font-light text-[#e1e3e1]/40">{description}</p>
                {isSelected ? (
                  <div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-[#e2c196]/20" />
                ) : null}
              </button>
            )
          })}
        </div>

      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-end bg-[#111413]/90 px-10 py-6 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
        <button
          type="button"
          onClick={() => {
            setRingStyleFamily(selectedName)
            router.push(FLOW_ROUTES.chooseGender)
          }}
          className="rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] px-10 py-4 text-xs font-bold tracking-widest text-[#111413] uppercase shadow-[0_10px_20px_rgba(226,193,150,0.2)] transition-opacity hover:opacity-90"
        >
          <span className="flex items-center cursor-pointer gap-3">
            Next: Choose Intended Wearer
          </span>
        </button>
      </footer>
    </div>
  )
}
