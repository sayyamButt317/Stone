import {
  ArrowRight,
  Calendar,
  Diamond,
  Gem,
  ShieldCheck,
  Medal,
  Sparkles,
} from "lucide-react"
import {
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  RingIcon,
  YoutubeIcon,
} from "./icons"
import type {
  CollectionItem,
  CraftFeature,
  FooterLinkGroup,
  NavLink,
  SocialLink,
  StatItem,
  TrustBadgeItem,
} from "./types"

/* ------------------------------------------------------------------ */
/*  Remote imagery — Unsplash (configured in next.config.ts)          */
/* ------------------------------------------------------------------ */

export const IMAGES = {
  hero: {
    primary: "/assest/hero.png",
    alt: "Emerald and diamond luxury necklace on black background",
  },
  craftsmanship: {
    primary:
      "https://images.unsplash.com/photo-1617038220319-88fd3c6270ca?w=1200&q=85&auto=format&fit=crop",
    alt: "Jeweler crafting a gold ring by hand",
  },
  appointment: {
    primary:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85&auto=format&fit=crop",
    alt: "Luxury ring in an open jewelry box",
  },
} as const

export const NAV_LINKS: NavLink[] = [
  { label: "Collections", href: "#collections" },
  { label: "Jewellery", href: "#collections", hasDropdown: true },
  { label: "About Us", href: "#about" },
  { label: "Craftsmanship", href: "#craftsmanship" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
]

export const TRUST_BADGES: TrustBadgeItem[] = [
  { icon: Gem, label: "Certified Natural Gemstones" },
  { icon: ShieldCheck, label: "Lifetime Warranty" },
  { icon: Sparkles, label: "Bespoke Designs" },
  { icon: Medal, label: "Secure & Insured Delivery" },
]

export const STATS: StatItem[] = [
  { value: 10, suffix: "K+", label: "Happy Clients", icon: Diamond },
  { value: 25, suffix: "+", label: "Years of Legacy", icon: RingIcon },
  { value: 5, suffix: "K+", label: "Unique Designs", icon: Gem },
  { value: 100, suffix: "%", label: "Certified & Genuine", icon: ShieldCheck },
]

export const COLLECTIONS: CollectionItem[] = [
  {
    id: "rings",
    title: "Rings",
    description: "Timeless symbols of love and elegance.",
    image: "/assest/diamondring.png",
    imageAlt: "Diamond ring on dark background",
    icon: RingIcon,
    href: "/Client/choose-type",
  },
  {
    id: "earrings",
    title: "Earrings",
    description: "Elegance that frames your beauty.",
    image: "/assest/earring.png",
    imageAlt: "Emerald and diamond drop earrings",
    icon: Gem,
    href: "/Client/choose-type",
  },
  {
    id: "necklaces",
    title: "Necklaces",
    description: "Statements that speak your style.",
    image: "/assest/hero.png",
    imageAlt: "Emerald and diamond necklace",
    icon: Diamond,
    href: "/Client/choose-type",
  },
  {
    id: "bracelets",
    title: "Bracelets",
    description: "Grace for every moment you live.",
    image: "/assest/diamondbraclet.png",
    imageAlt: "Diamond tennis bracelet",
    icon: Sparkles,
    href: "/Client/choose-type",
  },
  {
    id: "pendants",
    title: "Pendants",
    description: "Details that leave a lasting mark.",
    image: "/assest/pendant.png",
    imageAlt: "Emerald pear pendant with diamond halo",
    icon: Gem,
    href: "/Client/choose-type",
  },
]

export const CRAFT_FEATURES: CraftFeature[] = [
  {
    icon: Sparkles,
    title: "Handcrafted",
    description: "Every piece shaped by master artisans with decades of experience.",
  },
  {
    icon: Gem,
    title: "Ethically Sourced",
    description: "Stones traced from mine to atelier with full certification.",
  },
  {
    icon: Diamond,
    title: "Exceptional Quality",
    description: "Precision settings and finishing that exceed industry standards.",
  },
  {
    icon: Medal,
    title: "Made to Be Treasured",
    description: "Heirloom-grade pieces designed to pass through generations.",
  },
]

export const FOOTER_GROUPS: FooterLinkGroup[] = [
  {
    title: "Shop",
    links: [
      { label: "Rings", href: "/Client/choose-type" },
      { label: "Necklaces", href: "/Client/choose-type" },
      { label: "Earrings", href: "/Client/choose-type" },
      { label: "Bracelets", href: "/Client/choose-type" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Craftsmanship", href: "#craftsmanship" },
      { label: "Journal", href: "#journal" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Book Appointment", href: "#appointment" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com" },
  { icon: PinterestIcon, label: "Pinterest", href: "https://pinterest.com" },
  { icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
]

export const BRAND = {
  name: "STONE JEWELLERY",
  tagline: "Timeless beauty. Crafted for eternity.",
  hero: {
    eyebrow: "Timeless Elegance, Precious Moments",
    title: "Where Every Stone",
    titleAccent: "Tells a Story",
    description:
      "Discover exquisite jewelry crafted with rare gemstones and unparalleled artistry. Each piece tells a story of elegance, passion, and timeless beauty.",
    primaryCta: { label: "Explore Collections", href: "#collections", icon: ArrowRight },
    secondaryCta: { label: "Book an Appointment", href: "#appointment", icon: Calendar },
    videoLabel: "Discover the Stone Experience",
  },
  collections: {
    eyebrow: "Our Collections",
    title: "Find the",
    titleAccent: "Perfect Piece",
    viewAll: { label: "View All Collections", href: "#collections" },
  },
  craftsmanship: {
    eyebrow: "Crafted with Passion",
    title: "The Art of",
    titleAccent: "Fine Craftsmanship",
    description:
      "For over two decades, our master artisans have blended traditional techniques with modern precision. Every curve, every setting, every polish reflects an unwavering commitment to excellence.",
    cta: "Discover Our Craft",
  },
  appointment: {
    title: "Book a Private Appointment",
    description:
      "Experience our collections in an intimate setting. Our experts will guide you through bespoke designs tailored to your vision.",
    cta: "Book Your Appointment",
  },
} as const
