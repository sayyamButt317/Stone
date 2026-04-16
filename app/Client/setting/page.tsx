"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import useJewelleryStore, { Preference } from "@/app/store/jewellery-store"
import { FLOW_ROUTES } from "../flow-routes"
import { SETTINGS } from "@/app/constant/setting"



export default function SettingPage() {
    const router = useRouter()
    const { prefersetting, setPrefersetting } = useJewelleryStore()
    const [selectedPreference, setSelectedPreference] = useState<Preference>(prefersetting as Preference)


    const handleBack = () => router.back()
    const handleNext = () => {
        setPrefersetting(selectedPreference)
        router.push(FLOW_ROUTES.wearFrequency)
    }

    return (
        <div className="min-h-screen bg-[#111413] pb-40 font-[Manrope] text-[#e1e3e1] antialiased selection:bg-[#e2c196] selection:text-[#412d0d] md:pb-32">
            <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Manrope:wght@200..800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 400,
            "GRAD" 0,
            "opsz" 24;
        }
        .gold-gradient {
          background: linear-gradient(135deg, #e2c196 0%, #a58860 100%);
        }
        .active-glow {
          box-shadow: 0 0 30px rgba(226, 193, 150, 0.2);
        }
      `}</style>

            <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-8 py-4 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="font-['Noto_Serif'] text-xl font-bold uppercase tracking-tighter text-[#e2c196]">The Midnight Atelier</div>
                <nav className="hidden items-center gap-8 md:flex">
                    <a className="text-sm uppercase tracking-widest text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
                        Heritage
                    </a>
                    <a className="text-sm uppercase tracking-widest text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
                        Atelier
                    </a>
                    <a className="text-sm uppercase tracking-widest text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
                        Collections
                    </a>
                </nav>
                <div className="flex items-center gap-6 text-[#e2c196]">
                    <span className="material-symbols-outlined cursor-pointer transition-transform duration-300 hover:scale-95">shopping_bag</span>
                    <span className="material-symbols-outlined cursor-pointer transition-transform duration-300 hover:scale-95">person</span>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 pb-8 pt-24 md:px-12">
                <div className="mb-12 flex flex-col items-center">
                    <span className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#e2c196]">Step 4 of 7</span>
                    <div className="h-[2px] w-full max-w-md overflow-hidden rounded-full bg-[#414846]/20">
                        <div className="gold-gradient h-full w-[57%]" />
                    </div>
                </div>

                <div className="mb-16 space-y-4 text-center">
                    <h1 className="font-['Noto_Serif'] text-4xl tracking-tight text-[#e1e3e1] md:text-5xl">How should your stone be held?</h1>
                    <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#c1c8c5] md:text-base">
                        The setting defines both the silhouette and the security of your piece, framing the brilliance of your chosen gemstone.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {SETTINGS.map((card) => {
                        const isSelected = selectedPreference === card.id
                        return (
                            <button
                                key={card.id}
                                className={`group relative cursor-pointer rounded-lg p-6 text-left transition-all duration-500 ${isSelected
                                    ? "active-glow border border-[#e2c196]/40 bg-[#1d201f]"
                                    : "border border-[#414846]/15 bg-[#191c1b] hover:bg-[#1d201f]"
                                    }`}
                                onClick={() => setSelectedPreference(card.id)}
                                type="button"
                            >
                                <div
                                    className={`relative mb-6 flex aspect-square items-center justify-center overflow-hidden rounded ${isSelected ? "bg-[#323534]" : "bg-[#0c0f0e]"
                                        }`}
                                >
                                    <Image
                                        alt={card.imageAlt}
                                        className={`h-full w-full object-cover mix-blend-lighten transition-opacity duration-500 ${isSelected
                                            ? "opacity-90 transition-transform duration-700 group-hover:scale-110"
                                            : "opacity-60 group-hover:opacity-100"
                                            }`}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        src={card.imageUrl}
                                    />
                                </div>
                                {isSelected ? (
                                    <div className="absolute right-4 top-4 scale-100 rounded-full bg-[#e2c196] p-1 text-[#412d0d] transition-transform">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>
                                            check
                                        </span>
                                    </div>
                                ) : null}
                                <h3
                                    className={`mb-2 font-['Noto_Serif'] text-xl ${isSelected ? "text-[#e2c196]" : "text-[#e1e3e1] transition-colors group-hover:text-[#e2c196]"
                                        }`}
                                >
                                    {card.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-[#c1c8c5]">{card.description}</p>
                            </button>
                        )
                    })}
                </div>
            </main>

            {/* Desktop footer */}
            <footer className="fixed bottom-0 left-0 z-50 hidden w-full items-center justify-between border-t border-[#414846]/15 bg-[#111413]/90 px-10 py-8 backdrop-blur-2xl md:flex">
                <button
                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c1c8c5] transition-colors hover:text-[#e2c196]"
                    onClick={handleBack}
                    type="button"
                >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back
                </button>
                <div className="flex items-center gap-12">
                    <div className="hidden items-center gap-10 md:flex">
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <span className="material-symbols-outlined text-lg">edit_note</span>
                            <span className="text-[10px] uppercase tracking-[0.15em]">Design</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <span className="material-symbols-outlined text-lg">diamond</span>
                            <span className="text-[10px] uppercase tracking-[0.15em]">Stone</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 rounded-full bg-[#e2c196]/10 px-6 py-2 text-[#e2c196]">
                            <span className="material-symbols-outlined text-lg">settings_input_component</span>
                            <span className="text-[10px] uppercase tracking-[0.15em]">Setting</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-40">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                            <span className="text-[10px] uppercase tracking-[0.15em]">Review</span>
                        </div>
                    </div>
                    <button
                        className="gold-gradient rounded-full px-8 py-3 text-xs font-bold uppercase tracking-widest text-[#412d0d] shadow-xl shadow-[#e2c196]/10 transition-transform hover:scale-[0.98]"
                        onClick={handleNext}
                        type="button"
                    >
                        Proceed to Wear &amp; Lifestyle
                    </button>
                </div>
            </footer>

            {/* Mobile: actions + tab bar (avoids overlapping fixed bars) */}
            <div className="fixed bottom-0 left-0 z-50 w-full border-t border-[#414846]/15 bg-[#111413]/90 backdrop-blur-2xl md:hidden">
                <div className="flex items-center justify-between px-6 py-4">
                    <button
                        className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c1c8c5]"
                        onClick={handleBack}
                        type="button"
                    >
                        <span className="material-symbols-outlined text-base">arrow_back</span>
                        Back
                    </button>
                    <button
                        className="gold-gradient rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#412d0d] shadow-xl"
                        onClick={handleNext}
                        type="button"
                    >
                        Proceed
                    </button>
                </div>
                <nav className="flex justify-around rounded-t-lg border-t border-[#414846]/15 px-6 py-3">
                    <div className="flex flex-col items-center text-[#e1e3e1]/40">
                        <span className="material-symbols-outlined">edit_note</span>
                        <span className="text-[10px] uppercase tracking-[0.15em]">Design</span>
                    </div>
                    <div className="flex flex-col items-center text-[#e1e3e1]/40">
                        <span className="material-symbols-outlined">diamond</span>
                        <span className="text-[10px] uppercase tracking-[0.15em]">Stone</span>
                    </div>
                    <div className="flex flex-col items-center rounded-full bg-[#e2c196]/10 px-6 py-2 text-[#e2c196]">
                        <span className="material-symbols-outlined">settings_input_component</span>
                        <span className="text-[10px] uppercase tracking-[0.15em]">Setting</span>
                    </div>
                    <div className="flex flex-col items-center text-[#e1e3e1]/40">
                        <span className="material-symbols-outlined">visibility</span>
                        <span className="text-[10px] uppercase tracking-[0.15em]">Review</span>
                    </div>
                </nav>
            </div>
        </div>
    )
}
