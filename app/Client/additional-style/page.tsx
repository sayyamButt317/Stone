"use client"

import { useCallback, useLayoutEffect, useRef } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import { Sparkles, Zap, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import useRingStore from "@/app/store/ring-store"
import Image from "next/image"
import router from "next/router"
import { FLOW_ROUTES } from "../flow-routes"
import useJewelleryStore from "@/app/store/jewellery-store"
import useGenerateImageHook from "@/app/routes/Client/hooks/generateimage-hook"
import { useRouter } from "next/navigation"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
})

const SURFACE = "#111413"
const ON_SURFACE = "#e1e3e1"
const ON_SURFACE_VARIANT = "#c1c8c5"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  step?: number
  totalSteps?: number
  onGenerate?: () => void
}

export default function AdditionalStyle({
  onGenerate,
}: Props) {

  const { image_prompt, setImagePrompt } = useRingStore()
  const characterCount = image_prompt.length
  const { jewelleryType, stone, } = useJewelleryStore()
  const MAX_CHAR = 2500
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { mutate: generateImage, isPending } = useGenerateImageHook()

  const router = useRouter()

  const handleGenerate = useCallback(() => {
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
  }, [generateImage, image_prompt, router, setImagePrompt])

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "0px"
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [])

  useLayoutEffect(() => {
    resizeTextarea()
  }, [image_prompt, resizeTextarea])

  return (

    <div
      className={cn(
        "relative flex min-h-0 flex-1 flex-col items-center overflow-hidden",
        "selection:bg-[#e2c196]/30 selection:text-[#111413]",
        manrope.className
      )}
      style={{ backgroundColor: SURFACE, color: ON_SURFACE }}
    >
      <h1 className="sr-only">Design overview and AI generation</h1>
      <main className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 pt-2 md:pt-20 pb-24">
        <div className="mb-16 w-full max-w-2xl text-center">

          <h1 className={cn("mb-4 text-5xl font-light tracking-tight md:text-7xl", notoSerif.className)}>
            Design Complete
          </h1>
          <p className="text-lg font-light tracking-wide" style={{ color: ON_SURFACE_VARIANT }}>
            Your custom concept is ready for generation
          </p>
        </div>

        <section className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-[#191c1b] shadow-[0_0_50px_rgba(15,42,38,0.5)]">

              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8GhSo8YvqeIvgEYjng6IWPt7zUNaYWX4tmNLiJmhdv80ons1dd-VKqGLQjBsHJcQsXP6Jbhb3TV8V-Cc7QGpas-p7HdS7QFAoX_8VwqdJda22jJycNCtwbbGw7_3mWeHfKAktTQZZoG9S7wyeMHTt-_Zu-vR9m-9Ol9J6fNLKvvq7IRcfCp4qgxbHgpsjYDcUlgiNK_Vf2Z_mUm1-GALbwu97y9Iuhtl3lb8s5oluh5our9hFQVF_UFlXJsak2klCAYA1m8WXVLQ"
                alt="Emerald gemstone"
                className="h-full w-full object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#111413cc] via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                {/* <span className="mb-1 block text-[10px] tracking-[0.3em] text-[#e2c196] uppercase">
                  Selected Stone
                </span>
                <h3 className={cn("text-3xl", notoSerif.className)}>
                  {stone.charAt(0).toUpperCase() + stone.slice(1)}
                </h3> */}
                <p className="text-sm leading-relaxed text-[#e1e3e1cc] italic">
                  <span className="mb-1 block text-[10px] tracking-[0.3em] text-[#e2c196] uppercase">
                    Selected Jewellery Type
                  </span>
                  <h3 className={cn("text-3xl", notoSerif.className)}>
                    {jewelleryType.charAt(0).toUpperCase() + jewelleryType.slice(1)}
                  </h3>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-7">
            <div className="rounded-lg border border-[#e2c196]/15 bg-[rgba(17,20,19,0.6)] p-10 shadow-2xl backdrop-blur-3xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2c196]/20">
                  <Sparkles className="size-4 text-[#e2c196]" />
                </div>
                <h4 className="text-xs tracking-[0.2em] text-[#c1c8c5] uppercase">
                  Generation Parameters
                </h4>
              </div>

              <div className="group relative overflow-hidden rounded-lg border border-[#414846]/10 bg-[#0c0f0e] p-8">
                <textarea
                  ref={textareaRef}
                  maxLength={MAX_CHAR}
                  value={image_prompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  onInput={resizeTextarea}
                  className="w-full resize-none overflow-hidden text-sm leading-relaxed text-[#e1e3e1cc] italic"
                />

              </div>

              <div className="flex flex-col items-center pt-6">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleGenerate}
                  className="group relative cursor-pointer w-full overflow-hidden rounded-md bg-linear-to-br from-[#e2c196] to-[#a58860] py-5 shadow-[0_0_30px_rgba(226,193,150,0.3)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(226,193,150,0.5)]"
                >
                  <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-1000 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-3 text-xs font-bold tracking-[0.4em] text-[#291800] uppercase">
                    {isPending ? <Loader2 className="size-4 animate-spin" /> : <Zap className="size-4" />} {isPending ? "Generating..." : "Generate Image"}
                  </span>
                </button>

                <p className="mt-6 text-center text-[10px] tracking-[0.2em] text-[#c1c8c566] uppercase">
                  {isPending && <p className="mt-6 text-center text-[10px] tracking-[0.2em] text-[#c1c8c566] uppercase">
                    This may take up to 45 seconds.
                  </p>}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
