"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Manrope, Noto_Serif } from "next/font/google"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { FLOW_ROUTES } from "../flow-routes"
import { BRACELET_OPTIONS } from "@/app/constant/braclet"
import { BraceletStyle } from "@/app/types/braclet-type"

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
})

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
})


export default function BraceletPage() {
    const router = useRouter()
    const [selectedStyle, setSelectedStyle] =
        useState<BraceletStyle>("tennis-bracelet")

    const currentSelection = useMemo(
        () =>
            BRACELET_OPTIONS.find((option) => option.id === selectedStyle)?.name ??
            "Tennis Bracelet",
        [selectedStyle]
    )

    return (
        <div
            className={cn(
                "min-h-screen bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196]/30",
                manrope.className
            )}
        >
            {/* <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-8 py-6 backdrop-blur-xl">
                <div
                    className={cn(
                        "text-xl tracking-[0.2em] text-[#e2c196] uppercase",
                        notoSerif.className
                    )}
                >
                    The Midnight Atelier
                </div>

                <div className={cn("hidden items-center gap-8 md:flex", notoSerif.className)}>
                    <button
                        type="button"
                        className="tracking-tight text-[#e1e3e1]/60 transition-colors hover:text-[#e1e3e1]"
                    >
                        Collections
                    </button>
                    <button
                        type="button"
                        className="border-b border-[#e2c196] pb-1 tracking-tight text-[#e2c196]"
                    >
                        Bespoke
                    </button>
                    <button
                        type="button"
                        className="tracking-tight text-[#e1e3e1]/60 transition-colors hover:text-[#e1e3e1]"
                    >
                        Heritage
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="rounded-full p-2 text-[#e2c196] transition-all duration-300 hover:bg-[#e2c196]/10"
                    >
                        <ShoppingBag className="size-5" />
                    </button>
                </div>
            </nav> */}

            <header className="mx-auto mt-28 w-full max-w-7xl px-8 md:px-24">
                <div className="mb-4 flex items-end justify-between">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#e2c196] uppercase">
                        Step 2 of 7
                    </span>
                    <span className="text-xs tracking-widest text-[#e1e3e1]/40 uppercase">
                        Bracelet Selection
                    </span>
                </div>
                <div className="h-px w-full overflow-hidden bg-[#414846]/30">
                    <div className="h-full w-[28.5%] bg-linear-to-r from-[#e2c196] to-[#a58860] transition-all duration-700" />
                </div>
            </header>

            <main className="mx-auto w-full max-w-7xl grow px-8 py-16 md:px-24">
                <div className="mb-16">
                    <h1
                        className={cn(
                            "mb-4 text-4xl text-[#e2c196] tracking-tight md:text-6xl",
                            notoSerif.className
                        )}
                    >
                        Select your bracelet style
                    </h1>
                    <p className="max-w-2xl text-lg font-light text-[#e1e3e1]/60">
                        Choose a silhouette that speaks to your aesthetic, from the classic
                        radiance of a tennis line to the bold sculpture of a gold cuff.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {BRACELET_OPTIONS.map(({ id, name, description, image }) => {
                        const isSelected = id === selectedStyle
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setSelectedStyle(id)}
                                className={cn(
                                    "group relative overflow-hidden rounded-lg p-px transition-all duration-300",
                                    isSelected
                                        ? "bg-[#191c1b] shadow-[0_0_30px_rgba(226,193,150,0.2)] ring-1 ring-[#e2c196]/40"
                                        : "bg-[#191c1b] hover:bg-[#e2c196]/20"
                                )}
                            >
                                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.9rem] bg-[#111413] p-6 text-left">
                                    <div className="mb-8 overflow-hidden rounded-lg">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            alt={name}
                                            src={image}
                                            className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3
                                                className={cn(
                                                    "text-2xl transition-colors",
                                                    notoSerif.className,
                                                    isSelected
                                                        ? "text-[#e2c196]"
                                                        : "text-[#e1e3e1] group-hover:text-[#e2c196]"
                                                )}
                                            >
                                                {name}
                                            </h3>
                                        </div>
                                        <p className="text-sm leading-relaxed font-light text-[#e1e3e1]/60">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>

                <div className="h-32" />
            </main>

            <footer className="fixed bottom-0 left-0 z-50 flex h-24 w-full items-center justify-between bg-[#111413]/90 px-8 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:px-12">
                <button
                    type="button"
                    onClick={() => router.push(FLOW_ROUTES.chooseType)}
                    className="group flex items-center gap-2 px-8 py-3 text-[#e1e3e1] opacity-70 transition-all duration-200 hover:opacity-100"
                >
                    <ArrowLeft className="size-4" />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Back
                    </span>
                </button>

                <div className="hidden flex-col items-center md:flex">
                    <span className="mb-1 text-[10px] font-bold tracking-[0.3em] text-[#e1e3e1]/30 uppercase">
                        Current Selection
                    </span>
                    <span className="text-xs font-bold tracking-widest text-[#e2c196]">
                        {currentSelection}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => router.push(FLOW_ROUTES.chooseGender)}
                    className="flex items-center gap-3 rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] px-10 py-4 text-[#111413] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(226,193,150,0.2)] active:scale-95"
                >
                    <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase">
                        Next Step: Intended Wearer
                    </span>
                    <ArrowRight className="size-4" />
                </button>
            </footer>
        </div>
    )
}
