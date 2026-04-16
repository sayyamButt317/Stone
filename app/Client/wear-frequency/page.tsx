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
                <div className="hidden items-center gap-12 md:flex">
                    <a className="font-['Noto_Serif'] text-sm uppercase tracking-wide text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
                        Curation
                    </a>
                    <a className="border-b border-[#e2c196]/30 pb-1 font-['Noto_Serif'] text-sm uppercase tracking-wide text-[#e2c196] transition-colors duration-500 hover:text-[#e2c196]" href="#">
                        Process
                    </a>
                    <a className="font-['Noto_Serif'] text-sm uppercase tracking-wide text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
                        History
                    </a>
                    <a className="font-['Noto_Serif'] text-sm uppercase tracking-wide text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
                        Vault
                    </a>
                </div>
                <div className="flex items-center text-[#e2c196]">
                    <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                </div>
            </nav>

            <main className="mx-auto flex w-full max-w-7xl grow flex-col items-center px-6 pb-40 pt-32">
                <div className="mb-16 w-full max-w-2xl">
                    <div className="mb-4 flex items-end justify-between">
                        <span className="text-xs uppercase tracking-[0.2em] text-[#c1c8c5]/60">Step 5 of 7</span>
                        <span className="text-xs uppercase tracking-[0.2em] text-[#e2c196]">Lifestyle Analysis</span>
                    </div>
                    <div className="h-[2px] w-full overflow-hidden bg-[#323534]">
                        <div className="h-full w-[71.4%] bg-linear-to-br from-[#e2c196] to-[#a58860] transition-all duration-1000" />
                    </div>
                </div>

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

                <div className="relative mt-24 flex w-full flex-col items-center gap-12 overflow-hidden rounded-lg bg-[#1d201f] p-12 md:flex-row">
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-10">
                        <Image
                            alt="Artisan jeweler desk"
                            className="h-full w-full object-cover grayscale"
                            height={420}
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFr-jko_ygGqkm_6KTMfrkNnnAQV34bxhP-Qp8dg5PdKzvFPnzLddYqsGpawCjgre2kVcIo8FLkbWcs1IoKov0CULhxbLKB7sBjt6C9UXvLqTT67nhq2lgL03zI1_O_Qtsl270o0PCImVOpWH4BSp59mz5-4oJXw9P3CY7ox_9G-Th7X_jKD41RT88wbyGxNAFYicNvna8anzhyFbEu1YvhLVgCCpieElrYUh99E-Eeu_d43z0KDe3ybf8D1XbaAbEbPj4ychUGek"
                            width={420}
                        />
                    </div>
                    <div className="z-10 flex-1">
                        <h4 className="mb-4 font-['Noto_Serif'] text-xl text-[#e2c196]">The Atelier Philosophy</h4>
                        <p className="max-w-xl text-base leading-relaxed text-[#c1c8c5]">
                            Every piece created in our workshop is a dialogue between form and function. By understanding your lifestyle, we
                            select metal alloys and prong structures that ensure your heirloom remains pristine through generations of wear.
                        </p>
                    </div>
                    <div className="z-10 shrink-0">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#e2c196]/20 p-4">
                            <Image
                                alt="Diamond setting"
                                className="h-full w-full rounded-full object-cover"
                                height={128}
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzn1xDxO2br-URRyUxKHNoPyvayktpjOfCfOjekr4h754vj9SSOf8IZ7dlwHbbE_9a1erjlDdAAp16zAK0gFCJsDfFAHOCzO02KWyWQHJUHOUkwdTHbu-qYrytWa8bPL52OznL6nXdQ-zBQURnsoVhx9MVkxdybUo_ZD23SRUum11PWPPLzuU7SCbXLZdUHhZDqJModY7x-dBsd1KQkd5vNR86CoCBxFrPW7CSqA-qEtGystDmCeASi6TkcEI-9R99f3W5UBxSCVw"
                                width={128}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 z-50 h-28 w-full bg-[#111413]/90 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between px-16">
                    <button
                        className="flex items-center gap-4 rounded-full border border-[#414846]/15 px-10 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#e1e3e1]/40 transition-transform duration-300 hover:scale-[1.02]"
                        onClick={handleBack}
                        type="button"
                    >
                        <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                        Back
                    </button>
                    <button
                        className="flex items-center cursor-pointer  gap-4 rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-10 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#111413] shadow-[0_0_20px_rgba(226,193,150,0.2)] transition-transform duration-300 active:scale-95 hover:scale-[1.02]"
                        onClick={handleNext}
                        type="button"
                    >
                        Next:Personal Preferences
                        <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
