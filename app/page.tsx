import type { Metadata } from "next"
import LandingJourney from "@/components/Landing/LandingJourney"

export const metadata: Metadata = {
  title: "V E L O R A — Where Every Piece Tells a Story",
  description:
    "Discover rare gemstones and masterful artistry. Certified natural stones, bespoke designs, and heirloom-grade craftsmanship.",
  openGraph: {
    title: "V E L O R A — Where Every Piece Tells a Story",
    description:
      "Luxury emerald and diamond jewellery. Explore collections, book a private appointment, and commission bespoke pieces.",
    type: "website",
  },
}

export default function Home() {
  return <LandingJourney />
}
