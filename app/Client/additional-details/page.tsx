"use client"

import { useCallback, useState } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import {
  ArrowLeft,
  ArrowRight,
  Blend,
  Gem,
  Grid3X3,
  Loader2,
  PenLine,
  ScrollText,
  ShoppingBag,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Stepper from "@/components/Client/stepper"
import useGenerateImageHook from "@/app/routes/Client/hooks/generateimage-hook"
import useRingStore from "@/app/store/ring-store"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

const SURFACE = "#111413"
const ON_SURFACE = "#e1e3e1"
const ON_SURFACE_VARIANT = "#c1c8c5"
const MAX_CHAR = 2500

const QUICK_TAGS = [
  "Art Deco Influence",
  "Minimalist",
  "Family Crest",
  "Organic Shapes",
] as const

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  step?: number
  totalSteps?: number
  onBack?: () => void
  onContinue?: (description: string) => void
}

export default function AdditionalDetails({
  onOpenChange,
  step = 6,
  totalSteps = 7,
  onBack,
  onContinue,
}: Props) {
  const [description, setDescription] = useState("")
  const characterCount = description.length
  const imagePrompt = useRingStore((s) => s.image_prompt)
  const setImagePrompt = useRingStore((s) => s.setImagePrompt)


  const { mutate: generateImage, isPending } = useGenerateImageHook()

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack()
      return
    }
    onOpenChange(false)
  }, [onBack, onOpenChange])

  const handleContinue = useCallback(() => {
    if (onContinue) {
      return
    }
    const prompt = description.trim() || imagePrompt.trim()
    if (!prompt) return

    setImagePrompt(prompt)
    generateImage({
      prompt,
    })
    onOpenChange(false)
  }, [description, generateImage, imagePrompt, onContinue, onOpenChange, setImagePrompt])

  const appendTag = useCallback((tag: string) => {
    setDescription((prev) => {
      const next = prev.trim().length > 0 ? `${prev}\n${tag}` : tag
      return next.slice(0, MAX_CHAR)
    })
  }, [])

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 flex-col overflow-hidden",
        "selection:bg-[#e2c196]/30 selection:text-[#111413]",
        manrope.className
      )}
      style={{ backgroundColor: SURFACE, color: ON_SURFACE }}
    >
      <h1 className="sr-only">Describe your jewelry vision</h1>

      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-8 py-6 backdrop-blur-xl">
        <div className={cn("text-xl font-bold tracking-[0.2em] uppercase", notoSerif.className)}>
          Midnight Atelier
        </div>
        <div className="flex items-center gap-6">
          <ShoppingBag className="size-5 cursor-pointer text-[#e1e3e1]/60 transition-colors hover:text-[#e2c196]" />
          <User className="size-5 cursor-pointer text-[#e1e3e1]/60 transition-colors hover:text-[#e2c196]" />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 pt-32 pb-24 md:px-20">
        <div className="mb-16 w-full space-y-6 text-center">
          <div className="mx-auto inline-block w-full max-w-xs space-y-3">
            <Stepper
              step={step}
              totalSteps={totalSteps}
              label={`${Math.round((step / Math.max(totalSteps, 1)) * 100)}% Complete`}
            />
          </div>
          <div className="space-y-2">
            <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl", notoSerif.className)}>
              Describe your vision
            </h1>
            <p className="text-lg font-light" style={{ color: ON_SURFACE_VARIANT }}>
              Add details, inspiration, or special requests
            </p>
          </div>
        </div>

        <section className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <aside className="mt-12 hidden space-y-8 lg:col-span-3 lg:block">
            <div className="space-y-4 rounded-lg border-l border-[#e2c196]/20 bg-[#191c1b] p-6">
              <PenLine className="size-8 text-[#e2c196]" />
              <h3 className="text-xs font-bold tracking-widest text-[#e2c196] uppercase">The Craft</h3>
              <p className="text-sm leading-relaxed text-[#c1c8c5]">
                Your words will guide our master artisans in the initial hand-sketching phase of your unique piece.
              </p>
            </div>

            <div className="relative h-64 overflow-hidden rounded-lg shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9pVwMzIKMjJD0i4Z-UZSaDAaKpb-puNJtaZpgpcVyAxcPOXOBXJO05CRmoceYDjWKnlC1XZ2jYpjTeQauJLus52DyhOGaLKqOm2lPd_BkYQQHJ9oI-HfDTIBZLZqDt3zkFd-yvhHNCYKOukw3IligWZ2emyJVzRUmj9asIKWxB1z9BzKAASQZnu6Pvoagpejmp9DCtL8AWcoiwOS3a3Ym4iA72HkFYENcQpGBmxxgKpIRrGld2Y-W5CN072Bmd4qhmB9dMBjzzV4"
                alt="Jeweler sketch"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#111413] to-transparent opacity-60" />
            </div>
          </aside>

          <div className="relative w-full lg:col-span-9">
            <div className="group relative">
              <textarea
                value={description}
                maxLength={MAX_CHAR}
                onChange={(e) => setDescription(e.target.value)}
                className={cn(
                  "w-full min-h-[450px] resize-none rounded-[20px] border p-10 text-lg leading-relaxed md:p-14 md:text-xl",
                  "border-[#e2c196]/10 bg-[rgba(25,28,27,0.6)] text-[#e1e3e1] backdrop-blur-xl",
                  "placeholder:text-[#c1c8c54d] transition-all duration-500",
                  "focus:border-[#e2c196]/40 focus:bg-[rgba(25,28,27,0.8)] focus:shadow-[0_0_25px_rgba(226,193,150,0.15)] focus:outline-none"
                )}
                placeholder="Describe style, engraving, inspiration, or any special requests that will help our master jewelers bring your vision to life..."
              />
              <div className="absolute right-10 bottom-8 flex items-center gap-4">
                <div className="text-[10px] tracking-widest text-[#c1c8c566] uppercase">
                  Character Count: <span className="text-[#e2c19699]">{characterCount} / {MAX_CHAR}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="mr-2 text-xs font-bold tracking-[0.15em] text-[#c1c8c599] uppercase">
                Quick tags:
              </span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => appendTag(tag)}
                  className="rounded-full bg-[#314c47]/40 px-5 py-2 text-xs text-[#9ebbb5] transition-colors hover:bg-[#314c47]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between bg-[#111413]/60 px-8 py-8 backdrop-blur-2xl">
        <button
          type="button"
          onClick={handleBack}
          className="group flex items-center gap-2"
        >
          <ArrowLeft className="size-5 text-[#e2c196] transition-transform group-hover:-translate-x-1" />
          <span className="text-sm tracking-widest text-[#e1e3e199] uppercase transition-colors group-hover:text-[#e2c196]">
            Back
          </span>
        </button>

        <div className="flex items-center gap-12">
          <div className="hidden flex-col items-end md:flex">
            <span className="text-[10px] tracking-[0.2em] text-[#c1c8c566] uppercase">Next phase</span>
            <span className={cn("text-sm italic text-[#e2c196]", notoSerif.className)}>
              Finalizing the Mount
            </span>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            disabled={isPending}
            className="group flex items-center gap-3 rounded-md bg-linear-to-br from-[#e2c196] to-[#a58860] px-12 py-4 shadow-[0_0_30px_rgba(226,193,150,0.15)] transition-all active:scale-95"
          >
            <span className="text-sm font-bold tracking-[0.2em] text-[#291800] uppercase">{isPending ? "Generating..." : "Generate Image"}</span>
            {isPending ? <Loader2 className="size-5 text-[#291800] animate-spin" /> : <ArrowRight className="size-5 text-[#291800] transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </footer>

      <aside className="fixed top-1/2 left-0 hidden -translate-y-1/2 flex-col gap-8 rounded-r-3xl border-r border-[#414846]/10 bg-[#191c1b]/50 px-6 py-12 backdrop-blur-md lg:flex">
        <div className="group flex cursor-pointer flex-col items-center gap-2 text-[#c1c8c566] transition-colors hover:text-[#e2c196]">
          <Blend className="size-4" />
          <span className="text-[8px] tracking-tight uppercase">Materials</span>
        </div>
        <div className="group flex cursor-pointer flex-col items-center gap-2 text-[#c1c8c566] transition-colors hover:text-[#e2c196]">
          <Gem className="size-4" />
          <span className="text-[8px] tracking-tight uppercase">Gems</span>
        </div>
        <div className="group flex cursor-pointer flex-col items-center gap-2 text-[#c1c8c566] transition-colors hover:text-[#e2c196]">
          <Grid3X3 className="size-4" />
          <span className="text-[8px] tracking-tight uppercase">Settings</span>
        </div>
        <div className="flex cursor-pointer flex-col items-center gap-2 text-[#e2c196]">
          <ScrollText className="size-4 fill-current" />
          <span className="text-[8px] font-bold tracking-tight uppercase">Vision</span>
        </div>
      </aside>

      <div className="pointer-events-none fixed top-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-[#e2c196]/5 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[-10%] left-[-5%] h-[300px] w-[300px] rounded-full bg-[#314c47]/10 blur-[100px]" />
    </div>
  )
}
