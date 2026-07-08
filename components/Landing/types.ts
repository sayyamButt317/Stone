import type { LucideIcon } from "lucide-react"
import type { ComponentType, ReactNode, SVGProps } from "react"

/** Lucide icons or lightweight inline SVG icon components */
export type IconComponent = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>

/** Brand design tokens consumed by section components. */
export interface LandingTheme {
  surface: string
  surfaceDeep: string
  surfaceRaised: string
  accent: string
  accentDeep: string
  green: string
  on: string
  onVar: string
  onFaint: string
  border: string
  borderStrong: string
}

export interface NavLink {
  label: string
  href: string
  hasDropdown?: boolean
}

export interface TrustBadgeItem {
  icon: IconComponent
  label: string
}

export interface StatItem {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  icon: IconComponent
}

export interface CollectionItem {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  icon: IconComponent
  href: string
}

export interface CraftFeature {
  icon: IconComponent
  title: string
  description: string
}

export interface FooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}

export interface SocialLink {
  icon: IconComponent
  label: string
  href: string
}

export interface SectionHeaderProps {
  eyebrow?: string
  title: string
  titleAccent?: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: IconComponent
  iconPosition?: "left" | "right"
  onClick?: () => void
  href?: string
  className?: string
  ariaLabel?: string
}

export interface GsapRevealOptions {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  once?: boolean
}
