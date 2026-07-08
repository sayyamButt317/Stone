"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Search, ShoppingBag, User } from "lucide-react"
import { NAV_LINKS } from "./content"
import { LuxuryButton, Logo } from "./ui"
import { tk } from "./theme"

interface HeaderProps {
  onBook?: () => void
}

export default function Header({ onBook }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : undefined,
        borderBottom: scrolled ? `1px solid ${tk.border}` : "1px solid transparent",
      }}
    >
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Logo />

        <nav className="hidden items-center justify-center gap-6 xl:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors hover:text-white"
              style={{ color: tk.onVar }}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="size-3.5 opacity-70" strokeWidth={2} />}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2.5 sm:gap-3">
          <IconButton icon={Search} label="Search" />
          <IconButton icon={User} label="Account" className="hidden sm:flex" />
          <IconButton icon={ShoppingBag} label="Cart" className="hidden sm:flex" />
          <LuxuryButton
            variant="outline"
            size="sm"
            href="#appointment"
            onClick={onBook}
            className="hidden md:inline-flex"
          >
            Book an Appointment
          </LuxuryButton>
        </div>
      </div>
    </header>
  )
}

function IconButton({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof Search
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-white/[0.05] ${className ?? ""}`}
      style={{ borderColor: tk.border, color: tk.accent }}
    >
      <Icon className="size-4" strokeWidth={1.6} />
    </button>
  )
}
