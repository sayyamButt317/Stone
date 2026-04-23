"use client"

import useJewelleryStore, { OptionPick } from "@/app/store/jewellery-store"
import Image from "next/image"
import { FLOW_ROUTES } from "../flow-routes"
import { useRouter } from "next/navigation"
import { Gem, Palette } from "lucide-react"

export default function RecomendationPage() {

    const router = useRouter();
    const { pick, setPick } = useJewelleryStore()

    const handleBack = () => {
        setPick('')
        router.back()
    }

    const handleNext = () => {
        if (pick !== "stone" && pick !== "color") return
        const nextRouteBySelection: Record<OptionPick, string> = {
            stone: FLOW_ROUTES.chooseGem,
            color: FLOW_ROUTES.StoneColor,
        }

        router.push(nextRouteBySelection[pick])
    }

    return (
        <div className="min-h-screen bg-[#111413] font-[Manrope] text-[#e1e3e1] selection:bg-[#e2c196]/30">
            <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300&family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 300,
            "GRAD" 0,
            "opsz" 24;
        }
        .gold-gradient {
          background: linear-gradient(135deg, #e2c196 0%, #a58860 100%);
        }
        .emerald-glow {
          box-shadow: 0 0 40px rgba(176, 205, 198, 0.1);
        }
        .glass-card {
          background: rgba(40, 43, 41, 0.4);
          backdrop-filter: blur(24px);
        }
        .glass-card:hover {
          background: rgba(226, 193, 150, 0.05);
        }
      `}</style>



            <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-24 pt-12 md:pl-24">
                <div className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#314c47]/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#e2c196]/5 blur-[100px]" />

                <section className="relative z-10 w-full max-w-6xl px-8 md:px-20 ">
                    <header className="mb-16 space-y-4 text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e2c196]">Gemstone Selection</span>
                    </header>

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 ">
                        <button
                            aria-pressed={pick === "stone"}
                            onClick={() => setPick("stone")}
                            className={`glass-card emerald-glow group flex h-[400px] flex-col justify-between rounded-lg border p-12 text-left transition-all duration-500 hover:scale-[1.02] ${pick === "stone"
                                ? "border-[#e2c196]/50 bg-[#e2c196]/5 shadow-[0_0_30px_rgba(226,193,150,0.2)]"
                                : "border-[#414846]/10"
                                }`}
                            type="button"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#414846]/20 bg-[#1d201f] text-[#e2c196] transition-transform duration-500 group-hover:scale-110">
                                        <Gem className="size-4" />
                                    </div>
                                    <span className="material-symbols-outlined text-4xl text-[#e2c196] font-light">Pick by stone</span>
                                </div>
                            </div>
                            <div className="relative mt-8 h-40 w-full cursor-pointer overflow-hidden rounded-md opacity-60 transition-opacity duration-700 group-hover:opacity-100">
                                <Image
                                    alt="Macro photography of raw multi-colored gemstones and high-quality cut diamonds scattered on a dark velvet surface with soft studio lighting"
                                    className="object-cover"
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtOww2Q60N6ZeOmgRDA86hUmmXMYCBQl9TuE1QMPAsAmuPj0p5_3OVYVytza_GfSy8qofpIJGpyYF-RUzGEEn3UG4uklrq23jHFkVoAfm-DnqrBmh8QU54_3lPoy5osOAVrRCWStiEmNEY9KHxXJfT0zFQyAsaTP8xnJCYSp-5iuNuJD7G7g2xfZxWAj2YloHUttMs_0GJm4Akd4QzccJA02f_Qbu3dwIrcwc0GDGKROmKSpK8bf9EoCKjV8vgM8fiCrjYhjaoJJ8"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#1d201f]/80 to-transparent" />
                            </div>
                        </button>

                        <button
                            aria-pressed={pick === "color"}
                            onClick={() => setPick("color")}
                            className={`glass-card emerald-glow group flex h-[400px] flex-col justify-between rounded-lg border p-12 text-left transition-all duration-500 hover:scale-[1.02] ${pick === "color"
                                ? "border-[#e2c196]/50 bg-[#e2c196]/5 shadow-[0_0_30px_rgba(226,193,150,0.2)]"
                                : "border-[#414846]/10"
                                }`}
                            type="button"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#414846]/20 bg-[#1d201f] text-[#e2c196] transition-transform duration-500 group-hover:scale-110">
                                        <Palette className="size-4" />
                                    </div>
                                    <span className="material-symbols-outlined text-4xl text-[#e2c196] font-light">Pick by colour</span>
                                </div>

                            </div>
                            <div className="relative mt-8 h-40 cursor-pointer w-full overflow-hidden rounded-md opacity-60 transition-opacity duration-700 group-hover:opacity-100">
                                <Image
                                    alt="An artistic arrangement of faceted jewels showing a spectrum of colors from deep emerald green to sapphire blue and ruby red"
                                    className="object-cover"
                                    fill
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbBKce1kI7qdDuYcYE3q_iU4jNo0L92YUriewUP3-2LmLXzhHPq5-DIePTA8QK-vODi2U8CtFPMIHffsQoorALCkImYLzlxYhIkYJuIVIQb5-Wh9rWvBDHi0WfJuPMAX7oCbmi6f9KNeAOGjeCjOYyjMoYAvex7F9q1Qz0DEjShS4UPpXNaeybtiH8fk7e0x8FKu7JSpl7rrNMHdlKo-oW5Qj-t7pEy_AkVJc1AoTZvG9Zej3nQRsFEUl1M13RBE1TyegsUOGuI4w"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#1d201f]/80 to-transparent" />
                            </div>
                        </button>
                    </div>

                    <footer className="mt-20 flex items-center justify-end">
                        <button onClick={handleBack} className="group flex items-center gap-3 rounded-full px-8 py-4 text-sm uppercase tracking-widest text-[#c1c8c5] transition-colors hover:text-[#e2c196]" type="button">
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            className={`gold-gradient flex cursor-pointer items-center gap-3 rounded-full px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#412d0d] shadow-[0_10px_20px_rgba(0,0,0,0.3)] ${pick === "stone" || pick === "color" ? "opacity-100" : "opacity-30"}`}
                            disabled={pick !== "stone" && pick !== "color"}
                            type="button"
                        >
                            Next
                        </button>
                    </footer>
                </section>
            </main>
        </div>
    )
}
