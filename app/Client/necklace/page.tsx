"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Manrope, Noto_Serif } from "next/font/google"
import {
  ArrowLeft,
  Circle,
  Diamond,
  Droplets,
  Flame,
  Gem,
  Link2,
  Lock,
  Sparkles,
  Star,
  Sun,
  WandSparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FLOW_ROUTES } from "../flow-routes"
import Image from 'next/image'
import { NecklaceStyle } from "@/app/types/necklace-type"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
})


const OPTIONS: Array<{
  id: NecklaceStyle
  label: string
  Icon: typeof Diamond
}> = [
    { id: "solitaire-pendant", label: "Solitaire Pendant", Icon: Diamond },
    { id: "halo-pendant", label: "Halo Pendant", Icon: Sun },
    { id: "drop-pendant", label: "Drop Pendant", Icon: Droplets },
    { id: "cluster-pendant", label: "Cluster Pendant", Icon: Sparkles },
    { id: "bezel-pendant", label: "Bezel Pendant", Icon: Circle },
    { id: "bar-pendant", label: "Bar Pendant", Icon: Flame },
    { id: "locket-style", label: "Locket-Style", Icon: Lock },
    { id: "symbolic-motif", label: "Symbolic / Motif", Icon: Star },
    { id: "vintage-inspired", label: "Vintage-Inspired", Icon: WandSparkles },
    { id: "contemporary-minimal", label: "Contemporary Minimal", Icon: Link2 },
  ]

export default function NecklacePage() {
  const router = useRouter()
  const [selected, setSelected] = useState<NecklaceStyle>("solitaire-pendant")

  const selectedLabel = useMemo(
    () => OPTIONS.find((item) => item.id === selected)?.label ?? "Solitaire Pendant",
    [selected]
  )

  return (
    <div
      className={cn(
        "min-h-screen bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196]/30",
        manrope.className
      )}
    >
      {/* <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-6 py-4 shadow-[0_1px_0_0_rgba(226,193,150,0.1)] backdrop-blur-xl">
        <div className={cn("text-xl font-bold tracking-tight uppercase", notoSerif.className)}>
          Midnight Atelier
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <span className={cn("text-lg tracking-widest uppercase font-medium text-[#e2c196]", notoSerif.className)}>
            Step 2 of 7
          </span>
        </nav>
        <button type="button" onClick={() => router.push(FLOW_ROUTES.chooseType)}>
          <span className="text-[#e2c196]">✕</span>
        </button>
      </header> */}

      <main className="mx-auto w-full max-w-7xl px-6 pt-32 pb-40 md:px-20">
        <div className="mb-16 grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 block text-xs tracking-[0.3em] text-[#e2c196] uppercase">Bespoke Collection</span>
            <h1 className={cn("mb-6 text-5xl leading-tight md:text-6xl", notoSerif.className)}>
              Select your necklace style
            </h1>
            <p className="max-w-md text-lg text-[#c1c8c5]">
              Choose a silhouette that speaks to your aesthetic, from timeless heritage to avant-garde minimalism.
            </p>
          </div>
          <div className="mb-4 hidden h-px w-full bg-[#414846] opacity-20 lg:block" />
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {OPTIONS.map(({ id, label, Icon }) => {
            const isSelected = selected === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelected(id)}
                className={cn(
                  "group flex aspect-square flex-col items-center justify-center rounded-lg border p-6 text-center transition-all duration-300",
                  isSelected
                    ? "border-[#e2c19666] bg-[rgba(17,20,19,0.6)] shadow-[0_0_20px_rgba(226,193,150,0.2)]"
                    : "border-[#41484626] bg-[#191c1b4d] hover:border-[#e2c1964d] hover:bg-[#191c1b]"
                )}
              >
                <div className="mb-6">
                  <Icon
                    className={cn(
                      "size-9 transition-colors",
                      isSelected ? "text-[#e2c196]" : "text-[#8b9290] group-hover:text-[#e2c196]"
                    )}
                    strokeWidth={1.5}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] tracking-[0.2em] uppercase",
                    isSelected ? "text-[#e2c196]" : "text-[#c1c8c5] group-hover:text-[#e1e3e1]"
                  )}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="relative mt-24 h-64 w-full overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            alt="luxury jewelry detail"
            className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjzI-N6yLqZjBNW1oeNDGZLqoVItGJ2sgNniqgJnSdahOzJFJbXBAlf-WwKl7leWOJrIQT3UT3nM6-8KRI5KFcxNDBRkuEjDad4MiBn9_L6OQp_qadZ_1OJJmahlPpz4dW_qhX9I1fXLkMmIbqhcey-VxVdyWYl1VC7tCuhiPh7euuzlCagnPWLFKSL-XhS2Qe0G7gyEWVrXkz2ClddO8pEb6HPdPSX9FhCPTYnah7LOSp5EzCz0EQZyELSaSHc3_czzDrwO_uGAs"
            width={100}
            height={100}
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#111413] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#111413] via-transparent to-[#111413]" />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between bg-[#111413]/90 px-6 py-8 shadow-[0_-10px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:px-20">
        <button
          type="button"
          onClick={() => router.push(FLOW_ROUTES.chooseType)}
          className="group flex items-center gap-2 text-xs tracking-[0.3em] text-[#8b928f] uppercase transition-colors hover:text-[#e2c196]"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <div className="flex items-center gap-12">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-[10px] tracking-widest text-[#8b9290] uppercase">Selection</span>
            <span className="text-sm font-medium text-[#e2c196]">{selectedLabel}</span>
          </div>
          <button
            type="button"
            onClick={() => router.push(FLOW_ROUTES.chooseGender)}
            className="rounded-md bg-linear-to-br from-[#e2c196] to-[#a58860] px-10 py-4 text-sm font-bold tracking-[0.15em] text-[#412d0d] uppercase shadow-[0_0_15px_rgba(226,193,150,0.2)] transition-all hover:scale-105 active:scale-95"
          >
            Next: Choose Intended Wearer
          </button>
        </div>
      </footer>

      <nav className="fixed bottom-24 left-1/2 z-40 flex w-[90%] -translate-x-1/2 items-center justify-around rounded-full border border-white/5 bg-[#111413]/90 px-6 py-2 shadow-2xl backdrop-blur-2xl md:hidden">
        <div className="flex flex-col items-center text-[#e2c196]">
          <Gem className="size-5" />
          <span className="mt-1 text-[8px] tracking-widest uppercase">Design</span>
        </div>
        <div className="flex flex-col items-center text-[#8b928f]">
          <Sparkles className="size-5" />
          <span className="mt-1 text-[8px] tracking-widest uppercase">Atelier</span>
        </div>
        <div className="flex flex-col items-center text-[#8b928f]">
          <BookOpenIcon className="size-5" />
          <span className="mt-1 text-[8px] tracking-widest uppercase">Archive</span>
        </div>
      </nav>
    </div>
  )
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v16H5.5A2.5 2.5 0 0 0 3 21.5z" />
      <path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H13v16h5.5A2.5 2.5 0 0 1 21 21.5z" />
    </svg>
  )
}
