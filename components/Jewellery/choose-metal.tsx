"use client"

import { useCallback, useMemo, useState } from "react"
import { Manrope, Noto_Serif } from "next/font/google"
import { X } from "lucide-react"
import { Modal } from "@/components/Client/Dialogue"
import { DialogClose, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import useJewelleryStore from "@/app/store/jewellery-store"

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "600", "800"],
})

const notoSerif = Noto_Serif({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    style: ["normal", "italic"],
})

const ACCENT = "#e2c196"
const SURFACE = "#111413"
const ON_SURFACE = "#e1e3e1"
const ON_SURFACE_VARIANT = "#c1c8c5"
const SURFACE_CONTAINER_HIGHEST = "#323534"

export type MetalChoice = "gold" | "white-gold" | "rose-gold" | "silver" | "platinum"

type MetalOption = {
    id: MetalChoice
    name: string
    currentLabel: string
    imageUrl: string
    imageClassName?: string
    tintOverlayClassName?: string
}

const METALS: MetalOption[] = [
    {
        id: "gold",
        name: "Gold",
        currentLabel: "18k Yellow Gold",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAhgAx17uJf7c1AY4zGvZIUqmiWmpxnVwN9IzB04ktrkvj2XwtfiZ0vcS5nCtBEC1uF653B618dDCIyJPFYxh_scjGXcBUxbRl5dxiFMu3Asg9ICvk8aKYWfj6WS8Rm3kdSlAX8RCGTs0KUil8Ay79HyPqKy6r3zBLcJv0fdKkg2uHR-aYI1rluZUGr6UqpVCarpD1C7-grLlY-_FBpohwdEFv-xu7g3-n36gXEtI8CCC5RrIVv7ii_tDLIK64uIE-K-fs91K4K67Y",
        imageClassName: "grayscale-[0.2]",
    },
    {
        id: "white-gold",
        name: "White Gold",
        currentLabel: "18k White Gold",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA8gCGwgFGfRC7YqbIfxI5vJrE7h55hotyo6To2wPNuN8ShblRi6PHCKrDwsJsN-FbYuK_D_wZN-U3GT5ArKHuG8WnoMMsBNqViRJNRWktZltguQ5pVVzI9VM8kiFzhHRan6Bd6v0-CEHbWopfnMRwwGvUt_ab8zjS7ArVdYo7ZDJW0I7O_iZPpQzU_NeefwrCNJp0W_oVzsdlF93bERmHZuaquM9vjQZBaBoe0Vku2qnYaQhX7llErEm9LAwTHe5XGArovXW0Z49g",
        imageClassName: "grayscale-[0.5]",
    },
    {
        id: "rose-gold",
        name: "Rose Gold",
        currentLabel: "18k Rose Gold",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDEaUCDN7MNMSieNkXsPGlzEILjJw-NhOnqjiIQCLwH_iu7WRw4L92YGptJzsiFar_JdlN-zFxSgnFrzKVgidxrq4b0kzu4VxUiIFq-fsn1DSlOQoiOav_1Sz2I40gIkkoKQLrATGyf9tXqLRHEe0eMuRXkD-cF1SzYNHZsUVOeWthogSMugbWxXmG1JA33SeElAh1SybMdhsvzm27DpA2zZYTNyuV-zR74KKg5H-9bTU4925TBmSttZFHsisPXwEbBQRqUx2Bz1as",
        imageClassName: "sepia-[0.4] hue-rotate-[320deg]",
    },
    {
        id: "silver",
        name: "Silver",
        currentLabel: "Sterling Silver",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDf11Kyl0xWUKhpO3b3qJRXlnaxAeE7cau5-wa0KPCNOZMFz-Vz8nqlRUkh4Cw6dFOIKkJoKIYNtnjNZrXi4Uu0PmqZnidnWkEpaWvYCDKIi8pNtIBHCyeEMzm-auveX8-_ioqwOk-WmQVhMi3DKtCfoCVwImfNSD6eIlLdoIOrHjvlLxvWQxqcsHMlOJW5gt1DODpysJXMrIi_AF71JcQ3YxZsiWbFI-5wB8RnSIgQbxiDOYHXWBAfJfOJ1K2YupPJLxHcCVIo1Fk",
        imageClassName: "grayscale",
    },
    {
        id: "platinum",
        name: "Platinum",
        currentLabel: "950 Platinum",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCWGR1g_l9KdkkkC5T7LyDMDXiVm6h9IjbaA3scHfivFOvtwGwulX91kFQKgHYeuWuDZiKIViM_k_h-Rs7YtxBL68XHFu_JZz4Sps_Ox0Q7k0W1lGWloeQ_XmnIA6zPVXMTPZXva9cF92_3l269ZBghQdxchFkwHEX0IJy6Xt-7K28TAdK3ViCNmJfqC1COjhwAgX_F9SNTJaZdnKAtlyhN-6U7EbO5zodHHPfR88IV_x5MWawbtu0xmfzV89-65oqlSs1lh0vylOo",
        imageClassName: "grayscale",
        tintOverlayClassName: "bg-linear-to-br from-[#d1d5db] to-[#4b5563] opacity-40",
    },
]

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    step?: number
    totalSteps?: number
    onBack?: () => void
    onContinue?: (metal: MetalChoice) => void
}

export default function ChooseMetal({
    open,
    onOpenChange,
    step = 4,
    totalSteps = 7,
    onBack,
    onContinue,
}: Props) {
    const [selectedMetal, setSelectedMetal] = useState<MetalChoice>("gold")
    const { metalType, setMetalType } = useJewelleryStore()

    const selectedMetalLabel = useMemo(
        () => METALS.find((metal) => metal.id === selectedMetal)?.currentLabel ?? "18k Yellow Gold",
        [selectedMetal]
    )

    const handleBack = useCallback(() => {
        if (onBack) {
            onBack()
            return
        }
        onOpenChange(false)
    }, [onBack, onOpenChange])

    const handleContinue = useCallback(() => {
        if (onContinue) {
            onContinue(selectedMetal)
            return
        }
        onOpenChange(false)
    }, [onContinue, onOpenChange, selectedMetal])

    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <div
                className={cn(
                    "relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden",
                    "selection:bg-[#e2c196] selection:text-[#111413]",
                    manrope.className
                )}
                style={{ backgroundColor: SURFACE, color: ON_SURFACE }}
            >
                <DialogTitle className="sr-only">Choose your metal</DialogTitle>

                <header className="fixed top-0 z-50 w-full bg-[#111413]/80 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl">
                    <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-6 py-4">
                        <div
                            className={cn(
                                "cursor-pointer text-lg tracking-wide italic transition-transform active:scale-95",
                                notoSerif.className
                            )}
                            style={{ color: ACCENT }}
                        >
                            Midnight Atelier
                        </div>

                        <div
                            className={cn(
                                "hidden items-center gap-8 font-light tracking-wide md:flex",
                                notoSerif.className
                            )}
                            style={{ color: `${ON_SURFACE}99` }}
                        >
                            <span className="cursor-pointer transition-colors duration-300 hover:text-[#e2c196]">
                                Collections
                            </span>
                            <span className="cursor-pointer transition-colors duration-300 hover:text-[#e2c196]">
                                Bespoke
                            </span>
                            <span className="cursor-pointer transition-colors duration-300 hover:text-[#e2c196]">
                                Heritage
                            </span>
                        </div>

                        <DialogClose
                            type="button"
                            className="text-[#e2c196] transition-transform active:scale-95"
                        >
                            <X className="size-5" strokeWidth={1.5} />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </div>

                    <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-[#414846]/20 to-transparent" />
                </header>

                <main className="mx-auto flex w-full max-w-screen-2xl min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 pt-32 pb-40">
                    <div className="mb-16 w-full max-w-4xl space-y-6 text-center">
                        <div className="mx-auto w-full max-w-xs">
                            <Modal.Stepper step={step} totalSteps={totalSteps} />
                        </div>

                        <div className="space-y-2">
                            <h1
                                className={cn(
                                    "text-4xl font-light tracking-tight md:text-6xl",
                                    notoSerif.className
                                )}
                            >
                                Choose your metal
                            </h1>
                            <p className="text-lg tracking-wide" style={{ color: `${ON_SURFACE_VARIANT}cc` }}>
                                Define the base of your piece
                            </p>
                        </div>
                    </div>

                    <section className="w-full overflow-x-auto pb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex min-w-max flex-nowrap gap-6 px-4 md:justify-center">
                            {METALS.map((metal) => {
                                const selected = metal.id === selectedMetal

                                return (
                                    <button
                                        key={metal.id}
                                        type="button"
                                        onClick={() => {
                                            setSelectedMetal(metal.id)
                                            setMetalType(metal.id)
                                        }}
                                        className={cn(
                                            "group relative flex h-80 w-56 cursor-pointer flex-col rounded-lg border p-1 text-left transition-all duration-500",
                                            "bg-[rgba(29,32,31,0.6)] backdrop-blur-2xl",
                                            "focus-visible:ring-2 focus-visible:ring-[#e2c196]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111413] focus-visible:outline-none",
                                            selected
                                                ? "-translate-y-4 border-[#e2c196]/40 shadow-[0_0_40px_rgba(226,193,150,0.15)]"
                                                : "border-[#414846]/15 hover:-translate-y-2 hover:border-[#e2c196]/20"
                                        )}
                                    >
                                        <div className="relative grow overflow-hidden rounded-[1.8rem] bg-[#323534]">
                                            {metal.tintOverlayClassName ? (
                                                <div className={cn("absolute inset-0 z-10", metal.tintOverlayClassName)} />
                                            ) : null}

                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={metal.imageUrl}
                                                alt={metal.name}
                                                className={cn(
                                                    "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
                                                    metal.imageClassName
                                                )}
                                            />

                                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0)_100%)] [background-size:200%_200%] transition-all duration-500 group-hover:[background-position:100%_100%]" />
                                            {selected ? (
                                                <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(226,193,150,0.2)]" />
                                            ) : null}
                                        </div>

                                        <div className="py-6 text-center">
                                            <span
                                                className={cn(
                                                    "text-[12px] font-bold tracking-[0.2em] uppercase transition-colors",
                                                    selected ? "text-[#e2c196]" : "text-[#c1c8c5] group-hover:text-[#e2c196]"
                                                )}
                                            >
                                                {metal.name}
                                            </span>
                                        </div>

                                        {selected ? (
                                            <div className="absolute -inset-px -z-10 rounded-lg bg-linear-to-br from-[#e2c196]/30 to-transparent blur-sm" />
                                        ) : null}
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                </main>

                <footer className="fixed bottom-0 z-50 w-full rounded-t-[40px] bg-[#191c1b]/90 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                    <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-10 py-8">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="rounded-full border border-[#414846]/30 px-8 py-3 text-[10px] font-bold tracking-[0.2em] text-[#e1e3e1] uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                        >
                            Back
                        </button>

                        <div className="hidden flex-col items-center lg:flex">
                            <span className="text-[10px] tracking-widest text-[#c1c8c566] uppercase">
                                Current Selection
                            </span>
                            <span className={cn("text-sm italic text-[#e2c196]", notoSerif.className)}>
                                {selectedMetalLabel}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleContinue}
                            className="rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-8 py-3 text-[10px] font-bold tracking-[0.2em] text-[#111413] uppercase shadow-[0_4px_15px_rgba(226,193,150,0.2)] transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                        >
                            Next: Select Size
                        </button>
                    </div>
                </footer>

                <div className="pointer-events-none fixed top-0 left-0 -z-10 h-full w-full">
                    <div className="absolute top-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-[#314c47]/10 blur-[120px]" />
                    <div className="absolute bottom-[-5%] left-[-5%] h-[40%] w-[40%] rounded-full bg-[#342204]/5 blur-[100px]" />
                </div>
            </div>
        </Modal>
    )
}
