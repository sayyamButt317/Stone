"use client"

import { useMemo, useState } from "react"
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

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
})

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
})

type StoneColor =
    | "black"
    | "blue"
    | "brown"
    | "clear"
    | "gray"
    | "green"
    | "multicolor"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "yellow"

const COLORS: Array<{
    id: StoneColor
    label: string
    swatch: string
}> = [
        { id: "black", label: "Black", swatch: "#000000" },
        { id: "blue", label: "Blue", swatch: "#2196F3" },
        { id: "brown", label: "Brown", swatch: "#795548" },
        { id: "clear", label: "Clear", swatch: "#f8f9fa" },
        { id: "gray", label: "Gray", swatch: "#9e9e9e" },
        { id: "green", label: "Green", swatch: "#2e7d32" },
        {
            id: "multicolor",
            label: "Multicolor",
            swatch: "linear-gradient(135deg,#f44336 0%,#2196F3 50%,#ffeb3b 100%)",
        },
        { id: "orange", label: "Orange", swatch: "#ff9800" },
        { id: "pink", label: "Pink", swatch: "#e91e63" },
        { id: "purple", label: "Purple", swatch: "#9c27b0" },
        { id: "red", label: "Red", swatch: "#d32f2f" },
        { id: "yellow", label: "Yellow", swatch: "#ffeb3b" },
    ]

export default function StonePage() {
    const router = useRouter()
    const [selectedColor, setSelectedColor] = useState<StoneColor>("green")

    const selectedLabel = useMemo(
        () => COLORS.find((c) => c.id === selectedColor)?.label ?? "Green",
        [selectedColor]
    )

    return (
        <div
            className={cn(
                "min-h-screen bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196]/30",
                manrope.className
            )}
        >
            <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-12 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <div className={cn("text-2xl tracking-[0.2em] text-[#e2c196] uppercase", notoSerif.className)}>
                    L&apos;ATELIER
                </div>
                <div className={cn("hidden items-center gap-12 md:flex", notoSerif.className)}>
                    <button type="button" className="font-light text-[#c1c8c5] transition-colors duration-500 hover:text-[#e2c196]">
                        Collections
                    </button>
                    <button type="button" className="border-b border-[#e2c1964d] pb-1 font-light text-[#e2c196]">
                        Bespoke
                    </button>
                    <button type="button" className="font-light text-[#c1c8c5] transition-colors duration-500 hover:text-[#e2c196]">
                        Heritage
                    </button>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-[#c1c8c5] transition-colors duration-300 hover:text-[#e2c196]">
                        <ShoppingBag className="size-5" />
                    </button>
                    <button className="text-[#c1c8c5] transition-colors duration-300 hover:text-[#e2c196]">
                        <User className="size-5" />
                    </button>
                </div>
            </nav>

            <aside className="fixed top-0 left-0 z-40 hidden h-screen w-24 flex-col items-center gap-8 border-r border-[#4148461a] bg-[#191c1b]/60 py-24 backdrop-blur-2xl lg:flex">
                <div className="mb-8 flex flex-col items-center gap-1">
                    <span className="text-xs tracking-tight text-[#e2c196]">02</span>
                    <div className="h-8 w-px bg-[#4148464d]" />
                </div>

                <div className="flex flex-col items-center gap-10">
                    <div className="flex flex-col items-center gap-2">
                        <PenSquare className="size-8 cursor-pointer text-[#c1c8c566] transition-all duration-300 hover:bg-[#1d201f]" />
                        <span className="text-[10px] tracking-widest text-[#c1c8c566] uppercase">Design</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Diamond className="size-8 cursor-pointer rounded-full bg-[#e2c1961a] p-1 text-[#e2c196] shadow-[0_0_20px_rgba(226,193,150,0.2)]" />
                        <span className="text-[10px] tracking-widest text-[#e2c196] uppercase">Gemstones</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Sparkles className="size-8 cursor-pointer text-[#c1c8c566] transition-all duration-300 hover:bg-[#1d201f]" />
                        <span className="text-[10px] tracking-widest text-[#c1c8c566] uppercase">Setting</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Eye className="size-8 cursor-pointer text-[#c1c8c566] transition-all duration-300 hover:bg-[#1d201f]" />
                        <span className="text-[10px] tracking-widest text-[#c1c8c566] uppercase">Review</span>
                    </div>
                </div>
            </aside>

            <main className="mx-auto min-h-screen w-full max-w-7xl px-6 pt-32 pb-20 md:px-12 lg:pl-40">
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
                    <div className="rounded-xl border border-[#4148461a] bg-[#191c1b]/40 p-12 shadow-2xl backdrop-blur-md md:p-20">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {COLORS.map((color) => {
                                const isSelected = color.id === selectedColor
                                return (
                                    <button
                                        key={color.id}
                                        type="button"
                                        onClick={() => setSelectedColor(color.id)}
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

                    <div className="mt-16 flex flex-col items-center justify-between gap-8 md:flex-row">
                        <button
                            type="button"
                            onClick={() => router.push(FLOW_ROUTES.chooseGem)}
                            className="group flex items-center gap-3 px-6 py-3 text-[#c1c8c5] transition-all hover:text-[#e2c196]"
                        >
                            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                            <span className="text-sm tracking-widest uppercase">Back</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push(FLOW_ROUTES.chooseMetal)}
                            className="group rounded-md bg-linear-to-br from-[#e2c196] to-[#a58860] px-12 py-5 text-sm tracking-[0.2em] text-[#291800] uppercase shadow-[0_10px_30px_rgba(226,193,150,0.2)] transition-all hover:shadow-[0_15px_40px_rgba(226,193,150,0.3)] active:scale-95"
                        >
                            <span className="flex items-center gap-2 font-semibold">
                                See Recommendations
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </button>
                    </div>
                </section>

                <section className="mt-32 grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
                    <div className="order-2 md:order-1">
                        <span className="mb-4 block text-xs tracking-[0.2em] text-[#b0cdc6] uppercase">
                            Selected Profile: {selectedLabel}
                        </span>
                        <h3 className={cn("mb-6 text-3xl font-light", notoSerif.className)}>The Soul of the Emerald</h3>
                        <p className="mb-8 leading-relaxed text-[#c1c8c5]">
                            Green symbolizes growth, prosperity, and the eternal bloom of the natural world. In high jewelry, it is the signature of depth and timelessness, capturing the lush spirit of hidden gardens.
                        </p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-3 rounded-lg border border-[#4148460d] bg-[#1d201f] p-4">
                                <Leaf className="size-5 text-[#e2c196]" />
                                <span className="text-xs tracking-widest uppercase">Growth</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg border border-[#4148460d] bg-[#1d201f] p-4">
                                <Sparkles className="size-5 text-[#e2c196]" />
                                <span className="text-xs tracking-widest uppercase">Mystery</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 overflow-hidden rounded-lg shadow-2xl md:order-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwmmWjZQmsIJRpIz3aA-IfKrmXe_Fw5xZb8Vv7W_aEvtcLURccaXcPYV9C7PQnYySgKgQj6fHw-eTyetvUwEer6-6dvQ72QJUid_jVrKhdpJRz9as8QqdegIvRtrSfvYkQcpnD0Z1Obd4RQ1vWI7vDEnvmH-KEMAIvGG-zxGc5kmQpQfJcwAWdy28WSja7TujD1Vg_5_8KytDKnbUzW08XZyFzjm2hPFi8gHqK2I6XGZk1aVQ3DZbxBVchoY15TKt0v7uIH8bt38Q"
                            alt="Emerald gemstone"
                            className="h-full w-full object-cover grayscale-[0.2] transition-transform duration-1000 hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#111413] via-transparent to-transparent" />
                    </div>
                </section>
            </main>

            <footer className="border-t border-[#4148460d] px-12 py-12 text-center">
                <p className="text-[10px] tracking-[0.4em] text-[#c1c8c566] uppercase">
                    © 2026 L&apos;ATELIER Haute Joaillerie
                </p>
            </footer>
        </div>
    )
}
