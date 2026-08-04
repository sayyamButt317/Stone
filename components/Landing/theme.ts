import { Cormorant_Garamond, Manrope } from "next/font/google"



/** Body / UI — clean sans for navigation, labels, and body copy */
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-stone-sans",
})

/** Display — high-contrast serif for luxury headings */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-stone-serif",
})

export const notoSerif = cormorant

export const tk = {
  surface: "#0a0f0e",
  surfaceDeep: "#050807",
  surfaceRaised: "rgba(15, 24, 22, 0.72)",
  accent: "#C5A059",
  accentDeep: "#9a7840",
  green: "#0F2A26",
  greenGlow: "rgba(15, 42, 38, 0.65)",
  on: "#f5f5f3",
  onVar: "#b8c0bc",
  onFaint: "rgba(184, 192, 188, 0.45)",
  border: "rgba(197, 160, 89, 0.12)",
  borderStrong: "rgba(197, 160, 89, 0.32)",
} as const

export const goldGradient = `linear-gradient(135deg, ${tk.accent} 0%, ${tk.accentDeep} 100%)`

export const marbleGradient = `
  radial-gradient(ellipse 80% 60% at 20% 10%, ${tk.greenGlow} 0%, transparent 55%),
  radial-gradient(ellipse 60% 50% at 85% 80%, rgba(197, 160, 89, 0.06) 0%, transparent 50%),
  linear-gradient(180deg, ${tk.surfaceDeep} 0%, ${tk.surface} 40%, ${tk.surfaceDeep} 100%)
`
