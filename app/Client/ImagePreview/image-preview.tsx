"use client"
import { Manrope, Noto_Serif } from "next/font/google"
import { Heart, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import useImageStore from "@/app/store/image-store"
import useJewelleryStore from "@/app/store/jewellery-store"
import useRingStore from "@/app/store/ring-store"
import { FLOW_ROUTES } from "../flow-routes"
import { useRouter } from "next/navigation"
import Image from "next/image"
import CustomButton from "@/components/Custom/CustomButton"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
})

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
})

export default function ImagePreview() {
  const router = useRouter();
  const imageUrl = useImageStore((s) => s.image_url)
  const { clearJewellery } = useJewelleryStore()
  const { clearRing } = useRingStore()
  const { clearImage } = useImageStore()

  const handleClearLocalStorage = () => {
    clearJewellery()
    clearRing()
    clearImage()
    router.push(FLOW_ROUTES.home)

  }

  const handleDownloadDesign = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'design.jpg';
    link.click();
  }
  return (
    <div
      className={cn(
        "min-h-screen bg-[#111413] text-[#e1e3e1] selection:bg-[#e2c196]/30",
        manrope.className
      )}
    >
      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className={cn("text-2xl font-light italic text-[#e2c196]", notoSerif.className)}>
          L&apos;ATELIER
        </div>
      </header>

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-24 md:px-12">
        <div className="group relative mb-16 w-full max-w-4xl">
          <div className="relative overflow-hidden rounded-lg bg-[#191c1b] p-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] md:p-4">
            <Image
              src={imageUrl}
              alt="Image Preview"
              width={500}
              height={500}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row">
          <CustomButton
            onClick={handleDownloadDesign}
          >
            Download Design
          </CustomButton>
          <button
            type="button"
            className="border-b border-transparent pb-1 text-[11px] tracking-[0.2em] text-[#e1e3e199] uppercase transition-colors duration-500 hover:border-[#e2c196]/30 hover:text-[#e2c196]"
            onClick={handleClearLocalStorage}
          >
            Start New Design
          </button>
        </div>
      </main>
    </div>
  )
}
