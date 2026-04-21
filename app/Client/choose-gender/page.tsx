"use client"

import { useMemo } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import { ArrowLeft, ArrowRight, Mars, Transgender, Venus } from "lucide-react"
import { cn } from "@/lib/utils"
import useJewelleryStore, { type GenderChoice } from "@/app/store/jewellery-store"
import Stepper from "@/components/Client/stepper"
import { useRouter } from "next/navigation"
import { FLOW_ROUTES } from "../flow-routes"
import Image from 'next/image'


const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

const ACCENT = "#e2c196"
const SURFACE = "#111413"
const ON_SURFACE = "#e1e3e1"
const ON_SURFACE_VARIANT = "#c1c8c5"
const OUTLINE_VARIANT = "#414846"

type Option = {
  id: GenderChoice
  label: string
  Icon: typeof Venus
}

const GENDER_OPTIONS: Option[] = [
  { id: "female", label: "Feminine", Icon: Venus },
  { id: "male", label: "Masculine ", Icon: Mars },
  { id: "unisex", label: "Balanced ", Icon: Transgender },
]

type Props = {
  step?: number
  totalSteps?: number
  onContinue?: (gender: GenderChoice) => void
  onBack?: () => void
}

export default function ChooseGender({
  step = 2,
  totalSteps = 7,
}: Props) {
  const genderType = useJewelleryStore((s) => s.genderType)
  const setGenderType = useJewelleryStore((s) => s.setGenderType)
  const router = useRouter()

  const selected = useMemo((): GenderChoice => {
    if (genderType === "female" || genderType === "male" || genderType === "unisex") return genderType
    return "female"
  }, [genderType])

  const handleBack = () => {
    router.back()
  }

  const handleProceed = () => {
    setGenderType(selected)
    router.push(FLOW_ROUTES.GemDecision)
  }

  return (

    <div
      className={cn(
        "relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden selection:bg-[#e2c196]/30",
        manrope.className
      )}
      style={{ color: ON_SURFACE, backgroundColor: SURFACE }}
    >
      <h1 className="sr-only">
        Which style direction feels closest? Select the style.
      </h1>

      <header className="z-50 w-full shrink-0 bg-stone-950/80 px-6 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:px-12">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
          <div
            className={cn("text-xl italic sm:text-2xl", notoSerif.className)}
            style={{ color: ACCENT }}
          >
            L&apos;Atelier d&apos;Artiste
          </div>
          <div
            className={cn(
              "hidden text-[10px] tracking-[0.2em] text-stone-400 uppercase md:block",
              notoSerif.className
            )}
          >
            <span style={{ color: ACCENT }}>Bespoke Journey</span>
          </div>
        </div>
      </header>

      {/* <div className="mx-auto w-full max-w-4xl shrink-0 px-6 pt-6 pb-4 md:px-24">
        <Stepper step={step} totalSteps={totalSteps} label="Selection" />
      </div> */}

      <main className="relative flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 pb-40">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div
            className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-40"
            style={{
              background:
                "radial-gradient(circle at center, rgba(16, 53, 49, 0.4) 0%, rgba(17, 20, 19, 0) 70%)",
            }}
          />
        </div>

        <div className="relative z-10 mb-12 text-center md:mb-16">
          <h1
            className={cn(
              "mb-4 text-4xl tracking-tight italic sm:text-5xl md:text-6xl",
              notoSerif.className
            )}
          >
            Who is this piece for?
          </h1>
          <p
            className="text-sm tracking-[0.15em] uppercase"
            style={{ color: ON_SURFACE_VARIANT }}
          >
            Select the intended wearer
          </p>
        </div>

        <div className="relative z-10 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {GENDER_OPTIONS.map(({ id, label, Icon }) => {
            const isSelected = selected === id
            return (
              <button
                key={id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setGenderType(id)}
                className={cn(
                  "group flex cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl p-10 transition-all duration-500 sm:p-12",
                  "bg-[rgba(49,76,71,0.15)] backdrop-blur-3xl",
                  "hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                  "focus-visible:ring-2 focus-visible:ring-[#e2c196]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111413] focus-visible:outline-none",
                  isSelected
                    ? "scale-[1.02] border shadow-[0_0_30px_rgba(226,193,150,0.15)] md:scale-[1.03]"
                    : "border border-[#414846]/10 hover:border-[#e2c196]/20 hover:bg-[#191c1b]"
                )}
                style={
                  isSelected
                    ? {
                      backgroundColor: "rgba(226, 193, 150, 0.1)",
                      borderColor: "rgba(226, 193, 150, 0.3)",
                    }
                    : undefined
                }
              >
                <div
                  className={cn(
                    "flex size-20 items-center justify-center rounded-full border transition-transform duration-500 group-hover:scale-110",
                    isSelected
                      ? "border-[#e2c196]/40 bg-[#e2c196]/5"
                      : "border-[#414846]/20 group-hover:border-[#e2c196]/40"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-9 transition-colors duration-500 sm:size-10",
                      isSelected
                        ? "text-[#e2c196]"
                        : "text-[#c1c8c5] group-hover:text-[#e2c196]"
                    )}
                    strokeWidth={1.25}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-500",
                    isSelected
                      ? "text-[#e2c196]"
                      : "text-[#c1c8c5] group-hover:text-[#e2c196]"
                  )}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </main>

      <footer
        className="z-50 shrink-0 border-0 bg-[#111413]/90 backdrop-blur-2xl "
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-3 text-[10px] tracking-[0.25em] cursor-pointer text-stone-500 uppercase transition-colors duration-500 hover:text-[#e2c196] active:scale-95"
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={1.5} />
            Previous Phase
          </button>
          <button
            type="button"
            onClick={handleProceed}
            className="flex items-center cursor-pointer gap-4 rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] text-[10px] font-bold tracking-[0.3em] text-[#291800] uppercase shadow-[0_10px_30px_rgba(226,193,150,0.2)] transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_40px_rgba(226,193,150,0.4)] active:scale-95 sm:px-10 sm:py-5"
          >
            Proceed to Carving
            <ArrowRight className="size-4 shrink-0" strokeWidth={1.5} />
          </button>
        </div>
      </footer>

      <div
        className="pointer-events-none fixed top-0 right-0 z-0 h-full w-1/3 opacity-20"
        aria-hidden
      >
        <Image
          alt=""
          className="h-full w-full object-cover mix-blend-overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7BAvy92v0ebjRSoMVSO0dFx9fbqP2fQ20l0vyN40Tcj6mVBRHoeM5aSzYtoVqfELFT0h9lrxs11Nmowe-4IaJbftI3-UmurDQE-XcJ-pGPWMjWz16NcnR6U0y4BARf_cwW_PuFIORLpa8AK7eIOhgihelmq3lyEy7O_QLdwZ_0WD6nxK7ofXRchVf7blVoX7-bvJ2vXeTGrPxSX-mn_sUv_4SFVm9v_45eihMhK4X4Zvs5vr5YGBG_SXiwYvKvrx3ER-KR1QQE6I"
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}
