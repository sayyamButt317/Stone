"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Manrope, Noto_Serif } from "next/font/google"
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { FLOW_ROUTES } from "../flow-routes"

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
})

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal", "italic"],
})

type BraceletStyle =
    | "tennis-bracelet"
    | "chain-bracelet"
    | "bangle"
    | "cuff"
    | "charm-bracelet"
    | "station-bracelet"
    | "link-bracelet"
    | "gemstone-line-bracelet"
    | "bezel-set-bracelet"
    | "contemporary-minimal"

const BRACELET_OPTIONS: Array<{
    id: BraceletStyle
    name: string
    description: string
    image: string
}> = [
        {
            id: "tennis-bracelet",
            name: "Tennis Bracelet",
            description:
                "A continuous line of brilliance, meticulously set for maximum light return.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCW0qmpYeQl5ePY0lqYpI50RV7gg1mI6G-2NS4ipCa54P4EVHgKoEOlOc5OHQngahAC-0ZBjgtHRLpkC32TteLFbxGrsOJCjFjZ556gkeZ8kP7_BXlWL3HW6Fv2QzTILxkNArY_H0aSF-cym7NxCV915em0HO58wAd_r9yeXdmiZXeaWnY3lM_WvM9rxkfXtlnFuZWq3WH2ePNVkV1lU0i0RI2221eUGKe2OrGnAty6lgSGxc7gzHm6UzNhzVnJgksAH6mLctK-G1s",
        },
        {
            id: "chain-bracelet",
            name: "Chain Bracelet",
            description:
                "Interlocking elegance and movement, crafted in signature 18k gold.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuD0nUAZvfHArPyCUzklseRdIwmpdKrjEBTjqO1EO8n1SWxuxgKsRdqvJcnlRO0hPlTNzAzYEyqLBhqNrXDB1WoumIOi7GW9txgIh6MDB7HIqgwREQ0NKiR2PDEUTZu8DtVSlTRyg5NE7SgGk7jrHqcVNULNXAB-Dt8NSKGg2WfqljzRRmx7Eic4ZMPokbPboUxzRIalOQA4PiUxIrcKWRcM84rFkkiVsJlFdOtZ0QiNzF5iy3L6bW6_rdR0vr7g5nr-Jz2aJKOLJ_o",
        },
        {
            id: "bangle",
            name: "Bangle",
            description:
                "A structured circle of timeless grace, perfect for stacking or solo wear.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC5gsBB1uIHEKNsCf1xBAEDMECRzoSyN2rr6STcdiPvsLDTnCOHVBtXCGYEgyh38QsttFdZpgVv3CV5OufcwqlQADb8JRZK2lfigneGgXNWrLDcTqyF4ZyHbV0VcY7eVlAdypiN_Q45LNTwjeMgicCBvTt_zOlL7QIB5_0tUsZWhUt7Q6sWi6RNj9bvy4Us7NRBE4D0P70hoS4LYP8HEmhwia-Xpz2VIqSQP09XbMSpFPqjdwSr13_JgNfOOHZDy4Lf2wlPCdxjCKo",
        },
        {
            id: "cuff",
            name: "Cuff",
            description:
                "Bold and sculptural presence, making a statement of modern luxury.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDN1hVonYLB8nxKRny7ZJKv0t9iuk8PVkYN1miPGTwo0DVWp4A0_14hTDQ_mf0U7ugjZfGIcBlMwCcM4G0FHXF5r5vVpNzfiet6ZB3lgqwPDqcjaiD0D1Tdw89uULT4QUpZP-ifXDtZr4kpXgIhLKB1vthWdTf9RnTIU2Aq6JY6anahdYnlo-4b8hnuBtoMvyyyAizcrbCsO0Q3kET1wouil4bzVsfS11y26ihcjc_6pIBDBjYMnT9lypV9-CW0g0JskbLX2fS8F2w",
        },
        {
            id: "charm-bracelet",
            name: "Charm Bracelet",
            description:
                "Your stories, uniquely adorned with hand-finished meaningful talismans.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBjl3c2Yue_9_pBRKTNvbZZTesPXMxyymvnnod9gQHGotHJ7yH3sslSsqnkHsadtbsv1aSkKeAHdJfAoVnRjwAmFBXcUqsaecXDjqi4CK6fNkA4d9vcptot2fmCvc-cvv6Q9wo6D7onSk-IB4-19Wk6mDhZfQslOP6DtwF63IRcMz1bgmbjQy_aO1KLw-KKco_-TgKZq0VYNC1e76zNx_adarvD6kloiz_Vrph4SiYKNCarsn6isgGBD8eT5h3utf3OG33kfdvs8Xo",
        },
        {
            id: "station-bracelet",
            name: "Station Bracelet",
            description:
                "Intervals of light and detail, offering a delicate rhythm of gems.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDzugcOoipKI-ZjL_ybjnhFpbKR9h9DxGMCPfkeVX57_062UIFzSb4uXkGQOTfRYdIKk4a8JSxfWDZn6ZJDeQPm4lcx0xrGdVzsXUD-Was0m09BD1W5WfBXb1US0ezJ0LGLE_XLDthdxoE_aBZE5nDjeWWU_Zc5YHFqcRoG-OBJIajzghYD0MJ9tWmaYqTdnlrvU6kou0AMMCLji0BrTQTd6XzHOnDNn_lGPhCjyz10rM95I6j1aldzXjkHZEl7fpLi_ugDvA6kEIk",
        },
        {
            id: "link-bracelet",
            name: "Link Bracelet",
            description:
                "Sophisticated geometric links that offer a modern, architectural drape.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC7OQbSi-uYIQlWMGPlVURJa5bsoS_IeK2JAjTtGqFQJByYbong-zpnfMwNudCi78M2mVpnae9IUnXDtx3NNCZhyNMcjHURyTDo0HUUOTAHP78bWtBdVz-evhWHgXFr2PMxdnVnYx0Pqo5rJ2b6ONPOtZM65a6WRGRvkOQ4WFoeyy3ZrqfzQMzFDtRpJzwMlwe4jZPWITF1KIffPTYGgK6zAP2Es35O0_y9zoiYgDcs7QLQ9up7JiRK0MeT20RFDKrFfDWTmOQ4ikQ",
        },
        {
            id: "gemstone-line-bracelet",
            name: "Gemstone Line Bracelet",
            description:
                "A spectrum of vibrant color, featuring precision-cut precious gemstones.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC0pVE1B-PUe098P61YoxY2UvcWDSlf_xYGWaUTwnu03opFp8LBVFVCC7hpABSL7MaFv3hBOonaqCKz19xwZeZ3ZfIr0-VRp22-6uLs3ErobJzciqRpb_zq4geW3mEel5YrYUPC-2F-OPOfjwmUT-cIPARY0bLx5wCMDv2YVoTOj4Gw6G0-QWhKW937ANg0Lj02IiL2eu64keicXfDPI_vuJ0T7ixEVjq0yQELVTEUM_tuyhqg3N3cpXfGDpfs8yRjX9R4oX3eT_60",
        },
        {
            id: "bezel-set-bracelet",
            name: "Bezel-Set Bracelet",
            description:
                "Elegant protective settings that enhance the stone's silhouette and security.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAAPMtIoIkCXB0LxualhD4pRnZNwvrN4NEih7pByC4yOdIQ1sdHqLZv4US2AoTbdXCuqyqdHbze2HA61MaERZyFMpN4eVVdSLLOZ5O6vtbVndVMVWEEW_kn00jMpHM4Pq0EimmvcfrDQnOntF_ej8FcK3J1dOpRS9ux5QQEafg0yLRfTJB2Fn9XLgNJbrLAXWwrUzQ1nB_KYrBhthC6I-c-hO8qKHf36Ehmh20xDGa6vR6hQjSe2f6OOLz5LgR5TBhO5yNN55auwY0",
        },
        {
            id: "contemporary-minimal",
            name: "Contemporary Minimal",
            description:
                "Purity of form and material, designed for the modern minimalist aesthetic.",
            image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAnMMP4PRa-ybEvP__8Jq2zikBoSxvQFriTwqx-m6M91-lp8-CijJtPf1LIV9-QGxB4iq_IA1mjHE5qpjAqppG5nb5PhT06En6OHz8kyJXjjIlKHAdd2-m6Pv4jzja9WP7Curxu6l3o5VnAk-n_F6Ojthb1X7ErKnKwUMX7P1uScNXNbINq5hceK9Z-7u-XNrbWOsWlxSXQueZD33F7AJkAEv5HE17zoMNVZTbI9GAz3ldNFmWxvkxVzlF6YrO7pUtkO3u1NEpY9T4",
        },
    ]

export default function BraceletPage() {
    const router = useRouter()
    const [selectedStyle, setSelectedStyle] =
        useState<BraceletStyle>("tennis-bracelet")

    const currentSelection = useMemo(
        () =>
            BRACELET_OPTIONS.find((option) => option.id === selectedStyle)?.name ??
            "Tennis Bracelet",
        [selectedStyle]
    )

    return (
        <div
            className={cn(
                "min-h-screen bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196]/30",
                manrope.className
            )}
        >
            <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-8 py-6 backdrop-blur-xl">
                <div
                    className={cn(
                        "text-xl tracking-[0.2em] text-[#e2c196] uppercase",
                        notoSerif.className
                    )}
                >
                    The Midnight Atelier
                </div>

                <div className={cn("hidden items-center gap-8 md:flex", notoSerif.className)}>
                    <button
                        type="button"
                        className="tracking-tight text-[#e1e3e1]/60 transition-colors hover:text-[#e1e3e1]"
                    >
                        Collections
                    </button>
                    <button
                        type="button"
                        className="border-b border-[#e2c196] pb-1 tracking-tight text-[#e2c196]"
                    >
                        Bespoke
                    </button>
                    <button
                        type="button"
                        className="tracking-tight text-[#e1e3e1]/60 transition-colors hover:text-[#e1e3e1]"
                    >
                        Heritage
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="rounded-full p-2 text-[#e2c196] transition-all duration-300 hover:bg-[#e2c196]/10"
                    >
                        <ShoppingBag className="size-5" />
                    </button>
                </div>
            </nav>

            <header className="mx-auto mt-28 w-full max-w-7xl px-8 md:px-24">
                <div className="mb-4 flex items-end justify-between">
                    <span className="text-xs font-bold tracking-[0.2em] text-[#e2c196] uppercase">
                        Step 2 of 7
                    </span>
                    <span className="text-xs tracking-widest text-[#e1e3e1]/40 uppercase">
                        Bracelet Selection
                    </span>
                </div>
                <div className="h-px w-full overflow-hidden bg-[#414846]/30">
                    <div className="h-full w-[28.5%] bg-linear-to-r from-[#e2c196] to-[#a58860] transition-all duration-700" />
                </div>
            </header>

            <main className="mx-auto w-full max-w-7xl grow px-8 py-16 md:px-24">
                <div className="mb-16">
                    <h1
                        className={cn(
                            "mb-4 text-4xl text-[#e2c196] tracking-tight md:text-6xl",
                            notoSerif.className
                        )}
                    >
                        Select your bracelet style
                    </h1>
                    <p className="max-w-2xl text-lg font-light text-[#e1e3e1]/60">
                        Choose a silhouette that speaks to your aesthetic, from the classic
                        radiance of a tennis line to the bold sculpture of a gold cuff.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {BRACELET_OPTIONS.map(({ id, name, description, image }) => {
                        const isSelected = id === selectedStyle
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setSelectedStyle(id)}
                                className={cn(
                                    "group relative overflow-hidden rounded-lg p-px transition-all duration-300",
                                    isSelected
                                        ? "bg-[#191c1b] shadow-[0_0_30px_rgba(226,193,150,0.2)] ring-1 ring-[#e2c196]/40"
                                        : "bg-[#191c1b] hover:bg-[#e2c196]/20"
                                )}
                            >
                                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[1.9rem] bg-[#111413] p-6 text-left">
                                    <div className="mb-8 overflow-hidden rounded-lg">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            alt={name}
                                            src={image}
                                            className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3
                                                className={cn(
                                                    "text-2xl transition-colors",
                                                    notoSerif.className,
                                                    isSelected
                                                        ? "text-[#e2c196]"
                                                        : "text-[#e1e3e1] group-hover:text-[#e2c196]"
                                                )}
                                            >
                                                {name}
                                            </h3>
                                        </div>
                                        <p className="text-sm leading-relaxed font-light text-[#e1e3e1]/60">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>

                <div className="h-32" />
            </main>

            <footer className="fixed bottom-0 left-0 z-50 flex h-24 w-full items-center justify-between bg-[#111413]/90 px-8 shadow-[0_-20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl md:px-12">
                <button
                    type="button"
                    onClick={() => router.push(FLOW_ROUTES.chooseType)}
                    className="group flex items-center gap-2 px-8 py-3 text-[#e1e3e1] opacity-70 transition-all duration-200 hover:opacity-100"
                >
                    <ArrowLeft className="size-4" />
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase">
                        Back
                    </span>
                </button>

                <div className="hidden flex-col items-center md:flex">
                    <span className="mb-1 text-[10px] font-bold tracking-[0.3em] text-[#e1e3e1]/30 uppercase">
                        Current Selection
                    </span>
                    <span className="text-xs font-bold tracking-widest text-[#e2c196]">
                        {currentSelection}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => router.push(FLOW_ROUTES.chooseGender)}
                    className="flex items-center gap-3 rounded-full bg-linear-to-tr from-[#e2c196] to-[#a58860] px-10 py-4 text-[#111413] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(226,193,150,0.2)] active:scale-95"
                >
                    <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase">
                        Next Step: Intended Wearer
                    </span>
                    <ArrowRight className="size-4" />
                </button>
            </footer>
        </div>
    )
}
