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
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#111413]/80 px-8 py-6 backdrop-blur-xl md:px-16">
        <div className={cn("text-2xl tracking-widest text-[#e2c196]", notoSerif.className)}>
          L&apos;ATELIER
        </div>

        <div className="hidden gap-12 md:flex">
          {["Collections", "Bespoke", "Heritage"].map((item) => (
            <button
              key={item}
              type="button"
              className="text-[11px] tracking-[0.2em] text-[#e1e3e1b3] uppercase transition-colors duration-500 hover:text-[#e2c196]"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6 text-[#e2c196]">
          <button type="button" className="transition-colors duration-500 hover:text-[#e1e3e1]">
            <Heart className="size-5" />
          </button>
          <button type="button" className="transition-colors duration-500 hover:text-[#e1e3e1]">
            <ShoppingBag className="size-5" />
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-[#282b29]">
            <Image src='https://lh3.googleusercontent.com/aida-public/AB6AXuCMeI53bfuMnZgyr_bndSB03wgt_r9GL2Mb58Cgzjw6c3VrybUKDjt-9-qiRDnU6B-FDFXDzrZ0nEdP9OqoUB5XPakz8HQkTAjCKz_zZirTd9mu0F-_PcUFbVGaikhTYREQ2Dz7DAzapqK9q26T-6HJ2zPSKG_mfgun-kc59zoNXnxCDPl6nI5cTF2XCmT7zWRw_kybGQVperFM71db7hQXSMiQbQJFT1FxxC70on3atIIU82uIbUJWQhPu9jLqpV0ct5Dy7U3C7sg' alt="User profile" width={32} height={32} />
          </div>
        </div>
      </nav>

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 pt-32 pb-24 md:px-12">
        <div className="group relative mb-16 w-full max-w-4xl">
          <div className="absolute -inset-4 rounded-full bg-[#e2c196]/5 opacity-50 blur-3xl" />
          <div className="relative overflow-hidden rounded-lg bg-[#191c1b] p-2 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] md:p-4">
            <Image
              src={imageUrl}
              alt="Image Preview"
              width={500}
              height={500}
              loading="eager"
              unoptimized
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0c0f0e99] to-transparent" />
          </div>
        </div>

        <div className="mb-16 max-w-2xl text-center">
          <span className="mb-4 block text-[10px] tracking-[0.3em] text-[#e2c196] uppercase">
            Design Complete
          </span>
          <h1 className={cn("mb-8 text-5xl leading-tight tracking-tight md:text-7xl", notoSerif.className)}>
            The Verdant <span className="italic text-[#e2c196]">Sovereign</span>
          </h1>
          <p className="px-4 text-lg leading-relaxed font-light text-[#c1c8c5]">
            A masterwork of algorithmic precision and artisanal heritage. This emerald center-stone is cradled in
            18k brushed gold, featuring a latticework frame inspired by celestial geometry, optimized by our
            proprietary AI for maximum light refraction.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row">
          <button
            onClick={handleDownloadDesign}
            type="button"
            className="rounded-md bg-linear-to-br from-[#e2c196] to-[#a58860] px-12 py-5 text-xs font-bold tracking-widest text-[#291800] uppercase shadow-[0_10px_30px_-10px_rgba(226,193,150,0.4)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_-5px_rgba(226,193,150,0.6)]"
          >
            Download Design
          </button>
          <button
            type="button"
            className="border-b border-transparent pb-1 text-[11px] tracking-[0.2em] text-[#e1e3e199] uppercase transition-colors duration-500 hover:border-[#e2c196]/30 hover:text-[#e2c196]"
            onClick={handleClearLocalStorage}
          >
            Start New Design
          </button>
        </div>
      </main>

      <footer className="w-full bg-[#0c0f0e] px-8 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-[10px] tracking-widest text-[#e1e3e166] uppercase">
            © 2026 THE MIDNIGHT ATELIER. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Ethical Sourcing"].map((item) => (
              <button
                key={item}
                type="button"
                className="text-[10px] tracking-widest text-[#e1e3e166] uppercase transition-colors hover:text-[#e1e3e1]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
