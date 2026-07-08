import type { Metadata } from "next"
import LandingJourney from "@/components/Landing/LandingJourney"

export const metadata: Metadata = {
  title: "Stone Jewellery — Where Every Stone Tells a Story",
  description:
    "Discover rare gemstones and masterful artistry. Certified natural stones, bespoke designs, and heirloom-grade craftsmanship.",
  openGraph: {
    title: "Stone Jewellery — Where Every Stone Tells a Story",
    description:
      "Luxury emerald and diamond jewellery. Explore collections, book a private appointment, and commission bespoke pieces.",
    type: "website",
  },
}

export default function Home() {
  return <LandingJourney />
}
