"use client"

import { useRouter } from "next/navigation"
import { FLOW_ROUTES } from "../flow-routes"
import useJewelleryStore, { type HaveStoneChoice } from "@/app/store/jewellery-store"

type CardProps = {
  active: boolean
  icon: string
  title: string
  description: string
  actionLabel: string
  iconWrapperClassName?: string
  featured?: boolean
  onClick: () => void
}

export default function GemstoneDecisionPage() {
  const router = useRouter()
  const stone = useJewelleryStore((s) => s.stone)
  const setStone = useJewelleryStore((s) => s.setStone)

  const handleNext = () => {
    if (stone !== "own" && stone !== "choose" && stone !== "reference") return

    const nextRouteBySelection: Record<HaveStoneChoice, string> = {
      own: FLOW_ROUTES.StoneDetail,
      choose: FLOW_ROUTES.PickOption,
      reference: FLOW_ROUTES.yss,
    }

    router.push(nextRouteBySelection[stone])
  }

  return (
    <div className="min-h-screen bg-[#111413] font-[Manrope] text-[#e1e3e1] selection:bg-[#e2c196]/30">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300&family=Manrope:wght@300;400;500;600&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 200,
            "GRAD" 0,
            "opsz" 24;
        }
        .glass-card {
          background: rgba(40, 43, 41, 0.4);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(65, 72, 70, 0.15);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
          background: rgba(226, 193, 150, 0.08);
          border-color: rgba(226, 193, 150, 0.3);
          transform: translateY(-8px);
        }
        .active-selection {
          background: rgba(226, 193, 150, 0.12) !important;
          border-color: #e2c196 !important;
          box-shadow: 0 0 40px rgba(226, 193, 150, 0.1);
        }
      `}</style>

      {/* <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-12 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="font-['Noto_Serif'] text-2xl uppercase tracking-[0.2em] text-[#e2c196]">
          L&apos;ATELIER
        </div>

        <div className="hidden gap-10 md:flex">
          <a className="font-['Noto_Serif'] font-light tracking-wide text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
            Collections
          </a>
          <a className="border-b border-[#e2c196]/30 pb-1 font-['Noto_Serif'] font-light tracking-wide text-[#e2c196] transition-colors duration-500 hover:text-[#e2c196]" href="#">
            Bespoke
          </a>
          <a className="font-['Noto_Serif'] font-light tracking-wide text-[#e1e3e1]/60 transition-colors duration-500 hover:text-[#e2c196]" href="#">
            Heritage
          </a>
        </div>

        <div className="flex items-center gap-6 text-[#e2c196]">
          <span className="material-symbols-outlined cursor-pointer duration-300 hover:scale-95">shopping_bag</span>
          <span className="material-symbols-outlined cursor-pointer duration-300 hover:scale-95">person</span>
        </div>
      </nav> */}

      <aside className="fixed left-0 z-40 flex h-screen w-24 flex-col items-center gap-8 border-r border-[#414846]/10 bg-[#191c1b]/60 py-24 backdrop-blur-2xl">
        <div className="mb-8 flex flex-col items-center gap-1">
          <span className="font-['Manrope'] text-[10px] uppercase tracking-widest text-[#e2c196]/60">Step 3 of 7</span>
        </div>
        <div className="flex flex-col gap-10">
          <div className="group flex cursor-pointer flex-col items-center gap-2">
            <span className="material-symbols-outlined p-4 text-[#e1e3e1]/40 transition-all duration-300 hover:bg-[#1d201f]">edit_note</span>
            <span className="font-['Manrope'] text-[8px] uppercase tracking-widest text-[#e1e3e1]/40">Design</span>
          </div>
          <div className="group flex cursor-pointer flex-col items-center gap-2">
            <span className="material-symbols-outlined rounded-full bg-[#e2c196]/10 p-4 text-[#e2c196] shadow-[0_0_20px_rgba(226,193,150,0.2)]">diamond</span>
            <span className="font-['Manrope'] text-[8px] uppercase tracking-widest text-[#e2c196]">Gemstones</span>
          </div>
          <div className="group flex cursor-pointer flex-col items-center gap-2 opacity-30">
            <span className="material-symbols-outlined p-4 text-[#e1e3e1]/40">auto_awesome</span>
            <span className="font-['Manrope'] text-[8px] uppercase tracking-widest text-[#e1e3e1]/40">Setting</span>
          </div>
          <div className="group flex cursor-pointer flex-col items-center gap-2 opacity-30">
            <span className="material-symbols-outlined p-4 text-[#e1e3e1]/40">visibility</span>
            <span className="font-['Manrope'] text-[8px] uppercase tracking-widest text-[#e1e3e1]/40">Review</span>
          </div>
        </div>
      </aside>

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pb-24 pl-24 pt-32">
        <div className="pointer-events-none absolute -right-24 top-1/4 h-[500px] w-[500px] rounded-full bg-[#314c47]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -left-24 bottom-1/4 h-[400px] w-[400px] rounded-full bg-[#e2c196]/10 blur-[100px]" />

        <div className="z-10 w-full max-w-6xl px-12">
          <header className="mb-16 text-center">
            <span className="mb-4 block font-[Manrope] text-[12px] uppercase tracking-[0.3em] text-[#e2c196]/70">Process Stage: Gemstone Inquiry</span>
            <h1 className="mb-6 font-['Noto_Serif'] text-5xl leading-tight text-[#e1e3e1] md:text-6xl">Do you already have a stone?</h1>
            <p className="mx-auto max-w-2xl text-lg text-[#c1c8c5]">
              Choose how you&apos;d like to proceed with your gemstone selection. We accommodate heirloom stones and curated acquisitions.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card
              active={stone === "own"}
              actionLabel="Select Path"
              description="I want to use my own existing gemstone. Our masters will inspect and set your personal heirloom."
              icon="pan_tool_alt"
              iconWrapperClassName="bg-[#323534]"
              onClick={() => setStone("own")}
              title="Yes, I already have a stone"
            />
            <Card
              active={stone === "choose"}
              actionLabel="Enter Gallery"
              description="Explore our curated collection of ethically sourced stones, hand-selected for their brilliance and fire."
              featured
              icon="auto_awesome"
              iconWrapperClassName="bg-[#e2c196]/10 shadow-[0_0_30px_rgba(226,193,150,0.15)]"
              onClick={() => setStone("choose")}
              title="No, help me choose"
            />
            <Card
              active={stone === "reference"}
              actionLabel="Import Stone"
              description="Enter a SKU or link from our online catalog to instantly integrate it into your custom design flow."
              icon="link"
              iconWrapperClassName="bg-[#323534]"
              onClick={() => setStone("reference")}
              title="I have a YSS stone reference"
            />
          </div>

          <footer className="mx-auto mt-20 flex max-w-4xl items-center justify-between border-t border-[#414846]/10 pt-12">
            <button className="group flex items-center gap-3 font-[Manrope] text-xs uppercase tracking-widest text-[#e1e3e1]/60 transition-colors hover:text-[#e2c196]" onClick={() => router.back()} type="button">
              <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back_ios</span>
              Back
            </button>

            <div className="flex items-center gap-12">
              <div className="hidden flex-col items-end sm:flex">
                <span className="mb-1 text-[10px] uppercase tracking-widest text-[#e1e3e1]/40">Configuration Progress</span>
                <div className="relative h-[2px] w-32 bg-[#414846]/20">
                  <div className="absolute left-0 top-0 h-full w-[42%] bg-[#e2c196] shadow-[0_0_8px_rgba(226,193,150,0.5)]" />
                </div>
              </div>
              <button
                className={`rounded-md border px-12 py-5 font-[Manrope] text-sm uppercase tracking-[0.2em] transition-all duration-500 ${stone === "own" || stone === "choose" || stone === "reference"
                    ? "border-[#e2c196]/30 bg-[#e2c196]/90 text-[#291800] hover:bg-[#e2c196]"
                    : "cursor-not-allowed border-[#414846]/10 bg-[#e2c196]/10 text-[#e1e3e1]/30"
                  }`}
                disabled={stone !== "own" && stone !== "choose" && stone !== "reference"}
                onClick={handleNext}
                type="button"
              >
                Next
              </button>
            </div>
          </footer>
        </div>
      </main>

      <div className="pointer-events-none fixed right-0 top-1/2 hidden h-[614px] w-32 -translate-y-1/2 opacity-20 xl:block">
        <div
          className="h-full w-full bg-cover bg-center grayscale mix-blend-screen"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2uuBNnvkkLuotXiTyDOg8ZB1xsBs7ykazjdXaG2TCpur9pDfepmelBH-2clk3iT0w_krch1_DOXMpPBXg2XapOd3RhI8PbigGpJqS4puxDH_KXgQ_yIZahdrxB3FZoTz2aOBuG8hK0RGOfW3FO2QKlQg35I4kFYmUe2vWg2SLyWiBDrqjJBVD1bCuvj0a8aEVb6H9xG-bPbtjsiIdQ6HkyrHmI6Wm2spOyH77ap14mazg-9w1d-uWb8JOEW7gnF1C-vh6vOwfu9I")',
          }}
        />
      </div>
    </div>
  )
}

function Card({ active, icon, title, description, actionLabel, iconWrapperClassName, featured, onClick }: CardProps) {
  return (
    <button
      className={`glass-card group relative flex h-full flex-col overflow-hidden rounded-lg p-10 text-left ${active ? "active-selection" : ""
        }`}
      onClick={onClick}
      type="button"
    >
      {featured ? (
        <div className="absolute right-0 top-0 p-4">
          <span className="rounded-full border border-[#e2c196]/20 bg-[#e2c196]/10 px-3 py-1 text-[9px] uppercase tracking-widest text-[#e2c196]">Recommended</span>
        </div>
      ) : null}

      <div
        className={`mb-12 flex h-16 w-16 items-center justify-center rounded-full text-[#e2c196] duration-500 group-hover:scale-110 ${iconWrapperClassName ?? "bg-[#323534]"
          }`}
      >
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>

      <div className="mt-auto">
        <h3 className="mb-4 font-['Noto_Serif'] text-2xl transition-colors group-hover:text-[#e2c196]">{title}</h3>
        <p className="text-sm leading-relaxed text-[#c1c8c5]/80">{description}</p>
      </div>

      <div className="mt-8 border-t border-[#414846]/20 pt-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#e2c196]">
          {actionLabel}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </span>
      </div>
    </button>
  )
}