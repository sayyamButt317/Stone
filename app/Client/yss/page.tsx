"use client"

import { useRouter } from "next/navigation"
import useJewelleryStore from "@/app/store/jewellery-store"
import { FLOW_ROUTES } from "../flow-routes"

export default function YssStonePage() {
  const router = useRouter()
  const yssReference = useJewelleryStore((s) => s.yssReference)
  const setYssReference = useJewelleryStore((s) => s.setYssReference)

  return (
    <div className="min-h-screen bg-[#111413] px-6 py-24 font-[Manrope] text-[#e1e3e1]">
      <div className="mx-auto max-w-lg space-y-8">
        <header>
          <h1 className="font-['Noto_Serif'] text-3xl text-[#e2c196]">YSS stone reference</h1>
          <p className="mt-2 text-sm text-[#c1c8c5]">
            Paste your catalog SKU, link, or any reference our team should use.
          </p>
        </header>
        <textarea
          value={yssReference}
          onChange={(e) => setYssReference(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-[#414846]/40 bg-[#191c1b] px-4 py-3 text-[#e1e3e1] placeholder:text-[#c1c8c5]/40 focus:border-[#e2c196]/50 focus:outline-none"
          placeholder="e.g. SKU-48291 or https://..."
        />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-[#414846]/40 px-6 py-3 text-xs uppercase tracking-widest text-[#c1c8c5]"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => router.push(FLOW_ROUTES.chooseGem)}
            className="rounded-full bg-linear-to-br from-[#e2c196] to-[#a58860] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-[#111413]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
