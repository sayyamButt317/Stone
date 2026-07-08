"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { BRAND, COLLECTIONS } from "./content"
import { useGsapStagger } from "./hooks/useGsap"
import { SectionHeader } from "./ui"
import { cormorant, tk } from "./theme"
import type { CollectionItem } from "./types"

export default function Collections() {
  const gridRef = useGsapStagger<HTMLDivElement>({ stagger: 0.12, y: 40 })
  const { collections } = BRAND

  return (
    <section id="collections" className="relative px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow={collections.eyebrow}
            title={collections.title}
            titleAccent={collections.titleAccent}
            align="left"
          />
          <Link
            href={collections.viewAll.href}
            className="group inline-flex shrink-0 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-white"
            style={{ color: tk.onVar }}
          >
            {collections.viewAll.label}
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              style={{ color: tk.accent }}
              strokeWidth={2}
            />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5 lg:gap-4"
        >
          {COLLECTIONS.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CollectionCard({ item }: { item: CollectionItem }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const Icon = item.icon

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    if (!card || !image || reduce) return

    function enter() {
      gsap.to(card, {
        y: -6,
        boxShadow: "0 20px 48px rgba(197,160,89,0.18)",
        borderColor: tk.borderStrong,
        duration: 0.45,
        ease: "power2.out",
      })
      gsap.to(image, { scale: 1.06, duration: 0.55, ease: "power2.out" })
    }

    function leave() {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        borderColor: tk.border,
        duration: 0.45,
        ease: "power2.out",
      })
      gsap.to(image, { scale: 1, duration: 0.55, ease: "power2.out" })
    }

    card.addEventListener("mouseenter", enter)
    card.addEventListener("mouseleave", leave)
    return () => {
      card.removeEventListener("mouseenter", enter)
      card.removeEventListener("mouseleave", leave)
    }
  }, [reduce])

  return (
    <Link
      ref={cardRef}
      href={item.href}
      data-reveal
      className="group flex flex-col overflow-hidden rounded-lg border transition-colors"
      style={{
        borderColor: tk.border,
        background: "linear-gradient(180deg, rgba(0,12,11,0.95) 0%, rgba(0,8,8,0.98) 100%)",
      }}
    >
      <div
        ref={imageRef}
        className="relative aspect-square overflow-hidden"
        style={{ backgroundColor: "#000000" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 50% 45%, ${tk.greenGlow} 0%, transparent 70%)`,
          }}
        />
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-contain object-center p-3 sm:p-4"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>

      <div className="flex flex-1 flex-col border-t px-4 py-4 sm:px-5 sm:py-5" style={{ borderColor: tk.border }}>
        <Icon className="mb-2.5 size-4" style={{ color: tk.accent }} strokeWidth={1.6} />
        <h3
          className={`${cormorant.className} mb-1.5 text-lg sm:text-xl`}
          style={{ color: tk.on }}
        >
          {item.title}
        </h3>
        <p className="mb-4 flex-1 text-[11px] leading-relaxed sm:text-xs" style={{ color: tk.onVar }}>
          {item.description}
        </p>
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors group-hover:text-white"
          style={{ color: tk.accent }}
        >
          Explore
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
        </span>
      </div>
    </Link>
  )
}
