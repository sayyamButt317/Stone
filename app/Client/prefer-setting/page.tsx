"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import useJewelleryStore, { Preference } from "@/app/store/jewellery-store"
import { FLOW_ROUTES } from "../flow-routes"
import { PREFERSETTING } from "@/app/constant/prefersetting"
import BackButton from "@/components/Custom/BackButton"
import CustomButton from "@/components/Custom/CustomButton"

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
                    <div className="flex items-center gap-6">

                    </div>
                </div>
                <div className="h-px bg-linear-to-b from-[#1d201f] to-transparent" />
            </nav>

            <main className="mx-auto max-w-7xl px-6 pt-32 md:px-24">
                <header className="mb-16 text-center md:mb-24">
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


            </main>

            <footer className="fixed bottom-0 z-50 w-full rounded-t-[2rem] ">
                <div className="flex w-full items-center justify-end px-12 py-8 gap-2">
                    <BackButton
                        onClick={() => router.back()}
                    />

                    <CustomButton
                        onClick={handleNext}
                    >
                        Next: Wear Frequency
                    </CustomButton>
                </div>
            </footer>
        </div>
    )
}
