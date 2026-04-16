"use client"
import { useMemo, useState } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import { cn } from "@/lib/utils"
import useJewelleryStore from "@/app/store/jewellery-store"
import { MetalChoice, MetalProps } from "@/app/types/metal-type"
import { METALS } from "@/app/constant/metal"
import Stepper from "@/components/Client/stepper"
import { useRouter } from "next/navigation"
import { FLOW_ROUTES } from "../flow-routes"


const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
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
const SURFACE_CONTAINER_HIGHEST = "#323534"


export default function ChooseMetal({
  step = 4,
  totalSteps = 7,
  onBack,
}: MetalProps) {
  const [selectedMetal, setSelectedMetal] = useState<MetalChoice>("gold")
  const router = useRouter();
  const { metalType, setMetalType } = useJewelleryStore()

  const selectedMetalLabel = useMemo(
    () => METALS.find((metal) => metal.id === selectedMetal)?.currentLabel ?? "18k Yellow Gold",
    [selectedMetal]
  )

  const handleBack = (() => {
    if (onBack) {
      onBack()
      return
    }
  })

  const handleContinue = (() => {
    if (!metalType) return
    router.push(FLOW_ROUTES.preferSetting)
  })

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden",
        "selection:bg-[#e2c196] selection:text-[#111413]",
        manrope.className
      )}
      style={{ backgroundColor: SURFACE, color: ON_SURFACE }}
    >
      <h1 className="sr-only">Choose your metal</h1>

      <header className="fixed top-0 z-50 w-full bg-[#111413]/80 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4">
          <div
            className={cn(
              "cursor-pointer text-lg tracking-wide italic transition-transform active:scale-95",
              notoSerif.className
            )}
            style={{ color: ACCENT }}
          >
            Midnight Atelier
          </div>

          <div
            className={cn(
              "hidden items-center gap-8 font-light tracking-wide md:flex",
              notoSerif.className
            )}
            style={{ color: `${ON_SURFACE}99` }}
          >
            <span className="cursor-pointer transition-colors duration-300 hover:text-[#e2c196]">
              Collections
            </span>
            <span className="cursor-pointer transition-colors duration-300 hover:text-[#e2c196]">
              Bespoke
            </span>
            <span className="cursor-pointer transition-colors duration-300 hover:text-[#e2c196]">
              Heritage
            </span>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-[#414846]/20 to-transparent" />
      </header>

      <main className="mx-auto flex w-full max-w-screen-2xl min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 pt-32 pb-40">
        <div className="mb-16 w-full max-w-4xl space-y-6 text-center">
          <div className="mx-auto w-full max-w-xs">
            <Stepper step={step} totalSteps={totalSteps} />
          </div>

          <div className="space-y-2">
            <h1
              className={cn(
                "text-4xl font-light tracking-tight md:text-6xl",
                notoSerif.className
              )}
            >
              Choose your metal
            </h1>
            <p className="text-lg tracking-wide" style={{ color: `${ON_SURFACE_VARIANT}cc` }}>
              Define the base of your piece
            </p>
          </div>
        </div>

        <section className="w-full overflow-x-auto pb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max flex-nowrap gap-6 px-4 md:justify-center">
            {METALS.map((metal) => {
              const selected = metal.id === selectedMetal

              return (
                <button
                  key={metal.id}
                  type="button"
                  onClick={() => {
                    setSelectedMetal(metal.id)
                    setMetalType(metal.id)
                  }}
                  className={cn(
                    "group relative flex h-80 w-56 cursor-pointer flex-col rounded-lg border p-1 text-left transition-all duration-500",
                    "bg-[rgba(29,32,31,0.6)] backdrop-blur-2xl",
                    "focus-visible:ring-2 focus-visible:ring-[#e2c196]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111413] focus-visible:outline-none",
                    selected
                      ? "-translate-y-4 border-[#e2c196]/40 shadow-[0_0_40px_rgba(226,193,150,0.15)]"
                      : "border-[#414846]/15 hover:-translate-y-2 hover:border-[#e2c196]/20"
                  )}
                >
                  <div className="relative grow overflow-hidden rounded-[1.8rem] bg-[#323534]">
                    {metal.tintOverlayClassName ? (
                      <div className={cn("absolute inset-0 z-10", metal.tintOverlayClassName)} />
                    ) : null}

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={metal.imageUrl}
                      alt={metal.name}
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
                        metal.imageClassName
                      )}
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0)_100%)] [background-size:200%_200%] transition-all duration-500 group-hover:[background-position:100%_100%]" />
                    {selected ? (
                      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(226,193,150,0.2)]" />
                    ) : null}
                  </div>

                  <div className="py-6 text-center">
                    <span
                      className={cn(
                        "text-[12px] font-bold tracking-[0.2em] uppercase transition-colors",
                        selected ? "text-[#e2c196]" : "text-[#c1c8c5] group-hover:text-[#e2c196]"
                      )}
                    >
                      {metal.name}
                    </span>
                  </div>

                  {selected ? (
                    <div className="absolute -inset-px -z-10 rounded-lg bg-linear-to-br from-[#e2c196]/30 to-transparent blur-sm" />
                  ) : null}
                </button>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 z-50 w-full rounded-t-[40px] bg-[#191c1b]/90 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-10 py-8">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-full border border-[#414846]/30 px-8 py-3 text-[10px] font-bold tracking-[0.2em] text-[#e1e3e1] uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Back
          </button>

          <div className="hidden flex-col items-center lg:flex">
            <span className="text-[10px] tracking-widest text-[#c1c8c566] uppercase">
              Current Selection
            </span>
            <span className={cn("text-sm italic text-[#e2c196]", notoSerif.className)}>
              {selectedMetalLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={handleContinue}
            className="rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-8 py-3 text-[10px] font-bold tracking-[0.2em] text-[#111413] uppercase shadow-[0_4px_15px_rgba(226,193,150,0.2)] transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Next: Select Size
          </button>
        </div>
      </footer>

      <div className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-[#314c47]/10 blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] h-[40%] w-[40%] rounded-full bg-[#342204]/5 blur-[100px]" />
      </div>
    </div>
  )
}
