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
      <header className="fixed top-0 z-50 flex w-full items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => router.push(FLOW_ROUTES.chooseType)}
          className="group flex items-center gap-2 px-6 py-3 cursor-pointer text-[#e1e3e1] opacity-70 transition-all duration-200 hover:opacity-100"
        >
          <ArrowLeft className="size-4" /> <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Back</span>

        </button>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pt-12 pb-40 md:px-20">
        <div className="mb-16 grid grid-cols-1 items-end gap-12 lg:grid-cols-2">
          <div>
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

      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-end gap-2 px-6 py-8 md:px-20">


        <div className="flex items-center gap-12">
          <button
            type="button"
            onClick={() => router.push(FLOW_ROUTES.chooseGender)}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] px-10 py-4 text-[#111413] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(226,193,150,0.2)] active:scale-95"
          >
            <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase">
              Choose Intended Wearer
            </span>
          </button>
        </div>
      </footer>
    </div>
  )
}


