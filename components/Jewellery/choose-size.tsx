"use client"

import { useCallback, useMemo, useState } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import {
    ArrowLeft,
    Diamond,
    LockKeyhole,
    PenSquare,
    ShoppingBag,
    Sparkles,
    User,
} from "lucide-react"
import { Modal } from "@/components/Client/Dialogue"
import { DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import useJewelleryStore from "@/app/store/jewellery-store"

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "600"],
})

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    style: ["normal", "italic"],
})

const SURFACE = "#111413"
const ON_SURFACE = "#e1e3e1"
const ON_SURFACE_VARIANT = "#c1c8c5"

const SIZE_OPTIONS = ["5", "6", "7", "8", "9", "10"] as const
type SizeChoice = (typeof SIZE_OPTIONS)[number]

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    step?: number
    totalSteps?: number
    onBack?: () => void
    onContinue?: (size: string) => void
}

export default function ChooseSize({
    open,
    onOpenChange,
    step = 5,
    totalSteps = 7,
    onBack,
    onContinue,
}: Props) {
    const [selectedSize, setSelectedSize] = useState<SizeChoice>("7")
    const [customSize, setCustomSize] = useState("")

    const finalSize = useMemo(() => {
        const normalized = customSize.trim()
        return normalized.length > 0 ? normalized : selectedSize
    }, [customSize, selectedSize])

    const { sizeType, setSizeType } = useJewelleryStore()

    const handleBack = useCallback(() => {
        if (onBack) {
            onBack()
            return
        }
        onOpenChange(false)
    }, [onBack, onOpenChange])

    const handleContinue = useCallback(() => {
        if (onContinue) {
            onContinue(finalSize)
            return
        }
        onOpenChange(false)
    }, [finalSize, onContinue, onOpenChange])

    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <div
                className={cn(
                    "relative flex min-h-0 flex-1 flex-col overflow-hidden",
                    "selection:bg-[#e2c196]/30 selection:text-[#111413]",
                    manrope.className
                )}
                style={{ backgroundColor: SURFACE, color: ON_SURFACE }}
            >
                <DialogTitle className="sr-only">Select your ring size</DialogTitle>

                <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    <div className={cn("text-2xl font-light italic text-[#e2c196]", notoSerif.className)}>
                        Midnight Atelier
                    </div>
                    <div className="flex items-center gap-6">
                        <ShoppingBag className="size-5 cursor-pointer text-[#e1e3e1]/60 transition-colors hover:text-[#e2c196]" />
                        <User className="size-5 cursor-pointer text-[#e1e3e1]/60 transition-colors hover:text-[#e2c196]" />
                    </div>
                </header>

                <main className="emerald-depth flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 pt-24 pb-32">
                    <div className="mb-16 w-full max-w-xl">
                        <Modal.Stepper step={step} totalSteps={totalSteps} label="Crafting in Progress" />
                    </div>

                    <section className="flex w-full max-w-4xl flex-col items-center gap-12 md:flex-row md:gap-24">
                        <div className="flex w-full justify-center md:w-1/2">
                            <div className="group relative">
                                <div className="absolute inset-0 rounded-full bg-[#e2c196]/10 blur-[80px] transition-all duration-700 group-hover:bg-[#e2c196]/20" />
                                <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-xl bg-[#282b29] p-8 md:h-80 md:w-80">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt="Luxury emerald cut diamond ring on a velvet pedestal"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNTs41vj6cvwGmiGjAeGK9pCxNZbm8NHIjA45eBNoNciD45BkdKDgjdIt2cdZ1KpggJnCYLE7CYPnZa2UWw8fJ-zpBfYsm-7pEqTiM4Mt74iPrmeXpwCcOE5RfXs1uAEIaFgQDy6euE24dlSsyK6QX5octFTVbCAu6TKGkwGnX1Qfod5udTBQnXPSns-1-fN1rIBibUWOB7FQMnXcfpzYo48ReNGfI5bFt5q0hQmL2-snq7-AyFUIlJVfW8GBYs4Xdrdq4I290mbc"
                                        className="h-full w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <div className="mb-10 text-center md:text-left">
                                <h1 className={cn("mb-4 text-4xl font-light tracking-tight md:text-5xl", notoSerif.className)}>
                                    Select your size
                                </h1>
                                <p className="text-lg" style={{ color: ON_SURFACE_VARIANT }}>
                                    Choose or enter your preferred size
                                </p>
                            </div>

                            <div className="mb-12">
                                <div className="mb-8 flex flex-wrap justify-center gap-4 md:justify-start">
                                    {SIZE_OPTIONS.map((size) => {
                                        const isSelected = size === selectedSize && customSize.trim().length === 0
                                        return (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedSize(size)
                                                    setSizeType(size)
                                                }}
                                                className={cn(
                                                    "flex h-16 w-16 items-center justify-center rounded-full border text-sm tracking-widest transition-all duration-300",
                                                    "focus-visible:ring-2 focus-visible:ring-[#e2c196]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111413] focus-visible:outline-none",
                                                    isSelected
                                                        ? "scale-110 border-[#e2c196]/60 bg-[#0c0f0e] text-[#e2c196] shadow-xl shadow-[#e2c196]/20"
                                                        : "border-[#414846]/15 bg-[#191c1b] text-[#c1c8c5] hover:border-[#e2c196]/40"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="group relative max-w-xs">
                                    <label
                                        className="mb-2 ml-1 block text-[10px] tracking-[0.2em] uppercase"
                                        style={{ color: ON_SURFACE_VARIANT }}
                                    >
                                        Custom Size
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter custom size"
                                        value={customSize}
                                        onChange={(e) => {
                                            setCustomSize(e.target.value)

                                        }}
                                        className="w-full rounded-md border border-[#414846]/15 bg-[#0c0f0e] px-4 py-4 placeholder:text-[#c1c8c54d] focus:border-[#e2c196]/40 focus:ring-1 focus:ring-[#e2c196]/20 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-8">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase transition-colors hover:text-[#e2c196]"
                                    style={{ color: ON_SURFACE_VARIANT }}
                                >
                                    <ArrowLeft className="size-4" />
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleContinue}
                                    className="bg-linear-to-br from-[#e2c196] to-[#a58860] rounded-md px-12 py-4 text-[11px] font-semibold tracking-[0.2em] text-[#291800] uppercase shadow-[0_10px_30px_rgba(226,193,150,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(226,193,150,0.25)]"
                                >
                                    Next Step
                                </button>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="fixed bottom-0 left-0 flex w-full items-center justify-around rounded-t-[2rem] bg-[#111413]/90 px-6 pt-4 pb-8 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:hidden">
                    <div className="flex flex-col items-center justify-center text-[#e1e3e1]/40">
                        <Diamond className="size-5" />
                        <span className="mt-1 text-[10px] tracking-[0.2em] uppercase">Gallery</span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-full bg-[#e2c196]/10 px-6 py-2 text-[#e2c196] shadow-[0_0_20px_rgba(226,193,150,0.2)]">
                        <PenSquare className="size-5" />
                        <span className="mt-1 text-[10px] tracking-[0.2em] uppercase">Design</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-[#e1e3e1]/40">
                        <LockKeyhole className="size-5" />
                        <span className="mt-1 text-[10px] tracking-[0.2em] uppercase">Vault</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-[#e1e3e1]/40">
                        <Sparkles className="size-5" />
                        <span className="mt-1 text-[10px] tracking-[0.2em] uppercase">Atelier</span>
                    </div>
                </footer>
            </div>
        </Modal>
    )
}
