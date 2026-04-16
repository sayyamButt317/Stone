"use client"

import { useRouter } from "next/navigation"
import useJewelleryStore, { Inspiration_Keywords } from "@/app/store/jewellery-store"
import { FLOW_ROUTES } from "../flow-routes"

const KEYWORD_OPTIONS: ReadonlyArray<{ label: string; value: Inspiration_Keywords }> = [
    { label: "Low profile", value: "low_profile" },
    { label: "Vintage feel", value: "vintage_feel" },
    { label: "No halo", value: "no_halo" },
    { label: "Delicate band", value: "dedicate_band" },
    { label: "Bold look", value: "bold_look" },
    { label: "Minimal", value: "minimal" },
    { label: "Statement", value: "statement" },
    { label: "No sharp edges", value: "no_sharp_edges" },
] as const

export default function PersonalPreferencesPage() {
    const router = useRouter()

    const {
        personalPreferences,
        setPersonalPreferences,
        inspirationKeywords,
        setInspirationKeywords,
        setAdditionalDetails,
    } = useJewelleryStore()

    const toggleKeyword = (value: Inspiration_Keywords) => {
        const exists = inspirationKeywords.includes(value)
        const next = exists
            ? inspirationKeywords.filter((item) => item !== value)
            : [...inspirationKeywords, value]
        setInspirationKeywords(next)
    }

    const handleBack = () => router.back()

    const handleContinue = () => {
        const keywordLine =
            inspirationKeywords.length > 0 ? `Inspiration Keywords: ${inspirationKeywords.join("; ")}` : ""
        const combined = [personalPreferences.trim(), keywordLine].filter(Boolean).join("\n\n")
        setAdditionalDetails(combined)
        router.push(FLOW_ROUTES.inspirationImage)
    }



    return (
        <div className="flex min-h-screen flex-col bg-[#111413] font-[Manrope] text-[#e1e3e1] selection:bg-[#e2c196]/30">
            <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,400&family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 300,
            "GRAD" 0,
            "opsz" 24;
          display: inline-block;
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
        }
        .tonal-shift {
          transition: background-color 0.3s ease;
        }
        .soft-fade-300ms {
          transition: all 0.3s ease-in-out;
        }
      `}</style>

            <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-[#111413]/80 px-8 backdrop-blur-xl">
                <div className="font-['Noto_Serif'] text-xl font-bold tracking-widest text-[#e2c196]">Midnight Atelier</div>
                <div className="hidden items-center gap-8 font-['Noto_Serif'] text-[#e1e3e1] md:flex">
                    <a className="text-[#e1e3e1]/60 transition-colors duration-300 hover:text-[#e2c196]" href="#">
                        Collections
                    </a>
                    <a className="text-[#e1e3e1]/60 transition-colors duration-300 hover:text-[#e2c196]" href="#">
                        Bespoke
                    </a>
                    <a className="border-b border-[#e2c196] pb-1 text-[#e2c196] transition-colors duration-300" href="#">
                        Heritage
                    </a>
                </div>
                <div className="flex items-center gap-6 text-[#e2c196]">
                    <span className="material-symbols-outlined cursor-pointer transition-transform hover:scale-110">shopping_bag</span>
                    <span className="material-symbols-outlined cursor-pointer transition-transform hover:scale-110">person</span>
                </div>
            </nav>

            <main className="mx-auto flex w-full max-w-5xl grow flex-col items-center px-6 pb-40 pt-32 md:px-24">
                <div className="mb-16 flex w-full max-w-md flex-col items-center">
                    <span className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#e2c196]">Step 6 of 7</span>
                    <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#414846]/20">
                        <div className="h-full w-[85%] bg-linear-to-r from-[#e2c196] to-[#a58860]" />
                    </div>
                </div>

                <div className="mb-12 space-y-4 text-center">
                    <h1 className="font-['Noto_Serif'] text-4xl font-light italic tracking-tight text-[#e1e3e1] md:text-5xl">
                        Personal Preferences
                    </h1>
                    <p className="font-light tracking-wide text-lg text-[#c1c8c5]">
                        Anything you definitely want to include or avoid?
                    </p>
                </div>

                <div className="group relative w-full max-w-3xl">
                    <div className="absolute -inset-1 rounded-lg bg-linear-to-br from-[#e2c196]/10 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-focus-within:opacity-100" />
                    <textarea
                        className="min-h-[220px] w-full rounded-lg border border-[#414846]/15 bg-[#0c0f0e]/60 p-8 font-[Manrope] leading-relaxed text-[#e1e3e1] shadow-2xl backdrop-blur-xl placeholder:text-[#c1c8c5]/30 focus:border-[#e2c196]/40 focus:outline-none focus:ring-1 focus:ring-[#e2c196]/40"
                        onChange={(e) => setPersonalPreferences(e.target.value)}
                        placeholder="e.g., I'd love a very low-profile setting for daily wear, but definitely avoid sharp claws..."
                        value={personalPreferences}
                    />
                    <div className="absolute bottom-6 right-8">
                        <span className="material-symbols-outlined text-[#e2c196]/40">auto_awesome</span>
                    </div>
                </div>

                <div className="mt-16 w-full max-w-3xl">
                    <h3 className="mb-6 text-center text-[11px] uppercase tracking-[0.15em] text-[#c1c8c5]/60">Inspiration keywords</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {KEYWORD_OPTIONS.map(({ label, value }) => {
                            const isActive = inspirationKeywords.includes(value)
                            return (
                                <button
                                    key={label}
                                    className={`group flex items-center justify-center rounded-full border px-4 py-3 transition-all duration-300 ${isActive
                                        ? "border-[#e2c196]/40 bg-[#342204]/40 shadow-[0_0_15px_rgba(226,193,150,0.1)]"
                                        : "border-[#414846]/10 bg-[#191c1b] hover:border-[#e2c196]/40"
                                        }`}
                                    onClick={() => toggleKeyword(value)}
                                    type="button"
                                >
                                    <span
                                        className={`text-xs tracking-wider ${isActive ? "text-[#e2c196]" : "text-[#c1c8c5] transition-colors group-hover:text-[#e2c196]"
                                            }`}
                                    >
                                        {label}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="pointer-events-none fixed bottom-0 left-0 -z-10 h-96 w-full bg-linear-to-t from-[#0a2b27]/10 to-transparent" />
                <div className="pointer-events-none fixed -right-40 -top-40 -z-10 h-96 w-96 rounded-full bg-[#e2c196]/5 blur-[120px]" />
            </main>

            <footer className="fixed bottom-0 z-50 flex w-full items-center justify-between rounded-t-full border-t border-[#414846]/15 bg-[#111413]/90 px-12 py-8 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                <button
                    className="group flex flex-col items-center justify-center px-8 py-3 text-[#e1e3e1]/50 transition-transform duration-500 hover:scale-105"
                    onClick={handleBack}
                    type="button"
                >
                    <span className="material-symbols-outlined mb-1 group-hover:text-[#e2c196]">arrow_back</span>
                    <span className="font-[Manrope] text-[10px] uppercase tracking-widest">Back</span>
                </button>
                <button
                    className="flex flex-col items-center justify-center rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-10 py-4 text-[#111413] shadow-lg shadow-[#e2c196]/20 transition-transform duration-500 hover:scale-105"
                    onClick={handleContinue}
                    type="button"
                >
                    <div className="flex items-center gap-3">
                        <span className="font-[Manrope] text-[11px] font-bold uppercase tracking-[0.15em]">Continue to Review</span>
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
                            auto_awesome
                        </span>
                    </div>
                </button>
            </footer>
        </div>
    )
}
