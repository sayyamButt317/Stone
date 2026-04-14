"use client"

import { useCallback } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import { Gem, ShoppingBag, Sparkles, User, Zap, FileText } from "lucide-react"
import { Modal } from "@/components/Client/Dialogue"
import { DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

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
  open,
  onOpenChange,
  step = 7,
  totalSteps = 7,
  onGenerate,
}: Props) {
  const handleGenerate = useCallback(() => {
    if (onGenerate) {
      onGenerate()
      return
    }
    onOpenChange(false)
  }, [onGenerate, onOpenChange])

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <div
        className={cn(
          "relative flex min-h-0 flex-1 flex-col items-center overflow-hidden",
          "selection:bg-[#e2c196]/30 selection:text-[#111413]",
          manrope.className
        )}
        style={{ backgroundColor: SURFACE, color: ON_SURFACE }}
      >
        <DialogTitle className="sr-only">Design overview and AI generation</DialogTitle>

        <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-6 py-5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl md:px-12">
          <div
            className={cn(
              "text-xl tracking-[0.2em] text-[#e2c196] uppercase md:text-2xl",
              notoSerif.className
            )}
          >
            Midnight Atelier
          </div>

          <div className={cn("hidden gap-12 font-light tracking-wide md:flex", notoSerif.className)}>
            <span className="cursor-pointer text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]">
              Collections
            </span>
            <span className="cursor-pointer text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]">
              Bespoke
            </span>
            <span className="cursor-pointer text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]">
              Heritage
            </span>
          </div>

          <div className="flex items-center gap-6 text-[#e2c196]">
            <ShoppingBag className="size-5 cursor-pointer transition-transform hover:scale-110" />
            <User className="size-5 cursor-pointer transition-transform hover:scale-110" />
          </div>
        </nav>

        <main className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 pt-32 pb-24">
          <div className="mb-16 w-full max-w-2xl text-center">
            <div className="mb-12">
              <Modal.Stepper step={step} totalSteps={totalSteps} label="Final Step" />
            </div>

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8GhSo8YvqeIvgEYjng6IWPt7zUNaYWX4tmNLiJmhdv80ons1dd-VKqGLQjBsHJcQsXP6Jbhb3TV8V-Cc7QGpas-p7HdS7QFAoX_8VwqdJda22jJycNCtwbbGw7_3mWeHfKAktTQZZoG9S7wyeMHTt-_Zu-vR9m-9Ol9J6fNLKvvq7IRcfCp4qgxbHgpsjYDcUlgiNK_Vf2Z_mUm1-GALbwu97y9Iuhtl3lb8s5oluh5our9hFQVF_UFlXJsak2klCAYA1m8WXVLQ"
                  alt="Emerald gemstone"
                  className="h-full w-full object-cover grayscale-[0.2] transition-all duration-700 hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#111413cc] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="mb-1 block text-[10px] tracking-[0.3em] text-[#e2c196] uppercase">
                    Selected Stone
                  </span>
                  <h3 className={cn("text-3xl", notoSerif.className)}>Emerald</h3>
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
                  <div className="absolute top-0 left-0 h-full w-1 bg-[#e2c196]/30" />
                  <p className="text-sm leading-relaxed text-[#e1e3e1cc] italic">
                    &quot;Art Deco-inspired emerald ring, 18k Gold, with geometric
                    engravings, pave-set diamond shoulders, architectural
                    silhouette, high-polish finish, cinematic lighting,
                    ultra-realistic jewelry render, 8k resolution.&quot;
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {["Art Deco", "18k Gold", "Bespoke"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#314c47]/20 bg-[#314c47]/30 px-3 py-1 text-[10px] tracking-widest text-[#9ebbb5] uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 py-4">
                  <div className="flex items-center justify-between border-b border-[#414846]/10 pb-4">
                    <span className="text-sm text-[#c1c8c5]">Estimated Generation Time</span>
                    <span className="text-sm">45 Seconds</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#414846]/10 pb-4">
                    <span className="text-sm text-[#c1c8c5]">Model Version</span>
                    <span className="text-xs tracking-widest uppercase">Atelier-AI v2.4</span>
                  </div>
                </div>

                <div className="flex flex-col items-center pt-6">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="group relative w-full overflow-hidden rounded-md bg-linear-to-br from-[#e2c196] to-[#a58860] py-5 shadow-[0_0_30px_rgba(226,193,150,0.3)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(226,193,150,0.5)]"
                  >
                    <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-1000 group-hover:translate-x-full" />
                    <span className="relative flex items-center justify-center gap-3 text-xs font-bold tracking-[0.4em] text-[#291800] uppercase">
                      Generate AI Concept
                      <Zap className="size-4" />
                    </span>
                  </button>

                  <p className="mt-6 text-center text-[10px] tracking-[0.2em] text-[#c1c8c566] uppercase">
                    By clicking generate you agree to our digital craftsmanship terms
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-[#414846]/5 bg-[#191c1b] p-6">
                  <Gem className="mb-3 size-5 text-[#e2c196]" />
                  <h5 className="mb-1 text-xs tracking-widest uppercase">Curation</h5>
                  <p className="text-[11px] leading-tight text-[#c1c8c5]">
                    Every AI design is reviewed by our master jewelers for structural integrity.
                  </p>
                </div>
                <div className="rounded-lg border border-[#414846]/5 bg-[#191c1b] p-6">
                  <FileText className="mb-3 size-5 text-[#e2c196]" />
                  <h5 className="mb-1 text-xs tracking-widest uppercase">Heritage</h5>
                  <p className="text-[11px] leading-tight text-[#c1c8c5]">
                    AI trained on 200 years of archival high-jewelry sketches.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <div className="pointer-events-none fixed top-0 right-0 -z-10 h-1/2 w-1/3 bg-[#0F2A26] opacity-20 blur-[160px]" />
        <div className="pointer-events-none fixed bottom-0 left-0 -z-10 h-1/3 w-1/4 bg-[#342204] opacity-10 blur-[140px]" />
      </div>
    </Modal>
  )
}
