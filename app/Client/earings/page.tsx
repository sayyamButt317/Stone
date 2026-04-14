"use client"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Manrope, Noto_Serif } from "next/font/google"
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FLOW_ROUTES } from "../flow-routes"
import { EARRING_STYLES } from "@/app/constant/earring"
import { EarringStyle } from "@/app/types/earring-type"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
})


export default function EarringsPage() {
  const router = useRouter()
  const [selectedStyle, setSelectedStyle] = useState<EarringStyle>("studs")

  const selectedTitle = useMemo(
    () => EARRING_STYLES.find((style) => style.id === selectedStyle)?.title ?? "Studs",
    [selectedStyle]
  )

  return (
    <div
      className={cn(
        "min-h-screen bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196]/30",
        manrope.className
      )}
    >
      <nav className="fixed top-0 z-50 w-full bg-neutral-950/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-full items-center justify-between px-8 py-4">
          <div
            className={cn(
              "text-xl tracking-widest text-[#e2c196] uppercase",
              notoSerif.className
            )}
          >
            THE MIDNIGHT ATELIER
          </div>

          <div className="hidden items-center gap-12 md:flex">
            <button
              type="button"
              className="text-xs tracking-widest text-neutral-400 uppercase transition-colors duration-300 hover:text-[#e2c196]"
            >
              Collections
            </button>
            <button
              type="button"
              className="border-b border-[#e2c196] pb-1 text-xs tracking-widest text-[#e2c196] uppercase"
            >
              Bespoke
            </button>
            <button
              type="button"
              className="text-xs tracking-widest text-neutral-400 uppercase transition-colors duration-300 hover:text-[#e2c196]"
            >
              Heritage
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="mr-4 flex flex-col items-end">
              <span className="text-[10px] tracking-widest text-[#a58860] uppercase">
                Step 2 of 7
              </span>
              <div className="mt-1 h-1 w-32 overflow-hidden rounded-full bg-[#323534]">
                <div className="h-full w-[28%] bg-[#e2c196] shadow-[0_0_8px_rgba(226,193,150,0.6)]" />
              </div>
            </div>
            <button type="button" className="text-[#e2c196]">
              <ShoppingBag className="size-5" />
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 left-0 h-px bg-neutral-800/30" />
      </nav>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-6 pt-32 pb-40 md:px-20">
        <header className="mb-16 space-y-4 text-center">
          <span className="text-xs tracking-[0.3em] text-[#e2c196] uppercase">
            The Silhouette Selection
          </span>
          <h1
            className={cn(
              "text-4xl font-light tracking-tight italic md:text-6xl",
              notoSerif.className
            )}
          >
            Select your earring style
          </h1>
          <p className="mx-auto max-w-md text-sm text-[#c1c8c5] opacity-70">
            Define the architectural foundation of your bespoke creation.
          </p>
        </header>

        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
          {EARRING_STYLES.map(({ id, title, subtitle, Icon }) => {
            const isSelected = id === selectedStyle
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedStyle(id)}
                className={cn(
                  "relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg p-8 text-center transition-all duration-500",
                  "border bg-[rgba(25,28,27,0.4)] backdrop-blur-xl",
                  isSelected
                    ? "border-[#e2c196] bg-[rgba(25,28,27,0.8)] shadow-[0_0_25px_rgba(226,193,150,0.2),inset_0_0_15px_rgba(226,193,150,0.05)]"
                    : "border-[#e2c1961a] hover:-translate-y-2 hover:border-[#e2c19666] hover:bg-[rgba(25,28,27,0.6)] hover:shadow-[0_10px_30px_rgba(226,193,150,0.1)]"
                )}
              >
                {isSelected ? (
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#e2c196]/10 via-transparent to-transparent" />
                ) : null}
                <Icon
                  className={cn(
                    "mb-4 size-8 transition-colors",
                    isSelected ? "text-[#e2c196]" : "text-[#e2c19699]"
                  )}
                  strokeWidth={isSelected ? 2 : 1.75}
                />
                <h3 className={cn("text-lg tracking-wide", notoSerif.className, isSelected ? "text-[#e2c196]" : "text-[#e1e3e1]")}>
                  {title}
                </h3>
                <span
                  className={cn(
                    "mt-2 text-[10px] uppercase tracking-tighter",
                    isSelected ? "text-[#a58860]" : "text-[#c1c8c566]"
                  )}
                >
                  {subtitle}
                </span>
              </button>
            )
          })}
        </div>
      </main>

      <nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between bg-neutral-950/90 px-10 pt-4 pb-8 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
        <button
          type="button"
          onClick={() => router.push(FLOW_ROUTES.chooseType)}
          className="flex items-center gap-2 rounded-full border border-neutral-700/50 px-8 py-3 text-[11px] font-medium tracking-wider text-neutral-300 uppercase transition-all hover:scale-[1.02] hover:opacity-90"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="h-px w-12 bg-[#4148464d]" />
          <span className="text-[10px] tracking-[0.2em] text-[#c1c8c5] italic uppercase">
            {selectedTitle}
          </span>
          <div className="h-px w-12 bg-[#4148464d]" />
        </div>

        <button
          type="button"
          onClick={() => router.push(FLOW_ROUTES.chooseGender)}
          className="flex items-center gap-2 rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-8 py-3 text-[11px] font-bold tracking-wider text-neutral-950 uppercase transition-all duration-150 hover:scale-[1.02] hover:opacity-90 active:scale-95"
        >
          Next: Choose Intended Wearer
          <ArrowRight className="size-4" />
        </button>
      </nav>

      <div className="pointer-events-none fixed top-0 left-0 h-full w-full opacity-20">
        <div className="absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-[#e2c196]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#e2c196]/10 blur-[100px]" />
      </div>
    </div>
  )
}
