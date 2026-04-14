"use client"

import { useCallback, useMemo, useState } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import {
    ArrowLeft,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    X,
} from "lucide-react"
import { Modal } from "@/components/Client/Dialogue"
import { DialogClose, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import useJewelleryStore from "@/app/store/jewellery-store"

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
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

type GemChoice = "ruby" | "emerald" | "sapphire" | "spinel"

type GemOption = {
    id: GemChoice
    name: string
    subtitle: string
    glowClassName: string
    imageUrl: string
}

const GEMS: GemOption[] = [
    {
        id: "ruby",
        name: "Ruby",
        subtitle: "Deep Red Brilliance",
        glowClassName: "bg-red-400/15",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCKSudtFtkMZLUrOWQJsoH8meXr5-bXqfiT115t87R8GQ4knDrCkqHnPeRdtoPaeAbJQZuWFMSX-RxFt3Y08-ihJgaIKjkTkY30kUF781oxCsr59xMaXt401_wmr8rhQ0IZCVy8Kri1Q-u3jjNiaxPECqUlPJHTKuCqE6x98CzK5KxoBGV-hGc8uF4J6G0pSbjOUjjGJkIvfLupl7W-Rm6bfEwyJpBY_11Y72Bm9EJy7Q3-xMcmCAYUFJDtwPNPTVhS5JImi6XcqkU",
    },
    {
        id: "emerald",
        name: "Emerald",
        subtitle: "Timeless Green Majesty",
        glowClassName: "bg-teal-300/20",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDQb4qZal4j-gp2ghs_DXEnDAkLKgSV9-WgKWN9ve3EZcQblV-wN_HWiHT5E7-OjJvrUCDEY_584xXMtYN_1GP9cdVsTtUHp3mjzVdwlGVNqG3GdrJ0hb_bd_9i9Tt-yx-c2GCHLJqhuoRg1-yn1vmP-dmhfHdMjEZagJGD-yPhhTXJfX9QQgnUaY7yc16r7yPSp6aZJaf0ZRSKFPjdj9ETJOhk7ldnBiC1HRXXV11_Q_3Xt4XvAnTAceAJaAwga8yucA59_0q51yE",
    },
    {
        id: "sapphire",
        name: "Sapphire",
        subtitle: "Celestial Blue Depth",
        glowClassName: "bg-blue-400/15",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAmvjVA5mNDH2YOdwx_jgNKOLPZLekpCudn1rvOfu3RtSPD5WPNN10SQx4Hj8KAc_ErmrvX7WkLud4PjFA2KKzj3_51IbpRSJ2D57j9U0WBhjAVNPHNTCf0UmQFdJrvKWzlLQMCst06Ht3um5IIUonwuXs2puUx3m1rwzaynvPNaOUi7rQnkDbLSB0uV4GL8V5cpHR2o45CjxYA6yDF1PrJlvizpeeMXSecP55VXceg-Gomon2EVt3CeHi3lgNcSLnzCx8KysuecDo",
    },
    {
        id: "spinel",
        name: "Spinel",
        subtitle: "Rare Midnight Sparkle",
        glowClassName: "bg-violet-300/20",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAWMWbFnceF75yvYnjlX_RijDnF2kDROp2XCrjQpM4jgTn8CMX3Erf-psJ1i4SRIxWTk-c7k5zSw-NWlrGAgVq9mgBJw3v07H_tggaGbBylsK3zOPUcMnby8LFrr-7mscr8JAptVeC_XWGwriuuuh83OqN29Fj6afVDzGYBA-1lM0vE12nkBvpWxez7KCkYP-R3FYx5a6-jBS75h5Wee55CgMA1VWJ3r9FHEIyXRsSjFeueTtkBCfcqABFBltUOMZ7YqZtp5leokwk",
    },
]

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    step?: number
    totalSteps?: number
    onBack?: () => void
    onContinue?: (gem: GemChoice) => void
}

export default function ChooseGem({
    open,
    onOpenChange,
    step = 3,
    totalSteps = 7,
    onBack,
    onContinue,
}: Props) {
    const [selectedGem, setSelectedGem] = useState<GemChoice>("emerald")
    const selectedGemData = useMemo(
        () => GEMS.find((gem) => gem.id === selectedGem) ?? GEMS[0],
        [selectedGem]
    )

    const { gemType, setGemType } = useJewelleryStore()

    const handleBack = useCallback(() => {
        if (onBack) {
            onBack()
            return
        }
        onOpenChange(false)
    }, [onBack, onOpenChange])

    const handleContinue = useCallback(() => {
        if (onContinue) {
            onContinue(selectedGem)
            return
        }
        onOpenChange(false)
    }, [onContinue, onOpenChange, selectedGem])

    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <div
                className={cn(
                    "relative flex min-h-0 flex-1 flex-col overflow-hidden",
                    "selection:bg-[#e2c196] selection:text-[#111413]",
                    manrope.className
                )}
                style={{ color: ON_SURFACE, backgroundColor: SURFACE }}
            >
                <DialogTitle className="sr-only">
                    Select your gemstone for custom creation.
                </DialogTitle>

                <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-[#111413]/80 px-8 backdrop-blur-xl">
                    <div
                        className={cn("text-xl font-light italic tracking-tight", notoSerif.className)}
                        style={{ color: ACCENT }}
                    >
                        The Midnight Atelier
                    </div>
                    <div className={cn("hidden items-center gap-8 md:flex", notoSerif.className)}>
                        <span className="cursor-pointer tracking-tight text-[#e1e3e1]/60 transition-colors duration-300 hover:text-[#e2c196]">
                            Collections
                        </span>
                        <span className="cursor-pointer tracking-tight text-[#e1e3e1]/60 transition-colors duration-300 hover:text-[#e2c196]">
                            Heritage
                        </span>
                        <span className="cursor-pointer font-medium tracking-tight text-[#e2c196]">
                            Custom Creation
                        </span>
                    </div>
                    <DialogClose
                        type="button"
                        className="text-[#e2c196] transition-all active:opacity-70"
                    >
                        <X className="size-5" strokeWidth={1.5} />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                    <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-[#414846]/20 to-transparent" />
                </nav>

                <main className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-32 pb-40 md:px-8">
                    <div className="mx-auto mb-12 w-full max-w-md">
                        <Modal.Stepper step={step} totalSteps={totalSteps} label="Gemstone Selection" />
                    </div>

                    <header className="mb-16 text-center">
                        <h1
                            className={cn(
                                "mb-4 text-4xl font-light italic tracking-tight md:text-6xl",
                                notoSerif.className
                            )}
                        >
                            Select your gemstone
                        </h1>
                        <p
                            className="mx-auto max-w-lg text-sm tracking-wide opacity-80 md:text-base"
                            style={{ color: ON_SURFACE_VARIANT }}
                        >
                            Choose a stone that defines your piece, reflecting your personal
                            narrative through its eternal hue.
                        </p>
                    </header>

                    <section className="relative w-full">
                        <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pt-4 pb-12">
                            {GEMS.map((gem) => {
                                const isSelected = gem.id === selectedGem
                                return (
                                    <button
                                        key={gem.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedGem(gem.id)
                                            setGemType(gem.id)
                                        }}
                                        className={cn(
                                            "group snap-center shrink-0 rounded-xl",
                                            "focus-visible:ring-2 focus-visible:ring-[#e2c196]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111413] focus-visible:outline-none"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "w-72 rounded-xl border p-8 text-center transition-all duration-500 md:w-80",
                                                "flex flex-col items-center",
                                                "bg-[rgba(25,28,27,0.6)] backdrop-blur-3xl",
                                                isSelected
                                                    ? "translate-y-[-8px] border-[#e2c196]/60 shadow-[0_0_30px_rgba(226,193,150,0.2)]"
                                                    : "border-[#414846]/15 hover:-translate-y-2 hover:border-[#e2c196]/40"
                                            )}
                                        >
                                            <div className="relative mb-8 flex size-40 items-center justify-center">
                                                <div
                                                    className={cn(
                                                        "absolute inset-0 rounded-full blur-3xl transition-transform duration-700",
                                                        gem.glowClassName,
                                                        isSelected ? "scale-110" : "scale-75 group-hover:scale-100"
                                                    )}
                                                />
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={gem.imageUrl}
                                                    alt={gem.name}
                                                    className={cn(
                                                        "z-10 rounded-full object-cover shadow-2xl transition-transform duration-500",
                                                        isSelected
                                                            ? "size-36 scale-110 shadow-[0_0_40px_rgba(172,205,199,0.3)]"
                                                            : "size-32 group-hover:scale-110"
                                                    )}
                                                />
                                                {isSelected && (
                                                    <div className="pointer-events-none absolute inset-0 z-20 rounded-full border-2 border-[#e2c196]/30" />
                                                )}
                                            </div>
                                            <h3
                                                className={cn(
                                                    "mb-2 text-2xl",
                                                    notoSerif.className,
                                                    isSelected ? "text-[#e2c196]" : "text-[#e1e3e1]"
                                                )}
                                            >
                                                {gem.name}
                                            </h3>
                                            <p
                                                className={cn(
                                                    "text-xs tracking-widest uppercase",
                                                    isSelected
                                                        ? "font-bold text-[#e2c196]/80"
                                                        : "text-[#c1c8c5] opacity-70"
                                                )}
                                            >
                                                {gem.subtitle}
                                            </p>
                                            {isSelected && (
                                                <div className="mt-4 flex items-center gap-2">
                                                    <span className="size-1 animate-pulse rounded-full bg-[#e2c196]" />
                                                    <span className="text-[10px] tracking-widest text-[#e2c196] uppercase">
                                                        Selected Choice
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="pointer-events-none absolute top-1/2 -left-4 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#414846]/20 bg-[rgba(25,28,27,0.6)] text-[#c1c8c5] opacity-40 backdrop-blur-3xl md:left-0">
                            <ChevronLeft className="size-5" />
                        </div>
                        <div className="pointer-events-none absolute top-1/2 -right-4 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#414846]/20 bg-[rgba(25,28,27,0.6)] text-[#e2c196] backdrop-blur-3xl md:right-0">
                            <ChevronRight className="size-5" />
                        </div>
                    </section>

                    <section className="mx-auto mt-12 w-full max-w-3xl rounded-xl border border-dashed border-[#414846]/30 bg-[rgba(25,28,27,0.6)] p-8 backdrop-blur-3xl">
                        <div className="flex flex-col items-center gap-8 md:flex-row">
                            <div className="shrink-0">
                                <div className="flex size-16 items-center justify-center rounded-full border border-[#e2c196]/20 bg-[#282b29] text-[#e2c196]">
                                    <Sparkles className="size-7" />
                                </div>
                            </div>
                            <div>
                                <h4 className={cn("mb-2 text-xl", notoSerif.className)}>
                                    {selectedGemData.name} Heritage Selection
                                </h4>
                                <p
                                    className="text-sm leading-relaxed opacity-80"
                                    style={{ color: ON_SURFACE_VARIANT }}
                                >
                                    The {selectedGemData.name} is curated for exceptional beauty and
                                    responsible sourcing. Each stone is hand-selected for its tone,
                                    clarity, and luminous character to elevate your bespoke piece.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                <footer
                    className={cn(
                        "fixed bottom-8 left-1/2 z-50 flex w-auto min-w-[320px] -translate-x-1/2 items-center justify-between gap-4 rounded-full border p-2 md:min-w-[500px]",
                        "border-[#414846]/15 bg-[#191c1b]/60 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
                    )}
                >
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-2 px-8 py-3 text-[#e1e3e1] transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                        <ArrowLeft className="size-[18px]" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                            Back
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="group flex items-center gap-3 rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-10 py-3 text-[#111413] shadow-[0_0_20px_rgba(226,193,150,0.3)] transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                        <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase">
                            Proceed to Metal Selection
                        </span>
                        <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-1" />
                    </button>
                </footer>

                <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[-20%] right-[-10%] h-[60%] w-[60%] rounded-full bg-teal-300/5 blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] h-[50%] w-[50%] rounded-full bg-[#e2c196]/5 blur-[100px]" />
                </div>
            </div>
        </Modal>
    )
}
