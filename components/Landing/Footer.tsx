"use client"

import { ArrowRight } from "lucide-react"
import { BRAND, FOOTER_GROUPS, SOCIAL_LINKS } from "./content"
import { BackgroundLayers, GoldDivider, Logo } from "./ui"
import { tk } from "./theme"

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden px-6 pb-8 pt-20 lg:px-10">
      <BackgroundLayers variant="footer" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.2fr_2fr_1fr] lg:gap-10">
          {/* Brand column */}
          <div>
            <Logo className="mb-5" />
            <p className="mb-6 max-w-xs text-sm font-light leading-relaxed" style={{ color: tk.onVar }}>
              {BRAND.tagline}
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border transition-colors hover:bg-white/[0.05]"
                  style={{ borderColor: tk.border, color: tk.accent }}
                >
                  <Icon className="size-4" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h3
                  className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: tk.on }}
                >
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm font-light transition-colors hover:text-white"
                        style={{ color: tk.onVar }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h3
              className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: tk.on }}
            >
              Newsletter
            </h3>
            <p className="mb-4 text-sm font-light leading-relaxed" style={{ color: tk.onVar }}>
              Be the first to discover new collections, exclusive offers, and stories from our atelier.
            </p>
            <form
              className="flex overflow-hidden rounded-full border"
              style={{ borderColor: tk.borderStrong }}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email for newsletter"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:opacity-50"
                style={{ color: tk.on }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex shrink-0 items-center justify-center px-4 transition-colors hover:brightness-110"
                style={{ background: tk.accent, color: tk.surfaceDeep }}
              >
                <ArrowRight className="size-4" strokeWidth={2} />
              </button>
            </form>
          </div>
        </div>

        <GoldDivider className="mb-6" />

        <div
          className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
        >
          <p className="text-xs font-light" style={{ color: tk.onFaint }}>
            © {new Date().getFullYear()} V E L O R A. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-light transition-colors hover:text-white" style={{ color: tk.onVar }}>
              Privacy Policy
            </a>
            <a href="#" className="text-xs font-light transition-colors hover:text-white" style={{ color: tk.onVar }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
