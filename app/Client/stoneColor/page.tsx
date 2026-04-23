"use client"
import { useRouter } from "next/navigation"
import { Manrope, Noto_Serif } from "next/font/google"
import {
    ArrowLeft,
    ArrowRight,
    Diamond,
    Eye,
    Leaf,
    PenSquare,
    ShoppingBag,
    Sparkles,
    User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FLOW_ROUTES } from "../flow-routes"
import useJewelleryStore, { StoneColor } from "@/app/store/jewellery-store"
import { COLORS } from "@/app/constant/stonecolor"
import Sidebar from "@/components/Custom/sidebar"
import BackButton from "@/components/Custom/BackButton"
import CustomButton from "@/components/Custom/CustomButton"

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
})

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
})


export default function StonePage() {
    const router = useRouter()
    const { stonecolor, setStoneColor } = useJewelleryStore()

    return (
        <div
            className={cn(
                "min-h-screen bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196]/30",
                manrope.className
            )}
        >

            <Sidebar />

            <main className="mx-auto min-h-screen w-full max-w-7xl px-6 pt-24 pb-4 md:px-12 lg:pl-40">
                <header className="mb-16 w-full max-w-4xl text-center">
                    <span className="mb-4 block text-xs tracking-[0.3em] text-[#e2c196] uppercase">
                        The Color Narrative
                    </span>
                    <h1 className={cn("mb-6 text-4xl font-light tracking-tight md:text-6xl", notoSerif.className)}>
                        What colour are you drawn to most?
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#c1c8c5]">
                        Select a color family to see recommended gemstones. Each hue reflects a unique essence of your personal story.
                    </p>
                </header>

                <section className="max-w-5xl">
                    <div className="rounded-xl border border-[#4148461a] bg-[#191c1b]/40 p-2 shadow-2xl backdrop-blur-md md:p-4">
                        <div className="flex flex-wrap gap-4">
                            {COLORS.map((color) => {
                                const isSelected = color.id.toLowerCase() === stonecolor.toLowerCase()
                                return (
                                    <button
                                        key={color.id}
                                        type="button"
                                        onClick={() => setStoneColor(color.id as StoneColor)}
                                        className="group flex cursor-pointer flex-col items-center gap-4"
                                    >
                                        <div
                                            className={cn(
                                                "h-16 w-16 rounded-full border border-[#41484633] shadow-lg transition-all duration-500 group-hover:scale-110",
                                                isSelected &&
                                                "scale-110 shadow-[0_0_30px_rgba(46,125,50,0.3)] ring-2 ring-[#111413] outline-2 outline-[#e2c196]"
                                            )}
                                            style={{ background: color.swatch }}
                                        />
                                        <span
                                            className={cn(
                                                "text-[11px] tracking-widest uppercase transition-colors",
                                                isSelected
                                                    ? "text-[#e2c196]"
                                                    : "text-[#c1c8c5] group-hover:text-[#e2c196]"
                                            )}
                                        >
                                            {color.label}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-14 flex flex-col items-end justify-end gap-4 md:flex-row">
                        <div className="flex items-center gap-4">
                            <BackButton
                                onClick={() => router.back()}
                            />
                            <CustomButton
                                onClick={() => router.push(FLOW_ROUTES.chooseMetal)}
                            >
                                Next
                            </CustomButton>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
