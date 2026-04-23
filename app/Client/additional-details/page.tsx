"use client"

import { useCallback } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import {
  ArrowLeft,
  Blend,
  Gem,
  Grid3X3,
  Loader2,
  PenLine,
  ScrollText,
  ShoppingBag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Stepper from "@/components/Client/stepper"
import useGenerateImageHook from "@/app/routes/Client/hooks/generateimage-hook"
import useRingStore from "@/app/store/ring-store"
import { useRouter } from "next/navigation"
import { FLOW_ROUTES } from "../flow-routes"
import Image from "next/image"
import BackButton from "@/components/Custom/BackButton"
import CustomButton from "@/components/Custom/CustomButton"

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

type Props = {
  step?: number
  totalSteps?: number
  onBack?: () => void
  onContinue?: (description: string) => void
}

export default function AdditionalDetails({
  onBack,
  onContinue,
}: Props) {
  const router = useRouter()
  const { image_prompt, setImagePrompt } = useRingStore()
  const characterCount = image_prompt.length


  const { mutate: generateImage, isPending } = useGenerateImageHook()

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack()
      return
    }
  }, [onBack])

  const handleContinue = useCallback(() => {
    if (onContinue) {
      return
    }
    const prompt = image_prompt.trim()
    if (!prompt) return

    setImagePrompt(prompt)
    generateImage({
      prompt,
    }, {
      onSuccess: () => {
        router.push(FLOW_ROUTES.imagePreview)
      },
    })
  }, [generateImage, image_prompt, onContinue, router, setImagePrompt])

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

      <main className="mx-auto flex w-full max-w-6xl min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 pt-12 pb-24 md:px-20">
        <div className="mb-6 w-full space-y-6 text-center">
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
          </aside>

          <div className="relative w-full lg:col-span-9">
            <div className="group relative">
              <textarea
                value={image_prompt}
                maxLength={MAX_CHAR}
                onChange={(e) => setImagePrompt(e.target.value)}
                className={cn(
                  "w-full min-h-[450px] resize-none rounded-[20px] border p-4 text-sm leading-relaxed md:p-6 md:text-base",
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
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-end gap-2 rounded-t-full border-t border-[#414846]/15 mb-2 px-6">
        <BackButton
          onClick={() => router.back()}
        />

        <div className="flex items-center gap-12">
          <CustomButton
            onClick={handleContinue}
            disabled={isPending}
          >
            Generate Image
          </CustomButton>
        </div>
      </footer>
    </div>
  )
}
