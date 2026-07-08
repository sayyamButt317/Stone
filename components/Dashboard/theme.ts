import { tk as landingTk, goldGradient, manrope, cormorant } from "@/components/Landing/theme"

export { manrope, cormorant, goldGradient }

/** Dashboard tokens — aligned with Stone Jewellery landing palette */
export const dk = {
  ...landingTk,
  bg: "#000000",
  bgLeft: "#000808",
  bgCenter: "#000707",
  bgRight: "#010C0D",
  sidebar: "#050807",
  panel: "rgba(0, 12, 11, 0.92)",
  panelBorder: "rgba(197, 160, 89, 0.14)",
  panelHover: "rgba(197, 160, 89, 0.06)",
  success: "#4ade80",
  successMuted: "rgba(74, 222, 128, 0.15)",
  warning: "#fbbf24",
  warningMuted: "rgba(251, 191, 36, 0.15)",
  danger: "#f87171",
  dangerMuted: "rgba(248, 113, 113, 0.15)",
  info: "#60a5fa",
  infoMuted: "rgba(96, 165, 250, 0.15)",
  purple: "#a78bfa",
  purpleMuted: "rgba(167, 139, 250, 0.15)",
  muted: "#6b7280",
} as const

export const panelGradient = `linear-gradient(135deg, ${dk.bgLeft} 0%, ${dk.bgCenter} 50%, ${dk.bgRight} 100%)`
