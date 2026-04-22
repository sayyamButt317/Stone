"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import useJewelleryStore from "@/app/store/jewellery-store"
import { FLOW_ROUTES } from "../flow-routes"

type GemCard = {
  id: string
  name: string
  subtitle: string
  fitLabel: string
  imageUrl: string
  glowClassName: string
}

const GEM_CARDS: GemCard[] = [
  { id: "diamond", name: "Diamond", subtitle: "Eternal Radiance", fitLabel: "Excellent fit", glowClassName: "bg-white/10", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdnNrp40CZ15ODIUC88LuYCsTKOIzvlH9sfAukVwye1kJnF4JXraaoIhTCZwaQMe3THCjIpvDWYMg9lTv3iQWJj-K4hhdTAcZHkR9VFEzvsjY6moQl2td-L4DKzOdCF_0YS90Vi3K3iJCIMwtciSXmRuWY89wDEq8pfFE6NX0jOF_eT9IR5IvP04VX9OzlsPuPLG4nTb_oVNwgHVThOuZD0XEKp2a57ZbRERpHuA5-wHFt9tCNTweE4sZ4JLiWztqmlq1erFWGpkI" },
  { id: "emerald", name: "Emerald", subtitle: "Timeless Green Majesty", fitLabel: "Better for careful wear", glowClassName: "bg-teal-200/20", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQb4qZal4j-gp2ghs_DXEnDAkLKgSV9-WgKWN9ve3EZcQblV-wN_HWiHT5E7-OjJvrUCDEY_584xXMtYN_1GP9cdVsTtUHp3mjzVdwlGVNqG3GdrJ0hb_bd_9i9Tt-yx-c2GCHLJqhuoRg1-yn1vmP-dmhfHdMjEZagJGD-yPhhTXJfX9QQgnUaY7yc16r7yPSp6aZJaf0ZRSKFPjdj9ETJOhk7ldnBiC1HRXXV11_Q_3Xt4XvAnTAceAJaAwga8yucA59_0q51yE" },
  { id: "sapphire", name: "Sapphire", subtitle: "Celestial Blue Depth", fitLabel: "Excellent fit", glowClassName: "bg-cyan-200/20", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmvjVA5mNDH2YOdwx_jgNKOLPZLekpCudn1rvOfu3RtSPD5WPNN10SQx4Hj8KAc_ErmrvX7WkLud4PjFA2KKzj3_51IbpRSJ2D57j9U0WBhjAVNPHNTCf0UmQFdJrvKWzlLQMCst06Ht3um5IIUonwuXs2puUx3m1rwzaynvPNaOUi7rQnkDbLSB0uV4GL8V5cpHR2o45CjxYA6yDF1PrJlvizpeeMXSecP55VXceg-Gomon2EVt3CeHi3lgNcSLnzCx8KysuecDo" },
  { id: "ruby", name: "Ruby", subtitle: "Deep Red Brilliance", fitLabel: "Excellent fit", glowClassName: "bg-red-300/10", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKSudtFtkMZLUrOWQJsoH8meXr5-bXqfiT115t87R8GQ4knDrCkqHnPeRdtoPaeAbJQZuWFMSX-RxFt3Y08-ihJgaIKjkTkY30kUF781oxCsr59xMaXt401_wmr8rhQ0IZCVy8Kri1Q-u3jjNiaxPECqUlPJHTKuCqE6x98CzK5KxoBGV-hGc8uF4J6G0pSbjOUjjGJkIvfLupl7W-Rm6bfEwyJpBY_11Y72Bm9EJy7Q3-xMcmCAYUFJDtwPNPTVhS5JImi6XcqkU" },
  { id: "aquamarine", name: "Aquamarine", subtitle: "Serene Ocean Clarity", fitLabel: "Works well with a more protective setting", glowClassName: "bg-teal-100/10", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFx7-SIlpAQM7YLBbJFjRxaoyeP1hjeKyFN-57wFZzAlyABA8-ka0ZCyh1xYlkch_9BWsWU9ny2fTxxEy_SQb9xf3fFsI31IdJoWfv-hn3IknZTXYH2IZDb-2PqwAfTEJzhiqjCuzOp67Kwgf029bA0qPkbi6M5sXTslKfGkFtD-SH8dcsY1J5CG6FEYKCH7jYIDYcVuSaznJWQZjoOFvltRQn9ueHGLR1PlG6QgxtTcy5COz12FLDajyorNQIDWHKc6hdb7UMOjM" },
  { id: "morganite", name: "Morganite", subtitle: "Soft Blush Elegance", fitLabel: "Better for careful wear", glowClassName: "bg-orange-200/10", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxeA19CFcUST6SHwCM_5w4vppVFm2jWRsys6624cLJFV-6QHq5bh63xaYTsD52AWW9kUFkkHO2ETCrmNgcm-MC5Wie5f_fjONVttXcw1_AeWdspi-W3J6tnRlG1FeTuveoIC61gpWpZeejifYDfcdenMuslzKGEoIp6XZsJ9VhWZLsK5RVvEa6ZSLjz4PhbggQ3ofFYSDxx_z0sZ-dtjiPmWi30jEXHsrYcSrx0L3Ky41SpiTJtVTu3spgKOoZGVETVK4KOonv3lE" },
  { id: "tourmaline", name: "Tourmaline", subtitle: "Vibrant Spectrum", fitLabel: "Works well with a more protective setting", glowClassName: "bg-teal-200/10", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9bMf0U-aFXQUSKj5LWICEJnnWmS90Le8U2wmzP-1A80VVq8Q7sleiuDVKmsamJfEucrE91QXM5HVn8dfobV8hNYuJ-geblcqC8tVuDEcqkXDv7neRZAS5ohdTPtzph4Yaxz8jOL8bjY3eB13a7APm0qCy7zNUE1_NvANCORjaBW_XUNxhRsAIzerJG-oK-JvNdN3G30XGWtk27ltSjQOwKXT0oVYNsqrycS-J5r9CB28ywK4VGMX7g86i_m6EIfVxjc-ZnxmuUS4" },
  { id: "garnet", name: "Garnet", subtitle: "Vintage Crimson Soul", fitLabel: "Works well with a more protective setting", glowClassName: "bg-red-900/20", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRzjoGe3pjFMWRGNSxcsUpvrtEZFk43Ag4kDa5adJiPudCP-nXxSbcpaiZrAEOTRFyu33lQdwHgCKXPdJS9GTe75f7NRg4KZOlv_jEd0H1kfTeTt1vDCUhBEnGioBHZoyxxGp1g8jRJ7gWhSm9WeyGHyYwDDgAzb20WrVukHEU7_qfEs5eWpTq9drIJSkkFVqssFajRg0TDRblpHnHvmFWVBAOjCnwVrra57Gxd7uT1EuX5lixyIVL5bBI_bqBNPMe2QP7kjholfc" },
  { id: "tsavorite", name: "Tsavorite", subtitle: "Lush Garden Fire", fitLabel: "Works well with a more protective setting", glowClassName: "bg-emerald-200/15", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIziYyHOnk-gCTD5IeycVJl8YFGtaCOdFc18Mn3-BM1pBqkj2HnB8op_5FWJQggYXxmoP0ktp0MSrb0Bbf4wu_vL9ZWwZjK8xmtW9zxC-ExwTvgbP_7AWgVeRtQflBD9JHlm0qQeBupSMGr9j6H6CGMBudU5nlQAssPlMXC6ppct_gjhvPizUGRvMBY7t9VMoBNbMZlepjCrleALKxq2JiML1Frz5rQBuXewamtghD3BXI7RqXcMlp15cshe2tphC8R-hxEiqUwIU" },
  { id: "alexandrite", name: "Alexandrite", subtitle: "Mystical Color Shift", fitLabel: "Excellent fit", glowClassName: "bg-cyan-100/15", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6MEfhjj-NHPkswBJ-huVR99t0zG3Y8FUH-NhNKWiQ6hScvKZSkhSWIY3SFvgdo_mZcZ-K08gmwypzk7ggSHZapHN1o6H2nddd9yP_qqJfa1ZKWq-SfMbpehj7r0ghTHmHCv-Q22Lg02LpDZ_xkF5UaaU2jL0o3GJRMqSTHQSxuXeJSwHqGvNXBH0fP4bde6vPduz6W0aUYGfbKPYA4g0jD5k2dgo6d4BXkVQ7-Kt06-T_Ge1i4-7pmkgcmzT_FLkLFFLV9SSzY2E" },
  { id: "tanzanite", name: "Tanzanite", subtitle: "Violet Dusk Mystery", fitLabel: "Better for careful wear", glowClassName: "bg-violet-300/20", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8ZMmamM4hOd9PyKg5Amqf9tit59OWORvF6tlHD0WLYTM-qsL541yeSG8INHXLF__jP-wphGTmlwtSvDJaor7enRq8A-dBpwDyaZd29bk0LZofOppiHrKStuVwVMDq1NGZ3IylTdhjFtkkS6OHnQ9VixpcCrYwf7zLENYvlKmS_riYragWSukK7WMlSSRD7omFuP52Q8QcGTI4-3dtID0i5iH19Ddbmz7DbTeH8QR7cC9ZB_4YKuOlmUrgy4m994kxIKxpb8EHwoM" },
  { id: "spinel", name: "Spinel", subtitle: "Rare Midnight Sparkle", fitLabel: "Excellent fit", glowClassName: "bg-teal-950/30", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWMWbFnceF75yvYnjlX_RijDnF2kDROp2XCrjQpM4jgTn8CMX3Erf-psJ1i4SRIxWTk-c7k5zSw-NWlrGAgVq9mgBJw3v07H_tggaGbBylsK3zOPUcMnby8LFrr-7mscr8JAptVeC_XWGwriuuuh83OqN29Fj6afVDzGYBA-1lM0vE12nkBvpWxez7KCkYP-R3FYx5a6-jBS75h5Wee55CgMA1VWJ3r9FHEIyXRsSjFeueTtkBCfcqABFBltUOMZ7YqZtp5leokwk" },
  { id: "topaz", name: "Topaz", subtitle: "Golden Sunbeam", fitLabel: "Excellent fit", glowClassName: "bg-amber-100/15", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDul2BYumOS-reDmWdiV_-Ln8Vmb7v0RHEmSFeFqtZmYePV2GBunoG27y1p-d-cFQ8Eqc7VHM-xMgpd431P6j02QDen-O6m9kDXykAtAHJHNrKvVgPk7nJJe4vuMg2EEt4tyNr_Mm5M_SArAsER0iB-6_uLal0vMGMdcm8oS-rxA8Wtcxt6jwikUkc4WhT62ppr9o4IyoRUf5B5myVK81NaYQzmIvQC2zo91BEBmC8Y5ia0j5h_0KoZxrwr8B6VIVGBLRJVQMNs2VM" },
  { id: "amethyst", name: "Amethyst", subtitle: "Noble Royal Hue", fitLabel: "Works well with a more protective setting", glowClassName: "bg-purple-300/15", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuNOfZ8tnMIR2xtYXWuey4z9kkkJCTjkqho_5UdPE4-0I4oMiSlVrTWC6yn0o73_EkrHjrMw1adr2xsnZnR2b2A92glAKmo9qZWYy7UUikQUQjIIhx7RGKNR43FfCNXA0iYAw7BkcBFSM_e2sL5B8I22AuvFQFrRkEmT2QM2Rbzbq9R-bEg0nE79ovxHSf-XBh91BoGE4GUZjJZKkLsMTRdooDS6PmrZiVtpP-5nYKhijpCVn6_DTIPgRBEnop0p7s8JFx4EEswBE" },
  { id: "citrine", name: "Citrine", subtitle: "Honey Amber Glow", fitLabel: "Works well with a more protective setting", glowClassName: "bg-yellow-700/20", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_-S2taO1wbuEyqzMVg5zDNSO7Wq-qXHeWnd3DCvws-lOVX26d98e-ijOLfwaExzArGEb6IM1Sw3XrWmo6zNGZK4fNDeDIr4-D4LdJuvCTPyKZ5TNnTI3US1oRtfWxSXUzh1j_3L0DP90WyMMaswRAnB9leEgeXYg3nGza_OPHy5d_gB0-MhjhX54PxSRApKAIBglVJkWtL4QMUe4TPZ-csA6phJ6Fd8Rp_sVcfsIKSdEFe839A-qbYuurdR-s2qfXCys8y2zIGVU" },
  { id: "peridot", name: "Peridot", subtitle: "Luminous Lime Brilliance", fitLabel: "Better for careful wear", glowClassName: "bg-lime-300/10", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-bD9i4OVyIaXF5AgmNF2Wg9Ry9K2yQs0A4rpIXxVx2LWgYtpPVtHo9hSL4uukjdQdha1jwbwWcDgKNoO-zmKAeqcjo2ippdRFqpgQiv-RvusCRtwZ1wFahKzwfFVbWV6RwlGePtxNgs-JlWZklCiRR0H_GibQK93l5w7dV7EGx_HXU2nLzr-FziOKYUotg4JGHKA83iAda9flUODoTEhGlAW3Tzvdh1neBzru8-eWlJxT3rOrhT_E6M7W59vSdMeILOX-DcdVifw" },
  { id: "zircon", name: "Zircon", subtitle: "Ancient starlight", fitLabel: "Works well with a more protective setting", glowClassName: "bg-cyan-50/10", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDd3bUQ9EgDHEVtGCaFD09ja3D17C7N1AUJrHdjbRdK7USTNDXYFBXN-sK452u6Iu7wvFsFGcnevSq0bT1PfRd5KTbRqTJyHETNtoN2t-r2tEYen1lZ2AVxIbiRVWzO9egkCQykuTprtLW6cXNuJnZzlQbyRprY07zhr7WvzN95ApOLeYoowdX3wFYcOlOWrznQn5m45WusazQpzmRtbm9QNetNiFi4PlERn4KXdZBebaTXmtUyG46XLI79P822E1AeAlFVm159kRM" },
  { id: "opal", name: "Opal", subtitle: "Ethereal Fire", fitLabel: "Better for careful wear", glowClassName: "bg-white/5", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC8axtPqtwh0-OvDUdSTtb0n-tW2O2-MbjY4TSVmYcPWCHfC5xsonH0ZfClXBllgGwQYwnFU9ivyymHQPpZce9t-SK1VtWCJRApEP2an07nc4EE40HBwZEUtV8J9s63ehLZby_E_rAeDBDjYuE5_ofB5tEteRW96DgTsKyhGs5H8lgth_qMPHcaGT3_8YvzBY6mJkhZbiXqEXKnvIoTPF4cs8whKvi4V0W-uHp3d6a_jgS3mb11tNGj_kO1lQA2BEDO5tJIKT3Lto" },
]

type Props = {
  onBack?: () => void
}

export default function ChooseGem({ onBack }: Props) {
  const router = useRouter()
  const setGemType = useJewelleryStore((s) => s.setGemType)
  const savedGemType = useJewelleryStore((s) => s.gemType)

  const [selectedGem, setSelectedGem] = useState<string>(() => {
    const validSaved = GEM_CARDS.some((gem) => gem.id === savedGemType)
    return validSaved ? savedGemType : "emerald"
  })

  const selectedGemData = useMemo(() => GEM_CARDS.find((gem) => gem.id === selectedGem) ?? GEM_CARDS[1], [selectedGem])

  const handleBack = () => {
    if (onBack) onBack()
    else router.back()
  }

  const handleContinue = () => {
    setGemType(selectedGem)
    router.push(FLOW_ROUTES.chooseMetal)
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196] selection:text-[#412d0d]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,700;1,300&family=Manrope:wght@300;400;500;600;700;800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 250,
            "GRAD" 0,
            "opsz" 24;
        }
        .glass-card {
          background: rgba(25, 28, 27, 0.6);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(65, 72, 70, 0.15);
        }
        .gold-gradient {
          background: linear-gradient(135deg, #e2c196 0%, #a58860 100%);
        }
        .gold-glow {
          box-shadow: 0 0 30px rgba(226, 193, 150, 0.2);
        }
      `}</style>

      <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between px-8 ">
        <div className="font-['Noto_Serif'] text-xl font-light italic tracking-tight text-[#e2c196]">The Midnight Atelier</div>
        <div className="text-[#e2c196]">
          <span className="material-symbols-outlined">close</span>
        </div>
        <div className="absolute bottom-0 h-px w-full bg-linear-to-r from-transparent via-[#414846]/20 to-transparent" />
      </nav>

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-40 pt-32 md:px-8">

        <header className="mb-16 text-center">
          <h1 className="mb-4 font-['Noto_Serif'] text-4xl font-light italic tracking-tight text-[#e1e3e1] md:text-6xl">Select your gemstone</h1>
          <p className="mx-auto max-w-lg text-sm tracking-wide text-[#c1c8c5]/80 md:text-base">
            Choose a stone that defines your piece, reflecting your personal narrative through its eternal hue.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {GEM_CARDS.map((gem) => {
            const isSelected = gem.id === selectedGem
            const isEmerald = gem.id === "emerald"

            return (
              <button
                key={gem.id}
                className="group text-left"
                onClick={() => {
                  setSelectedGem(gem.id)
                  setGemType(gem.id)
                }}
                type="button"
              >
                <div
                  className={`glass-card flex h-full flex-col items-center rounded-xl p-8 text-center transition-all duration-500 ${isSelected
                    ? "gold-glow -translate-y-2 border-[#e2c196]/60"
                    : "hover:-translate-y-2 hover:border-[#e2c196]/40"
                    }`}
                >
                  <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
                    <div className={`absolute inset-0 rounded-full blur-3xl transition-transform duration-700 ${gem.glowClassName} ${isSelected ? "scale-110" : "scale-75 group-hover:scale-100"}`} />
                    <Image
                      alt={gem.name}
                      className={`z-10 rounded-full object-cover transition-transform duration-500 ${isSelected ? "h-36 w-36 scale-110 shadow-[0_0_40px_rgba(172,205,199,0.3)]" : "h-32 w-32 group-hover:scale-110"
                        }`}
                      height={144}
                      src={gem.imageUrl}
                      width={144}
                    />
                    {isSelected ? <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#e2c196]/30" /> : null}
                  </div>

                  <h3 className={`mb-2 font-['Noto_Serif'] text-2xl ${isSelected ? "text-[#e2c196]" : "text-[#e1e3e1]"}`}>{gem.name}</h3>
                  <p className={`mb-4 text-xs uppercase tracking-widest ${isSelected ? "font-bold text-[#e2c196]/80" : "text-[#c1c8c5]/70"}`}>{gem.subtitle}</p>

                  {isSelected ? (
                    <div className="mt-auto flex flex-col items-center gap-3">
                      <div className={`rounded-full px-4 py-1 text-[10px] uppercase tracking-wider ${isEmerald ? "border border-[#e2c196]/40 bg-[#e2c196]/20 text-[#e2c196]" : "border border-[#414846]/30 bg-[#282b29] text-[#c1c8c5]"}`}>
                        {gem.fitLabel}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e2c196]" />
                        <span className="text-[10px] uppercase tracking-widest text-[#e2c196]">Current Choice</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-auto rounded-full border border-[#414846]/30 bg-[#282b29] px-4 py-1 text-[10px] uppercase tracking-wider text-[#c1c8c5]">{gem.fitLabel}</div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </main>

      <footer className="fixed bottom-8 left-1/2 z-50 flex min-w-[320px] -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-[#414846]/15 bg-[#191c1b]/60 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:min-w-[500px]">
        <button className="flex cursor-pointer items-center gap-2 px-8 py-3 text-[#e1e3e1] transition-transform duration-500 hover:scale-105 active:scale-95" onClick={handleBack} type="button">
          <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-[0.2em]">Back</span>
        </button>
        <button className="group cursor-pointer flex items-center gap-3 rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-10 py-3 text-[#111413] shadow-[0_0_20px_rgba(226,193,150,0.3)] transition-transform duration-500 hover:scale-105 active:scale-95" onClick={handleContinue} type="button">
          <span className="font-['Manrope'] cursor-pointer  text-[10px] font-extrabold uppercase tracking-[0.2em]">Proceed to Metal Selection</span>
        </button>
      </footer>

      <div className="pointer-events-none fixed left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute right-[-10%] top-[-20%] h-[60%] w-[60%] rounded-full bg-teal-300/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[50%] w-[50%] rounded-full bg-[#e2c196]/5 blur-[100px]" />
      </div>
    </div>
  )
}