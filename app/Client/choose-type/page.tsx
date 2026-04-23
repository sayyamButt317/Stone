"use client"
import { useCallback, useState, type CSSProperties } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import { ArrowRight, Gem, Link, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import useJewelleryStore from "@/app/store/jewellery-store"
import Stepper from "@/components/Client/stepper"
import { useRouter } from "next/navigation"


const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
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

type JewelleryType = "ring" | "necklace" | "bracelet" | "earrings" | "other"

const JEWELRY_TYPES = [
    { id: "ring" as const, label: "Ring", Icon: Gem },
    { id: "necklace" as const, label: "Necklace", Icon: Sparkles },
    { id: "bracelet" as const, label: "Bracelet", Icon: Link },
    { id: "earrings" as const, label: "Earrings", Icon: Sparkles },
]

type Props = {
    step?: number
    totalSteps?: number
    onContinue?: (type: JewelleryType) => void
}

export default function ChooseJewelleryType({
}: Props) {
    const [selected, setSelected] = useState<JewelleryType>("ring")
    const router = useRouter();

    const routeMap: Record<JewelleryType, string> = {
        ring: "/Client/ringstyle",
        necklace: "/Client/necklace",
        bracelet: "/Client/braclet",
        earrings: "/Client/earings",
        other: ""
    }

    const handleContinue = useCallback(() => {
        const route = routeMap[selected]
        if (route) {
            router.push(route)
        }
    }, [selected, router])

    const { jewelleryType, setJewelleryType } = useJewelleryStore()

    return (

        <div
            className={cn(
                "relative z-0 flex min-h-0 flex-1 flex-col overflow-hidden selection:bg-[#e2c196] selection:text-[#111413]",
                manrope.className
            )}
            style={{ color: ON_SURFACE, backgroundColor: SURFACE }}
        >
            <h1 className="sr-only">
                Choose the type of jewellery to begin your design.
            </h1>

            <div
                className="pointer-events-none absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-[#0F2A26]/20 blur-[120px]"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute right-[-5%] bottom-[-5%] h-[40%] w-[40%] rounded-full blur-[100px]"
                style={{ backgroundColor: `${ACCENT}14` }}
                aria-hidden
            />

            <header className="z-50 flex h-24 w-full shrink-0 items-center justify-between px-6 sm:px-12">
                <div
                    className={cn(
                        "text-xl tracking-widest sm:text-2xl",
                        notoSerif.className
                    )}
                >
                    L&apos;ATELIER
                </div>
                {/* <div className="flex w-56 items-start gap-4">
                    <div className="flex-1">
                        <Stepper compact step={step} totalSteps={totalSteps} />
                    </div>
                </div> */}
            </header>

            <section className="relative z-10 flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 py-2">
                <div className="mb-12 max-w-2xl space-y-4 text-center sm:mb-2">
                    <h1
                        className={cn(
                            "text-3xl leading-tight tracking-tight sm:text-5xl md:text-6xl",
                            notoSerif.className
                        )}
                    >
                        What would you like to create?
                    </h1>
                    <p
                        className="text-base font-light tracking-wide sm:text-lg"
                        style={{ color: ON_SURFACE_VARIANT }}
                    >
                        Choose the type of jewellery to begin your design
                    </p>
                </div>

                <div className="flex w-full max-w-7xl flex-wrap justify-center gap-6 px-4">
                    {
                        JEWELRY_TYPES.map(({ id, label, Icon }) => {
                            const activeType = (jewelleryType || selected)
                            const isSelected = activeType === id
                            return (
                                <div
                                    key={id}
                                    role="button"
                                    tabIndex={0}
                                    aria-pressed={isSelected}
                                    onClick={() => {
                                        setSelected(id)
                                        setJewelleryType(id)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault()
                                            setJewelleryType(id)
                                        }
                                    }}
                                    className={cn("group relative w-full max-w-[240px] cursor-pointer transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#e2c196]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111413] focus-visible:outline-none", !isSelected && "hover:scale-[1.02]")}
                                >
                                    {isSelected ? (
                                        <div
                                            className="absolute inset-0 rounded-lg bg-primary/10 blur-2xl"
                                            style={{ backgroundColor: `${ACCENT}1a` }}
                                            aria-hidden
                                        />
                                    ) : null}
                                    <div
                                        className={cn(
                                            "relative flex h-72 flex-col items-center justify-center rounded-lg border p-8 transition-all duration-500",
                                            "bg-[rgba(25,28,27,0.4)] backdrop-blur-3xl",
                                            !isSelected &&
                                            "border-[#414846]/20 hover:border-[#e2c196]/20"
                                        )}
                                        style={
                                            {
                                                borderColor: isSelected
                                                    ? `${ACCENT}66`
                                                    : undefined,
                                                boxShadow: isSelected
                                                    ? "0 0 30px rgba(226,193,150,0.1)"
                                                    : undefined,
                                            } as CSSProperties
                                        }
                                    >
                                        <div className="relative mb-6">
                                            {isSelected ? (
                                                <span
                                                    className="pointer-events-none absolute inset-0 rounded-full blur-xl"
                                                    style={{ backgroundColor: `${ACCENT}33` }}
                                                    aria-hidden
                                                />
                                            ) : null}
                                            <Icon
                                                className={cn(
                                                    "relative z-1 size-14 transition-colors duration-500 sm:size-16",
                                                    isSelected
                                                        ? "text-[#e2c196]"
                                                        : "text-[#c1c8c566] group-hover:text-[#e2c196]/60"
                                                )}
                                                strokeWidth={1}
                                            />
                                        </div>
                                        <h3
                                            className={cn(
                                                "text-center text-2xl tracking-wide transition-colors duration-500",
                                                notoSerif.className,
                                                isSelected
                                                    ? "text-[#e1e3e1]"
                                                    : "text-[#c1c8c5] group-hover:text-[#e1e3e1]"
                                            )}
                                        >
                                            {label}
                                        </h3>
                                        {isSelected ? (
                                            <div
                                                className="mt-4 rounded-full border px-4 py-1"
                                                style={{
                                                    backgroundColor: `${ACCENT}1a`,
                                                    borderColor: `${ACCENT}33`,
                                                }}
                                            >
                                                <span
                                                    className="text-[10px] tracking-[0.2em] uppercase"
                                                    style={{ color: ACCENT }}
                                                >
                                                    Selected
                                                </span>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </section>

            <nav
                className="z-50 flex shrink-0 justify-center border-0 bg-transparent px-4 py-8 pb-10"
                style={{
                    background: "rgba(17, 20, 19, 0.6)",
                    backdropFilter: "blur(40px)",
                }}
            >
                <button
                    type="button"
                    onClick={handleContinue}
                    className="group cursor-pointer flex items-center gap-4 rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] px-10 py-4 shadow-[0_0_30px_rgba(226,193,150,0.2)] transition-transform duration-300 hover:scale-[1.02] active:scale-95 sm:px-12"
                >
                    <span className="text-sm font-bold tracking-[0.25em] uppercase text-[#111413]">
                        Begin Crafting
                    </span>
                </button>
            </nav>

            <div
                className="pointer-events-none fixed top-0 right-0 -z-10 h-screen w-1/3 translate-x-1/2 skew-x-12 bg-[#191c1b]/20"
                aria-hidden
            />
            <div
                className="pointer-events-none fixed bottom-0 left-0 -z-10 h-1/2 w-1/4 -skew-x-6 bg-[#191c1b]/10"
                aria-hidden
            />
        </div>

    )
}
