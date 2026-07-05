import { Manrope, Noto_Serif } from "next/font/google"

// Body / UI face — matches the atelier flow (choose-type/page.tsx)
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-atelier-sans",
})

// Display face — the voice of the brand
export const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-atelier-serif",
})

/**
 * Brand tokens lifted verbatim from the existing product flow so the landing
 * page reads as one continuous identity with the design studio.
 */
export const tk = {
  surface: "#111413", // base
  surfaceDeep: "#0a0d0c", // deeper band, for contrast between chapters
  surfaceRaised: "rgba(25,28,27,0.5)", // glass card
  accent: "#e2c196", // gold
  accentDeep: "#a58860", // gold, darker stop
  green: "#0F2A26", // atmospheric deep-green glow
  on: "#e1e3e1", // primary text
  onVar: "#c1c8c5", // secondary text
  onFaint: "rgba(193,200,197,0.4)", // tertiary
  border: "rgba(65,72,70,0.22)",
  borderStrong: "rgba(226,193,150,0.28)",
} as const

export const goldGradient = `linear-gradient(to top right, ${tk.accent}, ${tk.accentDeep})`
