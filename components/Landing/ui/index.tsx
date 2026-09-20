"use client"

import Link from "next/link"
import { clsx } from "clsx"
import type { IconComponent } from "../types"
import { cormorant, goldGradient, tk } from "../theme"
import type { ButtonProps, SectionHeaderProps } from "../types"

/* ------------------------------------------------------------------ */
/*  Luxury button — primary gold fill, outline, ghost                  */
/* ------------------------------------------------------------------ */

export function LuxuryButton({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  onClick,
  href,
  className,
  ariaLabel,
}: ButtonProps) {
  const sizes = {
    sm: "px-5 py-2 text-[11px] tracking-[0.18em]",
    md: "px-7 py-3 text-xs tracking-[0.2em]",
    lg: "px-9 py-4 text-xs tracking-[0.22em]",
  }

  const variants = {
    primary: {
      style: { background: goldGradient, color: tk.surfaceDeep },
      className: "font-semibold uppercase shadow-[0_8px_32px_rgba(197,160,89,0.25)] hover:brightness-110",
    },
    outline: {
      style: {
        background: "transparent",
        color: tk.on,
        borderColor: tk.borderStrong,
      },
      className: "border font-medium uppercase hover:bg-white/[0.04]",
    },
    ghost: {
      style: { background: "transparent", color: tk.accent },
      className: "font-medium uppercase hover:text-white",
    },
  }

  const v = variants[variant]
  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="size-4 shrink-0" strokeWidth={1.8} />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
      )}
    </>
  )

  const shared = clsx(
    "group inline-flex items-center justify-center gap-2.5 rounded-full transition-all duration-300",
    sizes[size],
    v.className,
    className,
  )

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} onClick={onClick} className={shared} style={v.style}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" aria-label={ariaLabel} onClick={onClick} className={shared} style={v.style}>
      {content}
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Section header — serif display with optional gold accent           */
/* ------------------------------------------------------------------ */

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const centered = align === "center"

  return (
    <div className={clsx(centered && "text-center", className)}>
      {eyebrow && (
        <p
          className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em]"
          style={{ color: tk.accent, justifyContent: centered ? "center" : "flex-start" }}
        >
          <SparkleDot />
          {eyebrow}
        </p>
      )}
      <h2
        className={`${cormorant.className} text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-[3.25rem]`}
        style={{ color: tk.on }}
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="italic" style={{ color: tk.accent }}>
              {titleAccent}
            </span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 max-w-2xl text-sm font-light leading-relaxed sm:text-base",
            centered && "mx-auto",
          )}
          style={{ color: tk.onVar }}
        >
          {description}
        </p>
      )}
    </div>
  )
}

function SparkleDot() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="shrink-0">
      <path
        d="M7 0L8.2 5.8L14 7L8.2 8.2L7 14L5.8 8.2L0 7L5.8 5.8L7 0Z"
        fill={tk.accent}
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Gold divider line                                                  */
/* ------------------------------------------------------------------ */

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={clsx("h-px w-full", className)}
      style={{
        background: `linear-gradient(90deg, transparent, ${tk.borderStrong}, transparent)`,
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Trust badge row item                                                 */
/* ------------------------------------------------------------------ */

export function TrustBadge({
  icon: Icon,
  label,
  stacked = false,
}: {
  icon: IconComponent
  label: string
  stacked?: boolean
}) {
  return (
    <div
      data-badge
      className={
        stacked
          ? "flex flex-col items-center gap-2.5 text-center"
          : "flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
      }
    >
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-full border sm:size-10"
        style={{ borderColor: tk.borderStrong, backgroundColor: "rgba(197,160,89,0.08)" }}
      >
        <Icon className="size-3.5 sm:size-4" style={{ color: tk.accent }} strokeWidth={1.6} />
      </div>
      <span
        className="text-[9px] font-medium uppercase leading-snug tracking-[0.1em] sm:text-[10px] sm:tracking-[0.12em]"
        style={{ color: tk.onVar }}
      >
        {label}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Character split for GSAP hero title                                  */
/* ------------------------------------------------------------------ */

export function SplitTitle({
  text,
  accent,
  className,
}: {
  text: string
  accent?: string
  className?: string
}) {
  const words = text.split(" ")
  let charIndex = 0

  return (
    <span className={className} aria-label={`${text}${accent ? ` ${accent}` : ""}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap overflow-hidden align-top">
          {word.split("").map((char) => {
            const i = charIndex++
            return (
              <span key={i} data-char className="inline-block">
                {char}
              </span>
            )
          })}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      {accent && (
        <>
          {" "}
          <span className="inline-block whitespace-nowrap overflow-hidden align-top italic" style={{ color: tk.accent }}>
            {accent.split(" ").map((word, wi, arr) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((char) => {
                  const i = charIndex++
                  return (
                    <span key={i} data-char className="inline-block">
                      {char}
                    </span>
                  )
                })}
                {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
              </span>
            ))}
          </span>
        </>
      )}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Logo mark                                                          */
/* ------------------------------------------------------------------ */

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={clsx("flex items-center gap-3", className)}>
      <div
        className="flex size-10 items-center justify-center rounded-full border"
        style={{ borderColor: tk.borderStrong, background: "rgba(197,160,89,0.1)" }}
      >
        <span
          className={`${cormorant.className} text-xl font-semibold`}
          style={{ color: tk.accent }}
        >
          V
        </span>
      </div>
      <span className={`${cormorant.className} text-sm font-semibold uppercase tracking-[0.28em]`} style={{ color: tk.on }}>
        V E L O R A
      </span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
/*  Ambient background layers                                          */
/* ------------------------------------------------------------------ */

export function BackgroundLayers({ variant = "hero" }: { variant?: "hero" | "section" | "footer" }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            variant === "hero"
              ? `radial-gradient(ellipse 55% 45% at 78% 38%, ${tk.greenGlow} 0%, transparent 62%),
                 radial-gradient(ellipse 40% 35% at 12% 18%, rgba(197,160,89,0.04) 0%, transparent 50%),
                 linear-gradient(180deg, #000000 0%, ${tk.surfaceDeep} 55%, #000000 100%)`
              : variant === "footer"
                ? `linear-gradient(180deg, ${tk.surface} 0%, ${tk.surfaceDeep} 100%)`
                : `radial-gradient(ellipse 60% 50% at 50% 0%, ${tk.greenGlow} 0%, transparent 55%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
      >
        <svg className="h-full w-full">
          <filter id="stone-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#stone-noise)" />
        </svg>
      </div>
      {variant === "hero" && <GoldParticles />}
    </>
  )
}

function GoldParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${8 + ((i * 17) % 84)}%`,
    top: `${12 + ((i * 23) % 76)}%`,
    size: 1 + (i % 3),
    delay: (i * 0.4) % 3,
  }))

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: tk.accent,
            opacity: 0.25,
            animationDelay: `${p.delay}s`,
            animationDuration: "3s",
          }}
        />
      ))}
    </div>
  )
}
