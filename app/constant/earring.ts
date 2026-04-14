import { EarringStyle } from "../types/earring-type"
import {
    Circle,
    Droplets,
    Gem,
    Minus,
    Sparkles,
    Star,
    Sun,
} from "lucide-react"

export const EARRING_STYLES: Array<{
    id: EarringStyle
    title: string
    subtitle: string
    Icon: typeof Circle
}> = [
        { id: "studs", title: "Studs", subtitle: "Classic Brilliance", Icon: Circle },
        { id: "drops", title: "Drops", subtitle: "Graceful Movement", Icon: Droplets },
        { id: "hoops", title: "Hoops", subtitle: "Timeless Curves", Icon: Circle },
        { id: "huggies", title: "Huggies", subtitle: "Intimate Fit", Icon: Circle },
        { id: "halo-earrings", title: "Halo Earrings", subtitle: "Radiant Surround", Icon: Sun },
        { id: "cluster-earrings", title: "Cluster Earrings", subtitle: "Grouped Fire", Icon: Sparkles },
        { id: "pear-drop-earrings", title: "Pear Drop Earrings", subtitle: "Teardrop Elegance", Icon: Droplets },
        { id: "chandeliers", title: "Chandeliers", subtitle: "Ornate Statuary", Icon: Star },
        { id: "bezel-set-earrings", title: "Bezel-Set Earrings", subtitle: "Seamless Modernity", Icon: Gem },
        { id: "contemporary-minimal", title: "Contemporary Minimal", subtitle: "Architectural Simplicity", Icon: Minus },
    ]
