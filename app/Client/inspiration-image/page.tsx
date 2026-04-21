"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useRef, useState } from "react"
import useJewelleryStore from "@/app/store/jewellery-store"
import { FLOW_ROUTES } from "../flow-routes"
import { useCreateRingMutation } from "@/app/routes/Client/hooks/ring-hook"
import { RING_CREATION_INSTRUCATIONS_PAYLOAD } from "@/app/constant/ringcreation"
import { Loader2 } from "lucide-react"

type TeaserImage = {
  alt: string
  src: string
  offsetTop?: boolean
}

const TEASER_IMAGES: TeaserImage[] = [
  {
    alt: "Reference 1",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBw8MOdGT214RzI6Pn9yuLF_27b1o1mBasDY-MjK4aJKet5RtgfDh9Og_MS8wjsE_CPvAe7Jh1IZQTrcUcV40TUWLCT8mfHl4L3pIp-ciz4z-zUsxJEOt-AxFuqrXPTQ28k5YzoHp4XLI74TdqTv3Ez6VGCXKzuv0VsR5sc6pnWWDunE55zBRfSG648KZ26tZolZwaepqGQI6OZ3ca4eo419nXqBYduNeew2Ljtg-8GB9i6uLXXxCgBs2fDAffawxJ-DRWI7rkzOQA",
  },
  {
    alt: "Reference 2",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQzuT_6sUc0EdW0PyJepc4lVDwZhgC2GofVdIQEbHr2owoU5_pt6EPeYhY013OR7w5cI1z92BcdSKwmgaCFH51SpqeaItZLMWozDT9nwcB7eJSoatLFwJlLjywBcC0Q92m7WyUPIMaNb8hacMug8WE3TJGfz2y6Fsy2fEgx8rgAPCX1Z-_xo3jwBfphksVSbrPIuQN3fryI2VATwta2WOVOcChD2yGyUW7Wh1z55eNSA0XkUlYS-0hKO1wq1p_OLnh1sMQer8usWA",
    offsetTop: true,
  },
  {
    alt: "Reference 3",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6t9zxUjhS78oseMZIjtIpIN3gICc2KLpTri6LWXA7RRsxqyf6JavPRea5-bAWxkMjDONNrZvk0ARDS2ObGn6RKqlYnLDyT6Bx-1BbZUuFMwXj0DMl_-pbzlp7Q89e2VHIL9A_oV_cEQZbwR7d3Ihq_Q1peV6aLNQdTIXSwFPc1xnEEiz8dnFf1xS4_fljSzEWZZTEWuG0vYR9oYIHLAQjgLgyCU-GNAcZiV-xwAF3uW4v6GI4rhhJTodQlSo2cXqKaiYULhNw3p4",
  },
  {
    alt: "Reference 4",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmMOsW7gc6rmSBI_Y-Aa2SOnpOOis_RVhydtz8WBt_iROXDN9hMBFYVMuaaJ_TclHGEFBIsbPgC0vw8hkXz1lTj_3Ts8AYi25ad5VWAh8dP-YahTuXEY2xb-LsUu67uco66FE7kHaushFjXP_oZ-W-tv2dE9ZSO5doxih7sw5bCSzTrwi2Q3IAR4Li9S56_FIhPCw5_7jj6ii0NItk1ABo4mZRIMe8kKU0xs_55JDMHqJPJZ2w6_dba7jNLwN1cTXW-gSVoWgmDLU",
    offsetTop: true,
  },
]

export default function InspirationImagePage() {
  const router = useRouter()
  const setImagePreview = useJewelleryStore((s) => s.setImagePreview)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const { mutate: createRing } = useCreateRingMutation()
  const [isGenerating, setIsGenerating] = useState(false)


  const applyFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        return
      }
      const url = URL.createObjectURL(file)
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return url
      })
      setFileName(file.name)
      setImagePreview(url)
    },
    [setImagePreview]
  )

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0]
    if (file) applyFile(file)
  }

  const goNext = () => {
    router.push(FLOW_ROUTES.imagePreview)
  }

  const handleSkip = () => {
    setImagePreview("")
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setFileName(null)
    goNext()
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleDropZoneClick = () => {
    fileInputRef.current?.click()
  }

  const RingGeneration = () => {
    if (isGenerating) return
    setIsGenerating(true)

    const s = useJewelleryStore.getState()

    const payload: RING_CREATION_INSTRUCATIONS_PAYLOAD = {
      jewelleryType: s.jewelleryType,
      genderType: s.genderType,
      style: s.style,
      ringStyleFamily: s.ringStyleFamily,
      metalType: s.metalType,
      sizeType: s.sizeType,
      stone: s.stone,
      gemType: s.gemType,
      stonecolor: s.stonecolor,
      prefersetting: s.prefersetting,
      pick: s.pick,
      wearFrequency: s.wearFrequency,
      inspirationKeywords: s.inspirationKeywords,
      chosenColor: s.chosenColor,
      imagePreview: s.imagePreview,
      yssReference: s.yssReference,
      ownStone: s.ownStone,
    }

    createRing(payload, {
      onSettled: () => setIsGenerating(false),
    })
  }


  return (
    <div className="flex min-h-screen flex-col bg-[#111413] font-[Manrope] text-[#e1e3e1]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;600;800&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

        .glass-card {
          background: rgba(17, 20, 19, 0.6);
          backdrop-filter: blur(24px);
        }
        .gold-gradient {
          background: linear-gradient(135deg, #e2c196 0%, #a58860 100%);
        }
        .material-symbols-outlined {
          font-variation-settings:
            "FILL" 0,
            "wght" 200,
            "GRAD" 0,
            "opsz" 24;
        }
        .dotted-gold {
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='%23e2c19640' stroke-width='1' stroke-dasharray='8%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        }
      `}</style>

      <input
        accept="image/jpeg,image/png,image/webp,application/pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        ref={fileInputRef}
        type="file"
      />

      <header className="fixed top-0 z-50 flex h-20 w-full items-center justify-between  px-8 text-[#e2c196] ">
        <div className="font-['Noto_Serif'] text-lg uppercase tracking-[0.2em] text-[#e2c196]">The Atelier</div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl grow flex-col items-center px-6 pb-48 pt-22 md:px-24 md:pb-40">


        <div className="mb-12 space-y-4 text-center">
          <h1 className="font-['Noto_Serif'] text-4xl leading-tight text-[#e1e3e1] md:text-5xl">Do you have an inspiration image?</h1>
          <p className="mx-auto max-w-lg text-lg font-light text-[#c1c8c5]">
            Upload a photo to help our designers capture your vision.
          </p>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="relative hidden flex-col justify-center space-y-6 overflow-hidden rounded-lg bg-[#191c1b] p-8 lg:col-span-4 lg:flex">
            <div className="absolute right-0 top-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-8xl">diamond</span>
            </div>
            <h3 className="font-['Noto_Serif'] text-xl text-[#e2c196]">Visual Cues</h3>
            <p className="text-sm leading-relaxed text-[#c1c8c5]">
              Whether it&apos;s a family heirloom, a sketch on a napkin, or a mood board, your references help us refine the
              fine details of your piece.
            </p>
            <div className="border-t border-[#414846]/10 pt-4">
              <span className="text-[10px] uppercase tracking-widest text-[#accdc7]">Accepted: JPG, PNG, PDF</span>
            </div>
          </div>

          <div className="glass-card relative cursor-pointer rounded-lg p-1 lg:col-span-8">
            <div
              className="dotted-gold group flex min-h-[400px] w-full flex-col items-center justify-center p-12 transition-all duration-500 hover:bg-[#e2c196]/5"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => {
                e.preventDefault()
                handleFiles(e.dataTransfer.files)
              }}
              onClick={handleDropZoneClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleDropZoneClick()
              }}
              role="button"
              tabIndex={0}
            >
              {previewUrl && fileName?.match(/\.(jpg|jpeg|png|webp|gif)$/i) ? (
                <div className="relative mb-6 h-64 w-full max-w-md overflow-hidden rounded-lg">
                  <Image alt="Your upload preview" className="object-contain" fill src={previewUrl} unoptimized />
                </div>
              ) : previewUrl ? (
                <p className="mb-6 text-sm text-[#c1c8c5]">Selected: {fileName}</p>
              ) : (
                <>
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#1d201f] shadow-2xl shadow-black/60 transition-transform duration-500 group-hover:scale-110">
                    <span className="material-symbols-outlined text-3xl text-[#e2c196]">upload_file</span>
                  </div>
                  <div className="space-y-2 text-center">
                    <span className="mb-2 block text-xs uppercase tracking-widest text-[#e1e3e1]">Reference Studio</span>
                    <p className="font-light text-xl text-[#c1c8c5]">
                      Drag and drop or <span className="font-medium text-[#e2c196]">click to upload</span>
                    </p>
                    <p className="mt-6 text-[10px] uppercase tracking-widest text-[#c1c8c5]/40">Maximum file size: 25MB</p>
                  </div>
                </>
              )}
              <div className="absolute bottom-6 left-6 opacity-20">
                <span className="material-symbols-outlined text-xs">architecture</span>
              </div>
              <div className="absolute right-6 top-6 opacity-20">
                <span className="material-symbols-outlined text-xs">palette</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex w-full flex-row gap-2 justify-center items-center">
          <button
            className="gold-gradient min-w-[280px] bg-gray-950 cursor-pointer rounded-md px-16 py-5 text-sm font-extrabold uppercase tracking-widest text-[#412d0d] shadow-[0_0_30px_rgba(226,193,150,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
            onClick={handleSkip}
            type="button"
          >
            Skip for now
          </button>
          <button
            className="gold-gradient min-w-[280px] cursor-pointer rounded-md px-16 py-5 text-sm font-extrabold uppercase tracking-widest text-[#412d0d] shadow-[0_0_30px_rgba(226,193,150,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
            onClick={RingGeneration}
            disabled={isGenerating}
            type="button"
          >
            {isGenerating ? <Loader2 className="size-5 animate-spin" /> : "Generate Instruction"}
          </button>
        </div>
      </main>


    </div>
  )
}
