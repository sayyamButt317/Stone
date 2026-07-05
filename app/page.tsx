import type { Metadata } from "next"
import LandingJourney from "@/components/Landing/LandingJourney"

export const metadata: Metadata = {
  title: "L'Atelier — Design the jewel that doesn't exist yet",
  description:
    "Bespoke jewellery, designed by you. Choose the stone, the metal and the setting, preview your piece in real time, and commission it in minutes — not months.",
  openGraph: {
    title: "L'Atelier — Design the jewel that doesn't exist yet",
    description:
      "Bespoke jewellery, designed by you. Preview your piece in real time and commission it in minutes.",
    type: "website",
  },
}

export default function Home() {
  return <LandingJourney />
}
