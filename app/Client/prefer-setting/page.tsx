"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import useJewelleryStore, { Preference } from "@/app/store/jewellery-store"
import { FLOW_ROUTES } from "../flow-routes"
import { PREFERSETTING } from "@/app/constant/prefersetting"

export default function PreferSettingPage() {
    const router = useRouter()
    const { prefersetting, setPrefersetting } = useJewelleryStore()

    const handleBack = () => {
        router.back()
    }

    const handleNext = () => {
        setPrefersetting(prefersetting)
        router.push(FLOW_ROUTES.wearFrequency)
    }

    return (
        <div className="min-h-screen bg-[#111413] pb-32 font-[Manrope] text-[#e1e3e1] selection:bg-[#e2c196]/30">
            <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;600;800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 300,
            "GRAD" 0,
            "opsz" 24;
        }
        .soft-fade-300ms {
          transition: all 300ms ease;
        }
        .glass-card {
          background: rgba(29, 32, 31, 0.6);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(65, 72, 70, 0.15);
        }
        .glass-card:hover {
          border-color: rgba(226, 193, 150, 0.3);
          background: rgba(29, 32, 31, 0.8);
        }
        .gold-sheen {
          background: linear-gradient(135deg, #e2c196 0%, #a58860 100%);
        }
      `}</style>

            <nav className="fixed top-0 z-50 w-full bg-[#111413]/80 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="flex w-full max-w-none items-center justify-between px-8 py-6">
                    <div className="font-['Noto_Serif'] text-2xl uppercase tracking-[0.2em] text-[#e2c196]">L&apos;ATELIER</div>
                    <div className="hidden items-center gap-12 md:flex">
                        <a className="font-['Noto_Serif'] italic tracking-wide text-[#e1e3e1]/60 transition-colors hover:text-[#e1e3e1]" href="#">
                            Heritage
                        </a>
                        <a className="font-['Noto_Serif'] italic tracking-wide text-[#e1e3e1]/60 transition-colors hover:text-[#e1e3e1]" href="#">
                            High Jewelry
                        </a>
                        <a className="border-b border-[#e2c196]/50 pb-1 font-['Noto_Serif'] italic tracking-wide text-[#e2c196]" href="#">
                            Bespoke
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="mr-4 flex flex-col items-end">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#e2c196]/60">Progress</span>
                            <div className="mt-1 flex gap-1">
                                <div className="h-1 w-4 rounded-full bg-[#e2c196]" />
                                <div className="h-1 w-4 rounded-full bg-[#e2c196]" />
                                <div className="h-1 w-4 rounded-full bg-[#e2c196]" />
                                <div className="h-1 w-8 rounded-full bg-[#e2c196]" />
                                <div className="h-1 w-4 rounded-full bg-[#323534]" />
                                <div className="h-1 w-4 rounded-full bg-[#323534]" />
                                <div className="h-1 w-4 rounded-full bg-[#323534]" />
                            </div>
                        </div>
                        <button className="rounded-full p-2 transition-all duration-500 hover:bg-[#e2c196]/10" type="button">
                            <span className="material-symbols-outlined text-[#e2c196]">shopping_bag</span>
                        </button>
                    </div>
                </div>
                <div className="h-px bg-linear-to-b from-[#1d201f] to-transparent" />
            </nav>

            <main className="mx-auto max-w-7xl px-6 pt-32 md:px-24">
                <header className="mb-16 text-center md:mb-24">
                    <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[#a58860]">Creation Journey · Step 4 of 7</span>
                    <h1 className="mb-6 font-['Noto_Serif'] text-4xl italic text-[#e1e3e1] md:text-6xl">Which setting feel do you prefer?</h1>
                    <p className="mx-auto max-w-2xl text-lg font-light text-[#c1c8c5]">
                        Choose a setting style that complements your chosen gemstone and fits your lifestyle.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {PREFERSETTING.map((card) => {
                        const isSelected = prefersetting === card.id
                        return (
                            <button
                                key={card.id}
                                className={`glass-card soft-fade-300ms group flex cursor-pointer flex-col overflow-hidden rounded-lg text-left ${card.featured ? "border-[#e2c196]/20 bg-[#191c1b]" : ""
                                    } ${isSelected ? "ring-2 ring-[#e2c196]/50" : ""}`}
                                onClick={() => setPrefersetting(card.id as Preference)}
                                type="button"
                            >
                                <div className="relative aspect-square overflow-hidden bg-[#282b29]">
                                    <Image
                                        alt={card.title}
                                        className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                        src={card.imageUrl}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#111413] via-transparent to-transparent opacity-60" />
                                    {card.featured ? (
                                        <div className="absolute right-4 top-4 h-3 w-3 rounded-full bg-[#e2c196] shadow-[0_0_10px_#e2c196]" />
                                    ) : null}
                                </div>
                                <div className="grow p-8">
                                    <h3 className="mb-3 font-['Noto_Serif'] text-xl text-[#e2c196]">{card.title}</h3>
                                    <p className="text-sm leading-relaxed text-[#c1c8c5]">{card.description}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>

                <section className="mt-32 grid items-center gap-12 md:grid-cols-12">
                    <div className="relative md:col-span-7">
                        <div className="aspect-video overflow-hidden rounded-lg shadow-2xl">
                            <Image
                                alt="Jewelry design at workbench"
                                className="h-full w-full object-cover"
                                height={540}
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk40MH4B8nEcI6F79QvnzrbW0cnXlBfWpF_XcAbRjJNjZCUn1nL7XIn4x_hVLMGlmxSw3WigZCQNtrWb5qf8GZmsOKcrwzcfS6pzZOGkr1J02PPMJHO0oEgcBm07aECl3j3h3CdhjC8WwjJhlauoke7edBEqnH7L8EoLROsLYsZH7HT-Kd7guVWF5OSN3iPn9pUKGSGJsku3d_6gTspQE3XuZKytMCC6bwNjqYf0t8z3k67VJIbU41AQoo6lvi5wxAo95I3oDU84Q"
                                width={960}
                            />
                        </div>
                        <div className="glass-card absolute -bottom-8 -right-8 hidden max-w-xs rounded-lg p-6 lg:block">
                            <p className="font-['Noto_Serif'] italic text-[#a58860]">
                                &quot;The setting is the silent partner to the stone&apos;s brilliance.&quot;
                            </p>
                            <p className="mt-4 text-[10px] uppercase tracking-widest opacity-60">— Master Goldsmith, L&apos;Atelier</p>
                        </div>
                    </div>
                    <div className="space-y-6 md:col-span-5">
                        <h2 className="font-['Noto_Serif'] text-3xl italic">Refining the Craft</h2>
                        <p className="leading-relaxed text-[#c1c8c5]">
                            Every setting at The Midnight Atelier is hand-carved to the exact micron of your selected stone. This ensures not
                            just security, but an optical alignment that captures every stray photon of light.
                        </p>
                        <div className="flex items-center gap-4 text-[#e2c196]">
                            <span className="material-symbols-outlined">auto_awesome</span>
                            <span className="text-sm uppercase tracking-widest">Hand-finished in London</span>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="fixed bottom-0 z-50 w-full rounded-t-[2rem] bg-[#191c1b]/90 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                <div className="flex w-full items-center justify-between px-12 py-8">
                    <button
                        className="rounded-full border border-[#414846]/30 px-12 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#e1e3e1] transition-all duration-300 hover:scale-[1.02] hover:bg-[#e1e3e1]/5 active:scale-95"
                        onClick={handleBack}
                        type="button"
                    >
                        Back
                    </button>
                    <div className="hidden flex-col items-center lg:flex">
                        <span className="mb-2 text-[10px] uppercase tracking-[0.4em] text-[#e1e3e1]/40">Selected Style</span>
                        <span className="font-['Noto_Serif'] text-sm italic text-[#e2c196]">{prefersetting}</span>
                    </div>
                    <button
                        className="gold-sheen cursor-pointer rounded-full px-12 py-4 text-xs font-bold uppercase tracking-[0.15em] text-[#111413] shadow-[0_0_20px_rgba(226,193,150,0.2)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
                        onClick={handleNext}
                        type="button"
                    >
                        Next: Wear Frequency
                    </button>
                </div>
            </footer>
        </div>
    )
}
