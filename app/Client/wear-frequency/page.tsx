"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FLOW_ROUTES } from "../flow-routes"
import useJewelleryStore from "@/app/store/jewellery-store"

type WearFrequency = "every-day" | "carefully" | "special"

const WEAR_LABELS: Record<WearFrequency, string> = {
    "every-day": "Every day",
    carefully: "Often, but carefully",
    special: "Special occasions",
}

export default function WearFrequencyPage() {
    const router = useRouter()
    const setWearFrequency = useJewelleryStore((s) => s.setWearFrequency)
    const [selectedFrequency, setSelectedFrequency] = useState<WearFrequency>("every-day")

    const handleBack = () => {
        router.back()
    }

    const handleNext = () => {
        setWearFrequency(WEAR_LABELS[selectedFrequency])
        router.push(FLOW_ROUTES.personalPreferences)
    }

    return (
        <div className="curated-mesh flex min-h-screen flex-col bg-[#111413] text-[#e1e3e1]">
            <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Manrope:wght@200..800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 300,
            "GRAD" 0,
            "opsz" 24;
        }
        .glass-card {
          background: rgba(49, 76, 71, 0.1);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(65, 72, 70, 0.15);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
          border-color: rgba(226, 193, 150, 0.3);
          background: rgba(49, 76, 71, 0.2);
        }
        .selected-card {
          border-color: #e2c196 !important;
          box-shadow: 0 0 30px rgba(226, 193, 150, 0.15);
          transform: scale(1.02);
          background: rgba(49, 76, 71, 0.3) !important;
        }
        .curated-mesh {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(176, 205, 198, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(226, 193, 150, 0.05) 0%, transparent 50%);
        }
      `}</style>

            <nav className="fixed top-0 z-50 flex h-24 w-full items-center justify-between bg-[#111413]/80 px-12 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="font-['Noto_Serif'] text-2xl font-light tracking-[0.2em] text-[#e2c196]">THE MIDNIGHT ATELIER</div>
            </nav>
            <main className="mx-auto flex w-full max-w-7xl grow flex-col items-center px-6 pb-40 pt-22">
                <div className="mb-16 space-y-6 text-center">
                    <h1 className="font-['Noto_Serif'] text-4xl leading-tight text-[#e1e3e1] md:text-6xl">How will it mostly be worn?</h1>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#c1c8c5]/80">
                        Your answer helps our master jewelers recommend the most suitable setting for your stone&apos;s protection and longevity.
                    </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
                    <button
                        className={`glass-card group flex cursor-pointer flex-col items-center rounded-lg p-10 text-center ${selectedFrequency === "every-day" ? "selected-card" : ""
                            }`}
                        onClick={() => setSelectedFrequency("every-day")}
                        type="button"
                    >
                        <div className="relative mb-8">
                            {selectedFrequency === "every-day" ? <div className="absolute inset-0 scale-150 rounded-full bg-[#e2c196]/20 blur-2xl" /> : null}
                            <span
                                className={`material-symbols-outlined relative z-10 text-5xl ${selectedFrequency === "every-day" ? "text-[#e2c196]" : "text-[#c1c8c5]/40 group-hover:text-[#e2c196]/60"
                                    }`}
                                style={selectedFrequency === "every-day" ? { fontVariationSettings: '"FILL" 1' } : undefined}
                            >
                                auto_awesome
                            </span>
                        </div>
                        <h3 className="mb-4 font-['Noto_Serif'] text-2xl text-[#e1e3e1]">Every day</h3>
                        <p className="text-sm leading-relaxed text-[#c1c8c5]/80">
                            Designed for the constant companion. Priority on maximum security and durable settings.
                        </p>
                        <div className={`mt-8 flex items-center gap-2 text-[#e2c196] transition-opacity ${selectedFrequency === "every-day" ? "opacity-100" : "opacity-0"}`}>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Selected</span>
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                        </div>
                    </button>

                    <button
                        className={`glass-card group flex cursor-pointer flex-col items-center rounded-lg p-10 text-center ${selectedFrequency === "carefully" ? "selected-card" : ""
                            }`}
                        onClick={() => setSelectedFrequency("carefully")}
                        type="button"
                    >
                        <div className="mb-8">
                            <span
                                className={`material-symbols-outlined text-5xl ${selectedFrequency === "carefully" ? "text-[#e2c196]" : "text-[#c1c8c5]/40 group-hover:text-[#e2c196]/60"
                                    }`}
                                style={selectedFrequency === "carefully" ? { fontVariationSettings: '"FILL" 1' } : undefined}
                            >
                                favorite
                            </span>
                        </div>
                        <h3 className="mb-4 font-['Noto_Serif'] text-2xl text-[#e1e3e1]">Often, but carefully</h3>
                        <p className="text-sm leading-relaxed text-[#c1c8c5]/80">
                            For frequent wear with mindfulness. A balance of delicate aesthetics and essential protection.
                        </p>
                        <div className={`mt-8 flex items-center gap-2 text-[#e2c196] transition-opacity ${selectedFrequency === "carefully" ? "opacity-100" : "opacity-0"}`}>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Selected</span>
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                        </div>
                    </button>

                    <button
                        className={`glass-card group flex cursor-pointer flex-col items-center rounded-lg p-10 text-center ${selectedFrequency === "special" ? "selected-card" : ""
                            }`}
                        onClick={() => setSelectedFrequency("special")}
                        type="button"
                    >
                        <div className="mb-8">
                            <span
                                className={`material-symbols-outlined text-5xl ${selectedFrequency === "special" ? "text-[#e2c196]" : "text-[#c1c8c5]/40 group-hover:text-[#e2c196]/60"
                                    }`}
                                style={selectedFrequency === "special" ? { fontVariationSettings: '"FILL" 1' } : undefined}
                            >
                                diamond
                            </span>
                        </div>
                        <h3 className="mb-4 font-['Noto_Serif'] text-2xl text-[#e1e3e1]">Special occasions</h3>
                        <p className="text-sm leading-relaxed text-[#c1c8c5]/80">
                            The ultimate statement. Optimized for high-brilliance and artistic silhouettes that transcend the everyday.
                        </p>
                        <div className={`mt-8 flex items-center gap-2 text-[#e2c196] transition-opacity ${selectedFrequency === "special" ? "opacity-100" : "opacity-0"}`}>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Selected</span>
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                        </div>
                    </button>
                </div>


            </main>

            <div className="fixed bottom-0 z-50 h-28 w-full">
                <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-end gap-2 px-16">
                    <button
                        className="flex items-center cursor-pointer gap-4 rounded-full border border-[#414846]/15 px-10 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#e1e3e1]/40 transition-transform duration-300 hover:scale-[1.02]"
                        onClick={handleBack}
                        type="button"
                    >
                        Back
                    </button>
                    <button
                        className="flex items-center cursor-pointer  gap-4 rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-10 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#111413] shadow-[0_0_20px_rgba(226,193,150,0.2)] transition-transform duration-300 active:scale-95 hover:scale-[1.02]"
                        onClick={handleNext}
                        type="button"
                    >
                        Next:Personal Preferences
                    </button>
                </div>
            </div>
        </div>
    )
}
