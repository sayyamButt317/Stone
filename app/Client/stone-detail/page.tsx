"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import useJewelleryStore from "@/app/store/jewellery-store"
import { FLOW_ROUTES } from "../flow-routes"
import { ChevronDown, Gem, Pencil, Shield, User } from "lucide-react"
import BackButton from "@/components/Custom/BackButton"
import CustomButton from "@/components/Custom/CustomButton"
import Link from "next/link"
import Sidebar from "@/components/Custom/sidebar"

const STONE_TYPES = ["Diamond", "Sapphire", "Emerald", "Ruby", "Morganite", "Other"] as const
const SHAPES = ["Round", "Oval", "Pear", "Emerald Cut", "Marquise", "Cushion"] as const

export default function StoneDetailsPage() {
  const router = useRouter()
  const ownStone = useJewelleryStore((s) => s.ownStone)
  const setOwnStone = useJewelleryStore((s) => s.setOwnStone)

  return (
    <div className="bg-[#111413] font-[Manrope] text-[#e1e3e1] selection:bg-[#e2c196]/30">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300&family=Manrope:wght@200;300;400;500;600;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 300,
            "GRAD" 0,
            "opsz" 24;
        }

        .glass-input {
          background: rgba(12, 15, 14, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(65, 72, 70, 0.15);
          transition: all 0.3s ease;
        }

        .glass-input:focus {
          border-color: rgba(226, 193, 150, 0.4);
          outline: none;
          box-shadow: 0 0 15px rgba(226, 193, 150, 0.1);
        }

        .gold-gradient-cta {
          background: linear-gradient(135deg, #e2c196 0%, #a58860 100%);
        }
      `}</style>

      <Sidebar />

      <main className="relative ml-24 flex min-h-screen flex-col lg:flex-row">
        <section className="flex flex-1 flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
          <div className="max-w-xl">
            <header className="mb-12">
              <h1 className="mb-6 font-['Noto_Serif'] text-5xl leading-tight text-[#e1e3e1] md:text-6xl">Tell us about your stone</h1>
              <p className="text-lg font-light leading-relaxed text-[#c1c8c5]">
                Provide the details of your gemstone for suitability assessment.
              </p>
            </header>

            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault()
                router.push(FLOW_ROUTES.chooseMetal)
              }}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="ml-1 text-xs uppercase tracking-widest text-[#c1c8c5]/80">Stone Type</label>
                  <div className="relative">
                    <select
                      className="glass-input w-full appearance-none rounded-lg px-5 py-4 text-[#e1e3e1]"
                      value={ownStone.stone_type || STONE_TYPES[0]}
                      onChange={(e) => setOwnStone({ stone_type: e.target.value })}
                    >
                      {STONE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#e2c196]">
                      <span className="material-symbols-outlined text-sm cursor-pointer"><ChevronDown /></span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs uppercase tracking-widest text-[#c1c8c5]/80">Colour</label>
                  <input
                    className="glass-input w-full rounded-lg px-5 py-4 text-[#e1e3e1] placeholder:text-[#c1c8c5]/30"
                    placeholder="e.g. Royal Blue"
                    type="text"
                    value={ownStone.color}
                    onChange={(e) => setOwnStone({ color: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs uppercase tracking-widest text-[#c1c8c5]/80">Shape</label>
                  <div className="relative">
                    <select
                      className="glass-input w-full appearance-none rounded-lg px-5 py-4 text-[#e1e3e1]"
                      value={ownStone.shape || SHAPES[0]}
                      onChange={(e) => setOwnStone({ shape: e.target.value })}
                    >
                      {SHAPES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#e2c196]">
                      <span className="material-symbols-outlined text-sm"><ChevronDown /></span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-xs uppercase tracking-widest text-[#c1c8c5]/80">Approx. size / carat</label>
                  <input
                    className="glass-input w-full rounded-lg px-5 py-4 text-[#e1e3e1] placeholder:text-[#c1c8c5]/30"
                    placeholder="e.g. 1.2 ct"
                    type="text"
                    value={ownStone.approximate_size}
                    onChange={(e) => setOwnStone({ approximate_size: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-6 pt-10 sm:flex-row">
                <BackButton
                  onClick={() => router.push(FLOW_ROUTES.GemDecision)}
                />
                <CustomButton
                  onClick={() => router.push(FLOW_ROUTES.chooseMetal)}
                >
                  Next
                </CustomButton>
              </div>
            </form>
          </div>
        </section>

        <section className="relative hidden overflow-hidden bg-[#0c0f0e] lg:block lg:w-5/12 xl:w-1/2">
          <div className="absolute inset-0 z-10 bg-linear-to-tr from-[#111413] to-transparent opacity-60" />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#314c47]/10 blur-[120px]" />
          <div className="absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-[#e2c196]/5 blur-[100px]" />

          <div className="relative flex h-full items-center justify-center p-12">
            <div className="group relative aspect-3/4 w-full max-w-md overflow-hidden rounded-lg shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <Image
                alt="gemstone assessment"
                className="object-cover grayscale-20 transition-transform duration-2000 group-hover:scale-110"
                fill
                sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 41vw, 100vw"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASt27nTu32Bm_DUIQe-oZZrnRR0wNtErn3G1LBOgwVrtHb-MYeNCMPPZrrvZ9U9ezbBXDEm0UVcuSKdRwi9CE4uw-iUdr-BbDOrPzxV_fzg7pfB0c5lNPA_SdfPFZ4kzVAJsve3-1y6qNXzKc6zQ0sB_6pL3l7PTmMdCb3saQ7a9vJHdOiMKl44T9KT8VksCKQSwyKRZICL0WNRpGbcH4ulgjBsRgQAxSr3udfSyt547MguqUoVA25qPXGe0S4FuGBXSayrEP_JMw"
              />

              <div className="absolute bottom-8 left-8 right-8 z-20 rounded-lg border border-[#414846]/10 bg-[#111413]/60 p-6 backdrop-blur-xl">
                <h4 className="mb-1 font-['Noto_Serif'] text-lg italic text-[#e2c196]">Artisan Inspection</h4>
                <p className="text-xs uppercase tracking-widest text-[#c1c8c5]">
                  Every stone is manually verified for depth and clarity by our atelier.
                </p>
              </div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e2c196]/5" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e2c196]/2" />
          </div>
        </section>
      </main>

      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.03]"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhsv5fE3MjIM2IeDrxd1gdGhjD5INDMSLMI0csrWgzu5p1o44bJ7HZTQoMNpp0Gi-jSpXhMemxLORIDieH1RfpjM_I9GJbdmEc2Vsv_DVm55UQtU1TCxTwlhNujNyrDL2Br0QxJEK7eDjFMElyLxm41ub3gDJwnTT3hGOp5PEkGO_KjvexS7Ke8b-RllKLJGw-lBU-xq5RZJyjcyvHDNgLXTIo_RiWsMSBP0lxTtlLx2YqI0u9zRqDwcfl0zZ8gHwEyR7C-erfM2I")',
        }}
      />
    </div>
  )
}
